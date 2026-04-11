# FooBot

Language: [English](README.md) | 繁體中文

> 本文件與 `README.md` 對齊維護。

## 指令

- `npm run dev`：在執行 `wrangler dev` 前，會先透過 `wrangler types` 自動同步 `worker-configuration.d.ts`。
- `npm run deploy`：在部署前，會先透過 `wrangler types` 自動同步 `worker-configuration.d.ts`。
- `npm run format`：使用 Prettier 格式化檔案。
- `npm run format:check`：檢查檔案是否符合 Prettier 格式。
- `npm run typecheck`：執行 TypeScript 型別檢查。
- `npm run types:check`：重新產生 worker 型別，若 `worker-configuration.d.ts` 不是最新狀態則失敗。
