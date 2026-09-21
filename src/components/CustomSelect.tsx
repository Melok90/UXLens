import React, { useState, useRef, useEffect } from 'react';
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
  buttonClassName?: string;
  size?: 'sm' | 'md';
  ariaLabel?: string;
}

export default function CustomSelect({
  value,
  onChange,
  options,
  className = '',
  buttonClassName = '',
  size = 'sm',
  ariaLabel,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) {
      e.preventDefault();
      setIsOpen(false);
      buttonRef.current?.focus();
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        const currentIndex = options.findIndex(o => o.value === value);
        const nextIndex = e.key === 'ArrowDown'
          ? Math.min(options.length - 1, currentIndex + 1)
          : Math.max(0, currentIndex - 1);
        if (options[nextIndex]) {
          onChange(options[nextIndex].value);
        }
      }
    }
  };

  const pyClass = size === 'md' ? 'py-2.5 sm:py-3 text-sm min-h-[44px]' : 'py-1.5 text-xs min-h-[32px]';

  return (
    <div
      className={`relative ${size === 'sm' ? 'min-w-[150px]' : 'w-full'} ${isOpen ? 'z-30' : ''} ${className}`}
      ref={containerRef}
      onKeyDown={handleKeyDown}
    >
      <button
        ref={buttonRef}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel ? `${ariaLabel}: ${selectedOption?.label || value}` : selectedOption?.label || value}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between border border-zinc-200/90 dark:border-zinc-800 rounded-xl px-3.5 ${pyClass} outline-none bg-white dark:bg-zinc-900 font-medium cursor-pointer transition-colors hover:border-zinc-300 dark:hover:border-zinc-700 focus:border-[#5e6ad2] focus:ring-2 focus:ring-[#5e6ad2]/20 shadow-2xs ${buttonClassName}`}
      >
        <span className="truncate mr-2 text-zinc-900 dark:text-zinc-100">{selectedOption?.label}</span>
        <motion.div
           animate={{ rotate: isOpen ? 180 : 0 }}
           transition={{ duration: 0.15 }}
           className="pointer-events-none"
        >
          <ChevronDown className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" aria-hidden="true" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.12 }}
            role="listbox"
            tabIndex={-1}
            className="absolute z-50 w-full mt-1 bg-white dark:bg-[#101114] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl overflow-hidden py-1 max-h-60 overflow-y-auto"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={value === option.value}
                className={`w-full text-left px-3.5 ${size === 'md' ? 'py-2.5 text-sm min-h-[44px]' : 'py-1.5 text-xs min-h-[32px]'} flex items-center transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800/80 cursor-pointer ${
                  value === option.value
                    ? 'bg-zinc-100 dark:bg-zinc-800/90 text-zinc-950 dark:text-white font-semibold'
                    : 'text-zinc-700 dark:text-zinc-300'
                }`}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                  buttonRef.current?.focus();
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
