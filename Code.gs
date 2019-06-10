function doGet() {
  return HtmlService.createTemplateFromFile('index').evaluate();
}

function getDataByProgram() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  programs = {};
  for (var i = 1; i < data.length; i++) {
    var programName = data[i][5];
    if (programName === "") {
      continue;
    }
    if (programs[programName] == null) {
      programs[programName] = [];
    }
    programs[programName].push(data[i]);
  }
  return programs;
}

function getExcludedEntries() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[1];
  return sheet.getRange("C2:C").getValues();
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .getContent();
}
