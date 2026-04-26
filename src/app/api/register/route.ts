import { NextRequest, NextResponse } from "next/server";
import { adminClient } from "@/sanity/adminClient";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    const emailLower = email.toLowerCase();

    // Check if user already exists
    const existingUser = await adminClient.fetch(`*[_type == "user" && email == $email][0]`, {
      email: emailLower,
    });

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in Sanity
    const newUser = await adminClient.create({
      _type: "user",
      name,
      email: emailLower,
      password: hashedPassword,
      role: "user",
    });

    return NextResponse.json(
      { message: "User created successfully", id: newUser._id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
