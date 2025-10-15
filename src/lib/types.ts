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
  
  declare global {
    const DB: D1Database | undefined
  }
  
  export {}
  