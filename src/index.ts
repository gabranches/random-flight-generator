#!/usr/bin/env node
import readline from 'readline';
import { Reader } from './Reader';

const prompt = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const run = () => {
  prompt.question('Ready.\n', async (cmd: string) => {
    if (cmd === 'quit') {
      prompt.close();
    }
    const response = await Reader.read(cmd);
    console.log('\n')
    response.forEach((line): void => {
      console.log(line);
    });
    console.log('\n')
    run();
  });
};

prompt.on('close', function () {
  console.log('\nBYE BYE !!!');
  process.exit(0);
});

run();
