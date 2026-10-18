import * as schema from "./schema";

export function getDb(): any {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { env } = require("cloudflare:workers");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { drizzle } = require("drizzle-orm/d1");
    if (env?.DB) {
      return drizzle(env.DB, { schema });
    }
  } catch {
    // Non-Cloudflare environment fallback (e.g. Vercel / local preview)
  }

  return {
    select: () => ({
      from: () => ({
        where: async () => [{ total: 0 }],
      }),
    }),
    insert: () => ({
      values: async () => {},
    }),
  };
}

