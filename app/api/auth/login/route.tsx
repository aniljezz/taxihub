import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  // TODO: Replace with actual user verification from your database
  if (email === "admin@taxihub.com" && password === "admin123") {
    const token = "your-jwt-token-here"; // Generate JWT
    return NextResponse.json({ token, success: true });
  }

  return NextResponse.json(
    { error: "Invalid credentials" },
    { status: 401 }
  );
}
