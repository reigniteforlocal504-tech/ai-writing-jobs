'use client';

// components/UpgradeCTA.tsx

import Link from 'next/link';

interface UpgradeCTAProps {
  showModal: boolean;
  onCloseModal: () => void;
}

export default function UpgradeCTA({ showModal, onCloseModal }: UpgradeCTAProps) {
  return (
    <>
      {/* Sticky Bottom Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-accent/30 px-4 py-3 z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <p className="text-sm md:text-base text-gray-300">
            🚀 <span className="text-accent font-semibold">Land your first AI writing job in 7 days</span> → Exit Sprint — $97
          </p>
          <Link
            href="/upgrade"
            className="bg-accent text-black font-semibold px-6 py-2 rounded-lg hover:bg-[#00cc8e] transition-colors whitespace-nowrap"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showModal && (
        <>
          <div
            className="fixed inset-0 bg-black/70 z-40"
            onClick={onCloseModal}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-card border border-accent max-w-lg w-full rounded-lg p-8 relative">
              <button
                onClick={onCloseModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>

              <h2 className="text-2xl font-bold mb-4">
                ⚡ Unlock Unlimited Prompts
              </h2>
              
              <p className="text-gray-300 mb-6">
                You've used the Apply Faster toolkit 3 times! Upgrade to the <strong className="text-accent">7-Day Exit Sprint</strong> to unlock:
              </p>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span>Unlimited AI prompt access</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span>Land your first AI writing client in 7 days</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span>Step-by-step daily tasks — no guessing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span>Built on the SPEED System</span>
                </li>
              </ul>

              <Link
                href="/upgrade"
                className="block w-full bg-accent text-black text-center font-semibold px-6 py-3 rounded-lg hover:bg-[#00cc8e] transition-colors"
              >
                Upgrade for $97
              </Link>

              <button
                onClick={onCloseModal}
                className="block w-full text-center text-gray-400 hover:text-white mt-3 text-sm"
              >
                Maybe later
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
