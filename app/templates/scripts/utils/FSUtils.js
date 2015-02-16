define(['require'], function(require) {
  'use strict';

  var FSUtil = {};

  FSUtil.DBToDateObj = function(dbDate) {

    var dateObj = new Date(dbDate.toString());
    // If the above fails for some browser, try our own parse function
    if (isNaN(dateObj)) {
      dateObj = new Date(this.manualDateParse(dbDate.toString()));

    }
    return dateObj;
  };

  FSUtil.manualDateParse = function(date) {
    var origParse = Date.parse,
      numericKeys = [1, 4, 5, 6, 7, 10, 11];
    var timestamp, struct, minutesOffset = 0;

    if ((struct = /^(\d{4}|[+\-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/
        .exec(date))) {
      // avoid NaN timestamps caused by “undefined” values being
      // passed to Date.UTC
      for (var i = 0, k;
        (k = numericKeys[i]); ++i) {
        struct[k] = +struct[k] || 0;
      }

      // allow undefined days and months
      struct[2] = (+struct[2] || 1) - 1;
      struct[3] = +struct[3] || 1;

      if (struct[8] !== 'Z' && struct[9] !== undefined) {
        minutesOffset = struct[10] * 60 + struct[11];

        if (struct[9] === '+') {
          minutesOffset = 0 - minutesOffset;
        }
      }

      timestamp = Date.UTC(struct[1], struct[2], struct[3], struct[4],
        struct[5] + minutesOffset, struct[6], struct[7]);
    } else {
      timestamp = origParse ? origParse(date) : NaN;
    }

    return timestamp;
  };

  return FSUtil;
});