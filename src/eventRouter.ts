import type { ExecutionContext } from "@cloudflare/workers-types";
import { sendMessage, markAsRead, loadStart } from "./eventRoutes";

export async function eventRouter(
  event: any,
  channelAccessToken: string,
  ctx: ExecutionContext,
) {
  ctx.waitUntil(markAsRead(channelAccessToken, event.message.markAsReadToken));

  await Promise.race([
    loadStart(channelAccessToken, event.source.userId, 5),
    new Promise((resolve) => setTimeout(resolve, 50)), // 最多等 50ms
  ]);

  if (event.message.type === "text" && event.message.text === "🎲") {
    await sendMessage(channelAccessToken, event.replyToken, [
      {
        type: "image",
        originalContentUrl:
          "https://s3.ccepr.dev/foo/2025-08-19%2021-35-17%20(2).jpg",
        previewImageUrl:
          "https://s3.ccepr.dev/foo/2025-08-19%2021-35-17%20(2).jpg",
      },
    ]);
  } else {
    await sendMessage(channelAccessToken, event.replyToken, [
      {
        type: "text",
        text: "Meow!",
      },
      {
        type: "text",
        text: `Event type: ${event.message.type}`,
      },
      {
        type: "image",
        originalContentUrl: "https://s3.ccepr.dev/foo/IMG_2457.jpg",
        previewImageUrl: "https://s3.ccepr.dev/foo/IMG_2457.jpg",
      },
    ]);
  }
}
