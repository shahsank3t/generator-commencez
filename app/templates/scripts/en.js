/**
 * Never Delete any key without seraching it in all View and Template files
 */
(function (window, undefined) {
  var Globalize;
  require(['globalize'], function (globalize) {
    Globalize = globalize;
    Globalize.addCultureInfo("en", {
      messages: {
        // Form labels, Table headers etc
        lbl: {},
        btn: {},
        // h1, h2, h3, fieldset, title
        h: {},
        msg: {},
        plcHldr: {},
        dialogMsg: {},
        validationMessages: {},
        // Server Messages
        serverMsg: {}
      }
    });
  });
}(this));