import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CardProps {
  title: string;
  icon: LucideIcon;
  value: string;
  description: string;
}

export function Card({ title, icon: Icon, value, description }: CardProps) {
  return (
    <div className="bg-dark-200 border border-dark-300 rounded-lg p-4 lg:p-6 hover:bg-dark-300 transition-colors">
      <div className="flex items-center justify-between">
        <h3 className="text-base lg:text-lg font-semibold text-gray-400">{title}</h3>
        <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-primary-400" />
      </div>
      <div className="mt-4">
        <p className="text-2xl lg:text-3xl font-bold text-white">{value}</p>
        <p className="text-xs lg:text-sm text-gray-400">{description}</p>
      </div>
    </div>
  );
}