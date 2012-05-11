// Generated by CoffeeScript 1.3.1
(function() {
  var getCookie,
    __slice = [].slice;

  window.getCookie = getCookie = function(name) {
    var c, cookie, cookies, _i, _len;
    if (document.cookie && document.cookie !== '') {
      cookies = document.cookie.split(';');
      for (_i = 0, _len = cookies.length; _i < _len; _i++) {
        c = cookies[_i];
        cookie = $.trim(c);
        console.log(cookie.slice(0, name.length + 1 || 9e9), name + '=');
        if (cookie.slice(0, name.length + 1 || 9e9) === name + '=') {
          return decodeURIComponent(cookie.slice(name.length + 1));
        }
      }
    }
    return null;
  };

  window.assert = function(bool, message) {
    if (message == null) {
      message = 'assertion failed';
    }
    if (!bool) {
      throw message;
    }
  };

  window.pushUnique = function(array, item) {
    if (array.indexOf(item) < 0) {
      array.push(item);
    }
    return array;
  };

  window.format = function() {
    var obj, string, values;
    string = arguments[0], values = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    if (values.length < 1) {
      return string;
    }
    if (values.length === 1 && $.type(values[0]) === 'object') {
      obj = values[0];
      return string.replace(/{{ *([a-zA-Z0-9_-]+) *}}/g, function(match, identifer) {
        if (obj[identifer] != null) {
          return obj[identifer];
        } else {
          return match;
        }
      });
    } else {
      return string.replace(/{{ *(\d+) *}}/g, function(match, index) {
        if (values[index] != null) {
          return values[index];
        } else {
          return match;
        }
      });
    }
  };

  window.dict_by_attr = function(array, attr, options) {
    var item, key, result, value, _i, _len;
    result = {};
    for (_i = 0, _len = array.length; _i < _len; _i++) {
      item = array[_i];
      key = item[attr];
      if (options.value != null) {
        value = item[options.value];
      } else {
        value = item;
      }
      if (options.flat != null) {
        result[key] = value;
      } else {
        if (result[key] == null) {
          result[key] = [];
        }
        result[key].push(value);
      }
    }
    return result;
  };

  window.barrier = function(number, complete) {
    var i;
    i = 0;
    return (function(number) {
      if (++i === number) {
        return complete();
      }
    })(number);
  };

  window.delayfn = function(msec, fn) {
    var timer;
    timer = null;
    return (function(msec) {
      return function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        clearTimeout(timer);
        return timer = setTimeout((function() {
          return fn.apply(null, args);
        }), msec);
      };
    })(msec);
  };

  window.Logger = {
    CONSOLE: 1,
    SERVER: 2,
    USER: 3,
    INFO: 1,
    ERROR: 5,
    enabled: true,
    log: function() {
      var message, type;
      type = arguments[0], message = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (!Logger.enabled) {
        return;
      }
      if (!(Logger.mode != null)) {
        Logger.mode = Logger.INFO;
      }
      if (Logger.mode >= Logger.CONSOLE) {
        if (type === Logger.INFO) {
          console.log.apply(console, message);
        } else if (type === Logger.ERROR) {
          console.error.apply(console, message);
        }
      }
      if (Logger.modemode >= Logger.SERVER) {
        delayfn(200, function() {
          return console.log.apply(console, message);
        })();
      }
      if (Logger.modemode >= Logger.USER) {
        return alert(' '.join(message));
      }
    },
    info: function() {
      var message;
      message = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return Logger.log.apply(Logger, [Logger.INFO].concat(__slice.call(message)));
    },
    error: function() {
      var message;
      message = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return Logger.log.apply(Logger, [Logger.ERROR].concat(__slice.call(message)));
    }
  };

  $(document).ajaxSend(function(evt, xhr, settings) {
    var safeMethod, sameOrigin;
    sameOrigin = function(url) {
      var host, origin, protocol, sr_origin;
      host = document.location.host;
      protocol = document.location.protocol;
      sr_origin = '//' + host;
      origin = protocol + sr_originn;
      return (url === origin || url.slice(0, origin.length + 1) === origin + '/') || (url === sr_origin || url.slice(0, sr_origin.length + 1) === sr_origin + '/') || !(/^(\/\/|http:|https:).*/.test(url));
    };
    safeMethod = function(method) {
      return /^(GET|HEAD|OPTIONS|TRACE)$/.test(method);
    };
    if (!safeMethod(settings.type) && sameOrigin(settings.url)) {
      return xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
    }
  });

}).call(this);