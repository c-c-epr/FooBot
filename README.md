# FooBot

## Scripts

- `npm run dev`: auto syncs `worker-configuration.d.ts` via `wrangler types` before `wrangler dev`.
- `npm run deploy`: auto syncs `worker-configuration.d.ts` via `wrangler types` before deploy.
- `npm run format`: formats files with Prettier.
- `npm run format:check`: verifies files are Prettier-formatted.
- `npm run typecheck`: runs TypeScript type checking.
- `npm run types:check`: regenerates worker types and fails if `worker-configuration.d.ts` is out of date.
