# MiGPT-Next

让小爱音箱「听你的」，解锁无限可能。

## 快速开始

### 1. 安装依赖

```shell
pnpm install @mi-gpt/next
```

### 2. 运行

完整的使用教程和参数配置 👉 请到[此处查看](apps/next/README.md)。

```typescript
import { MiGPT } from "@mi-gpt/next";

async function main() {
  await MiGPT.start({
    speaker: {
      userId: "123456",
      password: "xxxxxxxx",
      did: "Xiaomi 智能音箱 Pro",
    },
    openai: {
      model: "gpt-4o-mini",
      baseURL: "https://api.openai.com/v1",
      apiKey: "sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    },
    prompt: {
      system: "你是一个智能助手，请根据用户的问题给出回答。",
    },
    async onMessage(_engine, { text }) {
      if (text.startsWith("你好")) {
        return { text: "你好，很高兴认识你！" };
      }
    },
  });
  process.exit(0);
}

main();
```

## 相关说明

本项目 `MiGPT-Next` 是基于 [MiGPT](https://github.com/idootop/mi-gpt) 的升级版本，支持**​自定义消息回复​**，方便第三方开发者自定义消息处理逻辑，比如接入互联网搜索、天气查询、Webhook 等。

⚠️ 注意：`MiGPT-Next` 仍存在与 `MiGPT` 相同的问题：

- 响应延迟较大，难以打断小爱原有回复
- TTS 偶发失效，设备状态获取失败可能导致回复中断

如果你想要实现近乎完美的体验，则需要将小爱音箱刷机。相关教程请移步 👉 [Open-XiaoAI](https://github.com/idootop/open-xiaoai)

## 免责声明

1. **适用范围**
   本项目为非盈利开源项目，仅限于技术原理研究、安全漏洞验证及非营利性个人使用。严禁用于商业服务、网络攻击、数据窃取、系统破坏等违反《网络安全法》及使用者所在地司法管辖区的法律规定的场景。
2. **非官方声明**
   本项目由第三方开发者独立开发，与小米集团及其关联方（下称"权利方"）无任何隶属/合作关系，未获其官方授权/认可或技术支持。项目中涉及的商标、固件、云服务的所有权利归属小米集团。若权利方主张权益，使用者应立即主动停止使用并删除本项目。

继续下载或运行本项目，即表示您已完整阅读并同意[用户协议](agreement.md)，否则请立即终止使用并彻底删除本项目。

## License

[MIT](LICENSE) License © 2024-PRESENT Del Wang
