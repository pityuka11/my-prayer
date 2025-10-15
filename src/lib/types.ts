// src/lib/types.ts
export type D1Database = {
    prepare: (sql: string) => {
      bind: (...args: unknown[]) => {
        run: () => Promise<{ success: boolean }>
        all: () => Promise<{ results: unknown[] }>
      }
      all: () => Promise<{ results: unknown[] }>
    }
  }
  
  export interface Env {
    DB: D1Database
  }
  
  // ✅ use var, not const
  declare global {
    // this makes TS recognize globalThis.DB
    var DB: D1Database | undefined
  }
  
  export {}