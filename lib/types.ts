// lib/types.ts

export type JobSource = 'himalayas' | 'indeed' | 'google';
export type Track = 'writing' | 'cs';

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  salary?: string;
  postedAt: string;
  source: JobSource;
  applicationLink: string;
  isNew: boolean;
  track: Track;
  isRemote: boolean;
  categories?: string[];
}
