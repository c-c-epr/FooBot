import { CaptchaOptions9, captchaOption } from "./type";
import { captchaOptions } from "./options";

export function captchaFlexContentOption(options: captchaOption) {
  return {
    type: "image",
    url: options.imageUrl,
    aspectRatio: "1:1",
    aspectMode: "cover",
    size: "full",
    backgroundColor: "#eaffea",
    action: {
      type: "postback",
      label: "action",
      data: "CAPTCHA_",
      displayText: "A",
    },
  };
}

export function captchaFlexContents(options: CaptchaOptions9) {
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
            captchaFlexContentOption(options[0]),
            captchaFlexContentOption(options[1]),
            captchaFlexContentOption(options[2]),
          ],
          margin: "lg",
          spacing: "lg",
        },
        {
          type: "box",
          layout: "horizontal",
          contents: [
            captchaFlexContentOption(options[3]),
            captchaFlexContentOption(options[4]),
            captchaFlexContentOption(options[5]),
          ],
          margin: "lg",
          spacing: "lg",
        },
        {
          type: "box",
          layout: "horizontal",
          contents: [
            captchaFlexContentOption(options[6]),
            captchaFlexContentOption(options[7]),
            captchaFlexContentOption(options[8]),
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
