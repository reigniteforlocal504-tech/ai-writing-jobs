'use client';

// app/saved/page.tsx

import { useState, useEffect } from 'react';
import { Job } from '@/lib/types';
import JobCard from '@/components/JobCard';
import PromptToolkit from '@/components/PromptToolkit';
import UpgradeCTA from '@/components/UpgradeCTA';

export default function SavedPage() {
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showPromptToolkit, setShowPromptToolkit] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [applyFasterCount, setApplyFasterCount] = useState(0);

  useEffect(() => {
    const jobsData = localStorage.getItem('savedJobsData');
    if (jobsData) {
      setSavedJobs(JSON.parse(jobsData));
    }

    const count = localStorage.getItem('applyFasterCount');
    if (count) {
      setApplyFasterCount(parseInt(count));
    }
  }, []);

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

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pb-24">
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Saved Jobs</h1>
        <p className="text-gray-400">Your bookmarked opportunities</p>
      </header>

      {savedJobs.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-400 text-lg mb-4">
            No saved jobs yet. Browse the feed and bookmark jobs you like.
          </p>
          <a
            href="/"
            className="inline-block bg-accent text-black font-semibold px-6 py-3 rounded-lg hover:bg-[#00cc8e] transition-colors"
          >
            Browse Jobs
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedJobs.map(job => (
            <JobCard
              key={job.id}
              job={job}
              onApplyFaster={handleApplyFaster}
            />
          ))}
        </div>
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
