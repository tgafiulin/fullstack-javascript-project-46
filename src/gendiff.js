import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
const program = new Command();

export default (path1, path2) => {
    const file1 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), path1)));
    const file2 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), path2)));

    const result = [];

    for (const key1 of _.sortedUniq(Object.keys(file1))) {
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

    for (const key2 of _.sortedUniq(Object.keys(file2))) {
        if (!file1[key2]) {
            result.push(`+ ${key2}: ${file2[key2]}`);
        }
    }

    return `{\n  ${result.join('\n  ')}\n}`; 
}