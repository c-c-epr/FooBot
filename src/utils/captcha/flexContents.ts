import { CaptchaOptions9, captchaOption } from "./type";

export function captchaFlexContentOption(
  options: captchaOption,
  num: number,
  uuid: string = "",
  allStatus: string = "000000000",
  count: number = 0,
) {
  const current = allStatus[num];
  const flipped = String(1 - Number(allStatus[num]));
  allStatus = allStatus.slice(0, num) + flipped + allStatus.slice(num + 1);

  return {
    type: "box",
    layout: "horizontal",
    contents: [
      {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "image",
            url: options.imageUrl,
            aspectRatio: "1:1",
            aspectMode: "cover",
            size: "full",
            backgroundColor: "#eaffea",
            action: {
              type: "postback",
              label: "action",
              data: `CAPTCHA_${num}_${allStatus}_${uuid}`,
              displayText: "A",
            },
          },
        ],
        cornerRadius: current === "0" ? "none" : "xl",
      },
    ],
    cornerRadius: current === "0" ? "none" : "xxl",
    borderWidth: current === "0" ? "none" : "semi-bold",
    backgroundColor: current === "0" ? "#ffffff" : "#15b000",
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
  uuid = "",
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
          captchaFlexContentOption(options[0], 0, uuid, status),
          captchaFlexContentOption(options[1], 1, uuid, status),
          captchaFlexContentOption(options[2], 2, uuid, status),
        ]),
        bodyHelper([
          captchaFlexContentOption(options[3], 3, uuid, status),
          captchaFlexContentOption(options[4], 4, uuid, status),
          captchaFlexContentOption(options[5], 5, uuid, status),
        ]),
        bodyHelper([
          captchaFlexContentOption(options[6], 6, uuid, status),
          captchaFlexContentOption(options[7], 7, uuid, status),
          captchaFlexContentOption(options[8], 8, uuid, status),
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
