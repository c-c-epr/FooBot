import type { ExecutionContext } from "@cloudflare/workers-types";
import { sendMessage, markAsRead, loadStart } from "./utils/eventRoutes";
import messageRouter from "./messageRouter";

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
      switch (event.postback.data.split("_")[0]) {
        case "CAPTCHA":
          await sendMessage(channelAccessToken, event.replyToken, [
            {
              type: "text",
              text: `!CAPTCHA 回傳資料: ${JSON.stringify(event.postback.data.split("_")[1])}`,
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
