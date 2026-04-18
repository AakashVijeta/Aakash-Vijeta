import { createContext, useContext, useState, useCallback } from 'react';

const SectionContext = createContext(null);

export const SECTIONS = ['intro', 'projects', 'about', 'contact'];

export function SectionProvider({ children }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [overlayProject, setOverlayProject] = useState(null);

  const goTo = useCallback((index) => {
    if (index < 0 || index >= SECTIONS.length) return;
    setActiveIndex(index);
  }, []);

  return (
    <SectionContext.Provider value={{
      activeIndex,
      isTransitioning,
      setIsTransitioning,
      overlayProject,
      setOverlayProject,
      goTo,
      total: SECTIONS.length,
    }}>
      {children}
    </SectionContext.Provider>
  );
}

export function useSectionContext() {
  const ctx = useContext(SectionContext);
  if (!ctx) throw new Error('useSectionContext must be used within SectionProvider');
  return ctx;
}
