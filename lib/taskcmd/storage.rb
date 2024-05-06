# frozen_string_literal: true

module Taskcmd
  # Interact with local filesystem to store and load projects.
  class Storage
    DEFAULT_DIRECTORY_NAME = '.taskcmd'
    CONFIG_FILE_NAME = 'config'
    CONFIG_FILE_EXT = 'msgpack'
    PROJECT_FILE_EXT = 'project.msgpack'

    attr_reader :dir

    def initialize(dir = nil)
      @dir = dir || default_directory
    end

    def project_name_list
      Dir.entries(dir)
        .select { |x| x.end_with?(".#{PROJECT_FILE_EXT}") }
        .map    { |x| x.delete_suffix(".#{PROJECT_FILE_EXT}") }
    end

    def load_project(name)
      data = File.read(project_file(name))
      MessagePack.unpack(data)
    end

    def save_project(project)
      data = MessagePack.pack(project)
      path = project_file(project.name)
      File.write(path, data)
      path
    end

    def delete_project(project_name)
      File.delete(project_file(project_name))
    end

    def project_exists?(name)
      File.file?(project_file(name))
    end

    def project_file(name)
      File.join(dir, "#{name}.#{PROJECT_FILE_EXT}")
    end

    def save_config(config)
      data = MessagePack.pack(config)
      File.write(config_file, data)
    end

    def load_config
      return {} unless File.file?(config_file)
      data = File.read(config_file)
      MessagePack.unpack(data)
    end

    private

    def config_file
      @config_file ||= File.join(dir, "#{CONFIG_FILE_NAME}.#{CONFIG_FILE_EXT}")
    end

    def default_directory
      File.join(Dir.home, DEFAULT_DIRECTORY_NAME).tap do |dir|
        Dir.mkdir(dir, 0o700) unless Dir.exist?(dir)
      end
    end
  end
end
