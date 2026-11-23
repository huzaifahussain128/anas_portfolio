import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, projectType, budget, message } = data;

    if (!name || !email || !projectType || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const inquiry = {
      name,
      email,
      projectType,
      budget: budget || "Not specified",
      message,
      createdAt: new Date().toISOString(),
    };

    // Save to local inquiries data file
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const filePath = path.join(dataDir, "inquiries.json");
    let inquiries = [];
    if (fs.existsSync(filePath)) {
      try {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        inquiries = JSON.parse(fileContent);
      } catch {
        inquiries = [];
      }
    }
    inquiries.push(inquiry);
    fs.writeFileSync(filePath, JSON.stringify(inquiries, null, 2));

    // Also attempt forwarding to Python backend (if active on port 8000)
    try {
      await fetch("http://127.0.0.1:8000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inquiry),
        signal: AbortSignal.timeout(1000),
      });
    } catch {
      // Python backend is optional or not running yet; Next.js has handled and saved the submission safely
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry received successfully",
      inquiry,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to process inquiry", details: err?.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "data", "inquiries.json");
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      return NextResponse.json(JSON.parse(fileContent));
    }
    return NextResponse.json([]);
  } catch {
    return NextResponse.json([]);
  }
}
