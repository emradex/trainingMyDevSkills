import styles from './ChoiceGroup.module.css';
interface Choice<T extends string> { value: T; label: string }
export function ChoiceGroup<T extends string>({ label, value, choices, onChange }: { label: string; value: T; choices: Choice<T>[]; onChange: (value: T) => void }) {
  return <div className={styles.group} role="group" aria-label={label}>
    {choices.map(choice => <button key={choice.value} type="button" aria-pressed={choice.value === value} onClick={() => onChange(choice.value)}>{choice.label}</button>)}
  </div>;
}
