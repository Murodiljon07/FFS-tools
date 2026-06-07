"use client";

import { Tool } from "@/data/tools";
import { ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const router = useRouter();

  const handleClick = () => {
    if (!tool.url.startsWith("https://")) {
      return router.push(tool.url);
    }
    window.open(tool.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-100 hover:border-gray-200 active:scale-95"
      style={{
        boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03)",
      }}
    >
      <div className="flex flex-col items-center text-center gap-3">
        {/* Icon */}
        <div className="relative">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center text-3xl sm:text-4xl shadow-sm group-hover:shadow-md transition-all">
            <img src={tool.icon} alt="" className="min-h-full" />
          </div>
          <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <ExternalLink className="w-3 h-3 text-gray-400" />
          </div>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
          {tool.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-gray-400 line-clamp-2">{tool.description}</p>

        {/* Apple-style indicator */}
        <div className="w-6 h-0.5 bg-gray-200 rounded-full group-hover:bg-gray-300 transition-colors mt-1" />
      </div>
    </div>
  );
}
