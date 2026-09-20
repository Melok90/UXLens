import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Check, X, RotateCcw, Calendar, CheckCircle2 } from 'lucide-react';
import { ComponentState, ComponentVariant } from '../App';

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
      base += 'bg-[#1677ff] border border-transparent text-white ';
      hover = 'hover:bg-[#4096ff] ';
      active = 'active:bg-[#0958d9] ';
    } else if (variant === 'secondary') {
      base += 'bg-white border border-[#d9d9d9] text-[#000000e0] ';
      hover = 'hover:text-[#4096ff] hover:border-[#4096ff] ';
      active = 'active:text-[#0958d9] active:border-[#0958d9] ';
    } else if (variant === 'tertiary') {
      base += 'text-[#1677ff] bg-transparent shadow-none ';
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
    focus = '!ring-3 !ring-[#007AFF]/40 !ring-offset-2 ';
    errorFilled = '!bg-[#FF3B30] !text-white !ring-2 !ring-[#FF3B30] ';
    errorOutlined = '!text-[#FF3B30] !border-[#FF3B30] !ring-2 !ring-[#FF3B30]/30 ';

    if (variant === 'primary' || variant === 'default') {
      base += 'bg-[#007AFF] text-white shadow-xs ';
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

  const content = isLoading ? (
    <div className={`flex items-center justify-center ${variant === 'icon' ? '' : 'gap-2'}`}>
      <svg className={`animate-spin ${variant === 'icon' ? 'h-4 w-4' : 'h-3.5 w-3.5'}`} viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
      {variant !== 'icon' && tText('Основное действие')}
    </div>
  ) : variant === 'icon' ? (
    <Search size={16} />
  ) : (
    <span className="flex items-center gap-1.5">
      {clicked && <Check className="w-3.5 h-3.5 animate-in fade-in zoom-in-75" />}
      {tText('Основное действие')}
    </span>
  );

  return (
    <div className="flex flex-col items-center gap-2">
      <motion.button
        whileHover={isDisabled ? undefined : { scale: 1.03 }}
        whileTap={isDisabled ? undefined : { scale: 0.95 }}
        onClick={handleClick}
        className={`${base} ${appliedStateClass} ${hover} ${active}`}
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
  const isDisabled = state === 'disabled';

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
          inactiveBg: '#e7e0ec',
          border: checked ? 'border-none' : 'border-2 border-[#79747e]',
          thumbColor: checked ? '#ffffff' : '#79747e',
          rounded: 'rounded-full',
        };
      case 'Fluent UI':
        return {
          trackW: 40,
          trackH: 20,
          thumbSize: 14,
          translateX: checked ? 22 : 2,
          activeBg: '#0078d4',
          inactiveBg: '#f3f2f1',
          border: checked ? 'border border-[#0078d4]' : 'border border-[#8a8886]',
          thumbColor: checked ? '#ffffff' : '#605e5c',
          rounded: 'rounded-full',
        };
      case 'Atlassian':
        return {
          trackW: 40,
          trackH: 20,
          thumbSize: 16,
          translateX: checked ? 21 : 2,
          activeBg: '#0052cc',
          inactiveBg: '#091e4224',
          border: 'border-none',
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
          inactiveBg: '#8d8d8d',
          border: 'border-none',
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
          inactiveBg: '#c9cccf',
          border: 'border-none',
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
          inactiveBg: '#E9E9EB',
          border: 'border-none',
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
          inactiveBg: '#DFE2E6',
          border: 'border-none',
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
          inactiveBg: '#00000040',
          border: 'border-none',
          thumbColor: '#ffffff',
          rounded: 'rounded-full',
        };
    }
  };

  const cfg = getSystemConfig();

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        onClick={toggle}
        className={`relative flex items-center transition-colors duration-200 ${cfg.rounded} ${cfg.border} ${
          isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        }`}
        style={{
          width: `${cfg.trackW}px`,
          height: `${cfg.trackH}px`,
          backgroundColor: checked ? cfg.activeBg : cfg.inactiveBg,
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
          className={`${cfg.rounded} shadow-sm flex items-center justify-center`}
        >
          {system === 'Material Design 3' && checked && (
            <Check className="w-3 h-3 text-[#6750a4]" strokeWidth={3} />
          )}
        </motion.div>
      </div>
      <span className="text-[10px] text-[#8e8e93] select-none font-medium">
        {checked ? 'ON / Вкл' : 'OFF / Выкл'}
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
  placeholder = 'Введите текст',
  label = 'Метка',
}) => {
  const [value, setValue] = useState(placeholder);
  const [isFocused, setIsFocused] = useState(false);
  const isDisabled = state === 'disabled';
  const isError = state === 'error';

  const clear = () => {
    if (isDisabled) return;
    setValue('');
  };

  if (system === 'Material Design 3') {
    return (
      <div className="w-full max-w-[240px] flex flex-col gap-1 text-left relative">
        <div
          className={`px-4 pt-4 pb-2 rounded-t-[4px] transition-all border-b bg-[#E7E0EC] relative ${
            isError
              ? 'border-[#B3261E] border-b-2'
              : isFocused || state === 'focus'
              ? 'border-accent-blue border-b-2 bg-[#ece6f0]'
              : 'border-[#49454F]'
          } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <span
            className={`absolute transition-all duration-150 text-[11px] ${
              isFocused || value.length > 0 || state === 'focus'
                ? 'top-1.5 text-accent-blue font-medium'
                : 'top-3.5 text-sm text-[#49454F]'
            } ${isError ? '!text-[#B3261E]' : ''}`}
          >
            {label}
          </span>
          <div className="flex items-center justify-between mt-1">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              disabled={isDisabled}
              className="bg-transparent border-none outline-none w-full text-[#1D1B20] text-sm pt-1"
            />
            {value.length > 0 && !isDisabled && (
              <button
                type="button"
                onClick={clear}
                className="text-[#49454F] hover:text-black p-0.5"
                title="Очистить"
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
    return (
      <div className="w-full max-w-[240px] text-left">
        <div
          className={`flex items-center px-3 py-1.5 rounded-[2px] bg-white border transition-all ${
            isError
              ? 'border-[#A4262C] ring-1 ring-[#A4262C]'
              : isFocused || state === 'focus'
              ? 'border-[#0078D4] ring-1 ring-[#0078D4]'
              : 'border-[#605E5C] hover:border-[#323130]'
          } ${isDisabled ? 'bg-[#f3f2f1] text-[#a19f9d] opacity-60 cursor-not-allowed' : ''}`}
        >
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={isDisabled}
            className="w-full bg-transparent border-none outline-none text-xs text-[#323130]"
            placeholder={placeholder}
          />
          {value.length > 0 && !isDisabled && (
            <button type="button" onClick={clear} className="text-gray-400 hover:text-black">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // Generic fallback for Ant Design, Carbon, Polaris, Atlassian, Apple, Samsung
  const getBorderClasses = () => {
    if (system === 'Apple iOS HIG') {
      if (isError) return 'border-[#FF3B30] ring-2 ring-[#FF3B30]/30';
      if (isFocused || state === 'focus') return 'border-[#007AFF] ring-2 ring-[#007AFF]/30';
      return 'border-[#d1d1d6] hover:border-[#8e8e93] bg-[#767680]/10';
    }
    if (system === 'Samsung One UI') {
      if (isError) return 'border-[#E53935] ring-2 ring-[#E53935]/30';
      if (isFocused || state === 'focus') return 'border-[#034EA2] ring-2 ring-[#034EA2]/30';
      return 'border-[#DFE2E6] hover:border-[#034EA2]/50 bg-[#F2F4F7]';
    }
    if (isError) return 'border-red-500 ring-1 ring-red-500';
    if (isFocused || state === 'focus') {
      if (system === 'Shopify Polaris') return 'border-[#008060] ring-2 ring-[#008060]/20';
      if (system === 'Atlassian') return 'border-[#0052CC] ring-2 ring-[#4C90FF]/30';
      if (system === 'IBM Carbon') return 'border-[#0f62fe] border-b-2';
      return 'border-[#1677ff] ring-2 ring-[#1677ff]/20';
    }
    return 'border-gray-300 hover:border-gray-400';
  };

  const getRadius = () => {
    if (system === 'Apple iOS HIG') return 'rounded-xl';
    if (system === 'Samsung One UI') return 'rounded-2xl';
    if (system === 'IBM Carbon') return 'rounded-none';
    if (system === 'Shopify Polaris') return 'rounded-lg';
    if (system === 'Atlassian') return 'rounded-[3px]';
    return 'rounded-md';
  };

  return (
    <div className="w-full max-w-[240px] text-left">
      <div
        className={`flex items-center px-3 py-1.5 bg-white border transition-all ${getRadius()} ${getBorderClasses()} ${
          isDisabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : ''
        }`}
      >
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={isDisabled}
          className="w-full bg-transparent border-none outline-none text-xs text-gray-800"
          placeholder={placeholder}
        />
        {value.length > 0 && !isDisabled && (
          <button type="button" onClick={clear} className="text-gray-400 hover:text-black">
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
  const isDisabled = state === 'disabled';

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

  const color = getColor();

  return (
    <div className="flex flex-col gap-2.5 text-left select-none">
      {[1, 2].map((opt) => {
        const isOptSelected = selected === opt;
        return (
          <div
            key={opt}
            onClick={() => !isDisabled && setSelected(opt)}
            className={`flex items-center gap-2.5 ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div
              className="w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center transition-all bg-white"
              style={{ borderColor: isOptSelected ? color : '#8A8886' }}
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
            <span className="text-xs font-medium text-gray-800">
              {tText(opt === 1 ? 'Основная опция' : 'Вторичная опция')}
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
  const isDisabled = state === 'disabled';

  const getSystemClasses = () => {
    switch (system) {
      case 'Apple iOS HIG':
        return 'rounded-full bg-[#007AFF]/12 text-[#007AFF] border border-[#007AFF]/25 px-3 py-1 text-xs font-semibold';
      case 'Samsung One UI':
        return 'rounded-xl bg-[#034EA2]/10 text-[#034EA2] border border-[#034EA2]/25 px-3 py-1 text-xs font-bold';
      case 'Material Design 3':
        return 'rounded-lg bg-[#E8DEF8] text-[#1D192B] border border-[#79747E]/20 px-3 py-1 text-xs font-medium';
      case 'Fluent UI':
        return 'rounded-full bg-[#f3f2f1] text-[#242424] border border-[#e1dfdd] px-2.5 py-0.5 text-xs';
      case 'Atlassian':
        return 'rounded-[3px] bg-[#091E420F] text-[#172B4D] px-2 py-0.5 text-xs font-semibold';
      case 'IBM Carbon':
        return 'rounded-none bg-[#e0e0e0] text-[#161616] px-2 py-1 text-xs font-mono';
      case 'Shopify Polaris':
        return 'rounded-full bg-[#e4e5e7] text-[#202223] px-2.5 py-1 text-xs font-medium';
      case 'Ant Design':
      default:
        return 'rounded-[2px] bg-[#fafafa] text-[#000000d9] border border-[#d9d9d9] px-2 py-0.5 text-xs';
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <AnimatePresence mode="wait">
        {visible ? (
          <motion.div
            key="tag"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className={`flex items-center gap-1.5 shadow-xs ${getSystemClasses()} ${
              isDisabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <span>{tText('Активный тег')}</span>
            {!isDisabled && (
              <button
                type="button"
                onClick={() => setVisible(false)}
                className="hover:opacity-70 p-0.5 rounded-full cursor-pointer"
                title="Удалить тег"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </motion.div>
        ) : (
          <motion.button
            key="reset"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={() => setVisible(true)}
            className="flex items-center gap-1 text-[11px] text-accent-blue font-medium hover:underline cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" /> {tText('Восстановить')}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
