# MiGPT-Next

`MiGPT-Next` 是基于 [MiGPT](https://github.com/idootop/mi-gpt) 的升级版本，支持**​ 自定义消息回复 ​**。

让人人都可以轻松定制自己的小爱音箱回复，让小爱音箱「听你的」。

## Docker 运行

[![Docker Image Version](https://img.shields.io/docker/v/idootop/migpt-next?color=%23086DCD&label=docker%20image)](https://hub.docker.com/r/idootop/migpt-next)

首先，克隆仓库代码到本地。

```shell
# 克隆代码
git clone https://github.com/idootop/migpt-next.git

# 进入配置文件所在目录
cd migpt-next/apps/example
```

然后把 `config.js` 文件里的配置修改成你自己的。

```js
export default {
  speaker: {
    userId: "123456",
    password: "xxxxxxxx",
    did: "Xiaomi 智能音箱 Pro",
  },
  openai: {
    model: "gpt-4.1-mini",
    baseURL: "https://api.openai.com/v1",
    apiKey: "sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  },
  prompt: {
    system: "你是一个智能助手，请根据用户的问题给出回答。",
  },
  async onMessage(engine, { text }) {
    if (text === "测试") {
      return { text: "你好，很高兴认识你！" };
    }
  },
};
```

修改好 `config.js` 配置文件之后，Docker 一键运行。

```shell
docker run -it --rm -v $(pwd)/config.js:/app/config.js idootop/migpt-next:latest
```

## Node.js 运行

[![npm version](https://badge.fury.io/js/@mi-gpt%2Fnext.svg)](https://www.npmjs.com/package/@mi-gpt/next)

首先，在你的项目里安装 `@mi-gpt/next` 依赖

```shell
pnpm install @mi-gpt/next
```

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
    async onMessage(engine, { text }) {
      if (text === "测试") {
        return { text: "你好，很高兴认识你！" };
      }
    },
  });
  process.exit(0);
}

main();
```

## 相关说明

`MiGPT-Next` 的实现方式和 `MiGPT` 相同，都是走 API 请求：

- 响应延迟较大，难以打断小爱原有回复
- TTS 偶发失效，设备状态获取失败可能导致回复中断

基于上述原因，在新版 `MiGPT-Next` 中移除了对**连续对话**/流式响应功能的支持。

> [!TIP]
> 如果你想要实现近乎完美的体验，可以选择将小爱音箱刷机。相关教程请移步 👉 [Open-XiaoAI](https://github.com/idootop/open-xiaoai)

## 免责声明

1. **适用范围**
   本项目为开源非营利项目，仅供学术研究或个人测试用途。严禁用于商业服务、网络攻击、数据窃取、系统破坏等违反《网络安全法》及使用者所在地司法管辖区的法律规定的场景。
2. **非官方声明**
   本项目由第三方开发者独立开发，与小米集团及其关联方（下称"权利方"）无任何隶属/合作关系，亦未获其官方授权/认可或技术支持。项目中涉及的商标、固件、云服务的所有权利归属小米集团。若权利方主张权益，使用者应立即主动停止使用并删除本项目。

继续下载或运行本项目，即表示您已完整阅读并同意[用户协议](agreement.md)，否则请立即终止使用并彻底删除本项目。

## License

[MIT](LICENSE) License © 2024-PRESENT Del Wang
