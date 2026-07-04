// app/api/auth/validate/route.js
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function GET(request) {
  try {
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json(
        { message: 'No token found' },
        { status: 401 }
      );
    }

    const jwtSecret = process.env.USER_JWT_SECRET;
    if (!jwtSecret) {
      console.error('USER_JWT_SECRET is not configured');
      return NextResponse.json(
        { message: 'Server configuration error' },
        { status: 500 }
      );
    }

    const secret = new TextEncoder().encode(jwtSecret);

    try {
      const { payload } = await jwtVerify(token, secret);

      return NextResponse.json({
        authenticated: true,
        userId: payload.userId,
        email: payload.email,
        phone: payload.phone,
        fullName: payload.fullName,
        subscriptionEnd: payload.subscriptionEnd,
        loginTime: payload.loginTime,
        panCardNumber: payload.panCardNumber,
        kycVerifiedOn: payload.kycVerifiedOn
      });

    } catch (jwtError) {
      console.error('JWT verification failed:', jwtError);
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }

  } catch (error) {
    console.error('Token validation error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
