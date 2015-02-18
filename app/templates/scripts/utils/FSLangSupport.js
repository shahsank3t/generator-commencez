define(['require', 'fs/modules/Vent', 'globalize', 'gblMessages/message/en'], function (require, vent, Globalize) {
  'use strict';

  var localization = {};

  //This is just to suppress validation Engine Error when app starts
  $.fn.validationEngine = function () {};

  function setCulture(culture) {
    if (typeof culture !== 'undefined') {
      localization.culture = culture;
    } else {
      localization.culture = "en";
    }
    Globalize.culture(localization.culture);
  };

  localization.setDefaultCulture = function () {
    setCulture();
  };

  localization.tt = function (label) {
    var ret = label;

    var str = Globalize.localize(label, localization.culture);
    if (typeof str !== 'undefined') {
      return str;
    }

    if (localization.culture !== 'en') {
      if (typeof localization.culture !== 'undefined') {
        ret = (typeof Globalize.localize(label, "en") === 'undefined') ? label : Globalize.localize(label, "en");
      } else {
        ret = Globalize.localize(label, "en");
      }
    }
    return ret;
  };

  localization.formatCurrency = function (label) {
    var str = Globalize.format(parseFloat(label), 'c');
    if (typeof str !== 'undefined') {
      return str;
    }
  };

  localization.getMonthsAbbr = function () {
    return Globalize.culture().calendars.standard.months.namesAbbr;
  };

  localization.getDaysOfWeek = function (label) {
    return Globalize.culture().calendars.standard.days.namesAbbr;
  };

  localization.chooseCulture = function (culture) {
    var dfd = $.Deferred();
    dfd.done(function (validationMessages) {
      require(['validationEngine'], function () {
        setCulture(culture);
        validationMessages.setupMessages();
        vent.trigger('Layouts:rerender');
      });
    });
    switch (culture) {
      default:
        require(['gblMessages/message/en'], function () {
          require(['validationEngineEn'], function (validationMessages) {
            dfd.resolve(validationMessages);
            console.log('Language Changed to en');
          });
          bootbox.setLocale('en');
        });
        break;
    }
  };

  localization.formatDate = function (val, format) {
    if (!val) return "";
    require(['fs/utils/FSUtils'], function (FSUtils) {
      var valDate = FSUtil.DBToDateObj(val);
      return Globalize.format(valDate, format, localization.culture);
    });
  };

  return localization;
});