import fs from 'fs';
import path from 'path';
import _ from 'lodash';

export default (path1, path2) => {
  const file1 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), path1)));
  const file2 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), path2)));

  const result = [];

  const keys1 = _.sortBy(Object.keys(file1));
  console.log(keys1);

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
