import * as schema from "./schema";

export function getDb(): any {
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


