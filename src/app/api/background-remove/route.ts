import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const form = await request.formData();
  const file = form.get("file") as Blob;
  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const apiKey = process.env.REMOVE_BG_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  const removeBgForm = new FormData();
  removeBgForm.append("image_file", file);
  removeBgForm.append("size", "auto");

  const response = await fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: {
      "X-Api-Key": apiKey,
    },
    body: removeBgForm,
  });

  if (!response.ok) {
    let errorMsg = "Background removal failed";
    try {
      const errData = await response.json();
      errorMsg = errData.errors?.[0]?.title || errorMsg;
    } catch (e) {
      // ignore JSON parse errors
    }
    return NextResponse.json({ error: errorMsg }, { status: response.status });
  }

  const arrayBuffer = await response.arrayBuffer();
  return new Response(arrayBuffer, {
    status: 200,
    headers: { "Content-Type": "image/png" },
  });
}
