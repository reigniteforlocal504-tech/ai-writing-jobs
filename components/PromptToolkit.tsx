'use client';

// components/PromptToolkit.tsx

import { useState } from 'react';
import { Job } from '@/lib/types';
import { getPromptsForTrack, Prompt } from '@/lib/prompts';

interface PromptToolkitProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
  onUpgradePrompt: () => void;
  applyFasterCount: number;
}

export default function PromptToolkit({ job, isOpen, onClose, onUpgradePrompt, applyFasterCount }: PromptToolkitProps) {
  const [expandedPrompt, setExpandedPrompt] = useState<string | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);

  if (!isOpen) return null;

  const prompts = getPromptsForTrack(job.track);

  const copyPrompt = async (prompt: Prompt) => {
    try {
      await navigator.clipboard.writeText(prompt.promptText);
      setCopiedPrompt(prompt.id);
      setTimeout(() => setCopiedPrompt(null), 2000);

      // Check if user has clicked "Apply Faster" 3+ times
      if (applyFasterCount >= 3) {
        onUpgradePrompt();
      }
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 bottom-0 w-full md:w-[500px] bg-background border-l border-border z-50 overflow-y-auto">
        <div className="sticky top-0 bg-background border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">⚡ Apply Faster — AI Prompt Toolkit</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6 p-4 bg-card border border-border rounded-lg">
            <h3 className="font-semibold text-white mb-1">{job.title}</h3>
            <p className="text-sm text-gray-400">{job.company}</p>
          </div>

          <div className="space-y-3">
            {prompts.map((prompt) => (
              <div
                key={prompt.id}
                className="border border-border rounded-lg overflow-hidden bg-card"
              >
                <button
                  onClick={() => setExpandedPrompt(expandedPrompt === prompt.id ? null : prompt.id)}
                  className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <div>
                    <h4 className="font-semibold text-white">{prompt.title}</h4>
                    <p className="text-sm text-gray-400 mt-1">{prompt.description}</p>
                  </div>
                  <span className="text-2xl text-gray-400 ml-4">
                    {expandedPrompt === prompt.id ? '−' : '+'}
                  </span>
                </button>

                {expandedPrompt === prompt.id && (
                  <div className="px-4 pb-4 border-t border-border">
                    <pre className="bg-background p-4 rounded-lg text-sm text-gray-300 whitespace-pre-wrap font-mono mt-3 mb-3">
                      {prompt.promptText}
                    </pre>
                    
                    <button
                      onClick={() => copyPrompt(prompt)}
                      className="border border-white/10 text-gray-300 hover:border-white/30 text-sm px-3 py-1 rounded transition-colors"
                    >
                      {copiedPrompt === prompt.id ? '✓ Copied!' : 'Copy Prompt'}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-accent/10 border border-accent/30 rounded-lg">
            <p className="text-sm text-gray-300">
              <strong className="text-accent">Pro Tip:</strong> Copy these prompts into ChatGPT, Claude, or any AI tool to generate your application materials in seconds.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
