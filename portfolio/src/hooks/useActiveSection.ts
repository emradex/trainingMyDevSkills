import { useEffect, useState } from 'react';
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState('inicio');
  const key = ids.join('|');
  useEffect(() => {
    const nodes = key.split('|').map(id => document.getElementById(id)).filter((node): node is HTMLElement => !!node);
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: '-10% 0px -55% 0px', threshold: 0 });
    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, [key]);
  return active;
}
