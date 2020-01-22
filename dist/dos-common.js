"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * 共通のファンクション
 */
class DosCommon {
  /**
   * 呼び出し元情報を取得
   * @param {*} stackIndex
   */
  static getCaller(stackIndex) {
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
   * ランダム値を取得
   * @param {*} max
   */


  static getRandom(max) {
    return DosCommon.getRandomMinMax(0, max);
  }
  /**
   * ランダム値を取得
   * @param {*} max
   */


  static getRandomMinMax(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  /**
   * オブジェクトが配列かどうか確認する
   * 配列の場合True
   */


  static isArray(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
  }
  /**
   * 各オブジェクトが空かどうかチェック
   */


  static isEmpty(obj) {
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


  static extendMethod(object, methodName, method) {
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


  static Object2Array(obj) {
    let result = [];

    for (let key in obj) {
      if (typeof obj[key] != "function" && typeof obj[key] != "undefined") result.push({
        key,
        value: obj[key]
      });
    }

    return result;
  }
  /**
   * 指定秒間Sleepする
   * @param {*} sec
   */


  static sleep(sec) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve(sec);
      }, sec * 1000);
    });
  }

}

exports.default = DosCommon;