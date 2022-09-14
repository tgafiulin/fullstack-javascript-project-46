import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import parser from './parser.js';

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

  return parser(file1, file2);
};
