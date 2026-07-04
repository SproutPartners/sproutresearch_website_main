// app/api/auth/logout/route.js
import { NextResponse } from 'next/server';
import { logout } from '@/lib/adminauth';

export async function POST(request) {
  try {
    const { sessionToken } = await request.json();

    if (!sessionToken) {
      return NextResponse.json({ success: true }); // Already logged out
    }

    const result = logout(sessionToken);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Logout API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}