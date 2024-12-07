import React from 'react';

export function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 1000 1000" 
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M500 100C276.142 100 100 276.142 100 500C100 723.858 276.142 900 500 900C723.858 900 900 723.858 900 500C900 276.142 723.858 100 500 100Z"
        fill="#E5E7EB"
      />
      <g transform="translate(250, 300)">
        <text
          x="50"
          y="200"
          className="text-4xl font-bold"
          fill="#374151"
          style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
        >
          bht
        </text>
        <path
          d="M20 100L120 100L70 50"
          stroke="#374151"
          strokeWidth="20"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
      <rect x="100" y="600" width="800" height="200" rx="20" fill="#1F2937" />
      <g transform="translate(150, 650)">
        <rect x="0" y="0" width="60" height="20" rx="5" fill="#4B5563" opacity="0.5" />
        <rect x="80" y="0" width="60" height="20" rx="5" fill="#4B5563" opacity="0.5" />
        <rect x="160" y="0" width="60" height="20" rx="5" fill="#4B5563" opacity="0.5" />
        <rect x="0" y="40" width="60" height="20" rx="5" fill="#4B5563" opacity="0.5" />
        <rect x="80" y="40" width="60" height="20" rx="5" fill="#4B5563" opacity="0.5" />
        <rect x="160" y="40" width="60" height="20" rx="5" fill="#4B5563" opacity="0.5" />
      </g>
      <g transform="translate(600, 650)">
        <circle cx="20" cy="20" r="10" fill="#EF4444" />
        <circle cx="60" cy="20" r="10" fill="#F3F4F6" />
        <circle cx="100" cy="20" r="10" fill="#06B6D4" />
        <circle cx="20" cy="60" r="10" fill="#EF4444" />
        <circle cx="60" cy="60" r="10" fill="#06B6D4" />
        <circle cx="100" cy="60" r="10" fill="#06B6D4" />
      </g>
    </svg>
  );
}