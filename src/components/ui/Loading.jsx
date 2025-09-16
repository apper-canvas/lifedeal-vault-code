import React from "react";

const Loading = ({ className = "" }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="space-y-6">
        {/* Statistics Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-card">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 bg-surface-200 rounded-lg"></div>
                <div className="w-16 h-4 bg-surface-200 rounded"></div>
              </div>
              <div className="w-20 h-8 bg-surface-200 rounded mb-1"></div>
              <div className="w-24 h-3 bg-surface-200 rounded"></div>
            </div>
          ))}
        </div>

        {/* Filters Skeleton */}
        <div className="bg-white rounded-xl p-6 shadow-card">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="w-full h-12 bg-surface-200 rounded-lg"></div>
            </div>
            <div className="w-48">
              <div className="w-full h-12 bg-surface-200 rounded-lg"></div>
            </div>
            <div className="w-32">
              <div className="w-full h-12 bg-surface-200 rounded-lg"></div>
            </div>
          </div>
        </div>

        {/* Deal Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-card">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="w-32 h-6 bg-surface-200 rounded mb-2"></div>
                  <div className="w-16 h-4 bg-surface-200 rounded"></div>
                </div>
                <div className="w-6 h-6 bg-surface-200 rounded"></div>
              </div>
              <div className="w-full h-16 bg-surface-200 rounded mb-4"></div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-20 h-6 bg-surface-200 rounded"></div>
                <div className="w-24 h-5 bg-surface-200 rounded-full"></div>
              </div>
              <div className="flex items-center justify-between">
                <div className="w-16 h-4 bg-surface-200 rounded"></div>
                <div className="w-12 h-6 bg-surface-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;