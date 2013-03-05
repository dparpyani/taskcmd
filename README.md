Guide to help you get started with TaskCmd.

# Installation #
Install TaskCmd using <a href="https://npmjs.org/">npm</a>:
```bash
npm install -g git://github.com/dparpyani/TaskCmd.git
```
Following installation, TaskCmd can be run by entering `task` in the terminal.

# Usage #
## Adding a new task ##
```bash
task add description
```
For example, the following will add a new task with the description of 'My first
task.' 
```bash
task add 'My first task.'
```
The current working directory is where your task list will reside. You'll then
be able to see or edit your tasks in any subdirectory of the current working
directory.

If you decide to move the task list after you've used `task`, the tasks are
saved in .tasks.json.

## Viewing tasks ##
```bash
task ls [ option ] [ keyword | ID ]
```
By default, this will show you all incomplete tasks:
```bash
id: 1    priority: none
description: My first task.
created at: 17/02/2013 3:00 pm
```

###Options###
| Option | Description |
|:-----------|:------------|
|`-a` | lists all tasks.|
|`-c` | lists all complete tasks.|
|`-i` | lists all incomplete tasks (default).|
|`-s keyword` | searches & lists all tasks that contain keyword.|
|`-sc keyword` | searches & lists all complete tasks that contain keyword.|
|`-si keyword` | searches & lists all incomplete tasks that contain keyword.|
|`-id ID` | lists the task with the given ID.|

## Maintaining multiple task lists ##
```bash
task init
```
Use this command when you'd like a separate task list for a project, but you 
already have a task list further up in the directory tree. When you're in the
current folder or a subdirectory, you'll see the new task list instead of the
one higher up in the directory tree.

If node.js can't find a task file anywhere up the current path, most commands
(ls, add, delete, priority, complete) will add a new task file to the current
directory.

## Completing a task ##
```bash
task complete ID [ note ]
```
Marks the task with the given ID as complete, and adds a completion note for the task (if provided).
Completion note will show up while viewing completed tasks.

## Deleting tasks ##
```bash
task remove option ( keyword | ID )
```

Both option and keyword are required. For example, the following will remove
the task with id 2, if it exists.
```bash
task remove -id 2
```

###Options###
| Option | Description |
|:-----------|:------------|
|`-a` | removes all tasks.|
|`-c` | removes all completed tasks.|
|`-i` | removes all incomplete tasks.|
|`-s keyword` | searches & removes all tasks that contain keyword.|
|`-sc keyword` | searches & removes all complete tasks that contain keyword.|
|`-si keyword` | searches & removes all incomplete tasks that contain keyword.|
|`-id ID` | removes the task with the given ID.|

## Prioritizing tasks ##
```bash
task pr ID status
```
Sets the priority of the task with the given ID to status. Status can be 'none', 'low', 'medium', 'high'.

## Editing tasks ##
```bash
task edit id option [value]
```
Updates the task with the given id based on the option and value. 

| Option | Description |
|:-----------|:------------|
| `-c value` | Sets the completion note of the task to value. |
| `-d value` | Sets the description of the task to value. |
| `-i` | Sets the completion status of the task to incomplete. |
| `-p value` | Sets the priority of the task to value (must be one of 'none', 'low', 'medium', 'high'). |

## Help ##
```bash
task help
```
Brings you here.

## About ##
```bash
task about
```
Shows info about TaskCmd like `version number`, `author`, etc.

# Command Aliases #
| Command | Aliases |
|:-----------|:------------|
| `list` | `ls`, `view`, `show` |
| `add` | `new`, `insert`, `put`, `open` |
| `complete` | `do`, `close`, `finish`, `forget`, `giveup` |
| `remove` | `rm`, `delete`, `kill` |
| `edit` | `modify`, `change`, `alter`, `amend` |
| `priority` | `pr`, `level` |
| `help` | `-h`, `--help`, `howto` |
| `about` | `author`, `creator`, `contact` |

