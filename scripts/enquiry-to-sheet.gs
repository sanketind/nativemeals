/**
 * Paste into a private Google Sheet: Extensions, then Apps Script.
 * Deploy as a web app, execute as you, access "Anyone".
 * Put the web app URL in ENQUIRY_WEBHOOK_URL.
 * Do not use the weekly menu spreadsheet. That file is public.
 */
var HEADERS = [
  "receivedAt",
  "type",
  "name",
  "phone",
  "plan",
  "diet",
  "locality",
  "message",
  "duration",
  "days",
  "total",
  "meals",
];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var estimate = data.estimate || {};
    var meals = "";
    if (estimate.meals && estimate.meals.length) {
      meals = estimate.meals
        .map(function (meal) {
          return meal.meal + " " + meal.perMeal;
        })
        .join(", ");
    }
    getSheet_().appendRow([
      data.receivedAt || new Date().toISOString(),
      data.type || "",
      data.name || "",
      data.phone || "",
      data.plan || "",
      data.diet || "",
      data.locality || "",
      data.message || "",
      estimate.duration || "",
      estimate.days || "",
      estimate.total || "",
      meals,
    ]);
    return json_({ ok: true });
  } catch (error) {
    return json_({ ok: false, error: String(error) });
  }
}

function getSheet_() {
  var book = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = book.getSheetByName("Enquiries");
  if (!sheet) {
    sheet = book.insertSheet("Enquiries");
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function json_(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
