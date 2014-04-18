// request.js
// Provides centralized control for async/xhr requests
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('jquery'));
  } else {
    root.request = factory(root.$);
  }
}(this, function ($) {

  var request = {

    // Storage for saved requests
    stored: {},

    // Make request
    call: function (req, opts) {
      var reqObj;
      if (typeof req === 'string') {
        // Get from storage
        reqObj = this.stored[req];
        // Overwrite any stored opts
        if (opts && typeof opts === 'object') {
          for (var opt in opts) {
            // Only includes standars opts, not proprietary url_params
            if (opt !== 'url_params') {
              this.stored[req][opt] = opts[opt];
            }
          }
        }
      } else if (typeof req === 'object') {
        // Set reqObj to the request
        reqObj = req;
      }

      // Process URL parameters
      if (opts && opts.hasOwnProperty('url_params')) {
        reqObj.url = this.processURLParams(reqObj.url, opts.url_params);
      }

      // Make (and return) AJAX request
      return $.ajax(reqObj);

    },

    // Process URL parameters
    processURLParams: function (url, params) {
      return url.replace(/\{([^}]+)\}/g, function (i, match) {
        return params[match];
      });
    },

    // Create stored request
    create: function (name, opts) {
      this.stored[name] = opts;
    },

    // Remove stored request
    remove: function (name) {
      delete this.stored[name];
    }

  };

  return request;

}));
