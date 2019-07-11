var COMPANY_ID = 123;
var EMPLOYEE_ID = 456;
var CALENDAR_TITLE_KEYWORD = 'vacaciones';
var SCHEDULE = {
  ENTRY_TIME_HOUR: 8,
  ENTRY_TIME_MINUTE: 0,
  ENTRY_TIME_HOUR_FRIDAYS: 9,
  ENTRY_TIME_MINUTE_FRIDAYS: 0,
  LEAVE_TIME_HOUR: 17,
  LEAVE_TIME_MINUTE: 30,
  LEAVE_TIME_HOUR_FRIDAYS: 15,
  LEAVE_TIME_MINUTE_FRIDAYS: 0
};

var SIGN_IN_TRIGGER_METHOD = 'signIn';
var EMAIL = Session.getActiveUser().getEmail();
var URL = 'https://gestion.horalaboral.com/v1/webapi/read_data';
var VACATION_MESSAGE = 'No se ha fichado porque estás de vacaciones.';
var TEMPLATE = '[HORA LABORAL]: ';
var EMAIL_TYPES = {
  ERROR: TEMPLATE + 'Error al fichar',
  SUCCESS: TEMPLATE + 'Fichado correctamente',
  VACATIONS: TEMPLATE +  'Vacaciones'
};

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

function signIn() {
  var today = new Date();
  var events = CalendarApp.getDefaultCalendar().getEventsForDay(today);
  var filteredEvents = events.filter(function (event) {
    return event.getTitle().toLowerCase() !== CALENDAR_TITLE_KEYWORD;
  });
  var isVacationDay = filteredEvents.length !== events.length;
  var result = !isVacationDay ? fetchApi() : VACATION_MESSAGE;
  var emailType = !isVacationDay ? 'SUCCESS' : 'VACATIONS';

  sendEmail(EMAIL_TYPES[emailType], result);
}

function createTimeDrivenTriggers() {
  setBothTriggersForDay(ScriptApp.WeekDay.MONDAY);
  setBothTriggersForDay(ScriptApp.WeekDay.TUESDAY);
  setBothTriggersForDay(ScriptApp.WeekDay.WEDNESDAY);
  setBothTriggersForDay(ScriptApp.WeekDay.THURSDAY);
  setBothTriggersForFriday();
}

function setBothTriggersForDay(day) {
  ScriptApp.newTrigger(SIGN_IN_TRIGGER_METHOD)
    .timeBased()
    .onWeekDay(day)
    .atHour(SCHEDULE.ENTRY_TIME_HOUR)
    .nearMinute(SCHEDULE.ENTRY_TIME_MINUTE)
    .inTimezone('Europe/Madrid')
    .create();

  ScriptApp.newTrigger(SIGN_IN_TRIGGER_METHOD)
    .timeBased()
    .onWeekDay(day)
    .atHour(SCHEDULE.LEAVE_TIME_HOUR)
    .nearMinute(SCHEDULE.LEAVE_TIME_MINUTE)
    .inTimezone('Europe/Madrid')
    .create();
}

function setBothTriggersForFriday() {
  ScriptApp.newTrigger(SIGN_IN_TRIGGER_METHOD)
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.FRIDAY)
    .atHour(SCHEDULE.ENTRY_TIME_HOUR_FRIDAYS)
    .nearMinute(SCHEDULE.ENTRY_TIME_MINUTE_FRIDAYS)
    .inTimezone('Europe/Madrid')
    .create();

  ScriptApp.newTrigger(SIGN_IN_TRIGGER_METHOD)
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.FRIDAY)
    .atHour(SCHEDULE.LEAVE_TIME_HOUR_FRIDAYS)
    .nearMinute(SCHEDULE.LEAVE_TIME_MINUTE_FRIDAYS)
    .inTimezone('Europe/Madrid')
    .create();
}