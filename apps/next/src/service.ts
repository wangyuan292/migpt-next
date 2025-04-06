import { jsonEncode } from '@mi-gpt/utils/parse';
import { type MiIOT, type MiNA, getMiIOT, getMiNA } from 'mi-service-lite';
import { assert } from './utils.js';

export interface MiServiceConfig {
  /**
   * 小米 ID（一串数字）
   *
   * 注意：不是手机号或邮箱，请在小米账号「个人信息」-「小米 ID」查看
   */
  userId: string;
  /**
   * 小米账号密码
   */
  password: string;
  /**
   * 小爱音箱在米家中设置的名称
   *
   * 如果提示找不到设备，请打开 debug 选项获取设备真实 did
   */
  did?: string;
  /**
   * 网络请求超时时长（单位毫秒）
   *
   * 默认 5 秒
   */
  timeout?: number;
}

class _MiService {
  MiNA?: MiNA;
  MiOT?: MiIOT;

  async init(config: { debug: boolean; speaker: MiServiceConfig }) {
    const { debug = false, speaker } = config;

    assert(!!speaker.userId && !!speaker.password && !!speaker.did, '❌ Speaker 缺少必要参数');

    (speaker as any).enableTrace = debug;
    speaker.timeout = Math.max(1000, speaker.timeout ?? 5000);

    this.MiNA = await getMiNA(speaker);
    this.MiOT = await getMiIOT(speaker);

    assert(
      !!this.MiNA && !!this.MiOT,
      '❌ 初始化 Mi Services 失败\n💡 提示：打开 debug 选项可获取设备真实 did',
    );

    if (debug) {
      const device: any = this.MiOT!.account?.device;
      console.debug(
        '🐛 设备信息：',
        jsonEncode(
          {
            name: device?.name,
            desc: device?.desc,
            model: device?.model,
            rom: device?.extra?.fw_version,
          },
          { prettier: true },
        ),
      );
    }
  }
}

export const MiService = new _MiService();
