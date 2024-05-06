# frozen_string_literal: true

require 'thor'

module Taskcmd::CLI
  class Project < Thor
    desc('list', 'Lists existing projects')
    def list
      projects = Taskcmd.storage.project_name_list
      if projects.empty?
        say("No projects.")
        return
      end

      active_project = Taskcmd.config_get(:active_project)
      projects.each do |project|
        out = project + (project == active_project ? " (active)" : "")
        say(out)
      end
    end

    desc('add NAME', 'Create a new project')
    def add(name)
      if Taskcmd.storage.project_exists?(name)
        raise Taskcmd::Error, "project with name '#{name}' already exists"
      end

      project = Taskcmd::Project.new(name)
      path = Taskcmd.storage.save_project(project)
      say("Created project '#{name}', data will be stored at '#{path}'.")

      # If this is the only project
      if Taskcmd.storage.project_name_list.length == 1
        Taskcmd.config_set(:active_project, name)
        say("'#{name}' is now the active project.")
      end
    end

    desc('switch NAME', 'Switch active project')
    def switch(name)
      active_project = Taskcmd.config_get(:active_project)
      if active_project == name
        say("'#{name}' is already the active project.")
        return
      end

      unless Taskcmd.storage.project_exists?(name)
        raise Taskcmd::Error, "project with name '#{name}' does not exist"
      end

      Taskcmd.config_set(:active_project, name)
      say("'#{name}' is now the active project.")
    end

    desc('rm NAME', 'Delete a project')
    option(:force, type: :boolean, aliases: [:f], desc: "deletes the project and its tasks without confirming interactively")
    def rm(name)
      unless Taskcmd.storage.project_exists?(name)
        raise Taskcmd::Error, "project with name '#{name}' does not exist"
      end

      path = Taskcmd.storage.project_file(name)
      if options[:force]
        sure = true
      else
        say("This will delete project '#{name}' and all its tasks, along with its file '#{path}'.", [:white, :on_red])
        sure = yes?("This is non-recoverable. Are you sure? Enter 'y' or 'yes' to confirm.", [:white, :on_red])
        say()
      end

      if sure
        active_project = Taskcmd.config_get(:active_project)
        if active_project == name
          Taskcmd.config_set(:active_project, nil)
        end

        Taskcmd.storage.delete_project(name)
        say("Project '#{name}' was deleted.")
      else
        say("Project was not deleted.")
      end
    end
  end
end
