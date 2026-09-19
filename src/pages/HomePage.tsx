import React, { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import Hero from '../components/Hero';
import Filters from '../components/Filters';
import ContextBar from '../components/ContextBar';
import ComparisonGrid from '../components/ComparisonGrid';
import CompareTable from '../components/CompareTable';
import ProBanner from '../components/ProBanner';
import { useLanguage } from '../contexts/LanguageContext';
import { useStore } from '../store/useStore';
import { readFiltersFromParams, writeFiltersToParams } from '../utils/urlState';
import { ComponentVariant, ComponentState } from '../App';

export default function HomePage() {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeComponent = useStore(state => state.activeComponent);
  const activeVariant = useStore(state => state.activeVariant);
  const activeState = useStore(state => state.activeState);
  const searchQuery = useStore(state => state.searchQuery);
  const viewMode = useStore(state => state.viewMode);
  const setActiveComponent = useStore(state => state.setActiveComponent);
  const setActiveVariant = useStore(state => state.setActiveVariant);
  const setActiveState = useStore(state => state.setActiveState);
  const setSearchQuery = useStore(state => state.setSearchQuery);
  const setViewMode = useStore(state => state.setViewMode);

  const hydrated = useRef(false);

  // Восстановить срез из URL один раз при заходе по ссылке.
  useEffect(() => {
    const parsed = readFiltersFromParams(searchParams);
    if (parsed.component) setActiveComponent(parsed.component);
    if (parsed.variant) setActiveVariant(parsed.variant as ComponentVariant);
    if (parsed.state) setActiveState(parsed.state as ComponentState);
    if (parsed.view) setViewMode(parsed.view);
    if (parsed.q) setSearchQuery(parsed.q);
    hydrated.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Держать URL синхронизированным с текущим срезом — «Поделиться» в шапке
  // копирует именно то, что видно на экране.
  useEffect(() => {
    if (!hydrated.current) return;
    setSearchParams(
      writeFiltersToParams({
        component: activeComponent,
        variant: activeVariant,
        state: activeState,
        view: viewMode,
        q: searchQuery,
      }),
      { replace: true }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeComponent, activeVariant, activeState, viewMode, searchQuery]);

  return (
    <>
      <Hero />

      {/* items-start только на lg+: в flex-col (мобильный) режиме это тот же
          класс отключает stretch по ширине и контент-колонка разрастается
          вслед за самым широким потомком (таблицей), выталкивая страницу
          в горизонтальный скролл. */}
      <div className="flex flex-col lg:flex-row gap-8 items-stretch lg:items-start">
        <aside className="w-full lg:w-64 shrink-0 lg:sticky lg:top-24">
          <Filters />
        </aside>

        <div className="flex-1 min-w-0 flex flex-col gap-5">
          <ContextBar />
          {viewMode === 'table' ? <CompareTable /> : <ComparisonGrid />}
          <ProBanner />
        </div>
      </div>
    </>
  );
}
