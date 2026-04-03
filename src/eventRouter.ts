import type { ExecutionContext } from "@cloudflare/workers-types";
import { sendMessage, markAsRead, loadStart } from "./eventRoutes";

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

  if (event.message.type === "text" && event.message.text === "🎲") {
    const imageList = [
      "https://s3.ccepr.dev/foo/2025-08-19%2021-35-17%20(2).jpg",
      "https://s3.ccepr.dev/foo/IMG_2457.jpg",
    ];

    const diceRoll = Math.floor(Math.random() * imageList.length);

    const selectedImage = imageList[diceRoll];

    await sendMessage(channelAccessToken, event.replyToken, [
      {
        type: "image",
        originalContentUrl: selectedImage,
        previewImageUrl: selectedImage,
      },
    ]);
  } else if (event.message.type === "text" && event.message.text === "meow") {
    await sendMessage(channelAccessToken, event.replyToken, [
      {
        type: "text",
        text: "Meow!",
      },
    ]);
  } else {
    await sendMessage(channelAccessToken, event.replyToken, [
      {
        type: "text",
        text: `Event type: ${event.message.type}`,
      },
    ]);
  }
}
