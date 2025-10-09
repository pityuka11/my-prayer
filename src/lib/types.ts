export type D1Database = {
    prepare: (sql: string) => {
      bind: (...args: unknown[]) => {
        run: () => Promise<{ success: boolean }>
        all: () => Promise<{ results: unknown[] }>
      }
      all: () => Promise<{ results: unknown[] }>
    }
  }
  
  // Global object type for local dev fallback
  export interface GlobalWithD1 extends NodeJS.Global {
    DB?: D1Database
  }
  