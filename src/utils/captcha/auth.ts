import { env } from "cloudflare:workers";
import { v4 as uuidv4 } from "uuid";

export async function generateCaptchaAuthor() {
  let uuid = uuidv4();
  await env.KV.put(uuid, JSON.stringify({}));
  return uuid;
}

export async function verifyCaptchaAuthor() {}
