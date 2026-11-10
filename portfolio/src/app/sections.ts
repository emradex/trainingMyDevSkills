import type { ComponentType } from 'react';
import type { Localized } from '../content/types';
import { sectionLabels } from '../content/translations';
import Home from '../sections/Home/Home';
import About from '../sections/About/About';
import Projects from '../sections/Projects/Projects';
import Lab from '../sections/Lab/Lab';
import Contact from '../sections/Contact/Contact';

export interface SectionDefinition {
  id: string;
  label: Localized<string>;
  component: ComponentType<{ id: string }>;
  enabled: boolean;
  showInNavigation: boolean;
}
// Order here is the order on the page and in the navigation. Keep IDs stable.
export const sections: SectionDefinition[] = [
  { id: 'inicio', label: sectionLabels.inicio, component: Home, enabled: true, showInNavigation: true },
  { id: 'sobre-mi', label: sectionLabels['sobre-mi'], component: About, enabled: true, showInNavigation: true },
  { id: 'proyectos', label: sectionLabels.proyectos, component: Projects, enabled: true, showInNavigation: true },
  { id: 'laboratorio', label: sectionLabels.laboratorio, component: Lab, enabled: true, showInNavigation: true },
  { id: 'contacto', label: sectionLabels.contacto, component: Contact, enabled: true, showInNavigation: true },
];
export function activeSections(registry: SectionDefinition[] = sections) { return registry.filter(section => section.enabled); }
