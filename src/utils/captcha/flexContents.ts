import { CaptchaOptions9, captchaOption } from "./type";

export function captchaFlexContentOption(
  options: captchaOption,
  num: number,
  status: "0" | "1" = "0",
  allStatus: string = "000000000",
) {
  const current = allStatus[num];
  const flipped = String(1 - Number(allStatus[num]));
  allStatus = allStatus.slice(0, num) + flipped + allStatus.slice(num + 1);

  return {
    type: "box",
    layout: "horizontal",
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
          data: `CAPTCHA_${num}_${allStatus}_UUID`,
          displayText: "A",
        },
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
          captchaFlexContentOption(
            options[0],
            0,
            status[0] as "0" | "1",
            status,
          ),
          captchaFlexContentOption(
            options[1],
            1,
            status[1] as "0" | "1",
            status,
          ),
          captchaFlexContentOption(
            options[2],
            2,
            status[2] as "0" | "1",
            status,
          ),
        ]),
        bodyHelper([
          captchaFlexContentOption(
            options[3],
            3,
            status[3] as "0" | "1",
            status,
          ),
          captchaFlexContentOption(
            options[4],
            4,
            status[4] as "0" | "1",
            status,
          ),
          captchaFlexContentOption(
            options[5],
            5,
            status[5] as "0" | "1",
            status,
          ),
        ]),
        bodyHelper([
          captchaFlexContentOption(
            options[6],
            6,
            status[6] as "0" | "1",
            status,
          ),
          captchaFlexContentOption(
            options[7],
            7,
            status[7] as "0" | "1",
            status,
          ),
          captchaFlexContentOption(
            options[8],
            8,
            status[8] as "0" | "1",
            status,
          ),
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
