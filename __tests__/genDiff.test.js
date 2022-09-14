import gendiff from '../src/gendiff.js';

const res = '{\n  - follow: false\n  host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}';
test('gendiff JSON', () => {
  expect(gendiff('__fixtures__/files/file1.json', '__fixtures__/files/file2.json')).toEqual(res);
});

test('gendiff YAML', () => {
  expect(gendiff('__fixtures__/files/file1.yml', '__fixtures__/files/file2.yml')).toEqual(res);
});
