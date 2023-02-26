import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
export async function middleware(req: NextRequest, res: NextResponse) {
  const bearer = req.headers.get("authorization") as string;

  if (!bearer) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized request" }), {
      status: 401,
    });
  }

  const [, token] = bearer.split(" ");
  if (!token) {
    // res.status(401).json({ error: "Unauthorized request" });
    return new NextResponse(JSON.stringify({ error: "Unauthorized request" }), {
      status: 401,
    });
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  try {
    await jose.jwtVerify(token, secret);
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized request" }), {
      status: 401,
    });
  }
}

export const config = {
  matcher: ["/api/auth/me"],
};
