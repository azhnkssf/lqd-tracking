import type { KeyboardEvent, MouseEvent, FocusEvent, ChangeEvent, FormEvent } from 'react';

export type LegacyEvent =
  | MouseEvent<HTMLElement>
  | KeyboardEvent<HTMLElement>
  | FocusEvent<HTMLElement>
  | ChangeEvent<HTMLElement>
  | FormEvent<HTMLElement>;

export function runLegacyAction(expression: string, event: LegacyEvent) {
  // Temporary bridge while the remaining DOM-based customer-detail handlers
  // are migrated to typed React state one behavior slice at a time.
  Function('event', expression).call(event.currentTarget, event);
}
