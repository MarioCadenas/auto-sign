function errorLog(error) {
  sendEmail(EMAIL_TYPES.ERROR, JSON.stringify(error));

  throw new Error(error);
}

function sendEmail(type, body) {
  return GmailApp.sendEmail(EMAIL, type, body);
}

function fetchApi() {
  var encoded = Utilities.base64Encode(COMPANY_ID + ":" + EMPLOYEE_ID);
  var headerValue = 'Basic ' + encoded;
  var headers = {
    Authorization: headerValue
  };

  try {
    var response = UrlFetchApp.fetch(URL, { method: 'POST', headers: headers });
    var description = JSON.parse(response.getContentText()).description;

    return description;
  } catch(e) {
    return errorLog(e);
  }
}
