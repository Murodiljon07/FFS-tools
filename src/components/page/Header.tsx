"use client";

import { Search, Grid3x3 } from "lucide-react";

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function Header({ searchTerm, setSearchTerm }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 apple-blur border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-gray-900 to-gray-600 rounded-xl flex items-center justify-center">
              <Grid3x3 className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-lg sm:text-xl bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              ToolsHub
            </span>
          </div>

          <div className="relative max-w-md w-full mx-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-100/80 border-0 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
            />
          </div>

          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-100 flex items-center justify-center">
            <span className="text-xs font-medium text-gray-600">🎓</span>
          </div>
        </div>
      </div>
    </header>
  );
}
