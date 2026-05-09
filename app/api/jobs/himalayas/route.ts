// app/api/jobs/himalayas/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { fetchHimalayasJobs } from '@/lib/fetchHimalayas';
import { Track } from '@/lib/types';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const track = searchParams.get('track') as Track || 'writing';
  const offset = parseInt(searchParams.get('offset') || '0');

  try {
    const jobs = await fetchHimalayasJobs(track, offset);
    return NextResponse.json({ success: true, jobs });
  } catch (error) {
    console.error('Himalayas API route error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}
