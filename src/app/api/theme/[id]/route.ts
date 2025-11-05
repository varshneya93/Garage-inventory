import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/theme/[id] - Get specific theme
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const theme = await prisma.themeSettings.findUnique({
      where: { id },
    });

    if (!theme) {
      return NextResponse.json(
        { success: false, error: 'Theme not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, theme });
  } catch (error) {
    console.error('Error fetching theme:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch theme' },
      { status: 500 }
    );
  }
}

// PUT /api/theme/[id] - Update theme
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { name, colors, fonts, customCss, isActive } = body;

    // If setting as active, deactivate all other themes
    if (isActive) {
      await prisma.themeSettings.updateMany({
        where: { isActive: true, NOT: { id } },
        data: { isActive: false },
      });
    }

    const theme = await prisma.themeSettings.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(colors && { colors: JSON.stringify(colors) }),
        ...(fonts !== undefined && { fonts: fonts ? JSON.stringify(fonts) : null }),
        ...(customCss !== undefined && { customCss }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    return NextResponse.json({ success: true, theme });
  } catch (error) {
    console.error('Error updating theme:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update theme' },
      { status: 500 }
    );
  }
}

// DELETE /api/theme/[id] - Delete theme
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    
    // Check if theme is active
    const theme = await prisma.themeSettings.findUnique({
      where: { id },
    });

    if (theme?.isActive) {
      return NextResponse.json(
        { success: false, error: 'Cannot delete active theme' },
        { status: 400 }
      );
    }

    await prisma.themeSettings.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting theme:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete theme' },
      { status: 500 }
    );
  }
}
