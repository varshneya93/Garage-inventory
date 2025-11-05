import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/theme - Get active theme or all themes
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get('all') === 'true';

    if (all) {
      const themes = await prisma.themeSettings.findMany({
        orderBy: { createdAt: 'desc' },
      });
      return NextResponse.json({ success: true, themes });
    }

    const activeTheme = await prisma.themeSettings.findFirst({
      where: { isActive: true },
    });

    return NextResponse.json({ success: true, theme: activeTheme });
  } catch (error) {
    console.error('Error fetching theme:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch theme' },
      { status: 500 }
    );
  }
}

// POST /api/theme - Create new theme
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, colors, fonts, customCss, isActive } = body;

    if (!name || !colors) {
      return NextResponse.json(
        { success: false, error: 'Name and colors are required' },
        { status: 400 }
      );
    }

    // If setting as active, deactivate all other themes
    if (isActive) {
      await prisma.themeSettings.updateMany({
        where: { isActive: true },
        data: { isActive: false },
      });
    }

    const theme = await prisma.themeSettings.create({
      data: {
        name,
        colors: JSON.stringify(colors),
        fonts: fonts ? JSON.stringify(fonts) : null,
        customCss,
        isActive: isActive || false,
      },
    });

    return NextResponse.json({ success: true, theme });
  } catch (error) {
    console.error('Error creating theme:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create theme' },
      { status: 500 }
    );
  }
}
