// app/api/user/verifyotp/route.js
import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';

export async function POST(request) {
  try {
    const { phone, otp } = await request.json();

    if (!phone || !otp) {
      return NextResponse.json(
        { message: 'Phone number and OTP are required' },
        { status: 400 }
      );
    }

    // Verify OTP with MSG91
    const verifyResponse = await fetch('https://control.msg91.com/api/v5/otp/verify', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authkey': process.env.MSG91_AUTH_KEY
      },
      body: JSON.stringify({
        authkey: process.env.MSG91_AUTH_KEY,
        mobile: phone,
        otp: otp
      })
    });

    const verifyData = await verifyResponse.json();

    if (verifyData.type === 'success') {
      // Create JWT token for session management
      const secret = new TextEncoder().encode(process.env.USER_JWT_SECRET || 'your-user-secret-key');
      
      const token = await new SignJWT({ phone, loginTime: Date.now() })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(secret);

      // Set HTTP-only cookie
      const response = NextResponse.json({ 
        message: 'Login successful',
        success: true 
      });

      response.cookies.set('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 // 24 hours
      });

      return response;

    } else {
      return NextResponse.json(
        { message: 'Invalid OTP. Please try again.' },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('OTP Verification Error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}