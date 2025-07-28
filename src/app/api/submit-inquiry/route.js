import { createClient } from "next-sanity";
import { NextResponse } from "next/server";

const client = createClient({
  projectId: "ppszzxgj",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN, // loaded from environment
  useCdn: false,
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { token, ...formData } = body;

    // Verify reCAPTCHA token with Google
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    if (!token) {
      return NextResponse.json(
        { message: "reCAPTCHA token is missing." },
        { status: 400 }
      );
    }

    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

    const verifyResponse = await fetch(verifyUrl, { method: "POST" });
    const verifyData = await verifyResponse.json();

    if (!verifyData.success) {
      return NextResponse.json(
        { message: "reCAPTCHA verification failed." },
        { status: 400 }
      );
    }

    // reCAPTCHA passed, create the inquiry document
    await client.create({
      _type: "inquiry",
      contactPerson: formData.contactPerson,
      companyName: formData.companyName,
      phone: formData.phone,
      email: formData.email,
      content: formData.content,
      privacyAgreement: formData.privacyAgreement,
    });

    return NextResponse.json({
      message: "문의가 성공적으로 제출되었습니다!",
    });
  } catch (error) {
    console.error("Error processing inquiry:", error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
