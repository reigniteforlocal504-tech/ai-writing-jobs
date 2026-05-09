// lib/fetchHimalayas.ts

import { Job, Track } from './types';

export async function fetchHimalayasJobs(track: Track, offset: number = 0): Promise<Job[]> {
  const query = track === 'writing' 
    ? 'AI content writer'
    : 'AI customer service specialist';

  const url = `https://himalayas.app/jobs/api/search?q=${encodeURIComponent(query)}&limit=20&offset=${offset}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 300 } // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error('Himalayas API failed');
    }

    const data = await response.json();

    return data.map((job: any) => {
      const postedDate = new Date(job.pubDate);
      const now = new Date();
      const hoursDiff = (now.getTime() - postedDate.getTime()) / (1000 * 60 * 60);
      
      return {
        id: `himalayas-${job.id || job.guid || Math.random()}`,
        title: job.title || 'Untitled Position',
        company: job.company?.name || job.companyName || 'Company',
        companyLogo: job.company?.logo || job.companyLogo,
        salary: job.maxSalary 
          ? `Up to ${job.currency || '$'}${job.maxSalary.toLocaleString()}` 
          : undefined,
        postedAt: formatPostedDate(postedDate),
        source: 'himalayas' as const,
        applicationLink: job.applicationLink || job.application_link || '#',
        isNew: hoursDiff < 24,
        track,
        isRemote: true,
        categories: job.categories || [],
      };
    });
  } catch (error) {
    console.error('Error fetching Himalayas jobs:', error);
    return [];
  }
}

function formatPostedDate(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) return 'Just now';
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${diffDays >= 14 ? 's' : ''} ago`;
  return `${Math.floor(diffDays / 30)} month${diffDays >= 60 ? 's' : ''} ago`;
}
