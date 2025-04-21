import { MiGPT } from '@mi-gpt/next';

async function main() {
  await MiGPT.start({
    speaker: {
      userId: '123456',
      password: 'xxxxxxxx',
      did: 'Xiaomi 智能音箱 Pro',
    },
    openai: {
      model: 'gpt-4o-mini',
      baseURL: 'https://api.openai.com/v1',
      apiKey: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    },
    prompt: {
      system: '你是一个智能助手，请根据用户的问题给出回答。',
    },
    callAIKeywords: ['请', '你'],
    async onMessage(_engine, { text }) {
      if (text.startsWith('你好')) {
        return { text: '你好，很高兴认识你！' };
      }
    },
  });
  process.exit(0);
}

main();
