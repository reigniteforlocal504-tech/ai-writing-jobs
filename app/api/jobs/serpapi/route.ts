// app/api/jobs/serpapi/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { fetchSerpAPIJobs } from '@/lib/fetchSerpAPI';
import { Track } from '@/lib/types';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const track = searchParams.get('track') as Track || 'writing';

  try {
    const jobs = await fetchSerpAPIJobs(track);
    return NextResponse.json({ success: true, jobs });
  } catch (error) {
    console.error('SerpAPI route error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}
