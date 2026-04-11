import { CaptchaOptions9, captchaOption } from "./type";

type CaptchaFlexState = {
  uuid?: string;
  status?: string;
};

export function captchaFlexContentOption(
  options: captchaOption,
  num: number,
  state: CaptchaFlexState = {},
) {
  const uuid = state.uuid ?? "";
  const allStatus = state.status ?? "000000000";
  const current = allStatus[num];
  const flipped = String(1 - Number(allStatus[num]));
  const nextStatus =
    allStatus.slice(0, num) + flipped + allStatus.slice(num + 1);

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
              data: `CAPTCHA_${num}_${nextStatus}_${uuid}`,
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
  state: CaptchaFlexState = {},
) {
  const captchaState: CaptchaFlexState = {
    status: state.status ?? "000000000",
    uuid: state.uuid ?? "",
  };

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
      contents: [0, 3, 6].map((startIndex) =>
        bodyHelper(
          options
            .slice(startIndex, startIndex + 3)
            .map((option, offset) =>
              captchaFlexContentOption(
                option,
                startIndex + offset,
                captchaState,
              ),
            ),
        ),
      ),
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
