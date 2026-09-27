import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Check, X, RotateCcw, Calendar, CheckCircle2 } from 'lucide-react';
import { ComponentState, ComponentVariant } from '../App';
import { useStore } from '../store/useStore';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

interface InteractiveButtonProps {
  system: string;
  variant: ComponentVariant;
  state: ComponentState;
  tText: (key: string) => string;
}

export const InteractiveButton: React.FC<InteractiveButtonProps> = ({
  system,
  variant,
  state,
  tText,
}) => {
  const [clicked, setClicked] = useState(false);
  const isProUser = useStore((s) => s.isProUser);
  const customText = useStore((s) => s.customText);
  const customBrandColor = useStore((s) => s.customBrandColor);
  const isRtl = useStore((s) => s.isRtl);

  const effectiveText = isProUser ? customText : '';
  const effectiveBrandColor = isProUser ? customBrandColor : null;
  const effectiveRtl = isProUser ? isRtl : false;

  const isLoading = state === 'loading';
  const isDisabled = state === 'disabled' || isLoading;

  const handleClick = () => {
    if (isDisabled) return;
    setClicked(true);
    setTimeout(() => setClicked(false), 800);
  };

  let base = 'font-medium text-sm transition-all outline-none flex items-center justify-center cursor-pointer select-none relative ';
  let hover = '';
  let active = '';
  let focus = '';
  let disabled = '!opacity-50 !cursor-not-allowed !shadow-none ';
  let errorFilled = '';
  let errorOutlined = '';

  if (system === 'Material Design 3') {
    base += 'rounded-full ';
    base += variant === 'icon' ? 'w-10 h-10 p-0 shadow-none ' : 'px-6 py-2.5 ';
    disabled += '!bg-black/10 !text-black/40 ';
    focus = '!ring-2 !ring-accent-blue !ring-offset-2 ';
    errorFilled = '!bg-[#B3261E] !text-white !ring-2 !ring-[#B3261E] !ring-offset-2 ';
    errorOutlined = '!text-[#B3261E] !border-[#B3261E] !ring-2 !ring-[#B3261E]/30 ';

    if (variant === 'primary' || variant === 'default' || variant === 'icon') {
      base += 'bg-accent-blue text-white shadow-md ';
      hover = 'hover:shadow-lg hover:brightness-110 ';
      active = 'active:scale-95 ';
    } else if (variant === 'secondary') {
      base += 'border border-gray-400 text-accent-blue bg-white ';
      hover = 'hover:bg-accent-blue/10 ';
      active = 'active:bg-accent-blue/20 ';
    } else if (variant === 'tertiary') {
      base += 'text-accent-blue bg-transparent ';
      hover = 'hover:bg-accent-blue/10 ';
      active = 'active:bg-accent-blue/20 ';
    } else if (variant === 'destructive') {
      base += 'bg-[#B3261E] text-white shadow-md ';
      hover = 'hover:shadow-lg hover:brightness-110 ';
      active = 'active:scale-95 ';
      focus = '!ring-2 !ring-[#B3261E] !ring-offset-2 ';
    }
  } else if (system === 'Fluent UI') {
    base += 'rounded-[2px] ';
    base += variant === 'icon' ? 'w-8 h-8 p-0 ' : 'px-4 py-2 ';
    disabled += '!bg-gray-300 !border-none !text-white ';
    focus = '!outline !outline-2 !outline-[#0078D4] !outline-offset-1 ';
    errorFilled = '!bg-[#A4262C] !text-white !outline !outline-2 !outline-[#A4262C] !outline-offset-1 ';
    errorOutlined = '!text-[#A4262C] !border-[#A4262C] !outline !outline-1 !outline-[#A4262C] ';

    if (variant === 'primary' || variant === 'default') {
      base += 'bg-[#0078D4] text-white ';
      hover = 'hover:brightness-110 ';
      active = 'active:bg-[#005a9e] ';
    } else if (variant === 'secondary') {
      base += 'border border-[#8A8886] text-[#242424] bg-white ';
      hover = 'hover:bg-[#f3f2f1] ';
      active = 'active:bg-[#edebe9] ';
    } else if (variant === 'tertiary') {
      base += 'text-[#0078D4] bg-transparent ';
      hover = 'hover:bg-[#f3f2f1] ';
      active = 'active:bg-[#edebe9] ';
    } else if (variant === 'destructive') {
      base += 'bg-[#A4262C] text-white ';
      hover = 'hover:bg-[#8e2025] ';
      active = 'active:bg-[#781b20] ';
      focus = '!outline !outline-2 !outline-[#A4262C] !outline-offset-1 ';
    } else if (variant === 'icon') {
      base += 'text-[#242424] bg-transparent ';
      hover = 'hover:bg-[#f3f2f1] ';
      active = 'active:bg-[#edebe9] ';
    }
  } else if (system === 'Atlassian') {
    base += 'rounded-[3px] font-semibold text-xs ';
    base += variant === 'icon' ? 'w-8 h-8 p-0 ' : 'px-4 py-2 ';
    disabled += '!bg-[#091E4208] !text-[#091E424F] ';
    focus = '!ring-2 !ring-[#4C90FF] !ring-offset-1 ';
    errorFilled = '!bg-[#DE350B] !text-white !ring-2 !ring-[#DE350B] ';
    errorOutlined = '!text-[#DE350B] !border-[#DE350B] !ring-2 !ring-[#DE350B]/30 ';

    if (variant === 'primary' || variant === 'default') {
      base += 'bg-[#0052CC] text-white ';
      hover = 'hover:bg-[#0065FF] ';
      active = 'active:bg-[#0747A6] ';
    } else if (variant === 'secondary') {
      base += 'bg-[#091E420F] text-[#172B4D] ';
      hover = 'hover:bg-[#091E4214] ';
      active = 'active:bg-[#091E4224] ';
    } else if (variant === 'tertiary') {
      base += 'text-[#0052CC] bg-transparent ';
      hover = 'hover:bg-[#091E4208] ';
      active = 'active:bg-[#091E4214] ';
    } else if (variant === 'destructive') {
      base += 'bg-[#DE350B] text-white ';
      hover = 'hover:bg-[#FF5630] ';
      active = 'active:bg-[#BF2600] ';
    } else if (variant === 'icon') {
      base += 'text-[#172B4D] bg-[#091E420F] ';
      hover = 'hover:bg-[#091E4214] ';
      active = 'active:bg-[#091E4224] ';
    }
  } else if (system === 'IBM Carbon') {
    base += 'rounded-none text-xs font-normal ';
    base += variant === 'icon' ? 'w-10 h-10 p-0 ' : 'px-5 py-3 ';
    disabled += '!bg-[#e0e0e0] !text-[#8d8d8d] ';
    focus = '!outline !outline-2 !outline-[#0f62fe] !outline-offset-1 ';
    errorFilled = '!bg-[#da1e28] !text-white !outline !outline-2 !outline-[#da1e28] ';
    errorOutlined = '!text-[#da1e28] !border-[#da1e28] !outline !outline-1 !outline-[#da1e28] ';

    if (variant === 'primary' || variant === 'default') {
      base += 'bg-[#0f62fe] text-white ';
      hover = 'hover:bg-[#0353e9] ';
      active = 'active:bg-[#002d9c] ';
    } else if (variant === 'secondary') {
      base += 'bg-[#393939] text-white ';
      hover = 'hover:bg-[#4c4c4c] ';
      active = 'active:bg-[#6f6f6f] ';
    } else if (variant === 'tertiary') {
      base += 'border border-[#0f62fe] text-[#0f62fe] bg-transparent ';
      hover = 'hover:bg-[#0f62fe] hover:text-white ';
      active = 'active:bg-[#002d9c] active:text-white ';
    } else if (variant === 'destructive') {
      base += 'bg-[#da1e28] text-white ';
      hover = 'hover:bg-[#ba1b23] ';
      active = 'active:bg-[#750e13] ';
    } else if (variant === 'icon') {
      base += 'bg-white text-[#161616] border border-[#e0e0e0] ';
      hover = 'hover:bg-[#e5e5e5] ';
      active = 'active:bg-[#c6c6c6] ';
    }
  } else if (system === 'Shopify Polaris') {
    base += 'rounded-lg border shadow-xs text-xs font-semibold ';
    base += variant === 'icon' ? 'w-9 h-9 p-0 ' : 'px-4 py-2 ';
    disabled += '!bg-gray-100 !border-gray-200 !text-gray-400 ';
    focus = '!ring-2 !ring-[#008060] !ring-offset-2 ';
    errorFilled = '!bg-[#D82C0D] !text-white !border-transparent !ring-2 !ring-[#D82C0D] ';
    errorOutlined = '!text-[#D82C0D] !border-[#D82C0D] !ring-2 !ring-[#D82C0D]/30 ';

    if (variant === 'primary' || variant === 'default') {
      base += 'bg-[#008060] border-transparent text-white ';
      hover = 'hover:bg-[#006e52] ';
      active = 'active:bg-[#005e46] ';
    } else if (variant === 'secondary') {
      base += 'bg-white border-[#c9cccf] text-[#202223] ';
      hover = 'hover:bg-[#f6f6f7] ';
      active = 'active:bg-[#f1f2f3] ';
    } else if (variant === 'tertiary') {
      base += 'border-transparent text-[#202223] bg-transparent shadow-none ';
      hover = 'hover:bg-[#f6f6f7] ';
      active = 'active:bg-[#f1f2f3] ';
    } else if (variant === 'destructive') {
      base += 'bg-[#D82C0D] border-transparent text-white ';
      hover = 'hover:bg-[#bc2200] ';
      active = 'active:bg-[#991b00] ';
    } else if (variant === 'icon') {
      base += 'border-transparent text-[#202223] bg-transparent shadow-none ';
      hover = 'hover:bg-[#f6f6f7] ';
      active = 'active:bg-[#f1f2f3] ';
    }
  } else if (system === 'Ant Design') {
    base += 'rounded-md shadow-xs text-xs ';
    base += variant === 'icon' ? 'w-8 h-8 p-0 ' : 'px-4 py-2 ';
    disabled += '!bg-gray-100 !text-gray-400 !border-gray-200 ';
    focus = '!ring-3 !ring-[#1677ff]/30 ';
    errorFilled = '!bg-[#ff4d4f] !text-white !border-transparent !ring-3 !ring-[#ff4d4f]/30 ';
    errorOutlined = '!text-[#ff4d4f] !border-[#ff4d4f] !ring-3 !ring-[#ff4d4f]/20 ';

    if (variant === 'primary' || variant === 'default') {
      base += 'bg-[#1668dc] border border-transparent text-white ';
      hover = 'hover:bg-[#4096ff] ';
      active = 'active:bg-[#0958d9] ';
    } else if (variant === 'secondary') {
      base += 'bg-white border border-[#d9d9d9] text-[#000000e0] ';
      hover = 'hover:text-[#4096ff] hover:border-[#4096ff] ';
      active = 'active:text-[#0958d9] active:border-[#0958d9] ';
    } else if (variant === 'tertiary') {
      base += 'text-[#1668dc] bg-transparent shadow-none ';
      hover = 'hover:bg-[#0000000a] ';
      active = 'active:bg-[#00000014] ';
    } else if (variant === 'destructive') {
      base += 'bg-[#ff4d4f] border border-transparent text-white ';
      hover = 'hover:bg-[#ff7875] ';
      active = 'active:bg-[#d9363e] ';
    } else if (variant === 'icon') {
      base += 'bg-white border border-[#d9d9d9] text-[#000000e0] ';
      hover = 'hover:text-[#4096ff] hover:border-[#4096ff] ';
      active = 'active:text-[#0958d9] active:border-[#0958d9] ';
    }
  } else if (system === 'Apple iOS HIG') {
    base += 'rounded-[12px] font-semibold text-sm tracking-tight ';
    base += variant === 'icon' ? 'w-10 h-10 p-0 rounded-full ' : 'px-5 py-2.5 min-h-[44px] ';
    disabled += '!bg-[#7676801f] !text-[#7676805c] ';
    focus = '!ring-3 !ring-[#0071E3]/40 !ring-offset-2 ';
    errorFilled = '!bg-[#FF3B30] !text-white !ring-2 !ring-[#FF3B30] ';
    errorOutlined = '!text-[#FF3B30] !border-[#FF3B30] !ring-2 !ring-[#FF3B30]/30 ';

    if (variant === 'primary' || variant === 'default') {
      base += 'bg-[#0071E3] text-white shadow-xs ';
      hover = 'hover:bg-[#0066d6] ';
      active = 'active:scale-95 active:brightness-90 ';
    } else if (variant === 'secondary') {
      base += 'bg-[#007AFF]/12 text-[#007AFF] ';
      hover = 'hover:bg-[#007AFF]/20 ';
      active = 'active:scale-95 active:bg-[#007AFF]/28 ';
    } else if (variant === 'tertiary') {
      base += 'text-[#007AFF] bg-transparent ';
      hover = 'hover:bg-[#007AFF]/10 ';
      active = 'active:scale-95 active:bg-[#007AFF]/18 ';
    } else if (variant === 'destructive') {
      base += 'bg-[#FF3B30] text-white ';
      hover = 'hover:bg-[#d93128] ';
      active = 'active:scale-95 ';
    } else if (variant === 'icon') {
      base += 'text-[#007AFF] bg-[#007AFF]/12 ';
      hover = 'hover:bg-[#007AFF]/20 ';
      active = 'active:scale-95 ';
    }
  } else if (system === 'Samsung One UI') {
    base += 'rounded-[20px] font-bold text-sm ';
    base += variant === 'icon' ? 'w-11 h-11 p-0 rounded-2xl ' : 'px-6 py-2.5 min-h-[48px] ';
    disabled += '!bg-[#DFE2E6] !text-[#8D9299] ';
    focus = '!ring-2 !ring-[#034EA2] !ring-offset-2 ';
    errorFilled = '!bg-[#E53935] !text-white !ring-2 !ring-[#E53935] ';
    errorOutlined = '!text-[#E53935] !border-[#E53935] !ring-2 !ring-[#E53935]/30 ';

    if (variant === 'primary' || variant === 'default') {
      base += 'bg-[#034EA2] text-white shadow-sm ';
      hover = 'hover:bg-[#023e82] ';
      active = 'active:scale-[0.96] ';
    } else if (variant === 'secondary') {
      base += 'bg-[#f0f4fa] text-[#034EA2] border border-[#034EA2]/30 ';
      hover = 'hover:bg-[#e4ebf7] ';
      active = 'active:scale-[0.96] active:bg-[#d5e2f5] ';
    } else if (variant === 'tertiary') {
      base += 'text-[#034EA2] bg-transparent ';
      hover = 'hover:bg-[#034EA2]/10 ';
      active = 'active:scale-[0.96] active:bg-[#034EA2]/20 ';
    } else if (variant === 'destructive') {
      base += 'bg-[#E53935] text-white ';
      hover = 'hover:bg-[#c62828] ';
      active = 'active:scale-[0.96] ';
    } else if (variant === 'icon') {
      base += 'text-[#034EA2] bg-[#034EA2]/10 ';
      hover = 'hover:bg-[#034EA2]/20 ';
      active = 'active:scale-[0.96] ';
    }
  }

  const isOutlined = variant === 'secondary' || variant === 'tertiary';
  let appliedStateClass = '';
  if (state === 'hover') appliedStateClass = hover;
  if (state === 'focus') appliedStateClass = focus;
  if (state === 'active') appliedStateClass = active;
  if (state === 'disabled') appliedStateClass = disabled;
  if (state === 'error') appliedStateClass = isOutlined ? errorOutlined : errorFilled;

  const buttonLabel = effectiveText.trim() ? effectiveText : tText('Основное действие');

  const customBrandStyle: React.CSSProperties = {};
  if (effectiveBrandColor && state !== 'disabled' && state !== 'error') {
    if (variant === 'primary' || variant === 'default') {
      customBrandStyle.backgroundColor = effectiveBrandColor;
      customBrandStyle.borderColor = 'transparent';
      customBrandStyle.color = '#ffffff';
    } else if (variant === 'secondary') {
      customBrandStyle.color = effectiveBrandColor;
      customBrandStyle.borderColor = effectiveBrandColor;
    } else if (variant === 'tertiary') {
      customBrandStyle.color = effectiveBrandColor;
    } else if (variant === 'icon') {
      customBrandStyle.color = effectiveBrandColor;
    }
  }

  const content = isLoading ? (
    <div className={`flex items-center justify-center ${variant === 'icon' ? '' : 'gap-2'}`}>
      <svg className={`animate-spin ${variant === 'icon' ? 'h-4 w-4' : 'h-3.5 w-3.5'}`} viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
      {variant !== 'icon' && <span className="truncate max-w-[210px]">{buttonLabel}</span>}
    </div>
  ) : variant === 'icon' ? (
    <Search size={16} />
  ) : (
    <span className="flex items-center gap-1.5 truncate max-w-[220px]">
      {clicked && <Check className="w-3.5 h-3.5 shrink-0 animate-in fade-in zoom-in-75" />}
      <span className="truncate">{buttonLabel}</span>
    </span>
  );

  return (
    <div dir={effectiveRtl ? 'rtl' : 'ltr'} className="flex flex-col items-center gap-2 max-w-full">
      <motion.button
        whileHover={isDisabled ? undefined : { scale: 1.03 }}
        whileTap={isDisabled ? undefined : { scale: 0.95 }}
        onClick={handleClick}
        className={`${base} ${appliedStateClass} ${hover} ${active}`}
        style={customBrandStyle}
        disabled={isDisabled}
      >
        {content}
      </motion.button>
      {!isDisabled && (
        <span className="text-[10px] text-[#8e8e93] select-none">
          {clicked ? '✓ Нажато / Clicked' : 'Кликните для проверки'}
        </span>
      )}
    </div>
  );
};

interface InteractiveSwitchProps {
  system: string;
  state: ComponentState;
}

export const InteractiveSwitch: React.FC<InteractiveSwitchProps> = ({ system, state }) => {
  const [checked, setChecked] = useState(true);
  const isProUser = useStore((s) => s.isProUser);
  const customBrandColor = useStore((s) => s.customBrandColor);
  const isRtl = useStore((s) => s.isRtl);
  const effectiveBrandColor = isProUser ? customBrandColor : null;
  const effectiveRtl = isProUser ? isRtl : false;
  const { t, language } = useLanguage();
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';

  const isDisabled = state === 'disabled';
  const isHoveredState = state === 'hover';
  const isFocusedState = state === 'focus';

  const toggle = () => {
    if (isDisabled) return;
    setChecked(!checked);
  };

  const getSystemConfig = () => {
    switch (system) {
      case 'Material Design 3':
        return {
          trackW: 52,
          trackH: 32,
          thumbSize: checked ? 24 : 16,
          translateX: checked ? 22 : 2,
          activeBg: '#6750a4',
          inactiveBg: isDark ? '#36343b' : '#e7e0ec',
          inactiveHoverBg: isDark ? '#43404a' : '#ded8e4',
          border: checked ? 'border-none' : isDark ? 'border-2 border-[#938f99]' : 'border-2 border-[#79747e]',
          borderHover: checked ? 'border-none' : isDark ? 'border-2 border-[#cac4d0]' : 'border-2 border-[#49454f]',
          thumbColor: checked ? '#ffffff' : isDark ? '#cac4d0' : '#79747e',
          rounded: 'rounded-full',
        };
      case 'Fluent UI':
        return {
          trackW: 40,
          trackH: 20,
          thumbSize: 14,
          translateX: checked ? 22 : 2,
          activeBg: '#0078d4',
          inactiveBg: isDark ? '#292827' : '#f3f2f1',
          inactiveHoverBg: isDark ? '#3b3a39' : '#edebe9',
          border: checked ? 'border border-[#0078d4]' : isDark ? 'border border-[#797775]' : 'border border-[#8a8886]',
          borderHover: checked ? 'border border-[#106ebe]' : isDark ? 'border border-[#a19f9d]' : 'border border-[#323130]',
          thumbColor: checked ? '#ffffff' : isDark ? '#d1d1d1' : '#605e5c',
          rounded: 'rounded-full',
        };
      case 'Atlassian':
        return {
          trackW: 40,
          trackH: 20,
          thumbSize: 16,
          translateX: checked ? 21 : 2,
          activeBg: '#0052cc',
          inactiveBg: isDark ? 'rgba(255,255,255,0.16)' : '#091e4224',
          inactiveHoverBg: isDark ? 'rgba(255,255,255,0.24)' : '#091e4236',
          border: 'border-none',
          borderHover: 'border-none',
          thumbColor: '#ffffff',
          rounded: 'rounded-full',
        };
      case 'IBM Carbon':
        return {
          trackW: 48,
          trackH: 24,
          thumbSize: 18,
          translateX: checked ? 26 : 2,
          activeBg: '#0f62fe',
          inactiveBg: isDark ? '#525252' : '#8d8d8d',
          inactiveHoverBg: isDark ? '#6f6f6f' : '#757575',
          border: 'border-none',
          borderHover: 'border-none',
          thumbColor: '#ffffff',
          rounded: 'rounded-full',
        };
      case 'Shopify Polaris':
        return {
          trackW: 44,
          trackH: 24,
          thumbSize: 20,
          translateX: checked ? 21 : 2,
          activeBg: '#008060',
          inactiveBg: isDark ? '#44474a' : '#c9cccf',
          inactiveHoverBg: isDark ? '#5c5f62' : '#b2b5b8',
          border: 'border-none',
          borderHover: 'border-none',
          thumbColor: '#ffffff',
          rounded: 'rounded-full',
        };
      case 'Apple iOS HIG':
        return {
          trackW: 51,
          trackH: 31,
          thumbSize: 27,
          translateX: checked ? 22 : 2,
          activeBg: '#34C759',
          inactiveBg: isDark ? '#39393d' : '#E9E9EB',
          inactiveHoverBg: isDark ? '#48484a' : '#dededf',
          border: 'border-none',
          borderHover: 'border-none',
          thumbColor: '#ffffff',
          rounded: 'rounded-full',
        };
      case 'Samsung One UI':
        return {
          trackW: 50,
          trackH: 28,
          thumbSize: 24,
          translateX: checked ? 24 : 2,
          activeBg: '#034EA2',
          inactiveBg: isDark ? '#3a3d42' : '#DFE2E6',
          inactiveHoverBg: isDark ? '#4b5057' : '#cfd3d8',
          border: 'border-none',
          borderHover: 'border-none',
          thumbColor: '#ffffff',
          rounded: 'rounded-full',
        };
      case 'Ant Design':
      default:
        return {
          trackW: 44,
          trackH: 22,
          thumbSize: 18,
          translateX: checked ? 23 : 2,
          activeBg: '#1677ff',
          inactiveBg: isDark ? 'rgba(255,255,255,0.25)' : '#00000040',
          inactiveHoverBg: isDark ? 'rgba(255,255,255,0.35)' : '#00000055',
          border: 'border-none',
          borderHover: 'border-none',
          thumbColor: '#ffffff',
          rounded: 'rounded-full',
        };
    }
  };

  const cfg = getSystemConfig();
  const activeBgColor = (effectiveBrandColor && !isDisabled) ? effectiveBrandColor : cfg.activeBg;

  const currentBg = checked 
    ? activeBgColor 
    : (isHoveredState ? cfg.inactiveHoverBg : cfg.inactiveBg);

  const currentBorder = isHoveredState ? cfg.borderHover : cfg.border;

  return (
    <div dir={effectiveRtl ? 'rtl' : 'ltr'} className="flex flex-col items-center gap-2">
      <div
        role="switch"
        aria-checked={checked}
        aria-label={`${system} Switch`}
        tabIndex={isDisabled ? -1 : 0}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            toggle();
          }
        }}
        className={`relative flex items-center transition-all duration-200 outline-none select-none ${cfg.rounded} ${currentBorder} ${
          isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:brightness-105'
        } ${
          isHoveredState ? 'brightness-105 scale-[1.02]' : ''
        } ${
          isFocusedState ? 'ring-2 ring-accent-blue ring-offset-2 dark:ring-offset-zinc-900 shadow-sm' : 'focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900'
        }`}
        style={{
          width: `${cfg.trackW}px`,
          height: `${cfg.trackH}px`,
          backgroundColor: currentBg,
        }}
      >
        <motion.div
          animate={{
            x: cfg.translateX,
            width: `${cfg.thumbSize}px`,
            height: `${cfg.thumbSize}px`,
            backgroundColor: cfg.thumbColor,
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className={`${cfg.rounded} shadow-sm flex items-center justify-center transition-colors`}
        >
          {system === 'Material Design 3' && checked && (
            <Check className="w-3 h-3" style={{ color: activeBgColor }} strokeWidth={3} />
          )}
        </motion.div>
      </div>
      <span className="text-[10px] text-zinc-500 dark:text-zinc-400 select-none font-medium">
        {checked ? t('preview.switch.on') : t('preview.switch.off')}
      </span>
    </div>
  );
};

interface InteractiveInputProps {
  system: string;
  state: ComponentState;
  placeholder?: string;
  label?: string;
}

export const InteractiveInput: React.FC<InteractiveInputProps> = ({
  system,
  state,
  placeholder,
  label,
}) => {
  const isProUser = useStore((s) => s.isProUser);
  const customText = useStore((s) => s.customText);
  const customBrandColor = useStore((s) => s.customBrandColor);
  const isRtl = useStore((s) => s.isRtl);
  const { t, language } = useLanguage();

  const effectivePlaceholder = placeholder || t('preview.input.placeholder');
  const effectiveLabel = label || t('preview.input.label');
  const clearTitle = t('preview.input.clear');

  const effectiveText = isProUser ? customText : '';
  const effectiveBrandColor = isProUser ? customBrandColor : null;
  const effectiveRtl = isProUser ? isRtl : false;

  const [userTyped, setUserTyped] = useState<string | null>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const isDisabled = state === 'disabled';
  const isError = state === 'error';
  const isHovered = state === 'hover';
  const isFocused = state === 'focus' || isInputFocused;

  const currentValue = userTyped !== null ? userTyped : (effectiveText.trim() ? effectiveText : '');

  const clear = () => {
    if (isDisabled) return;
    setUserTyped('');
  };

  if (system === 'Material Design 3') {
    const m3Border = isError
      ? 'border-[#B3261E] dark:border-[#F2B8B5] border-b-2'
      : isFocused
      ? 'border-accent-blue border-b-2'
      : isHovered
      ? 'border-[#1D1B20] dark:border-[#E6E1E5] border-b-2 hover:border-[#1D1B20] dark:hover:border-[#E6E1E5]'
      : 'border-[#49454F] dark:border-[#938F99] border-b hover:border-b-2 hover:border-[#1D1B20] dark:hover:border-[#E6E1E5]';

    const m3Bg = isError
      ? 'bg-[#E7E0EC] dark:bg-[#2B2930]'
      : isFocused
      ? 'bg-[#ECE6F0] dark:bg-[#36343B]'
      : isHovered
      ? 'bg-[#DED8E4] dark:bg-[#36343B]'
      : 'bg-[#E7E0EC] dark:bg-[#2B2930] hover:bg-[#DED8E4] dark:hover:bg-[#36343B]';

    const m3Style: React.CSSProperties = {};
    if (effectiveBrandColor && isFocused && !isError) {
      m3Style.borderBottomColor = effectiveBrandColor;
    }

    const m3LabelStyle: React.CSSProperties = {};
    if (effectiveBrandColor && (isFocused || currentValue.length > 0) && !isError) {
      m3LabelStyle.color = effectiveBrandColor;
    }

    return (
      <div dir={effectiveRtl ? 'rtl' : 'ltr'} className="w-full max-w-[240px] flex flex-col gap-1 text-left relative">
        <div
          className={`px-4 pt-4 pb-2 rounded-t-[4px] transition-all relative ${m3Bg} ${m3Border} ${
            isDisabled ? 'opacity-50 cursor-not-allowed !bg-black/5 dark:!bg-white/5' : 'cursor-text'
          }`}
          style={m3Style}
        >
          <span
            className={`absolute transition-all duration-150 text-[11px] pointer-events-none select-none ${
              isFocused || currentValue.length > 0
                ? 'top-1.5 text-accent-blue dark:text-blue-400 font-medium'
                : 'top-3.5 text-sm text-[#49454F] dark:text-[#CAC4D0]'
            } ${isError ? '!text-[#B3261E] dark:!text-[#F2B8B5]' : ''}`}
            style={m3LabelStyle}
          >
            {effectiveLabel}
          </span>
          <div className="flex items-center justify-between mt-1">
            <input
              type="text"
              value={currentValue}
              onChange={(e) => setUserTyped(e.target.value)}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              disabled={isDisabled}
              placeholder={isFocused && currentValue.length === 0 ? effectivePlaceholder : ''}
              className="bg-transparent border-none outline-none w-full text-[#1D1B20] dark:text-[#E6E1E5] text-sm pt-1 placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
            />
            {currentValue.length > 0 && !isDisabled && (
              <button
                type="button"
                onClick={clear}
                className="text-[#49454F] hover:text-black dark:text-[#CAC4D0] dark:hover:text-white p-0.5 cursor-pointer"
                title={clearTitle}
                aria-label={clearTitle}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (system === 'Fluent UI') {
    const fluentBorder = isError
      ? 'border-[#A4262C] dark:border-[#F1707B] ring-1 ring-[#A4262C] dark:ring-[#F1707B]'
      : isFocused
      ? 'border-[#0078D4] dark:border-[#2886DE] ring-1 ring-[#0078D4] dark:ring-[#2886DE]'
      : isHovered
      ? 'border-[#323130] dark:border-[#D1D1D1]'
      : 'border-[#8A8886] dark:border-[#505050] hover:border-[#323130] dark:hover:border-[#D1D1D1]';

    const fluentStyle: React.CSSProperties = {};
    if (effectiveBrandColor && isFocused && !isError) {
      fluentStyle.borderColor = effectiveBrandColor;
      fluentStyle.boxShadow = `0 0 0 1px ${effectiveBrandColor}`;
    }

    return (
      <div dir={effectiveRtl ? 'rtl' : 'ltr'} className="w-full max-w-[240px] text-left">
        <div
          className={`flex items-center px-3 py-1.5 rounded-[2px] bg-white dark:bg-[#202020] border transition-all ${fluentBorder} ${
            isDisabled ? '!bg-[#F3F2F1] dark:!bg-[#292827] text-[#A19F9D] opacity-60 cursor-not-allowed' : ''
          }`}
          style={fluentStyle}
        >
          <input
            type="text"
            value={currentValue}
            onChange={(e) => setUserTyped(e.target.value)}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            disabled={isDisabled}
            className="w-full bg-transparent border-none outline-none text-xs text-[#242424] dark:text-[#F3F2F1] placeholder:text-[#797775] dark:placeholder:text-[#979593]"
            placeholder={effectivePlaceholder}
          />
          {currentValue.length > 0 && !isDisabled && (
            <button
              type="button"
              onClick={clear}
              className="text-[#797775] hover:text-black dark:text-[#979593] dark:hover:text-white cursor-pointer ml-1"
              title={clearTitle}
              aria-label={clearTitle}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // Generic fallback for Apple iOS, Samsung One UI, IBM Carbon, Atlassian, Shopify Polaris, Ant Design
  const getSystemContainerClasses = () => {
    if (system === 'Apple iOS HIG') {
      const radius = 'rounded-xl';
      if (isError) return `${radius} border border-[#FF3B30] ring-2 ring-[#FF3B30]/30 bg-[#767680]/10 dark:bg-[#767680]/20`;
      if (isFocused) return `${radius} border border-[#007AFF] ring-2 ring-[#007AFF]/30 bg-white dark:bg-[#1C1C1E]`;
      if (isHovered) return `${radius} border border-[#8E8E93] dark:border-[#636366] bg-[#767680]/15 dark:bg-[#767680]/25`;
      return `${radius} border border-[#D1D1D6] dark:border-[#3A3A3C] hover:border-[#8E8E93] dark:hover:border-[#636366] bg-[#767680]/10 dark:bg-[#767680]/20 hover:bg-[#767680]/15 dark:hover:bg-[#767680]/25`;
    }

    if (system === 'Samsung One UI') {
      const radius = 'rounded-2xl';
      if (isError) return `${radius} border border-[#E53935] ring-2 ring-[#E53935]/30 bg-[#F2F4F7] dark:bg-[#1E2024]`;
      if (isFocused) return `${radius} border border-[#034EA2] dark:border-[#528AE4] ring-2 ring-[#034EA2]/30 dark:ring-[#528AE4]/30 bg-[#F2F4F7] dark:bg-[#1E2024]`;
      if (isHovered) return `${radius} border border-[#034EA2]/60 dark:border-[#528AE4]/60 bg-[#E8EBF0] dark:bg-[#25282E] shadow-2xs`;
      return `${radius} border border-[#DFE2E6] dark:border-[#383B40] hover:border-[#034EA2]/60 dark:hover:border-[#528AE4]/60 bg-[#F2F4F7] dark:bg-[#1E2024] hover:bg-[#E8EBF0] dark:hover:bg-[#25282E]`;
    }

    if (system === 'IBM Carbon') {
      const radius = 'rounded-none';
      if (isError) return `${radius} bg-[#F4F4F4] dark:bg-[#262626] border-b-2 border-[#DA1E28] outline outline-2 outline-[#DA1E28] outline-offset-[-2px]`;
      if (isFocused) return `${radius} bg-[#F4F4F4] dark:bg-[#262626] border-b-2 border-[#0F62FE] outline outline-2 outline-[#0F62FE] outline-offset-[-2px]`;
      if (isHovered) return `${radius} bg-[#E5E5E5] dark:bg-[#353535] border-b-2 border-[#161616] dark:border-[#F4F4F4]`;
      return `${radius} bg-[#F4F4F4] dark:bg-[#262626] hover:bg-[#E5E5E5] dark:hover:bg-[#353535] border-b border-[#8D8D8D] dark:border-[#6F6F6F] hover:border-b-2 hover:border-[#161616] dark:hover:border-[#F4F4F4]`;
    }

    if (system === 'Atlassian') {
      const radius = 'rounded-[3px]';
      if (isError) return `${radius} bg-white dark:bg-[#161B22] border-2 border-[#DE350B] ring-2 ring-[#DE350B]/30`;
      if (isFocused) return `${radius} bg-white dark:bg-[#161B22] border-2 border-[#0052CC] ring-2 ring-[#4C90FF]/30`;
      if (isHovered) return `${radius} bg-[#EBECF0] dark:bg-[#262C36] border-2 border-[#C1C7D0] dark:border-[#444C56]`;
      return `${radius} bg-[#FAFBFC] dark:bg-[#1C2128] hover:bg-[#EBECF0] dark:hover:bg-[#262C36] border-2 border-[#DFE1E6] dark:border-[#30363D] hover:border-[#C1C7D0] dark:hover:border-[#444C56]`;
    }

    if (system === 'Shopify Polaris') {
      const radius = 'rounded-lg';
      if (isError) return `${radius} bg-white dark:bg-[#202123] border border-red-500 ring-2 ring-red-500/20`;
      if (isFocused) return `${radius} bg-white dark:bg-[#202123] border border-[#008060] ring-2 ring-[#008060]/20`;
      if (isHovered) return `${radius} bg-white dark:bg-[#202123] border border-[#5C5F62] dark:border-[#8C9196] shadow-2xs`;
      return `${radius} bg-white dark:bg-[#202123] border border-[#8C9196] dark:border-[#5C5F62] hover:border-[#5C5F62] dark:hover:border-[#8C9196]`;
    }

    // Ant Design / Default
    const radius = 'rounded-md';
    if (isError) return `${radius} bg-white dark:bg-[#141414] border border-[#FF4D4F] ring-2 ring-[#FF4D4F]/20`;
    if (isFocused) return `${radius} bg-white dark:bg-[#141414] border border-[#1677FF] ring-2 ring-[#1677FF]/20`;
    if (isHovered) return `${radius} bg-white dark:bg-[#141414] border border-[#4096FF] dark:border-[#1677FF] shadow-2xs`;
    return `${radius} bg-white dark:bg-[#141414] border border-[#D9D9D9] dark:border-[#424242] hover:border-[#4096FF] dark:hover:border-[#1677FF]`;
  };

  const genericStyle: React.CSSProperties = {};
  if (effectiveBrandColor && isFocused && !isError) {
    genericStyle.borderColor = effectiveBrandColor;
    genericStyle.boxShadow = `0 0 0 2px ${effectiveBrandColor}33`;
  }

  return (
    <div dir={effectiveRtl ? 'rtl' : 'ltr'} className="w-full max-w-[240px] text-left">
      <div
        className={`flex items-center px-3 py-1.5 transition-all ${getSystemContainerClasses()} ${
          isDisabled ? 'opacity-50 cursor-not-allowed !bg-gray-100 dark:!bg-zinc-800' : ''
        }`}
        style={genericStyle}
      >
        <input
          type="text"
          value={currentValue}
          onChange={(e) => setUserTyped(e.target.value)}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          disabled={isDisabled}
          className="w-full bg-transparent border-none outline-none text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
          placeholder={effectivePlaceholder}
        />
        {currentValue.length > 0 && !isDisabled && (
          <button
            type="button"
            onClick={clear}
            className="text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-100 cursor-pointer ml-1"
            title={clearTitle}
            aria-label={clearTitle}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};

interface InteractiveRadioProps {
  system: string;
  state: ComponentState;
  tText: (key: string) => string;
}

export const InteractiveRadio: React.FC<InteractiveRadioProps> = ({ system, state, tText }) => {
  const [selected, setSelected] = useState<number>(1);
  const isProUser = useStore((s) => s.isProUser);
  const customText = useStore((s) => s.customText);
  const customBrandColor = useStore((s) => s.customBrandColor);
  const isRtl = useStore((s) => s.isRtl);
  const { t, language } = useLanguage();

  const effectiveText = isProUser ? customText : '';
  const effectiveBrandColor = isProUser ? customBrandColor : null;
  const effectiveRtl = isProUser ? isRtl : false;
  const isDisabled = state === 'disabled';
  const isHovered = state === 'hover';
  const isFocused = state === 'focus';

  const getColor = () => {
    switch (system) {
      case 'Apple iOS HIG':
        return '#007AFF';
      case 'Samsung One UI':
        return '#034EA2';
      case 'Material Design 3':
        return '#6750a4';
      case 'Fluent UI':
        return '#0078d4';
      case 'Atlassian':
        return '#0052cc';
      case 'IBM Carbon':
        return '#0f62fe';
      case 'Shopify Polaris':
        return '#008060';
      case 'Ant Design':
      default:
        return '#1677ff';
    }
  };

  const color = (effectiveBrandColor && !isDisabled) ? effectiveBrandColor : getColor();
  const opt1Label = effectiveText.trim() ? effectiveText : t('preview.radio.primary');
  const opt2Label = t('preview.radio.secondary');

  return (
    <div
      dir={effectiveRtl ? 'rtl' : 'ltr'}
      role="radiogroup"
      aria-label={`${system} Radio Options`}
      className="flex flex-col gap-2.5 text-left select-none max-w-full"
    >
      {[1, 2].map((opt) => {
        const isOptSelected = selected === opt;
        return (
          <div
            key={opt}
            role="radio"
            aria-checked={isOptSelected}
            tabIndex={isDisabled ? -1 : 0}
            onClick={() => !isDisabled && setSelected(opt)}
            onKeyDown={(e) => {
              if (!isDisabled && (e.key === ' ' || e.key === 'Enter')) {
                e.preventDefault();
                setSelected(opt);
              }
            }}
            className={`flex items-center gap-2.5 transition-all rounded p-0.5 outline-none ${
              isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            } ${
              isFocused ? 'ring-2 ring-accent-blue ring-offset-2 dark:ring-offset-zinc-900' : 'focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900'
            }`}
          >
            <div
              className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center transition-all bg-white dark:bg-zinc-800 shrink-0 ${
                isHovered && !isDisabled ? 'scale-105 shadow-xs' : 'hover:scale-105'
              }`}
              style={{
                borderColor: isOptSelected 
                  ? color 
                  : (isHovered ? (effectiveBrandColor || color) : '#8A8886'),
              }}
            >
              {isOptSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: color }}
                />
              )}
            </div>
            <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100 truncate max-w-[200px]">
              {opt === 1 ? opt1Label : opt2Label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

interface InteractiveTagProps {
  system: string;
  state: ComponentState;
  tText: (key: string) => string;
}

export const InteractiveTag: React.FC<InteractiveTagProps> = ({ system, state, tText }) => {
  const [visible, setVisible] = useState(true);
  const isProUser = useStore((s) => s.isProUser);
  const customText = useStore((s) => s.customText);
  const customBrandColor = useStore((s) => s.customBrandColor);
  const isRtl = useStore((s) => s.isRtl);
  const { t, language } = useLanguage();

  const effectiveText = isProUser ? customText : '';
  const effectiveBrandColor = isProUser ? customBrandColor : null;
  const effectiveRtl = isProUser ? isRtl : false;
  const isDisabled = state === 'disabled';
  const isHovered = state === 'hover';
  const isFocused = state === 'focus';

  const tagLabel = effectiveText.trim() ? effectiveText : t('preview.tag.active');

  const customStyle: React.CSSProperties = (effectiveBrandColor && !isDisabled) ? {
    backgroundColor: `${effectiveBrandColor}18`,
    color: effectiveBrandColor,
    borderColor: `${effectiveBrandColor}55`,
  } : {};

  const getSystemClasses = () => {
    switch (system) {
      case 'Apple iOS HIG':
        return 'rounded-full bg-[#007AFF]/12 dark:bg-[#007AFF]/25 text-[#007AFF] dark:text-[#3894FF] border border-[#007AFF]/25 dark:border-[#007AFF]/40 px-3 py-1 text-xs font-semibold';
      case 'Samsung One UI':
        return 'rounded-xl bg-[#034EA2]/10 dark:bg-[#034EA2]/30 text-[#034EA2] dark:text-[#528AE4] border border-[#034EA2]/25 dark:border-[#034EA2]/40 px-3 py-1 text-xs font-bold';
      case 'Material Design 3':
        return 'rounded-lg bg-[#E8DEF8] dark:bg-[#4A4458] text-[#1D192B] dark:text-[#E8DEF8] border border-[#79747E]/20 px-3 py-1 text-xs font-medium';
      case 'Fluent UI':
        return 'rounded-full bg-[#f3f2f1] dark:bg-[#292827] text-[#242424] dark:text-[#F3F2F1] border border-[#e1dfdd] dark:border-[#484644] px-2.5 py-0.5 text-xs';
      case 'Atlassian':
        return 'rounded-[3px] bg-[#091E420F] dark:bg-[#22272B] text-[#172B4D] dark:text-[#B6C2CF] border border-transparent dark:border-[#38414A] px-2 py-0.5 text-xs font-semibold';
      case 'IBM Carbon':
        return 'rounded-none bg-[#e0e0e0] dark:bg-[#393939] text-[#161616] dark:text-[#F4F4F4] border border-transparent px-2 py-1 text-xs font-mono';
      case 'Shopify Polaris':
        return 'rounded-full bg-[#e4e5e7] dark:bg-[#303030] text-[#202223] dark:text-[#E3E5E7] border border-transparent px-2.5 py-1 text-xs font-medium';
      case 'Ant Design':
      default:
        return 'rounded-[2px] bg-[#fafafa] dark:bg-[#1f1f1f] text-zinc-900 dark:text-zinc-100 border border-[#d9d9d9] dark:border-[#424242] px-2 py-0.5 text-xs';
    }
  };

  return (
    <div dir={effectiveRtl ? 'rtl' : 'ltr'} className="flex flex-col items-center gap-2">
      <AnimatePresence mode="wait">
        {visible ? (
          <motion.div
            key="tag"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            style={customStyle}
            tabIndex={isDisabled ? -1 : 0}
            className={`flex items-center gap-1.5 shadow-xs transition-all outline-none ${getSystemClasses()} ${
              isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-default'
            } ${
              isHovered && !isDisabled ? 'brightness-95 dark:brightness-110 shadow-sm' : 'hover:brightness-95 dark:hover:brightness-110'
            } ${
              isFocused ? 'ring-2 ring-accent-blue ring-offset-1 dark:ring-offset-zinc-900' : 'focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-1 dark:focus-visible:ring-offset-zinc-900'
            }`}
          >
            <span className="truncate max-w-[200px]">{tagLabel}</span>
            {!isDisabled && (
              <button
                type="button"
                onClick={() => setVisible(false)}
                className="hover:opacity-70 p-0.5 rounded-full cursor-pointer ml-0.5"
                title={t('preview.tag.remove')}
                aria-label={t('preview.tag.remove')}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </motion.div>
        ) : (
          <motion.button
            key="reset"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={() => setVisible(true)}
            className="flex items-center gap-1 text-[11px] text-accent-blue dark:text-blue-400 font-medium hover:underline cursor-pointer focus-visible:ring-2 focus-visible:ring-accent-blue rounded p-1"
          >
            <RotateCcw className="w-3 h-3" /> {t('preview.tag.restore')}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
