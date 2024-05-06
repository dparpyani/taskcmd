# Taskcmd

A todo list manager for the command line.

## Installation

You will need to have a Ruby environment installed, then run:

```bash
gem install taskcmd
```

This should also install any dependencies, such as [msgpack](https://msgpack.org),
which taskcmd uses as its serialization format.

## Usage

### Help

This page gives an overview of how to use taskcmd, but doesn't include all details like what options
are available for each command. You can find more by using the `help` command.

For example, start by doing `task help` to see a list of all possible commands. Then, to see more info
on a specific command, you can do `task help <command>`.

You can also do `task about` to open this GitHub page.

### Managing projects

A project is a collection of tasks. You can create new projects by doing the following:

```bash
$ task project add myproject
Created project 'myproject', data will be stored at '/Users/<$USER>/.taskcmd/myproject.project.msgpack'.
'myproject' is now the active project.
```

If you're creating your first project, it will automatically be set as your active project. As you'll see later
below, taskcmd assumes you're working with tasks in your active project unless the `--project` option is
explicitly specified.

You can also switch to a different active project:

```bash
# Let's create another project to switch to
$ task project add anotherproject
Created project 'anotherproject', data will be stored at '/Users/<$USER>/.taskcmd/anotherproject.project.msgpack'.

# Now, let's switch to it
$ task project switch anotherproject
'anotherproject' is now the active project.
```

See all created projects with:

```bash
$ task project list
myproject
anotherproject (active)
```

And finally, you can delete a project (and all its tasks) by doing:
```bash
# The '-f' (force) option bypasses the confirmation
$ task project rm  -f anotherproject
Project 'anotherproject' was deleted.
```

### Creating new tasks

Let's switch back to our other project and start adding a few tasks:

```bash
$ task project switch myproject
'myproject' is now the active project.

$ task add "my very first task"
Task was created in project 'myproject' successfully!

id: 1
priority: medium
description: my very first task
created_at: 2024-05-06 14:55:59 -0400
completed_at: -

$ task add  "yet another task"
Task was created in project 'myproject' successfully!

id: 2
priority: medium
description: yet another task
created_at: 2024-05-06 14:56:20 -0400
completed_at: -

$ task add --priority=high "a very high priority task"
Task was created in project 'myproject' successfully!

id: 3
priority: high
description: a very high priority task
created_at: 2024-05-06 14:56:25 -0400
completed_at: -
```

You can also specify a different project by providing the `--project` or `-p` option. This option
also works with the other commands listed below that are related to managing tasks.

### Viewing tasks

List all tasks:

```bash
$ task list
id  priority  created at                 completed at  description
1   medium    2024-05-06 14:55:59 -0400  -             my very first task
2   medium    2024-05-06 14:56:20 -0400  -             yet another task
3   high      2024-05-06 14:56:25 -0400  -             a very high priority task
```

Filter tasks by priority:

```bash
$ task list --priority medium
Searching for tasks with priority: medium

id  priority  created at                 completed at  description
1   medium    2024-05-06 14:55:59 -0400  -             my very first task
2   medium    2024-05-06 14:56:20 -0400  -             yet another task
```

Utilizing `grep` to search for tasks:
```bash
$ task list | grep my
1   medium    2024-05-06 14:55:59 -0400  -             my very first task
```

### Completing tasks

Mark a task as done by specifying the task ID:

```bash
$ task done 3
Task with id=3 in project 'myproject' was marked as completed.

id: 3
priority: high
description: a very high priority task
created_at: 2024-05-06 14:56:25 -0400
completed_at: 2024-05-06 15:02:59 -0400
```

You can mark it as incomplete again by doing:

```bash
$ task undo 3
Task with id=3 in project 'myproject' was marked as incomplete.

id: 3
priority: high
description: a very high priority task
created_at: 2024-05-06 14:56:25 -0400
completed_at: -
```

### Editing tasks

Here's an example of editing a task:

```bash
$ task edit 3 --priority low --description "a low priority task now"
Task with id=3 in project 'myproject' was successfully updated!

id: 3
priority: low
description: a low priority task now
created_at: 2024-05-06 14:56:25 -0400
completed_at: -
```

### Deleting tasks

```bash
# The '-f' (force) option bypasses the confirmation
$ task rm -f 3
Found the following task with id=3 in project 'myproject'.

id: 3
priority: low
description: a low priority task now
created_at: 2024-05-06 14:56:25 -0400
completed_at: -

Task has been deleted.
```

### Backup

Taskcmd stores its config, along with the projects and tasks, in the `~/.taskcmd` directory. If you'd
like to, you can include this directory in your backups to prevent accidental loss of data.

## Development

To install this gem onto your local machine, run `bundle exec rake install`. To release a new version,
update the version number in `version.rb`, and then run `bundle exec rake release`, which will create
a git tag for the version, push git commits and the created tag, and push the `.gem` file to
[rubygems.org](https://rubygems.org).

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/dparpyani/taskcmd.
