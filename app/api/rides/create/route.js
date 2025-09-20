import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function POST(req) {
  const body = await req.json()
  const { pickup, drop, car_type } = body

  if (!pickup || !drop) {
    return NextResponse.json({ error: 'Pickup and drop required' }, { status: 400 })
  }

  const { data, error } = await supabase.from('rides').insert([
    { pickup, drop, car_type }
  ])

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, ride: data[0] })
}
