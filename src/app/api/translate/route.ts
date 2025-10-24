import { NextRequest, NextResponse } from 'next/server';

// Google Translate API endpoint (free tier)
const GOOGLE_TRANSLATE_URL = 'https://translate.googleapis.com/translate_a/single';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as {
      text: string;
      targetLanguage: string;
      sourceLanguage?: string;
    };
    
    const { text, targetLanguage, sourceLanguage = 'auto' } = body;

    if (!text || !targetLanguage) {
      return NextResponse.json(
        { error: 'Text and target language are required' },
        { status: 400 }
      );
    }

    // Google Translate API parameters
    const params = new URLSearchParams({
      client: 'gtx',
      sl: sourceLanguage,
      tl: targetLanguage,
      dt: 't',
      q: text,
    });

    const response = await fetch(`${GOOGLE_TRANSLATE_URL}?${params}`, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`Translation API error: ${response.status}`);
    }

    const data = await response.json() as unknown[];
    
    // Extract translated text from Google's response format
    let translatedText = '';
    if (data && data[0] && Array.isArray(data[0])) {
      translatedText = data[0]
        .map((item: [string, string, string, number]) => item[0])
        .filter(Boolean)
        .join('');
    }

    if (!translatedText) {
      throw new Error('No translation returned');
    }

    return NextResponse.json({
      translatedText,
      sourceLanguage: data[2] || sourceLanguage,
      targetLanguage,
    });

  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { error: 'Translation failed' },
      { status: 500 }
    );
  }
}
