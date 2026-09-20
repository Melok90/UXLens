import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import Hero from '../components/Hero';
import Filters from '../components/Filters';
import ComparisonGrid from '../components/ComparisonGrid';
import { useStore } from '../store/useStore';
import { readFiltersFromParams, writeFiltersToParams } from '../utils/urlState';
import { ComponentVariant, ComponentState } from '../App';

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeComponent = useStore(state => state.activeComponent);
  const activeVariant = useStore(state => state.activeVariant);
  const activeState = useStore(state => state.activeState);
  const searchQuery = useStore(state => state.searchQuery);
  const platformFilter = useStore(state => state.platformFilter);
  const setActiveComponent = useStore(state => state.setActiveComponent);
  const setActiveVariant = useStore(state => state.setActiveVariant);
  const setActiveState = useStore(state => state.setActiveState);
  const setSearchQuery = useStore(state => state.setSearchQuery);
  const setPlatformFilter = useStore(state => state.setPlatformFilter);

  const hydrated = useRef(false);

  // Восстанавливаем срез из URL при переходе по ссылке
  useEffect(() => {
    const parsed = readFiltersFromParams(searchParams);
    if (parsed.component) setActiveComponent(parsed.component);
    if (parsed.variant) setActiveVariant(parsed.variant as ComponentVariant);
    if (parsed.state) setActiveState(parsed.state as ComponentState);
    if (parsed.platform) setPlatformFilter(parsed.platform);
    if (parsed.q) setSearchQuery(parsed.q);
    hydrated.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Синхронизируем URL с текущим срезом фильтров
  useEffect(() => {
    if (!hydrated.current) return;
    setSearchParams(
      writeFiltersToParams({
        component: activeComponent,
        variant: activeVariant,
        state: activeState,
        view: 'showcase',
        platform: platformFilter,
        q: searchQuery,
      }),
      { replace: true }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeComponent, activeVariant, activeState, platformFilter, searchQuery]);

  return (
    <>
      <Hero />
      <Filters />
      <ComparisonGrid />
    </>
  );
}
