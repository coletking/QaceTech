import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    return NextResponse.json(
      { 
        success: true,
        user: { email, password }
      },
      { status: 201 }
    );
    
  } catch (error) {
    return NextResponse.json(
      { error: "login failed" },
      { status: 500 }
    );
  }
}