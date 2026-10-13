import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalizePiva, validatePiva } from './piva.ts';

// Genera una P.IVA valida a partire da 10 cifre calcolando la cifra di controllo.
function withCheckDigit(base10: string): string {
  let sum = 0;
  for (let i = 0; i < 10; i++) {
    let d = Number(base10[i]);
    if (i % 2 === 1) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
  }
  return base10 + String((10 - (sum % 10)) % 10);
}

const BASES = ['0000000000', '1234567890', '0987654321', '5555555555', '9999999999', '0123456789'];
const VALID = BASES.map(withCheckDigit);

test('normalizePiva rimuove spazi e prefisso IT', () => {
  assert.equal(normalizePiva(' IT 123 456 '), '123456');
  assert.equal(normalizePiva('it123'), '123');
  assert.equal(normalizePiva('123'), '123');
});

test('accetta P.IVA valide', () => {
  for (const p of VALID) {
    assert.deepEqual(validatePiva(p), { valid: true, value: p });
  }
});

test('accetta spazi e prefisso IT/it e restituisce il valore normalizzato', () => {
  const p = VALID[1];
  const spaced = `${p.slice(0, 3)} ${p.slice(3, 7)} ${p.slice(7)}`;
  for (const input of [`IT${p}`, `it${p}`, `IT ${p}`, spaced, ` ${p} `]) {
    assert.deepEqual(validatePiva(input), { valid: true, value: p });
  }
});

test('rifiuta 10 e 12 cifre', () => {
  const p = VALID[1];
  assert.deepEqual(validatePiva(p.slice(0, 10)), { valid: false, error: 'format' });
  assert.deepEqual(validatePiva(p + '0'), { valid: false, error: 'format' });
});

test('rifiuta lettere e simboli', () => {
  const p = VALID[1];
  for (const input of [`A${p.slice(1)}`, `${p.slice(0, 10)}X`, `${p.slice(0, 5)}-${p.slice(6)}`, '1234567890.', 'abcdefghijk']) {
    assert.deepEqual(validatePiva(input), { valid: false, error: 'format' });
  }
});

test('rifiuta cifra di controllo errata', () => {
  for (const p of VALID) {
    const wrong = (Number(p[10]) + 1) % 10;
    assert.deepEqual(validatePiva(p.slice(0, 10) + wrong), { valid: false, error: 'checksum' });
  }
});

test('rifiuta stringa vuota o solo prefisso', () => {
  assert.deepEqual(validatePiva(''), { valid: false, error: 'format' });
  assert.deepEqual(validatePiva('   '), { valid: false, error: 'format' });
  assert.deepEqual(validatePiva('IT'), { valid: false, error: 'format' });
});
