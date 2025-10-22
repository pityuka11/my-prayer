
export const runtime = 'nodejs'

export const GET = async () => {
  try {
    console.log('🔍 Debug: Checking environment...')
    
    const debugInfo = {
      // Check what's available on globalThis
      globalThisKeys: Object.keys(globalThis).slice(0, 50),
      globalThisDB: (globalThis as { DB?: unknown }).DB ? 'Found' : 'Not found',
      
      // Check Cloudflare Workers env
      cfEnv: (globalThis as Record<string, unknown>).env ? 'Found' : 'Not found',
      cfEnvKeys: (globalThis as Record<string, unknown>).env ? 
        Object.keys((globalThis as Record<string, unknown>).env as Record<string, unknown>).slice(0, 20) : 
        'No env object',
      
      // Check process
      hasProcess: typeof process !== 'undefined',
      processEnvKeys: typeof process !== 'undefined' ? 
        Object.keys(process.env).filter(key => key.includes('DB') || key.includes('d1')).slice(0, 10) : 
        'No process',
      
      // Check window
      hasWindow: typeof window !== 'undefined',
      
      // Runtime info
      nodeEnv: typeof process !== 'undefined' ? process.env.NODE_ENV : 'not available',
      runtime: typeof process !== 'undefined' ? process.env.RUNTIME : 'not available',
    }
    
    console.log('🔍 Debug info:', debugInfo)
    
    return new Response(JSON.stringify(debugInfo), { 
      status: 200,
      headers: { 'content-type': 'application/json' }
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('🔍 Debug error:', message)
    return new Response(JSON.stringify({ error: message }), { status: 500 })
  }
}
