# frozen_string_literal: true

require_relative 'lib/taskcmd/version'

Gem::Specification.new do |spec|
  spec.name          = 'taskcmd'
  spec.version       = Taskcmd::VERSION
  spec.authors       = ['Deepak Parpyani']
  spec.summary       = 'Simple todo list manager for the command line'
  spec.homepage      = 'https://github.com/dparpyani/taskcmd'
  spec.license       = 'MIT'

  spec.required_ruby_version = Gem::Requirement.new('>= 3.3.1')

  # Specify which files should be added to the gem when it is released.
  # The `git ls-files -z` loads the files in the RubyGem that have been added into git.
  spec.files = Dir.chdir(File.expand_path(__dir__)) do
    `git ls-files -z`.split("\x0").reject { |f| f.match(%r{\A(?:test|spec|features)/}) }
  end
  spec.bindir        = 'bin'
  spec.executables   = spec.files.grep(%r{\Abin/}) { |f| File.basename(f) }
  spec.require_paths = ['lib']

  # Metadata
  spec.metadata['rubygems_mfa_required'] = 'true'

  # Dependencies
  spec.add_dependency 'msgpack', '~> 1.7.2'
  spec.add_dependency 'thor', '~> 1.3.1'
end
