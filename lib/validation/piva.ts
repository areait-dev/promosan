// Validazione della Partita IVA italiana (solo formato e cifra di controllo).
// Modulo puro: nessuna dipendenza da browser o Node, importabile ovunque.

export type PivaResult =
  | { valid: true; value: string }
  | { valid: false; error: 'format' | 'checksum' };

export const PIVA_ERRORS = {
  format: 'La Partita IVA deve contenere 11 cifre',
  checksum: 'Partita IVA non valida',
} as const;

/** Rimuove spazi e un eventuale prefisso "IT" (maiuscolo o minuscolo). */
export function normalizePiva(input: string): string {
  return String(input ?? '')
    .replace(/\s+/g, '')
    .replace(/^IT/i, '');
}

export function validatePiva(input: string): PivaResult {
  const value = normalizePiva(input);

  if (!/^\d{11}$/.test(value)) {
    return { valid: false, error: 'format' };
  }

  let sum = 0;
  for (let i = 0; i < 10; i++) {
    let digit = Number(value[i]);
    // Posizioni pari (2ª, 4ª, ... 10ª): indice dispari in base 0.
    if (i % 2 === 1) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }

  const expected = (10 - (sum % 10)) % 10;
  if (expected !== Number(value[10])) {
    return { valid: false, error: 'checksum' };
  }

  return { valid: true, value };
}

/** Messaggio in italiano per un errore di validazione. */
export function pivaErrorMessage(error: 'format' | 'checksum'): string {
  return PIVA_ERRORS[error];
}
