import type { ExecutionContext } from "@cloudflare/workers-types";
import { sendMessage, markAsRead, loadStart } from "./utils/eventRoutes";
import messageRouter from "./messageRouter";
import { captchaFlexContents } from "./utils/captcha/flexContents";
import { CaptchaOptions9 } from "./utils/captcha/type";
import { captchaOptions } from "./utils/captcha/options";

export async function eventRouter(
  event: any,
  channelAccessToken: string,
  ctx: ExecutionContext,
) {
  // 在日誌輸出事件類型和內容
  let eventType: string = event.type;
  try {
    if (["message"].includes(event.type)) {
      eventType = `${event.type}(${event.message?.type})`;
    }
  } catch (e) {
    console.error("Failed to determine message event type", { error: e });
  }

  console.log(`Received event - ${eventType}`, { event });

  switch (event.type) {
    case "message":
      // 已讀
      ctx.waitUntil(
        markAsRead(channelAccessToken, event.message.markAsReadToken),
      );
      // 載入動畫
      await Promise.race([
        loadStart(channelAccessToken, event.source.userId, 5),
        new Promise((resolve) => setTimeout(resolve, 50)),
      ]);
      await messageRouter(event, channelAccessToken, ctx);
      break;
    case "postback":
      const postbackData = event.postback.data.split("_");
      switch (postbackData[0]) {
        case "CAPTCHA":
          const status = postbackData[2];
          const uuid = postbackData[3];
          const Options: CaptchaOptions9 = [
            captchaOptions[1],
            captchaOptions[0],
            captchaOptions[1],
            captchaOptions[0],
            captchaOptions[1],
            captchaOptions[0],
            captchaOptions[1],
            captchaOptions[0],
            captchaOptions[1],
          ];
          const contents = captchaFlexContents(Options, { status, uuid });
          console.log("Generated CAPTCHA contents", { contents });
          await sendMessage(channelAccessToken, event.replyToken, [
            {
              type: "text",
              text: `!CAPTCHA 回傳資料: ${JSON.stringify(postbackData.slice(1, 4).join("_"))}`,
            },
            {
              type: "flex",
              altText: "請找出全部包含 小福 的圖片",
              contents: contents,
            },
          ]);
          break;
      }
      break;

    case "follow":
      await sendMessage(channelAccessToken, event.replyToken, [
        {
          type: "text",
          text: `!歡迎訊息`,
        },
      ]);
      break;
    case "unfollow":
      break;
    default:
      console.warn(`Unhandled event type: ${event.type}`);
  }
}
