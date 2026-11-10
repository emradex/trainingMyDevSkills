import { useEffect, useState } from 'react';

/** One scroll listener per mounted navigation, coalesced to one layout read per frame. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? 'inicio');
  const key = ids.join('|');
  useEffect(() => {
    const nodes = key.split('|').map(id => document.getElementById(id)).filter((node): node is HTMLElement => !!node);
    let frame = 0;
    const measure = () => {
      frame = 0;
      const passed = nodes.filter(node => node.getBoundingClientRect().top <= innerHeight * .35);
      setActive((passed.at(-1) ?? nodes[0])?.id ?? 'inicio');
    };
    const update = () => { if (!frame) frame = requestAnimationFrame(measure); };
    addEventListener('scroll', update, { passive: true }); addEventListener('resize', update); update();
    return () => { cancelAnimationFrame(frame); removeEventListener('scroll', update); removeEventListener('resize', update); };
  }, [key]);
  return active;
}
