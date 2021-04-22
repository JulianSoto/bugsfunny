#!/usr/bin/env node

const { Command } = require('commander');
const list = require('./src/cli/actions/list');

const program = new Command();

program.command('list').description('list all issues').action(list);

program.parse();
