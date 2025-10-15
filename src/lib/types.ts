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
  
/* eslint-disable no-var */
declare global {
    var DB: D1Database | undefined
  }
  /* eslint-enable no-var */
  
  
  export {}