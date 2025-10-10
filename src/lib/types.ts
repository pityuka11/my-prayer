export type D1Database = {
    prepare: (sql: string) => {
      bind: (...args: unknown[]) => {
        run: () => Promise<{ success: boolean }>
        all: () => Promise<{ results: unknown[] }>
      }
      all: () => Promise<{ results: unknown[] }>
    }
  }
  
  declare global {
    var DB: D1Database | undefined
  }
  
  export {}
  