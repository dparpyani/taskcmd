# frozen_string_literal: true

require 'thor'
require 'taskcmd/cli/project'

module Taskcmd::CLI
  # Main CLI entry point
  class Main < Thor
    desc('project', 'Create and manage projects')
    subcommand('project', Taskcmd::CLI::Project)

    desc('list', 'List tasks in a project')
    option(:project, default: Taskcmd.config_get(:active_project),
      type: :string, aliases: [:p], desc: "if not set, defaults to the active project")
    option(:id, type: :numeric, desc: "fetch task by id")
    option(:priority, type: :string, desc: "filter by priority (#{Taskcmd::Task::PRIORITY_CHOICES.map(&:to_s)})")
    option(:expand, type: :boolean, aliases: [:e], desc: "displays tasks in expanded form, instead of a table")
    def list()
      project = Taskcmd.storage.load_project(validate_project())
      tasks = project.tasks

      id = options[:id]
      priority = options[:priority]&.to_sym

      if id
        say("Searching for task with id: #{id}\n\n")
        tasks.select! { |x| x.id == id }
      elsif priority
        unless Taskcmd::Task::PRIORITY_CHOICES.include?(priority)
          raise Taskcmd::Error, "invalid priority '#{priority}'"
        end
        say("Searching for tasks with priority: #{priority}\n\n")
        tasks.select! { |x| x.priority == priority }
      end

      if tasks.empty?
        say("No task found.")
      else
        if options[:expand]
          tasks.each do |task|
            say(task)
            say()
          end
        else
          headers = ['id', 'priority', 'created at', 'completed at', 'description']
          print_table(
            [headers] +
            tasks.map {|x| [x.id, x.priority, x.created_at, x.completed_at || '-', x.description].map(&:to_s) }
          )
        end
      end
    end

    desc('add DESCRIPTION', 'Create a new task with the given description')
    option(:project, default: Taskcmd.config_get(:active_project),
      type: :string, aliases: [:p], desc: "if not set, defaults to the active project")
    option(:priority, default: Taskcmd::Task::PRIORITY_MEDIUM,
      type: :string, desc: "can be one of #{Taskcmd::Task::PRIORITY_CHOICES.map(&:to_s)}")
    def add(description)
      project = Taskcmd.storage.load_project(validate_project())
      task = Taskcmd::Task.new(project.next_id)
      task.priority = options[:priority].to_sym
      task.description = description.strip

      project.tasks.push(task)
      project.increment_next_id
      Taskcmd.storage.save_project(project)

      say("Task was created in project '#{project.name}' successfully!\n\n")
      say(task)
      say()
    end

    desc('edit ID', 'Edit a task')
    option(:project, default: Taskcmd.config_get(:active_project),
      type: :string, aliases: [:p], desc: "if not set, defaults to the active project")
    option(:priority, type: :string, desc: "can be one of #{Taskcmd::Task::PRIORITY_CHOICES.map(&:to_s)}")
    option(:description, type: :string, desc: "new task description")
    def edit(id)
      project = Taskcmd.storage.load_project(validate_project())
      task = project.tasks.find { |x| x.id.to_s == id.to_s }
      if task.nil?
        say("No task with id=#{id} in project '#{project.name}'")
        return
      end

      if options[:priority]
        task.priority = options[:priority].to_sym
      end
      if options[:description]
        task.description = options[:description].strip
      end

      Taskcmd.storage.save_project(project)
      say("Task with id=#{id} in project '#{project.name}' was successfully updated!\n\n")
      say(task)
      say()
    end

    desc('done ID', 'Marks a task as completed')
    option(:project, default: Taskcmd.config_get(:active_project),
      type: :string, aliases: [:p], desc: "if not set, defaults to the active project")
    def done(id)
      project = Taskcmd.storage.load_project(validate_project())
      task = project.tasks.find { |x| x.id.to_s == id.to_s }
      if task.nil?
        say("No task with id=#{id} in project '#{project.name}'")
        return
      elsif task.done?
        say("Task with id=#{id} in project '#{project.name}' is already done.")
        return
      end

      task.complete!
      Taskcmd.storage.save_project(project)

      say("Task with id=#{id} in project '#{project.name}' was marked as completed.\n\n")
      say(task)
      say()
    end

    desc('undo ID', 'Unmarks a task as completed')
    option(:project, default: Taskcmd.config_get(:active_project),
      type: :string, aliases: [:p], desc: "if not set, defaults to the active project")
    def undo(id)
      project = Taskcmd.storage.load_project(validate_project())
      task = project.tasks.find { |x| x.id.to_s == id.to_s }
      if task.nil?
        say("No task with id=#{id} in project '#{project.name}'")
        return
      elsif !task.done?
        say("Task with id=#{id} in project '#{project.name}' is not marked as done.")
        return
      end

      task.undo!
      Taskcmd.storage.save_project(project)

      say("Task with id=#{id} in project '#{project.name}' was marked as incomplete.\n\n")
      say(task)
      say()
    end

    desc('rm ID', 'Deletes a task')
    option(:project, default: Taskcmd.config_get(:active_project),
      type: :string, aliases: [:p], desc: "if not set, defaults to the active project")
    option(:force, type: :boolean, aliases: [:f], desc: "deletes the task without confirming interactively")
    def rm(id)
      project = Taskcmd.storage.load_project(validate_project())
      task = project.tasks.find { |x| x.id.to_s == id.to_s }
      if task.nil?
        say("No task with id=#{id} in project '#{project.name}'")
        return
      end

      say("Found the following task with id=#{id} in project '#{project.name}'.\n\n")
      say(task)
      say()

      if options[:force]
        sure = true
      else
        sure = yes?("Delete this task? This is non-recoverable. Are you sure? Enter 'y' or 'yes' to confirm.", [:white, :on_red])
        say()
      end

      if sure
        project.tasks.delete(task)
        Taskcmd.storage.save_project(project)
        say("Task has been deleted.")
      else
        say("Task was not deleted.")
      end
    end

    desc('about', "Opens the project's GitHub page")
    def about
      project_link = 'https://github.com/dparpyani/taskcmd'
      say("Opening project page: #{project_link}")

      if RbConfig::CONFIG['host_os'] =~ /mswin|mingw|cygwin/
        system('start', project_link)
      elsif RbConfig::CONFIG['host_os'] =~ /darwin/
        system('open', project_link)
      elsif RbConfig::CONFIG['host_os'] =~ /linux|bsd/
        system('xdg-open', project_link)
      end
    end

    no_commands do
      def validate_project()
        name = options[:project]
        if name.nil? && Taskcmd.config_get(:active_project).nil?
          raise Taskcmd::Error, "project not specified, and no active project set"
        end
        unless Taskcmd.storage.project_exists?(name)
          raise Taskcmd::Error, "project with name '#{name}' does not exist"
        end
        name
      end
    end

    def self.exit_on_failure?
      true
    end
  end
end
