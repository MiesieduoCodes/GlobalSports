import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Check if Firebase is configured
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY || !process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
      console.error('Firebase not configured. Please set environment variables.');
      return NextResponse.json(
        { error: 'Service temporarily unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    // Dynamic import to avoid build-time errors if Firebase is not configured
    const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
    const { db } = await import('@/lib/firebase');

    const body = await request.json();
    const { parentName, childName, childAge, medicalInfo, contactEmail, contactPhone } = body;

    // Validate required fields
    if (!parentName || !childName || !childAge || !contactEmail || !contactPhone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Save to Firestore
    const docRef = await addDoc(collection(db, 'kidscampRegistrations'), {
      parentName,
      childName,
      childAge: parseInt(childAge, 10),
      medicalInfo: medicalInfo || '',
      contactEmail,
      contactPhone,
      createdAt: serverTimestamp(),
      status: 'pending',
    });

    return NextResponse.json(
      { 
        success: true, 
        id: docRef.id,
        message: 'Registration submitted successfully' 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle Firebase errors gracefully
    if (error.code === 'auth/invalid-api-key' || error.code === 'permission-denied') {
      return NextResponse.json(
        { error: 'Service configuration error. Please contact support.' },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to submit registration. Please try again.' },
      { status: 500 }
    );
  }
}

