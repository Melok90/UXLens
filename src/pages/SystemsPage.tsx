import { useState, ReactNode } from 'react';
import { ExternalLink, Figma, Layers, Globe, Smartphone } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

interface DesignSystemItem {
  id: string;
  name: string;
  creator: string;
  link: string;
  figmaLink?: string;
  logo: ReactNode;
  color: string;
  platforms: string[];
}

export default function SystemsPage() {
  const { t } = useLanguage();
  const [selectedPlatform, setSelectedPlatform] = useState<'all' | 'web' | 'mobile'>('all');

  const systems: DesignSystemItem[] = [
    {
      id: "apple",
      name: "Apple iOS HIG",
      creator: "Apple",
      link: "https://developer.apple.com/design/human-interface-guidelines/",
      figmaLink: "https://www.figma.com/@apple",
      color: "#0071E3",
      platforms: ["iOS", "iPadOS", "macOS", "visionOS"],
      logo: (
        <svg viewBox="0 0 24 24" className="w-10 h-10" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.65 1.35-.58.66-1.08 1.73-.95 2.76 1 .08 2.05-.51 2.68-1.26z" />
        </svg>
      )
    },
    {
      id: "material",
      name: "Material Design 3",
      creator: "Google",
      link: "https://m3.material.io/",
      figmaLink: "https://www.figma.com/@materialdesign",
      color: "#4285F4",
      platforms: ["Android", "Web", "Flutter"],
      logo: (
        <svg viewBox="0 0 24 24" className="w-10 h-10">
          <path d="M12 2L2 19.74h20L12 2z" fill="#4285F4" />
          <circle cx="12" cy="14" r="4" fill="#EA4335" />
          <rect x="9" y="10" width="6" height="6" fill="#FBBC05" />
        </svg>
      )
    },
    {
      id: "samsung",
      name: "Samsung One UI",
      creator: "Samsung",
      link: "https://developer.samsung.com/one-ui",
      figmaLink: "https://www.figma.com/@samsung",
      color: "#034EA2",
      platforms: ["Android", "One UI", "Galaxy"],
      logo: (
        <svg viewBox="0 0 24 24" className="w-10 h-10" fill="#034EA2">
          <rect x="2" y="2" width="20" height="20" rx="6" fill="#034EA2" />
          <circle cx="12" cy="12" r="5" fill="#FFFFFF" />
          <circle cx="12" cy="12" r="2.5" fill="#034EA2" />
        </svg>
      )
    },
    {
      id: "fluent",
      name: "Fluent UI",
      creator: "Microsoft",
      link: "https://fluent2.microsoft.design/",
      figmaLink: "https://www.figma.com/@microsoft",
      color: "#0078D4",
      platforms: ["Windows", "Web", "React"],
      logo: (
        <svg viewBox="0 0 24 24" className="w-10 h-10">
          <rect x="2" y="2" width="9" height="9" fill="#F25022" />
          <rect x="13" y="2" width="9" height="9" fill="#7FBA00" />
          <rect x="2" y="13" width="9" height="9" fill="#00A4EF" />
          <rect x="13" y="13" width="9" height="9" fill="#FFB900" />
        </svg>
      )
    },
    {
      id: "atlassian",
      name: "Atlassian Design System",
      creator: "Atlassian",
      link: "https://atlassian.design/",
      figmaLink: "https://www.figma.com/@atlassian",
      color: "#0052CC",
      platforms: ["Web", "React"],
      logo: (
        <svg viewBox="0 0 24 24" className="w-10 h-10" fill="#0052CC">
          <path d="M22.5 12c0-5.8-4.7-10.5-10.5-10.5S1.5 6.2 1.5 12 6.2 22.5 12 22.5 22.5 17.8 22.5 12zm-12.7 5.2l-2.1-4.2 2.1-4.2h4.2l2.1 4.2-2.1 4.2h-4.2z" />
        </svg>
      )
    },
    {
      id: "carbon",
      name: "Carbon Design System",
      creator: "IBM",
      link: "https://carbondesignsystem.com/",
      figmaLink: "https://www.figma.com/@carbon",
      color: "#0F62FE",
      platforms: ["Web", "React", "Vue", "Angular"],
      logo: (
        <svg viewBox="0 0 24 24" className="w-10 h-10" fill="#0F62FE">
          <path d="M20 12c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8 8-3.6 8-8zm-14 0c0-3.3 2.7-6 6-6s6 2.7 6 6-2.7 6-6 6-6-2.7-6-6z" />
          <rect x="10" y="8" width="4" height="2" />
          <rect x="10" y="11" width="4" height="2" />
          <rect x="10" y="14" width="4" height="2" />
        </svg>
      )
    },
    {
      id: "polaris",
      name: "Shopify Polaris",
      creator: "Shopify",
      link: "https://polaris.shopify.com/",
      figmaLink: "https://www.figma.com/@shopify",
      color: "#008060",
      platforms: ["Web", "React", "E-Commerce"],
      logo: (
        <svg viewBox="0 0 24 24" className="w-10 h-10" fill="#008060">
          <path d="M19 6h-2c0-2.8-2.2-5-5-5S7 3.2 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.7 0 3 1.3 3 3H9c0-1.7 1.3-3 3-3zm7 17H5V8h2v2c0 .6.4 1 1 1s1-.4 1-1V8h6v2c0 .6.4 1 1 1s1-.4 1-1V8h2v12z" />
        </svg>
      )
    },
    {
      id: "ant",
      name: "Ant Design",
      creator: "Ant Group",
      link: "https://ant.design/",
      figmaLink: "https://www.figma.com/@antdesign",
      color: "#1677FF",
      platforms: ["Web", "React", "Enterprise"],
      logo: (
        <svg viewBox="0 0 24 24" className="w-10 h-10">
          <path d="M12 2l10 5.8v11.5L12 22 2 19.3V7.8L12 2zm0 3.5L5.5 8.7v6.6l6.5 3.3 6.5-3.3V8.7L12 5.5z" fill="#1677FF" />
          <path d="M12 8l4 2.3v4.6L12 17l-4-2.3v-4.6L12 8z" fill="#FF4D4F" />
        </svg>
      )
    }
  ];

  const filteredSystems = systems.filter(sys => {
    if (selectedPlatform === 'all') return true;
    if (selectedPlatform === 'mobile') return ['apple', 'samsung', 'material'].includes(sys.id);
    if (selectedPlatform === 'web') return ['material', 'fluent', 'atlassian', 'carbon', 'polaris', 'ant'].includes(sys.id);
    return true;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-8 max-w-[1280px] mx-auto w-full"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-bold text-zinc-950 dark:text-white tracking-tight">{t('systems.title')}</h1>
        <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
          {t('systems.description')}
        </p>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="inline-flex p-0.5 bg-zinc-100/90 dark:bg-zinc-900/90 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-2xs">
          <button
            type="button"
            onClick={() => setSelectedPlatform('all')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-md transition-all cursor-pointer ${
              selectedPlatform === 'all'
                ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white font-semibold shadow-2xs'
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            {t('systems.platform.all')}
          </button>
          <button
            type="button"
            onClick={() => setSelectedPlatform('web')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-md transition-all cursor-pointer ${
              selectedPlatform === 'web'
                ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white font-semibold shadow-2xs'
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            {t('systems.platform.web')}
          </button>
          <button
            type="button"
            onClick={() => setSelectedPlatform('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-md transition-all cursor-pointer ${
              selectedPlatform === 'mobile'
                ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white font-semibold shadow-2xs'
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            {t('systems.platform.mobile')}
          </button>
        </div>

        <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
          {filteredSystems.length} {t('context.systemsCount')}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSystems.map((system) => (
          <motion.div 
            key={system.name}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.15 }}
            className="bg-white dark:bg-[#101114] border border-zinc-200 dark:border-zinc-800/90 p-5 rounded-xl transition-all flex flex-col gap-4 group linear-card hover:border-zinc-300 dark:hover:border-zinc-700"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 bg-zinc-100 dark:bg-zinc-900 rounded-lg group-hover:scale-105 transition-transform border border-zinc-200/60 dark:border-zinc-800">
                {system.logo}
              </div>
              <a 
                href={system.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                title={t('systems.gotodocs')}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white tracking-tight">{system.name}</h3>
                <span className="text-[10px] font-mono font-medium px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded text-zinc-600 dark:text-zinc-300">
                  {system.creator}
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-3">
                {t(`systems.${system.id}.desc`)}
              </p>
            </div>

            {/* Platform Badges */}
            <div className="flex flex-wrap gap-1 pt-0.5">
              {system.platforms.map((plat) => (
                <span
                  key={plat}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
                >
                  {plat}
                </span>
              ))}
            </div>

            <div className="mt-auto pt-3 border-t border-zinc-100 dark:border-zinc-800/70 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <a 
                  href={system.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#5e6ad2] dark:text-[#828cf5] hover:underline flex items-center gap-1"
                >
                  {t('systems.docs')} <ExternalLink className="w-3 h-3" />
                </a>

                {system.figmaLink && (
                  <a 
                    href={system.figmaLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:underline flex items-center gap-1"
                  >
                    <Figma className="w-3 h-3" /> {t('systems.figma')}
                  </a>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                <div 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: system.color }} 
                />
                <span className="text-[9px] uppercase tracking-wider font-bold text-zinc-400 dark:text-zinc-500 font-mono">
                  Design System
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
