import type { ExecutionContext } from "@cloudflare/workers-types";
import { sendMessage, markAsRead, loadStart } from "./eventRoutes";

export default async function messageRouter(
  event: any,
  channelAccessToken: string,
  ctx: ExecutionContext,
) {
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
