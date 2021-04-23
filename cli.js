#!/usr/bin/env node

const { Command } = require('commander');
const list = require('./src/cli/actions/list');

const program = new Command();

program
  .command('list')
  .description('list all issues')
  .option('-o, --open', 'list only open issues')
  .option('-c, --closed', 'list only closed issues')
  .action(list);

program.parse();
