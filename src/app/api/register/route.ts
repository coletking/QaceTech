
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { mongoConnection } from "@/app/Backend_controller/Model/database.config";

// Register user
export async function POST(request: Request) {
  try {
    const { email, username, mobile, password } = await request.json();

    if (!email || !username || !mobile || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const usersCollection = await mongoConnection();

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into MongoDB
    const newUser = {
      email,
      username,
      mobile,
      password: hashedPassword, // Save hashed password
    };

    const result = await usersCollection.insertOne(newUser);

    return NextResponse.json(
      {
        success: true,
        user: { id: result.insertedId, email, username, mobile },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during user registration:", error);

    return NextResponse.json(
      { error: "Registration failed" },
      { status: 500 }
    );
  }
}