'use client';

// components/JobCard.tsx

import { Job } from '@/lib/types';
import { useState, useEffect } from 'react';

interface JobCardProps {
  job: Job;
  onApplyFaster: (job: Job) => void;
}

export default function JobCard({ job, onApplyFaster }: JobCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('savedJobs');
    if (saved) {
      const savedJobs: string[] = JSON.parse(saved);
      setIsSaved(savedJobs.includes(job.id));
    }
  }, [job.id]);

  const toggleSave = () => {
    const saved = localStorage.getItem('savedJobs');
    const savedJobs: string[] = saved ? JSON.parse(saved) : [];
    
    if (isSaved) {
      const filtered = savedJobs.filter(id => id !== job.id);
      localStorage.setItem('savedJobs', JSON.stringify(filtered));
      setIsSaved(false);
    } else {
      savedJobs.push(job.id);
      localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
      
      // Also save the full job data
      const jobsData = localStorage.getItem('savedJobsData');
      const jobs: Job[] = jobsData ? JSON.parse(jobsData) : [];
      jobs.push(job);
      localStorage.setItem('savedJobsData', JSON.stringify(jobs));
      
      setIsSaved(true);
    }
  };

  const getSourceBadgeColor = () => {
    switch (job.source) {
      case 'himalayas':
        return 'bg-badge-himalayas';
      case 'indeed':
        return 'bg-badge-indeed';
      case 'google':
        return 'bg-badge-google';
      default:
        return 'bg-gray-600';
    }
  };

  const getCompanyInitial = () => {
    return job.company.charAt(0).toUpperCase();
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:border-accent/30 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-1">
          {job.companyLogo ? (
            <img
              src={job.companyLogo}
              alt={job.company}
              className="w-12 h-12 rounded-lg object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center text-accent font-bold text-xl">
              {getCompanyInitial()}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-white mb-1 line-clamp-2">
              {job.title}
            </h3>
            <p className="text-sm text-gray-400">{job.company}</p>
          </div>
        </div>
        
        <button
          onClick={toggleSave}
          className="text-2xl hover:scale-110 transition-transform flex-shrink-0 ml-2"
          aria-label={isSaved ? 'Unsave job' : 'Save job'}
        >
          {isSaved ? '★' : '☆'}
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`${getSourceBadgeColor()} text-white text-xs px-3 py-1 rounded-full font-medium`}>
          {job.source}
        </span>
        
        {job.isNew && (
          <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-medium">
            NEW
          </span>
        )}
        
        {job.isRemote && (
          <span className="bg-gray-700 text-gray-300 text-xs px-3 py-1 rounded-full">
            Remote
          </span>
        )}
        
        {job.salary && (
          <span className="text-green-400 text-xs px-3 py-1 rounded-full bg-green-500/10 font-medium">
            {job.salary}
          </span>
        )}
      </div>

      <p className="text-sm text-gray-400 mb-4">Posted {job.postedAt}</p>

      <div className="flex gap-3">
        <a
          href={job.applicationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 border border-white/20 text-white hover:bg-white/10 rounded-lg px-4 py-2 text-center font-medium transition-colors"
        >
          Apply Now →
        </a>
        
        <button
          onClick={() => onApplyFaster(job)}
          className="flex-1 bg-accent text-black font-semibold hover:bg-[#00cc8e] rounded-lg px-4 py-2 transition-colors"
        >
          ⚡ Apply Faster
        </button>
      </div>
    </div>
  );
}
