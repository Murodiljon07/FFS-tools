"use client";

import { useState, useEffect } from "react";
import Header from "@/components/page/Header";
import ToolCard from "@/components/ui/ToolCard";
import { tools } from "@/data/tools";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTools, setFilteredTools] = useState(tools);

  useEffect(() => {
    const filtered = tools.filter(
      (tool) =>
        tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredTools(filtered);
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white apple-grid">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-8 sm:mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Student Tools
          </h1>
          <p className="text-gray-500 mt-3 text-lg max-w-2xl mx-auto">
            O&apos;qishingizda yordam beradigan eng yaxshi tool&apos;lar
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {filteredTools.map((tool, index) => (
            <ToolCard key={index} tool={tool} />
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Hech qanday tool topilmadi</p>
          </div>
        )}
      </main>
    </div>
  );
}
