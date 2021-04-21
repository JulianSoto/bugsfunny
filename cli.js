#!/usr/bin/env node

const path = require('path');
const fs = require('fs/promises');
const simpleGit = require('simple-git/promise');
const { Command } = require('commander');

const git = simpleGit();
const program = new Command();

program
  .command('list')
  .description('list all issues')
  .action(async () => {
    const issuesDirectory = path.join(
      await git.revparse('--show-toplevel'),
      '.bugsfunny'
    );
    const files = await fs.readdir(issuesDirectory);
    const issues = await Promise.all(
      files.map(async (file) => {
        const content = await fs.readFile(path.join(issuesDirectory, file));
        return JSON.parse(content);
      })
    );

    console.log(issues);
  });

program.parse();
