import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");
  const blob = await request.blob();

  try {
    const { url } = await put(filename, blob, {
      access: "public",
    });
    return NextResponse.json({ url });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to upload certificate." },
      { status: 500 }
    );
  }
}
