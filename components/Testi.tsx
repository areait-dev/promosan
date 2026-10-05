"use client";

import { createContext, useContext } from "react";

/**
 * Testi personalizzabili da WordPress (Opzioni Globali -> "Testi del sito").
 *
 * <T k="contatti.orari">Lun-Ven: 9:00-18:00</T>
 *   -> mostra il testo scritto in WordPress per la chiave "contatti.orari",
 *      altrimenti il testo di default (children).
 *
 * useT() restituisce la stessa logica per attributi e stringhe (placeholder,
 * aria-label, title...): const t = useT(); t("form.nome", "Nome")
 */
type Testi = Record<string, string>;

const TestiContext = createContext<Testi>({});

export function TestiProvider({
  testi,
  children,
}: {
  testi: Testi;
  children: React.ReactNode;
}) {
  return <TestiContext.Provider value={testi}>{children}</TestiContext.Provider>;
}

export function useT() {
  const testi = useContext(TestiContext);
  return (key: string, fallback: string) => testi[key] || fallback;
}

export function T({ k, children }: { k: string; children: string }) {
  const testi = useContext(TestiContext);
  return <>{testi[k] || children}</>;
}
