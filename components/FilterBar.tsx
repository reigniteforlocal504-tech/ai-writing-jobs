'use client';

// components/FilterBar.tsx

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  remoteOnly: boolean;
  onRemoteToggle: () => void;
  dateFilter: string;
  onDateFilterChange: (filter: string) => void;
}

export default function FilterBar({
  searchQuery,
  onSearchChange,
  remoteOnly,
  onRemoteToggle,
  dateFilter,
  onDateFilterChange,
}: FilterBarProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search job titles..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1 bg-background border border-border rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-accent"
        />

        <label className="flex items-center gap-2 cursor-pointer bg-background border border-border rounded-lg px-4 py-2">
          <input
            type="checkbox"
            checked={remoteOnly}
            onChange={onRemoteToggle}
            className="w-4 h-4 accent-accent"
          />
          <span className="text-sm text-gray-300">Remote Only</span>
        </label>

        <select
          value={dateFilter}
          onChange={(e) => onDateFilterChange(e.target.value)}
          className="bg-background border border-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent"
        >
          <option value="all">All Time</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>
    </div>
  );
}
