export {};

declare global {
  namespace Cloudflare {
    interface Env {
      KV: KVNamespace;
      LINE_CHANNEL_SECRET: {
        get(): Promise<string>;
      };
      LINE_CHANNEL_ACCESS_TOKEN: {
        get(): Promise<string>;
      };
    }
  }
}
