import { tick } from "svelte";

const focusableQuery = [
  "a[href]", "button", "textarea", "select", "input:not([hidden])", "[tabindex]:not([tabindex=\"-1\"])"
]
  .map(x => `${x}:not(:disabled)`)
  .join(", ");

export const focusTrap = (node: HTMLElement) => {
  const previous = document.activeElement;
  const getFocusableElements = () => {
    return [...node.querySelectorAll<HTMLElement>(focusableQuery)];
  }
  const isOuterFocusTrap = (focusableElements: HTMLElement[]) => {
    const activeElement = document.activeElement;
    return !focusableElements.some(element => element === activeElement);
  }
  const handler = (e: KeyboardEvent) => {
    if (e.key !== "Tab") return;
    const focusableElements = getFocusableElements();
    if (focusableElements.length === 0) {
      e.preventDefault();
      return;
    }
    const firstElement = focusableElements.at(0)!;
    const lastElement = focusableElements.at(-1)!;
    if (isOuterFocusTrap(focusableElements)) {
      if (e.shiftKey) {
        lastElement.focus();
      } else {
        firstElement.focus();
      }
      e.preventDefault();
    } else {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  }

  const focusIn = () => {
    const focusableElements = getFocusableElements();
    if (isOuterFocusTrap(focusableElements)) {
      const firstElement = focusableElements.at(0)!;
      firstElement.focus();
    }
  }

  tick().then(() => {
    const firstElement = getFocusableElements().at(0);
    if (firstElement instanceof HTMLTextAreaElement
      || (firstElement instanceof HTMLInputElement
        && new Set(["date", "datetime-local", "email", "month", "number",
          "password", "search", "tel", "text", "time", "url", "week"])
          .has(firstElement.type))) {
      firstElement.focus();
    }
  });

  window.addEventListener("keydown", handler);
  window.addEventListener("focusin", focusIn);

  return {
    destroy: () => {
      window.removeEventListener("keydown", handler);
      window.removeEventListener("focusin", focusIn);
      (previous as HTMLElement | null)?.focus();
    }
  }
}