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

function deleteAllTriggers() {
  var triggers = ScriptApp.getProjectTriggers();

  triggers.forEach(ScriptApp.deleteTrigger);
}
