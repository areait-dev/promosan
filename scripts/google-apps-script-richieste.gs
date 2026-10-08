// Da incollare in Google Sheets: Estensioni > Apps Script.
// Riceve dal sito (app/api/send/route.js) servizio, fascia dipendenti e azienda
// e aggiunge una riga al foglio "Richieste".

const SECRET = 'CAMBIA-QUESTA-STRINGA'; // deve coincidere con SHEETS_WEBHOOK_SECRET
const SHEET_NAME = 'Richieste';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.secret !== SECRET) {
      return ContentService.createTextOutput('unauthorized');
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(['Data', 'Servizio', 'Dipendenti', 'Azienda']);
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([new Date(), data.servizio, data.dipendenti, data.azienda]);
    return ContentService.createTextOutput('ok');
  } catch (err) {
    return ContentService.createTextOutput('error');
  }
}
