import { NextResponse } from 'next/server';
import { validateSession } from '@/lib/adminauth';
import { getCurrentGrievanceReport, saveCurrentGrievanceReport } from '@/lib/grievanceReportService';

function validateAdminRequest(sessionToken) {
  if (!sessionToken) {
    return { valid: false, error: 'No session token provided' };
  }

  return validateSession(sessionToken);
}

export async function GET(request) {
  try {
    const sessionToken = request.headers.get('x-admin-session');
    const validation = validateAdminRequest(sessionToken);

    if (!validation.valid) {
      return NextResponse.json({ success: false, error: validation.error || 'Unauthorized' }, { status: 401 });
    }

    const data = await getCurrentGrievanceReport();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Admin grievance report GET error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { sessionToken, data } = await request.json();
    const validation = validateAdminRequest(sessionToken);

    if (!validation.valid) {
      return NextResponse.json({ success: false, error: validation.error || 'Unauthorized' }, { status: 401 });
    }

    if (!data) {
      return NextResponse.json({ success: false, error: 'Missing grievance report data' }, { status: 400 });
    }

    const saved = await saveCurrentGrievanceReport(data);
    return NextResponse.json({ success: true, data: saved });
  } catch (error) {
    console.error('Admin grievance report POST error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal server error' }, { status: 500 });
  }
}
