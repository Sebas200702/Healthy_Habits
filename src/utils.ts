export const $ = (el: string): HTMLElement | null => document.querySelector(el);
export const $$ = (els: string): NodeListOf<HTMLElement> =>
  document.querySelectorAll(els);
