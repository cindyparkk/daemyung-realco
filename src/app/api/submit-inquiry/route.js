import { createClient } from "next-sanity";
import { NextResponse } from "next/server";

export const client = createClient({
  projectId: "ppszzxgj",
  dataset: "production",
  apiVersion: "2024-01-01",
  //   useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token: process.env.SANITY_API_WRITE_TOKEN, // loaded from environment
  useCdn: false,
});

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Only POST requests allowed" });
//   }
//   try {
//     // Create the document in Sanity
//     await client.create({
//       _type: "inquiry",
//       contactPerson: req.body.contactPerson,
//       companyName: req.body.companyName,
//       phone: req.body.phone,
//       email: req.body.email,
//       content: req.body.content,
//       //   spamCheck: req.body.spamCheck,
//       privacyAgreement: req.body.privacyAgreement,
//     });

//     res.status(200).json({ message: "Inquiry submitted successfully!" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Something went wrong", error });
//   }
// }

export async function POST(request) {
  const body = await request.json();
  await client.create({
    _type: "inquiry",
    contactPerson: body.contactPerson,
    companyName: body.companyName,
    phone: body.phone,
    email: body.email,
    content: body.content,
    privacyAgreement: body.privacyAgreement,
  });
  return NextResponse.json({ message: "문의가 성공적으로 제출되었습니다!" });
}
