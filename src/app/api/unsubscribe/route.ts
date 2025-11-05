import { NextRequest, NextResponse } from "next/server";
import { unsubscribeFromMailingList } from "@/lib/email";
import { z } from "zod";

const unsubscribeSchema = z.object({
  email: z.string().email("Valid email is required"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = unsubscribeSchema.parse(body);

    const success = await unsubscribeFromMailingList(validatedData.email);

    if (success) {
      return NextResponse.json({
        success: true,
        message: "Successfully unsubscribed from mailing list",
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "UNSUBSCRIBE_FAILED",
            message: "Failed to unsubscribe",
          },
        },
        { status: 500 }
      );
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid input data",
            details: error.errors,
          },
        },
        { status: 400 }
      );
    }

    console.error("Unsubscribe error:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to process unsubscribe request",
        },
      },
      { status: 500 }
    );
  }
}

// Also support GET for email links
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Email parameter is required",
          },
        },
        { status: 400 }
      );
    }

    const success = await unsubscribeFromMailingList(email);

    if (success) {
      // Return a simple HTML page confirming unsubscription
      return new NextResponse(
        `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Unsubscribed</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #333;
    }
    .container {
      background: white;
      padding: 40px;
      border-radius: 10px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.1);
      text-align: center;
      max-width: 500px;
    }
    h1 {
      color: #667eea;
      margin-bottom: 20px;
    }
    p {
      line-height: 1.6;
      color: #666;
    }
    .button {
      display: inline-block;
      margin-top: 20px;
      padding: 12px 30px;
      background: #667eea;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 600;
    }
    .button:hover {
      background: #5568d3;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>✓ Unsubscribed Successfully</h1>
    <p>You have been unsubscribed from our mailing list.</p>
    <p>We're sorry to see you go! If you change your mind, you can always subscribe again from our website.</p>
    <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}" class="button">Return to Website</a>
  </div>
</body>
</html>
        `,
        {
          status: 200,
          headers: {
            'Content-Type': 'text/html',
          },
        }
      );
    } else {
      return new NextResponse(
        `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Unsubscribe Failed</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #333;
    }
    .container {
      background: white;
      padding: 40px;
      border-radius: 10px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.1);
      text-align: center;
      max-width: 500px;
    }
    h1 {
      color: #e74c3c;
      margin-bottom: 20px;
    }
    p {
      line-height: 1.6;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>✗ Unsubscribe Failed</h1>
    <p>We couldn't process your unsubscribe request. The email address may not be in our system.</p>
    <p>If you continue to receive emails, please contact us directly.</p>
  </div>
</body>
</html>
        `,
        {
          status: 500,
          headers: {
            'Content-Type': 'text/html',
          },
        }
      );
    }
  } catch (error) {
    console.error("Unsubscribe error:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to process unsubscribe request",
        },
      },
      { status: 500 }
    );
  }
}
