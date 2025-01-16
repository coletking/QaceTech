import { mongoConnection } from '@/app/Backend_controller/Model/database.config';
import { NextResponse } from 'next/server';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


// // please note that i intentionally expose this credentials to make it easy to run.. i will not do this for a life project 
const JWT_SECRET = "123456789076543fghjjhgfdwertyuuytrewerty";
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing email or password" },
        { status: 400 }
      );
    }

    const usersCollection = await mongoConnection();

    // Find user by email
    const user = await usersCollection.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Compare password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return NextResponse.json(
      {
        success: true,
        token,
        user: { id: user._id, email, username: user.username },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during login:", error);

    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    );
  } 
}