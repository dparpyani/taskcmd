# frozen_string_literal: true

require 'msgpack'
require 'taskcmd/project'
require 'taskcmd/storage'
require 'taskcmd/task'
require 'taskcmd/version'

MessagePack::DefaultFactory.register_type(
  MessagePack::Timestamp::TYPE, # -1
  Time,
  packer: MessagePack::Time::Packer,
  unpacker: MessagePack::Time::Unpacker
)
MessagePack::DefaultFactory.register_type(0x00, Symbol)
MessagePack::DefaultFactory.register_type(0x01, Taskcmd::Project)
MessagePack::DefaultFactory.register_type(0x02, Taskcmd::Task)

# Main app module
module Taskcmd
  class Error < StandardError; end

  def self.storage
    @@storage ||= Taskcmd::Storage.new()
  end

  def self.config_get(key)
    @@config ||= storage.load_config
    @@config[key]
  end

  def self.config_set(key, val)
    @@config ||= storage.load_config
    @@config[key] = val
    storage.save_config(@@config)
  end
end

# Load CLI after as it has dependency on module methods
require 'taskcmd/cli'
