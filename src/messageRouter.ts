import type { ExecutionContext } from "@cloudflare/workers-types";
import { sendMessage, markAsRead, loadStart } from "./utils/eventRoutes";
import { captchaFlexContents } from "./utils/captcha/flexContents";
import { CaptchaOptions9 } from "./utils/captcha/type";
import { captchaOptions } from "./utils/captcha/options";
import { generateCaptchaAuthor } from "./utils/captcha/Auth";

export default async function messageRouter(
  event: any,
  channelAccessToken: string,
  ctx: ExecutionContext,
) {
  switch (event.message.type) {
    case "text":
      switch (event.message.text) {
        case "meow":
          await sendMessage(channelAccessToken, event.replyToken, [
            {
              type: "text",
              text: "Meow!",
            },
          ]);
          break;
        case "🎲":
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
          break;
        case "CAPTCHA":
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
          const uuid = await generateCaptchaAuthor();
          await sendMessage(channelAccessToken, event.replyToken, [
            {
              type: "flex",
              altText: "請找出全部包含 小福 的圖片",
              contents: captchaFlexContents(Options, "000000000", uuid),
            },
          ]);
          break;
        default:
          console.warn(`Unhandled message text: ${event.message.text}`);
      }
      break;
    default:
      console.warn(`Unhandled message type: ${event.message.type}`);
  }
}
