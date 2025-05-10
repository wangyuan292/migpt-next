import { MiGPT } from '@mi-gpt/next';
import config from './config.js';

async function main() {
  await MiGPT.start(config);
  process.exit(0);
}

main();
