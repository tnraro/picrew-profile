const focusableQuery = [
  "a[href]", "button", "textarea", "select", "input:not([hidden])"
]
  .map(x => `${x}:not(:disabled)`)
  .join(", ");

export const focusTrap = (node: HTMLElement) => {
  queueMicrotask(() => {
    const firstElement = node.querySelector<HTMLElement>(focusableQuery);
    if (firstElement instanceof HTMLTextAreaElement
      || (firstElement instanceof HTMLInputElement
        && new Set(["date", "datetime-local", "email", "month", "number",
          "password", "search", "tel", "text", "time", "url", "week"])
          .has(firstElement.type))) {
      firstElement.focus();
    }
  });
  const handler = (e: KeyboardEvent) => {
    if (e.key !== "Tab") return;
    const focusableElements = [...node.querySelectorAll<HTMLElement>(focusableQuery)];
    if (focusableElements.length === 0) {
      e.preventDefault();
      return;
    }
    const firstElement = focusableElements.at(0)!;
    const lastElement = focusableElements.at(-1)!;
    if (!focusableElements.some(x => x === document.activeElement)) {
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
    const focusableElements = [...node.querySelectorAll<HTMLElement>(focusableQuery)];
    if (!focusableElements.some(x => x === document.activeElement)) {
      const firstElement = focusableElements.at(0)!;
      firstElement.focus();
    }
  }

  window.addEventListener("keydown", handler);
  window.addEventListener("focusin", focusIn);

  return {
    destroy: () => {
      window.removeEventListener("keydown", handler);
      window.removeEventListener("focusin", focusIn);
    }
  }
}