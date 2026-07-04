import { adminDb, adminAuth } from '@/lib/firebaseAdmin';

export async function POST(req) {
  try {
    const { fullName, phone, email, password, subscriptionStart, subscriptionEnd, panCardNumber, kycVerifiedOn  } = await req.json();

    // Validate required fields
    if (!fullName || !phone || !email || !password || !subscriptionStart || !subscriptionEnd) {
      return new Response(JSON.stringify({ message: 'Missing required fields' }), { status: 400 });
    }

    // Format phone number to ensure it starts with +91
    const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;

    // Create Firebase Auth user
    await adminAuth.createUser({
      email,
      password,
      phoneNumber: formattedPhone
    });

    // Store extra details in Firestore
    await adminDb.collection('portalUsers').doc(formattedPhone).set({
      fullName,
      phone: formattedPhone,
      email,
      subscriptionStart,
      subscriptionEnd,
      panCardNumber,
      kycVerifiedOn,
      createdAt: new Date()
    });

    return new Response(JSON.stringify({ message: 'User added successfully' }), { status: 200 });

  } catch (error) {
    console.error('Error adding user:', error);

    // Handle specific Firebase Auth errors
    if (error.code === 'auth/email-already-exists') {
      return new Response(JSON.stringify({ message: 'Email already exists' }), { status: 400 });
    }
    if (error.code === 'auth/phone-number-already-exists') {
      return new Response(JSON.stringify({ message: 'Phone number already exists' }), { status: 400 });
    }

    return new Response(JSON.stringify({ message: 'Error adding user' }), { status: 500 });
  }
}
