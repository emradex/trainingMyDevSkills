import type { AnchorHTMLAttributes } from 'react';
import { usePointerShadow } from '../hooks/usePointerShadow';
import styles from './ActionLink.module.css';
export function ActionLink({ children, className = '', variant = 'outline', ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: 'primary' | 'outline' }) {
  const shadow = usePointerShadow();
  return <a {...props} {...shadow} className={`${styles.action} ${styles[variant]} ${className}`}>{children}</a>;
}
