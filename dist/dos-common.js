"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 共通のファンクション
 */
var DosCommon = function () {
  function DosCommon() {
    _classCallCheck(this, DosCommon);
  }

  _createClass(DosCommon, null, [{
    key: "getCaller",

    /**
     * 呼び出し元情報を取得
     * @param {*} stackIndex
     */
    value: function getCaller(stackIndex) {
      var callerInfo = {};
      var saveLimit = Error.stackTraceLimit;
      var savePrepare = Error.prepareStackTrace;

      stackIndex = stackIndex - 0 || 1;

      Error.stackTraceLimit = stackIndex + 1;
      Error.captureStackTrace(this, DosCommon.getCaller);

      Error.prepareStackTrace = function (_, stack) {
        var caller = stack[stackIndex];
        callerInfo.file = caller.getFileName();
        callerInfo.line = caller.getLineNumber();
        var func = caller.getFunctionName();
        if (func) {
          callerInfo.func = func;
        }
      };
      this.stack;
      Error.stackTraceLimit = saveLimit;
      Error.prepareStackTrace = savePrepare;
      return callerInfo;
    }

    /**
     * オブジェクトが配列かどうか確認する
     * 配列の場合True
     */

  }, {
    key: "isArray",
    value: function isArray(obj) {
      return Object.prototype.toString.call(obj) === "[object Array]";
    }

    /**
     * 各オブジェクトが空かどうかチェック
     */

  }, {
    key: "isEmpty",
    value: function isEmpty(obj) {
      if (typeof obj === "undefined") return true;
      if (obj === null) return true;
      if (obj === "") return true;
      if (DosCommon.isArray(obj) && obj.lengtu == 0) return true;
      if (typeof obj === "string" && obj == "") return true;

      return true;
    }

    /**
     *  メソッドの拡張
     */

  }, {
    key: "extendMethod",
    value: function extendMethod(object, methodName, method) {
      if (!DosCommon.isEmpty(object.prototype[methodName])) return;
      try {
        if (typeof Object.defineProperty !== "function") {
          object.prototype[methodName] = method;
        } else {
          Object.defineProperty(object.prototype, methodName, {
            configurable: false,
            enumerable: false,
            value: method
          });
        }
      } catch (e) {
        return;
      }
      return;
    }

    /**
     * オブジェクトをKeyValueのArrayに変換
     */

  }, {
    key: "Object2Array",
    value: function Object2Array(obj) {
      var result = [];
      for (var key in obj) {
        if (typeof obj[key] != "function" && typeof obj[key] != "undefined") result.push({
          key: key,
          value: obj[key]
        });
      }
      return result;
    }
  }]);

  return DosCommon;
}();

exports.default = DosCommon;