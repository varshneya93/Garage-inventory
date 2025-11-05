import { NextRequest, NextResponse } from 'next/server';
import { subscribeToMailingList } from '@/lib/email';
import { z } from 'zod';

const subscribeSchema = z.object({
  email: z.string().email('Valid email is required'),
  name: z.string().optional(),
  tags: z.array(z.string()).optional(),
  source: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = subscribeSchema.parse(body);

    const success = await subscribeToMailingList(
      validatedData.email,
      validatedData.name,
      validatedData.tags,
      validatedData.source
    );

    if (success) {
      return NextResponse.json({
        success: true,
        message: 'Successfully subscribed to mailing list. Check your email for confirmation!',
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'SUBSCRIPTION_FAILED',
            message: 'Failed to subscribe',
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
            code: 'VALIDATION_ERROR',
            message: 'Invalid input data',
            details: error.errors,
          },
        },
        { status: 400 }
      );
    }

    console.error('Subscription error:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to process subscription',
        },
      },
      { status: 500 }
    );
  }
}

