import { CaptchaOptions9, captchaOption } from "./type";

export function captchaFlexContentOption(
  options: captchaOption,
  num: number = 0,
) {
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
      data: `CAPTCHA_${num}`,
      displayText: "A",
    },
  };
}

function headerHelper(str: string, bold: boolean = false, size: string = "sm") {
  return {
    type: "text",
    text: str,
    size: size,
    color: "#ffffff",
    gravity: "center",
    weight: bold ? "bold" : "regular",
  };
}

function bodyHelper(contents: any) {
  return {
    type: "box",
    layout: "horizontal",
    contents: contents,
    margin: "lg",
    spacing: "lg",
  };
}

export function captchaFlexContents(
  options: CaptchaOptions9,
  status = "000000000",
) {
  return {
    type: "bubble",
    header: {
      type: "box",
      layout: "vertical",
      contents: [
        headerHelper("請找出全部包含"),
        headerHelper("小福", true, "3xl"),
        headerHelper("的圖片"),
      ],
      spacing: "none",
      margin: "none",
    },
    body: {
      type: "box",
      layout: "vertical",
      contents: [
        bodyHelper([
          captchaFlexContentOption(options[0], 0),
          captchaFlexContentOption(options[1], 1),
          captchaFlexContentOption(options[2], 2),
        ]),
        bodyHelper([
          captchaFlexContentOption(options[3], 3),
          captchaFlexContentOption(options[4], 4),
          captchaFlexContentOption(options[5], 5),
        ]),
        bodyHelper([
          captchaFlexContentOption(options[6], 6),
          captchaFlexContentOption(options[7], 7),
          captchaFlexContentOption(options[8], 8),
        ]),
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
