// lib/fetchSerpAPI.ts

import { Job, Track } from './types';

export async function fetchSerpAPIJobs(track: Track): Promise<Job[]> {
  const apiKey = process.env.SERPAPI_API_KEY;

  if (!apiKey) {
    console.log('SERPAPI_API_KEY not found - skipping SerpAPI');
    return [];
  }

  const query = track === 'writing'
    ? 'AI content writer remote'
    : 'AI customer service specialist remote';

  const url = `https://serpapi.com/search.json?engine=google_jobs&q=${encodeURIComponent(query)}&ltype=1&chips=date_posted:week&api_key=${apiKey}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 300 } // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error('SerpAPI failed');
    }

    const data = await response.json();
    const jobs = data.jobs_results || [];

    return jobs.map((job: any, index: number) => {
      const postedAt = job.detected_extensions?.posted_at || 'Recently';
      
      return {
        id: `serpapi-${job.job_id || index}`,
        title: job.title || 'Untitled Position',
        company: job.company_name || 'Company',
        companyLogo: undefined,
        salary: job.detected_extensions?.salary,
        postedAt,
        source: 'google' as const,
        applicationLink: job.apply_options?.[0]?.link || job.share_link || '#',
        isNew: postedAt.includes('hour') || postedAt.includes('day') && parseInt(postedAt) === 1,
        track,
        isRemote: true,
        categories: [],
      };
    });
  } catch (error) {
    console.error('Error fetching SerpAPI jobs:', error);
    return [];
  }
}
