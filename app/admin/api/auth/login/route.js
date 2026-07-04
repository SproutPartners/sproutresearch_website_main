// app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import { authenticateUser } from '@/lib/adminauth';

export async function POST(request) {
  try {
    const { username, password, clientId } = await request.json();

    if (!username || !password || !clientId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = authenticateUser(username, password, clientId);

    if (result.success) {
      return NextResponse.json({
        success: true,
        sessionToken: result.sessionToken,
        expiresAt: result.expiresAt
      });
    } else {
      return NextResponse.json({
        success: false,
        error: result.error,
        lockoutRemaining: result.lockoutRemaining
      }, { status: 401 });
    }
  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}