import { createServerSupabaseClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

/**
 * Test API route to verify Supabase connection and database schema
 * GET /api/test-db
 * 
 * This route is used for validation in Story 1.2 to verify:
 * - Supabase client connection works
 * - Database schema migration applied successfully
 * - Can query tables (should return empty array, no errors)
 */
export async function GET() {
  try {
    const supabase = await createServerSupabaseClient()
    
    // Test query: SELECT * FROM agencies LIMIT 1
    // Should return empty array (no seed data yet), no errors
    const { data, error } = await supabase
      .from('agencies')
      .select('*')
      .limit(1)

    if (error) {
      return NextResponse.json(
        { 
          success: false, 
          error: error.message,
          details: error 
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Supabase connection successful',
      data: data || [],
      count: data?.length || 0
    })
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error',
        details: error 
      },
      { status: 500 }
    )
  }
}

