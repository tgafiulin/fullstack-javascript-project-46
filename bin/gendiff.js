#!/usr/bin/env node
import { Command } from 'commander';
import { gendiff } from '../src/index.js';
import fs from 'fs';
import path from 'path';
const program = new Command();

// gendiff();

program
  .name('gendiff')
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1> <filepath2>')
  .action(() => {
    const [path1, path2] = program.args;

    const file1 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), path1)));
    const file2 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), path2)));

    const result = [];

    for (const key1 of Object.keys(file1).sort()) {
      if (!file2[key1]) {
        result.push(`- ${key1}: ${file1[key1]}`);
      } else {
        if (file1[key1] === file2[key1]) {
          result.push(`${key1}: ${file1[key1]}`);
        } else {
          result.push(`- ${key1}: ${file1[key1]}`);
          result.push(`+ ${key1}: ${file2[key1]}`);
        }
      }
    }

    for (const key2 of Object.keys(file2).sort()) {
      if (!file1[key2]) {
        result.push(`+ ${key2}: ${file2[key2]}`);
      }
    }

    console.log(`{\n  ${result.join('\n  ')}\n}`);
    // for (const key of Object.keys(file1).sort())
  })



program.parse();