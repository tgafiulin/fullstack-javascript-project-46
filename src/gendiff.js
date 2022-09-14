import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import _ from 'lodash';

export default (fileName1, fileName2) => {
  const path1 = path.resolve(process.cwd(), fileName1);
  const path2 = path.resolve(process.cwd(), fileName2);
  let file1; let
    file2;
  if (path.extname(path1) === 'json') {
    file1 = JSON.parse(fs.readFileSync(path1));
    file2 = JSON.parse(fs.readFileSync(path2));
  } else {
    file1 = yaml.load(fs.readFileSync(path1));
    file2 = yaml.load(fs.readFileSync(path2));
  }

  const result = [];

  const keys1 = _.sortBy(Object.keys(file1));

  for (let i = 0; i < keys1.length; i += 1) {
    const key1 = keys1[i];
    if (!file2[key1]) {
      result.push(`- ${key1}: ${file1[key1]}`);
    } else if (file1[key1] === file2[key1]) {
      result.push(`${key1}: ${file1[key1]}`);
    } else {
      result.push(`- ${key1}: ${file1[key1]}`);
      result.push(`+ ${key1}: ${file2[key1]}`);
    }
  }

  const keys2 = _.sortBy(Object.keys(file2));

  for (let i = 0; i < keys2.length; i += 1) {
    const key2 = keys2[i];
    if (!file1[key2]) {
      result.push(`+ ${key2}: ${file2[key2]}`);
    }
  }

  return `{\n  ${result.join('\n  ')}\n}`;
};
