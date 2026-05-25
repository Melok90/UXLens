import { ReactNode } from 'react';
import { ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

interface DesignSystemItem {
  id: string;
  name: string;
  creator: string;
  link: string;
  logo: ReactNode;
  color: string;
}

export default function SystemsPage() {
  const { t } = useLanguage();

  const systems: DesignSystemItem[] = [
    {
      id: "material",
      name: "Material Design 3",
      creator: "Google",
      link: "https://m3.material.io/",
      color: "#4285F4",
      logo: (
        <svg viewBox="0 0 24 24" className="w-12 h-12">
          <path d="M12 2L2 19.74h20L12 2z" fill="#4285F4" />
          <circle cx="12" cy="14" r="4" fill="#EA4335" />
          <rect x="9" y="10" width="6" height="6" fill="#FBBC05" />
        </svg>
      )
    },
    {
      id: "fluent",
      name: "Fluent UI",
      creator: "Microsoft",
      link: "https://fluent2.microsoft.design/",
      color: "#0078D4",
      logo: (
        <svg viewBox="0 0 24 24" className="w-12 h-12">
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
      color: "#0052CC",
      logo: (
        <svg viewBox="0 0 24 24" className="w-12 h-12" fill="#0052CC">
          <path d="M22.5 12c0-5.8-4.7-10.5-10.5-10.5S1.5 6.2 1.5 12 6.2 22.5 12 22.5 22.5 17.8 22.5 12zm-12.7 5.2l-2.1-4.2 2.1-4.2h4.2l2.1 4.2-2.1 4.2h-4.2z" />
        </svg>
      )
    },
    {
      id: "carbon",
      name: "Carbon Design System",
      creator: "IBM",
      link: "https://carbondesignsystem.com/",
      color: "#0F62FE",
      logo: (
        <svg viewBox="0 0 24 24" className="w-12 h-12" fill="#0F62FE">
          <path d="M20 12c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8 8-3.6 8-8zm-14 0c0-3.3 2.7-6 6-6s6 2.7 6 6-2.7 6-6 6-6-2.7-6-6z" />
          <rect x="10" y="8" width="4" height="2" />
          <rect x="10" y="11" width="4" height="2" />
          <rect x="10" y="14" width="4" height="2" />
        </svg>
      )
    },
    {
      id: "polaris",
      name: "Polaris",
      creator: "Shopify",
      link: "https://polaris.shopify.com/",
      color: "#008060",
      logo: (
        <svg viewBox="0 0 24 24" className="w-12 h-12" fill="#008060">
          <path d="M19 6h-2c0-2.8-2.2-5-5-5S7 3.2 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.7 0 3 1.3 3 3H9c0-1.7 1.3-3 3-3zm7 17H5V8h2v2c0 .6.4 1 1 1s1-.4 1-1V8h6v2c0 .6.4 1 1 1s1-.4 1-1V8h2v12z" />
        </svg>
      )
    },
    {
      id: "ant",
      name: "Ant Design",
      creator: "Ant Group",
      link: "https://ant.design/",
      color: "#1677FF",
      logo: (
        <svg viewBox="0 0 24 24" className="w-12 h-12">
          <path d="M12 2l10 5.8v11.5L12 22 2 19.3V7.8L12 2zm0 3.5L5.5 8.7v6.6l6.5 3.3 6.5-3.3V8.7L12 5.5z" fill="#1677FF" />
          <path d="M12 8l4 2.3v4.6L12 17l-4-2.3v-4.6L12 8z" fill="#FF4D4F" />
        </svg>
      )
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-8"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-black tracking-tight">{t('systems.title')}</h1>
        <p className="text-lg text-[#5d5f5f] max-w-2xl">
          {t('systems.description')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {systems.map((system) => (
          <div 
            key={system.name}
            className="bg-white border border-[#cfc4c5] p-8 rounded-xl hover:shadow-xl transition-all flex flex-col gap-6 group"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 bg-surface-container-low rounded-lg group-hover:scale-110 transition-transform">
                {system.logo}
              </div>
              <a 
                href={system.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 hover:bg-surface-container-low rounded-full transition-colors text-[#5d5f5f] hover:text-black"
                title={t('systems.gotodocs')}
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-black">{system.name}</h3>
                <span className="text-xs font-medium px-2 py-0.5 bg-surface-container-low border border-[#cfc4c5] rounded-full text-[#5d5f5f]">
                  {system.creator}
                </span>
              </div>
              <p className="text-[#5d5f5f] leading-relaxed line-clamp-3">
                {t(`systems.${system.id}.desc`)}
              </p>
            </div>

            <div className="mt-auto pt-4 flex items-center justify-between">
              <a 
                href={system.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-accent-blue hover:underline flex items-center gap-1"
              >
                {t('systems.docs')} <ExternalLink className="w-3 h-3" />
              </a>
              <div className="flex items-center gap-2">
                <div 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: system.color }} 
                />
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#5d5f5f]">
                  Design System
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
