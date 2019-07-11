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
