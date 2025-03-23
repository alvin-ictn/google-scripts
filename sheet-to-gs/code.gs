function doGet() {
  var data = getData(); // Get data from the sheet

  var template = HtmlService.createTemplateFromFile("Index");
  template.sheetData = data.data; // Pass the data to the HTML template

  return template.evaluate();
}

function getData() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Calendar"); // Change sheet name

  if (!sheet) {
    return { error: "Sheet not found" };
  }

  var data = sheet.getDataRange().getValues();
  return { data: data };
}