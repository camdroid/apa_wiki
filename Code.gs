function doGet() {
  console.log('Starting program - console log');

  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var dataByProgramName = getDataByProgram();
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

function isUserAuthorized() {
  var userEmail = Session.getActiveUser().getEmail();
  Logger.log(userEmail);
  var optionalArgs = {
    customer: 'my_customer',
    maxResults: 10,
    orderBy: 'email',
  };
  //var response = AdminDirectory.Users.list(optionalArgs);
  //Logger.log(response);

  // To enable AdminDirectory, use 
  // https://developers.google.com/apps-script/guides/services/advanced#enabling_advanced_services
  // var user = AdminDirectory.Users.get(userEmail);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .getContent();
}

function getData(){
  var sheet = SpreadsheetApp.openById("1MsFm51q0h6AsfXnAB3-2lbBH6mCPlZvSVqaXvxRNdBM").getSheets()[0];
  return sheet.getDataRange().getValues();
}

