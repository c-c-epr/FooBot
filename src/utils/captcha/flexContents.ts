import { CaptchaOptions9 } from "./type";

export default function captchaFlexContents(options: CaptchaOptions9) {
  return {
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
                displayText: "A",
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
  };
}
