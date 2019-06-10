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

function getHighlightedTags(tags) {
  const listOfTags = tags.split(',');
  var tagsWithColors = {};
  for (var i=0; i<listOfTags.length; i++) {
    var entryType = listOfTags[i].trim();
    tagsWithColors[entryType] = {};
    switch(entryType) {
      case "Dog":
        tagsWithColors[entryType] = '#ffa500';
        break;
      case "Intake":
        tagsWithColors[entryType] = '#7ba9f2';
        break;
      case "Outcomes":
        tagsWithColors[entryType] = '#5fb771';
        break;
      case "Cat":
        tagsWithColors[entryType] = '#9a62ef';
        break;
    }
  }
  return tagsWithColors;
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
