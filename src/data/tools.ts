import cv from "@/public/curriculum-vitae-illustration-icon-vector.jpg";

export interface Tool {
  title: string;
  description: string;
  url: string;
  icon: any;
  category?: string;
}

export const tools: Tool[] = [
  {
    title: "CV Genetare PDF",
    description: "Tez va oson CV pdf yaratadi",
    url: "/cvgenerate",
    icon: cv.src,
    category: "Writing",
  },

  {
    title: "ChatGPT",
    description: "AI yordamchi, savollarga javob beradi",
    url: "https://chat.openai.com",
    icon: "🤖",
    category: "AI",
  },
  {
    title: "Google Translate",
    description: "Tarjimon va lug'at",
    url: "https://translate.google.com",
    icon: "🌐",
    category: "Translation",
  },
  {
    title: "Grammarly",
    description: "Matn va grammatika tekshiruvi",
    url: "https://grammarly.com",
    icon: "✍️",
    category: "Writing",
  },
  {
    title: "Wolfram Alpha",
    description: "Matematik hisoblashlar",
    url: "https://wolframalpha.com",
    icon: "📊",
    category: "Math",
  },
  {
    title: "Canva",
    description: "Dizayn va poster yaratish",
    url: "https://canva.com",
    icon: "🎨",
    category: "Design",
  },
  {
    title: "Google Scholar",
    description: "Ilmiy maqolalar qidiruvi",
    url: "https://scholar.google.com",
    icon: "📚",
    category: "Research",
  },
  {
    title: "Quizlet",
    description: "Flashcard va testlar",
    url: "https://quizlet.com",
    icon: "📝",
    category: "Learning",
  },
  {
    title: "Notion",
    description: "Note taking va organizatsiya",
    url: "https://notion.so",
    icon: "📓",
    category: "Productivity",
  },
  {
    title: "DeepL",
    description: "Professional tarjimon",
    url: "https://deepl.com",
    icon: "🔄",
    category: "Translation",
  },
  {
    title: "Miro",
    description: "Brainstorming va diagramma",
    url: "https://miro.com",
    icon: "🎯",
    category: "Collaboration",
  },
  {
    title: "FigJam",
    description: "Whiteboard collaboration",
    url: "https://figma.com/figjam",
    icon: "🎨",
    category: "Design",
  },
  {
    title: "Google Drive",
    description: "Cloud storage va docs",
    url: "https://drive.google.com",
    icon: "☁️",
    category: "Storage",
  },
  {
    title: "Zoom",
    description: "Video conferencing",
    url: "https://zoom.us",
    icon: "🎥",
    category: "Communication",
  },
  {
    title: "Slack",
    description: "Team communication",
    url: "https://slack.com",
    icon: "💬",
    category: "Communication",
  },
  {
    title: "Trello",
    description: "Project management",
    url: "https://trello.com",
    icon: "📋",
    category: "Productivity",
  },
  {
    title: "GitHub",
    description: "Code hosting va collaboration",
    url: "https://github.com",
    icon: "💻",
    category: "Development",
  },
  {
    title: "VS Code",
    description: "Code editor online",
    url: "https://vscode.dev",
    icon: "⌨️",
    category: "Development",
  },
  {
    title: "Pinterest",
    description: "Inspiration va ideyalar",
    url: "https://pinterest.com",
    icon: "📌",
    category: "Design",
  },
  {
    title: "Duolingo",
    description: "Til o'rganish",
    url: "https://duolingo.com",
    icon: "🗣️",
    category: "Learning",
  },
  {
    title: "Khan Academy",
    description: "Bepul ta'lim resurslari",
    url: "https://khanacademy.org",
    icon: "🎓",
    category: "Learning",
  },
  {
    title: "Desmos",
    description: "Grafik kalkulyator",
    url: "https://desmos.com",
    icon: "📈",
    category: "Math",
  },
  {
    title: "Overleaf",
    description: "Online LaTeX editor",
    url: "https://overleaf.com",
    icon: "📄",
    category: "Writing",
  },
  {
    title: "Calendly",
    description: "Schedule meeting",
    url: "https://calendly.com",
    icon: "📅",
    category: "Productivity",
  },
  {
    title: "Otter.ai",
    description: "Voice to text",
    url: "https://otter.ai",
    icon: "🎙️",
    category: "AI",
  },
];
