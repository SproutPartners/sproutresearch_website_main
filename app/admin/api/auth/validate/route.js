// app/api/auth/validate/route.js
import { NextResponse } from 'next/server';
import { validateSession, extendSession } from '@/lib/adminauth';

export async function POST(request) {
  try {
    const { sessionToken } = await request.json();

    if (!sessionToken) {
      return NextResponse.json(
        { valid: false, error: 'No session token provided' },
        { status: 400 }
      );
    }

    const validation = validateSession(sessionToken);

    if (validation.valid) {
      // Extend session if valid
      extendSession(sessionToken);
      return NextResponse.json({
        valid: true,
        session: {
          username: validation.session.username,
          expiresAt: validation.session.expiresAt
        }
      });
    } else {
      return NextResponse.json({
        valid: false,
        error: validation.error
      }, { status: 401 });
    }
  } catch (error) {
    console.error('Validation API error:', error);
    return NextResponse.json(
      { valid: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}