import type { ExecutionContext } from "@cloudflare/workers-types";
import { sendMessage, markAsRead, loadStart } from "./utils/eventRoutes";

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
          await sendMessage(channelAccessToken, event.replyToken, [
            {
              type: "flex",
              altText: "CAPTCHA Challenge",
              contents: {
                type: "bubble",
                header: {
                  type: "box",
                  layout: "vertical",
                  contents: [
                    {
                      type: "text",
                      text: "請找出全部包含",
                      size: "sm",
                      color: "#ffffff",
                      gravity: "center",
                    },
                    {
                      type: "text",
                      text: "小福",
                      size: "3xl",
                      color: "#ffffff",
                      gravity: "center",
                      weight: "bold",
                    },
                    {
                      type: "text",
                      text: "的圖片",
                      size: "sm",
                      color: "#ffffff",
                      gravity: "center",
                    },
                  ],
                  spacing: "none",
                  margin: "none",
                },
                body: {
                  type: "box",
                  layout: "vertical",
                  contents: [
                    {
                      type: "box",
                      layout: "horizontal",
                      contents: [
                        {
                          type: "image",
                          url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
                          aspectRatio: "1:1",
                          aspectMode: "cover",
                          size: "full",
                          backgroundColor: "#eaffea",
                          action: {
                            type: "postback",
                            label: "action",
                            data: "1",
                          },
                        },
                        {
                          type: "image",
                          url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
                          aspectRatio: "1:1",
                          size: "full",
                          aspectMode: "cover",
                        },
                        {
                          type: "image",
                          url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
                          aspectRatio: "1:1",
                          aspectMode: "cover",
                          size: "full",
                        },
                      ],
                      margin: "lg",
                      spacing: "lg",
                    },
                    {
                      type: "box",
                      layout: "horizontal",
                      contents: [
                        {
                          type: "image",
                          url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
                          aspectRatio: "1:1",
                          aspectMode: "cover",
                          size: "full",
                        },
                        {
                          type: "image",
                          url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
                          aspectRatio: "1:1",
                          size: "full",
                          aspectMode: "cover",
                        },
                        {
                          type: "image",
                          url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
                          aspectRatio: "1:1",
                          aspectMode: "cover",
                          size: "full",
                        },
                      ],
                      margin: "lg",
                      spacing: "lg",
                    },
                    {
                      type: "box",
                      layout: "horizontal",
                      contents: [
                        {
                          type: "image",
                          url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
                          aspectRatio: "1:1",
                          aspectMode: "cover",
                          size: "full",
                        },
                        {
                          type: "image",
                          url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
                          aspectRatio: "1:1",
                          size: "full",
                          aspectMode: "cover",
                        },
                        {
                          type: "image",
                          url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
                          aspectRatio: "1:1",
                          aspectMode: "cover",
                          size: "full",
                        },
                      ],
                      margin: "lg",
                      spacing: "lg",
                    },
                  ],
                },
                styles: {
                  header: {
                    backgroundColor: "#70abff",
                  },
                  hero: {
                    backgroundColor: "#70abff",
                  },
                },
              },
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
