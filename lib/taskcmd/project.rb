# frozen_string_literal: true

module Taskcmd
  # Project is a collection of similar tasks.
  class Project
    NAME_PATTERN = /\A[a-z]+{3,10}\z/.freeze

    attr_reader :name, :tasks, :next_id

    def initialize(name)
      raise Taskcmd::Error, 'invalid project name' unless name.match?(NAME_PATTERN)

      @name = name
      @tasks = []
      @next_id = 1
    end

    def increment_next_id
      @next_id += 1
    end

    def to_msgpack_ext
      {
        name: name,
        tasks: tasks,
        next_id: next_id,
      }.to_msgpack
    end

    def self.from_msgpack_ext(data)
      unpacked = MessagePack.unpack(data)
      new(unpacked[:name]).tap do |obj|
        unpacked.each { |k, v| obj.instance_variable_set("@#{k}", v) }
      end
    end
  end
end
