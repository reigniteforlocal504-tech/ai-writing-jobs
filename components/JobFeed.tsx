'use client';

// components/JobFeed.tsx

import { useState, useEffect } from 'react';
import { Job, Track } from '@/lib/types';
import JobCard from './JobCard';
import SkeletonCard from './SkeletonCard';
import AudienceSwitcher from './AudienceSwitcher';
import FilterBar from './FilterBar';
import PromptToolkit from './PromptToolkit';
import UpgradeCTA from './UpgradeCTA';

export default function JobFeed() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTrack, setActiveTrack] = useState<Track>('writing');
  const [searchQuery, setSearchQuery] = useState('');
  const [remoteOnly, setRemoteOnly] = useState(true);
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showPromptToolkit, setShowPromptToolkit] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [applyFasterCount, setApplyFasterCount] = useState(0);
  const [displayCount, setDisplayCount] = useState(20);

  useEffect(() => {
    fetchJobs();
  }, [activeTrack]);

  useEffect(() => {
    applyFilters();
  }, [jobs, searchQuery, remoteOnly, dateFilter]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const [himalayasRes, serpApiRes] = await Promise.allSettled([
        fetch(`/api/jobs/himalayas?track=${activeTrack}`).then(r => r.json()),
        fetch(`/api/jobs/serpapi?track=${activeTrack}`).then(r => r.json()),
      ]);

      const allJobs: Job[] = [];

      if (himalayasRes.status === 'fulfilled' && himalayasRes.value.success) {
        allJobs.push(...himalayasRes.value.jobs);
      }

      if (serpApiRes.status === 'fulfilled' && serpApiRes.value.success) {
        allJobs.push(...serpApiRes.value.jobs);
      }

      // Deduplicate by title + company
      const uniqueJobs = Array.from(
        new Map(
          allJobs.map(job => [
            `${job.title.toLowerCase()}-${job.company.toLowerCase()}`,
            job
          ])
        ).values()
      );

      // Sort by newest first
      uniqueJobs.sort((a, b) => {
        if (a.isNew && !b.isNew) return -1;
        if (!a.isNew && b.isNew) return 1;
        return 0;
      });

      setJobs(uniqueJobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...jobs];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Remote filter
    if (remoteOnly) {
      filtered = filtered.filter(job => job.isRemote);
    }

    // Date filter
    if (dateFilter !== 'all') {
      filtered = filtered.filter(job => {
        const posted = job.postedAt.toLowerCase();
        if (dateFilter === 'today') return posted.includes('hour') || posted.includes('just now');
        if (dateFilter === 'week') return posted.includes('hour') || posted.includes('day') || posted.includes('just now');
        if (dateFilter === 'month') return !posted.includes('month') || posted.includes('1 month');
        return true;
      });
    }

    setFilteredJobs(filtered);
  };

  const handleTrackChange = (track: Track) => {
    setActiveTrack(track);
    setSearchQuery('');
    setDisplayCount(20);
  };

  const handleApplyFaster = (job: Job) => {
    setSelectedJob(job);
    setShowPromptToolkit(true);
    const newCount = applyFasterCount + 1;
    setApplyFasterCount(newCount);
    localStorage.setItem('applyFasterCount', newCount.toString());
  };

  const handleUpgradePrompt = () => {
    setShowPromptToolkit(false);
    setShowUpgradeModal(true);
  };

  const displayedJobs = filteredJobs.slice(0, displayCount);
  const hasMore = displayCount < filteredJobs.length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pb-24">
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">AI Writing Jobs</h1>
        <p className="text-gray-400">Find AI work. Land it faster.</p>
      </header>

      <AudienceSwitcher
        activeTrack={activeTrack}
        onTrackChange={handleTrackChange}
      />

      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        remoteOnly={remoteOnly}
        onRemoteToggle={() => setRemoteOnly(!remoteOnly)}
        dateFilter={dateFilter}
        onDateFilterChange={setDateFilter}
      />

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-400 text-lg">
            No jobs found for this filter. Try widening your search.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedJobs.map(job => (
              <JobCard
                key={job.id}
                job={job}
                onApplyFaster={handleApplyFaster}
              />
            ))}
          </div>

          {hasMore && (
            <div className="text-center mt-8">
              <button
                onClick={() => setDisplayCount(prev => prev + 20)}
                className="border border-white/20 text-white hover:bg-white/10 rounded-lg px-8 py-3 font-semibold transition-colors"
              >
                Load More Jobs
              </button>
            </div>
          )}
        </>
      )}

      {selectedJob && (
        <PromptToolkit
          job={selectedJob}
          isOpen={showPromptToolkit}
          onClose={() => setShowPromptToolkit(false)}
          onUpgradePrompt={handleUpgradePrompt}
          applyFasterCount={applyFasterCount}
        />
      )}

      <UpgradeCTA
        showModal={showUpgradeModal}
        onCloseModal={() => setShowUpgradeModal(false)}
      />
    </div>
  );
}
