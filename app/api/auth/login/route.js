import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    { message: 'Use /api/user/logincheck for portal authentication.' },
    { status: 405 }
  );
}
