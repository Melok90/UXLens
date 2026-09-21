import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  className?: string;
}

export default function CustomSelect({ value, onChange, options, className = '' }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value) || options[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative min-w-[150px] ${isOpen ? 'z-30' : ''} ${className}`} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-1.5 text-xs outline-none bg-white dark:bg-zinc-900 font-medium cursor-pointer transition-colors hover:border-zinc-300 dark:hover:border-zinc-700 focus:border-[#5e6ad2] focus:ring-2 focus:ring-[#5e6ad2]/20"
      >
        <span className="truncate mr-2 text-zinc-900 dark:text-zinc-100">{selectedOption?.label}</span>
        <motion.div
           animate={{ rotate: isOpen ? 180 : 0 }}
           transition={{ duration: 0.15 }}
        >
          <ChevronDown className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.12 }}
            className="absolute z-50 w-full mt-1 bg-white dark:bg-[#101114] border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl overflow-hidden py-1 max-h-60 overflow-y-auto"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`w-full text-left px-3 py-1.5 text-xs transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800/80 cursor-pointer ${
                  value === option.value
                    ? 'bg-zinc-100 dark:bg-zinc-800/90 text-zinc-950 dark:text-white font-semibold'
                    : 'text-zinc-700 dark:text-zinc-300'
                }`}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
