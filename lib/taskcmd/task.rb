# frozen_string_literal: true

module Taskcmd
  # An individual Todo item
  class Task
    PRIORITY_LOW = :low
    PRIORITY_MEDIUM = :medium
    PRIORITY_HIGH = :high
    PRIORITY_CHOICES = [PRIORITY_LOW, PRIORITY_MEDIUM, PRIORITY_HIGH]

    attr_reader :id, :priority, :created_at, :completed_at
    attr_accessor :description

    def initialize(id)
      raise Taskcmd::Error, 'invalid id' unless id.is_a?(Integer)

      @id = id
      @priority = PRIORITY_MEDIUM
      @created_at = Time.now
    end

    def priority=(value)
      raise Taskcmd::Error, "invalid priority '#{value}'" unless PRIORITY_CHOICES.include?(value)
      @priority = value
    end

    def description=(value)
      raise Taskcmd::Error, 'description cannot be empty' if value.empty?
      @description = value
    end

    def complete!
      @completed_at = Time.now
    end

    def undo!
      @completed_at = nil
    end

    def done?
      !@completed_at.nil?
    end

    def to_s
      "id: #{id}\n" \
      "priority: #{priority}\n" \
      "description: #{description}\n" \
      "created_at: #{created_at}\n" \
      "completed_at: #{completed_at || "-"}" \
    end

    def to_msgpack_ext
      {
        id: id,
        priority: priority,
        description: description,
        created_at: created_at,
        completed_at: completed_at,
      }.to_msgpack
    end

    def self.from_msgpack_ext(data)
      unpacked = MessagePack.unpack(data)
      new(unpacked[:id]).tap do |obj|
        unpacked.each { |k, v| obj.instance_variable_set("@#{k}", v) }
      end
    end
  end
end
