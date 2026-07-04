// app/api/user/logincheck/route.js
import { NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebaseAdmin';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebaseClient';
import { SignJWT } from 'jose';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Check if JWT secret is configured
    const jwtSecret = process.env.USER_JWT_SECRET;
    if (!jwtSecret) {
      console.error('USER_JWT_SECRET is not configured');
      return NextResponse.json(
        { message: 'Server configuration error' },
        { status: 500 }
      );
    }

    try {
      // Firebase authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Get user data from Firestore
      const usersRef = adminDb.collection('portalUsers');
      const querySnapshot = await usersRef.where('email', '==', email).get();

      if (querySnapshot.empty) {
        return NextResponse.json(
          { message: 'User data not found in database' },
          { status: 404 }
        );
      }
      
      const userData = querySnapshot.docs[0].data();

      // Check subscription expiry
      const currentDate = new Date();
      const subscriptionExpiry = new Date(userData.subscriptionExp);
      
      if (subscriptionExpiry < currentDate) {
        return NextResponse.json(
          { message: 'Your subscription has expired. Please contact admin to renew.' },
          { status: 403 }
        );
      }

      // Create JWT token
      const secret = new TextEncoder().encode(jwtSecret);
      
      const token = await new SignJWT({
        userId: user.uid,
        email: user.email,
        phone: userData.phone,
        fullName: userData.fullName,
        subscriptionEnd: userData.subscriptionEnd,
        panCardNumber: userData.panCardNumber,
        kycVerifiedOn: userData.kycVerifiedOn,
        loginTime: new Date().toISOString()
      })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1h') // 1 hr
        .sign(secret);

      // Create response
      const response = NextResponse.json({
        message: 'Login successful',
        userId: user.uid,
        email: user.email, 
        phone: userData.phone
      });

      // Set JWT token cookie
      response.cookies.set('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60  // 1 hr
      });

      return response;

    } catch (authError) {
      console.error('Firebase Auth Error:', authError);
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

  } catch (error) {
    console.error('Login Check Error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}