export const $ = (el: string): HTMLElement | null => document.querySelector(el);
export const $$ = (els: string): NodeListOf<HTMLElement> =>
  document.querySelectorAll(els);
export const fetchSession = async () => {
  try {
    const res: Response = await fetch("/api/session");
    if (res.ok) {
      return await res.json();
    } else {
      return { error: "No hay sesión activa" };
    }
  } catch (err) {
    console.error("Error al obtener la sesión:", err);
  }
};
export const timeConfig: Intl.DateTimeFormatOptions = {
  month: "short",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
};
