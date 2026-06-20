import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSession } from '@/lib/auth';

// GET /api/blog/[id] - Get single blog by id or slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Try by id first, then by slug
    const isNumeric = /^\d+$/.test(id);
    const sql = isNumeric
      ? 'SELECT * FROM blogs WHERE id = ?'
      : 'SELECT * FROM blogs WHERE slug = ?';
    
    const rows = await query(sql, [id]);
    const blog = (rows as any[])[0];
    
    if (!blog) {
      return NextResponse.json({ error: 'Blog bulunamadı' }, { status: 404 });
    }
    
    return NextResponse.json({ blog });
  } catch (error) {
    console.error('Blog get error:', error);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}

// PUT /api/blog/[id] - Admin: Update blog
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { title, slug, excerpt, content, cover_image, category, author, read_time, is_featured, is_published, seo_title, seo_description, focus_keyword, seo_keywords } = body;

    await query(
      `UPDATE blogs SET title=?, slug=?, excerpt=?, content=?, cover_image=?, category=?, author=?, read_time=?, is_featured=?, is_published=?, seo_title=?, seo_description=?, focus_keyword=?, seo_keywords=? WHERE id=?`,
      [
        title,
        slug,
        excerpt,
        content,
        cover_image || null,
        category,
        author,
        read_time,
        is_featured ? 1 : 0,
        is_published ? 1 : 0,
        seo_title || null,
        seo_description || null,
        focus_keyword || null,
        seo_keywords || null,
        id
      ]
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error?.code === 'ER_DUP_ENTRY') {
      return NextResponse.json({ error: 'Bu slug zaten kullanılıyor' }, { status: 409 });
    }
    console.error('Blog update error:', error);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}

// DELETE /api/blog/[id] - Admin: Delete blog
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await query('DELETE FROM blogs WHERE id = ?', [id]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Blog delete error:', error);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}

// PATCH /api/blog/[id] - Admin: Partial update (publish/unpublish toggle, feature toggle)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const allowedFields = ['is_published', 'is_featured'];
    
    // Find fields present in payload
    const updates: string[] = [];
    const values: any[] = [];

    for (const field of allowedFields) {
      if (field in body) {
        updates.push(`${field} = ?`);
        values.push(body[field] ? 1 : 0);
      }
    }

    if (updates.length === 0) {
      return NextResponse.json({ error: 'Güncellenecek alan belirtilmedi' }, { status: 400 });
    }

    values.push(id);
    const updateSql = `UPDATE blogs SET ${updates.join(', ')} WHERE id = ?`;
    await query(updateSql, values);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Blog partial update error:', error);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}
