define(['require', 
  'handlebars', 
  'utils/Utils', 
  'utils/LangSupport',
  'modules/Acl'
  ], function(require, Handlebars, Utils, localization, Acl) {
  require('moment');
  /*
   * General guidelines while writing helpers:
   *
   * - If returning HTML use return new Handlebars.SafeString();
   * - If the helper needs optional arguments use the "hash arguments"
   *   Eg. {{{link . "See more..." story.url class="story"}}}
   *   NOTE: the first argument after the helper name should be . which will be context in the helper function
   *   Handlebars.registerHelper('link', function (context, text, url, options) {
   *    var attrs = [];
   *
   *    for(var prop in options.hash) {
   *      attrs.push(prop + '="' + options.hash[prop] + '"');
   *    }
   *    return new Handlebars.SafeString("<a " + attrs.join(" ") + ">" + text + "</a>");
   *   });
   *
   *
   * NOTE: Due to some limitations in the require-handlebars-plugin, we cannot have helper that takes zero arguments,
   *       for such helpers we have to pass a "." as first argument. [https://github.com/SlexAxton/require-handlebars-plugin/issues/72]
   */

  var HHelpers = {};

  /*
   * ACL related helpers
   */

  Handlebars.registerHelper("canRead", function(resource, options) {
    var roles = _.has(options.hash, 'roles') ? options.hash.roles : undefined;
    if (Acl.canRead(resource, roles)) {
      return options.fn(this);
    }
  });

  Handlebars.registerHelper("canCreate", function(resource, options) {
    var roles = _.has(options.hash, 'roles') ? options.hash.roles : undefined;
    if (Acl.canCreate(resource, roles)) {
      return options.fn(this);
    }
  });

  Handlebars.registerHelper("canUpdate", function(resource, options) {
    var roles = _.has(options.hash, 'roles') ? options.hash.roles : undefined;
    if (Acl.canUpdate(resource, roles)) {
      return options.fn(this);
    }
  });

  Handlebars.registerHelper("canDelete", function(resource, options) {
    var roles = _.has(options.hash, 'roles') ? options.hash.roles : undefined;
    if (Acl.canDelete(resource, roles)) {
      return options.fn(this);
    }
  });

  /**
   * Convert new line (\n\r) to <br>
   * from http://phpjs.org/functions/nl2br:480
   */
  HHelpers.nl2br = function(text) {
    text = Handlebars.Utils.escapeExpression(text);
    var nl2br = (text + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2');
    return new Handlebars.SafeString(nl2br);
  };
  Handlebars.registerHelper('nl2br', HHelpers.nl2br);

  /*
   * escapeHtmlChar
   */
  Handlebars.registerHelper("escapeHtmlChar", function(str) {
    return Utils.escapeHtmlChar(str);
  });

  Handlebars.registerHelper("nl2brAndEscapeHtmlChar", function(str) {
    return Utils.nl2brAndEscapeHtmlChar(str);
  });

  /*
   * required to fetch label for enum value
   */
  Handlebars.registerHelper('convertEnumValueToLabel', function(enumName,
    enumValue) {
    return Utils.enumValueToLabel(
      Utils.getEnum(enumName), enumValue);
  });

  /*
   * required to format date time
   */
  Handlebars.registerHelper('convertFormatDateTime', function(cellValue) {
    return Utils.formatDateTime(cellValue);
  });
  Handlebars.registerHelper('formatDate', function(val) {
    if (!val) return "";
    return Utils.formatDate(val);
  });
  Handlebars.registerHelper('formatDateCustom', function(val, format) {
    if (!val) return "";
    var dateObj = Utils.DBToDateObj(val);
    return Globalize.format(dateObj, format);
    //return Globalize.format((_.isString(val)?new Date(val):val),format);
  });

  Handlebars.registerHelper('toHumanDate', function(val) {
    if (!val) return "";
    //return Utils.toHumanDate(val);
    return localization.formatDate(val, 'f');
  });

  Handlebars.registerHelper('dateFormat', function(context, block) {
    if (window.moment) {
      var f = block.hash.format || "MMM Do, YYYY";
      return moment(context).format(f);
    } else {
      return context; //  moment plugin not available. return data as is.
    };
  });

  /*
   * Truncate the String till n positions
   */
  Handlebars.registerHelper('truncStr', function(str, n, useWordBoundary) {
    var len = n || 1;
    var useWordBn = useWordBoundary || false;
    return str.trunc(len, useWordBn);
  });


  Handlebars.registerHelper('tt', function(str) {
    return localization.tt(str);
    return str;
  });

  Handlebars.registerHelper('getCopyrightDate', function() {
    return new Date().getFullYear().toString();
  });

  Handlebars.registerHelper('paginate', function(totalCount, pageSize) {
    if (typeof pageSize === 'undefined') {
      pageSize = 25;
    }
    var html = '',
      fromPage = 0,
      i = 1;
    var index = parseInt(totalCount / pageSize);
    if (index == 0) {
      return html;
    }
    for (; i <= index; i++) {
      if (i == 1) {
        html += '<li class="active" data-page=' + fromPage + '><a href="javascript:;">' + i + '</a></li>';
      } else {
        html += '<li data-page=' + fromPage + '><a href="javascript:;">' + i + '</a></li>';
      }
      fromPage = pageSize * i;
    }
    if ((totalCount - pageSize * index) > 0) {
      html += '<li data-page=' + fromPage + '><a href="javascript:;">' + i + '</a></li>';
    }
    return html;
  });

  HHelpers.showWeekAbbr = function() {
    var html = '';
    localization.getDaysOfWeek().forEach(function(v, idx) {
      if (v) {
        html += '<option value="' + idx + '">' + v + '</option>';
      }
    });
    return html;
  };
  Handlebars.registerHelper('showWeekAbbr', HHelpers.showWeekAbbr);

  HHelpers.showDays = function() {
    var html = '';
    for (var i = 0, j = 1; i < 28; i++) {
      html += '<option value="' + i + '">' + (j++) + '</option>';
    }
    return html;
  };
  Handlebars.registerHelper('showDays', HHelpers.showDays);

  Handlebars.registerHelper('if_eq', function(context, options) {
    if (context == options.hash.compare)
      return options.fn(this);
    return options.inverse(this);
  });

  Handlebars.registerHelper('if_gt', function(context, options) {
    if (context > options.hash.compare)
      return options.fn(this);
    return options.inverse(this);
  });

  Handlebars.registerHelper('avatarHack', function(model) {
    return 'styles/images/avatar' + parseInt(((Math.random() * 10) % 4) + 1, 10) + '.png';
  });

  Handlebars.registerHelper('ifCond', function(v1, operator, v2, options) {

    switch (operator) {
      case '==':
        return (v1 == v2) ? options.fn(this) : options.inverse(this);
        break;
      case '===':
        return (v1 === v2) ? options.fn(this) : options.inverse(this);
        break;
      case '<':
        return (v1 < v2) ? options.fn(this) : options.inverse(this);
        break;
      case '<=':
        return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        break;
      case '>':
        return (v1 > v2) ? options.fn(this) : options.inverse(this);
        break;
      case '>=':
        return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        break;
      default:
        return options.inverse(this);
        break;
    }
    //return options.inverse(this);
  });

  //For Example
  /*{{#compare numberone "eq" numbretwo}}
    do something
  {{else}}
    do something else
  {{/compare}}
*/
  Handlebars.registerHelper("compare", function(v1, op, v2, options) {

    var c = {
      "eq": function(v1, v2) {
        return v1 == v2;
      },
      "neq": function(v1, v2) {
        return v1 != v2;
      },

    };

    if (Object.prototype.hasOwnProperty.call(c, op)) {
      return c[op].call(this, v1, v2) ? options.fn(this) : options.inverse(this);
    }
    return options.inverse(this);
  });
  //For Example
  //{{#eachProperty object}}
  //{{property}}: {{value}}<br/>
  //{{/eachProperty }}
  Handlebars.registerHelper('eachProperty', function(context, options) {
    var ret = "";
    for (var prop in context) {
      ret = ret + options.fn({
        property: prop,
        value: context[prop]
      });
    }
    return new Handlebars.SafeString(ret);
  });

  return HHelpers;
});