#!/usr/bin/env node

const { Command } = require('commander');
const list = require('./src/cli/actions/list');
const create = require('./src/cli/actions/create');

const program = new Command();

program
  .command('list')
  .description('list all issues')
  .option('-o, --open', 'list only open issues')
  .option('-c, --closed', 'list only closed issues')
  .action(list);

program
  .command('create <title>')
  .description('create a new issue')
  .option('-d, --description <description>', 'description of the issue', '')
  .option(
    '-a, --assignedTo <assignedTo>',
    'assign the issue to some contributor',
    null
  )
  .option(
    '-s, --status <status>',
    'status of the issue, either `closed` or `open`',
    'open'
  )
  .option(
    '-l, --labels <labels...>',
    'add one or more labels to the issue, separated by spaces',
    []
  )
  .action(create);

program.parse();
