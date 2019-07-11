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
