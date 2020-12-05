let _g = null;
try {
  _g = !!window ? window : {};
} catch (e) {
  _g = !!global ? global : {};
}

/**
 * If関数
 */
if (!_g._if) {
  /**
   * ifファンクション
   * @param {*} condition
   */
  _g._if = (condition) => {
    const thenMethod = (thenFunc) => {
      const elseMethod = (elseFunc) => {
        return !!condition ? thenFunc(condition) : elseFunc(condition);
      };
      return { else: elseMethod };
    };
    return { then: thenMethod };
  };
}

/**
 * async If関数
 */
if (!_g._asyncIf) {
  /**
   * ifファンクション
   * @param {*} condition
   */
  _g._asyncIf = (condition) => {
    const thenMethod = (thenFunc) => {
      const elseMethod = async (elseFunc) => {
        return !!condition
          ? await thenFunc(condition)
          : await elseFunc(condition);
      };
      return { else: elseMethod };
    };
    return { then: thenMethod };
  };
}

/**
 * Switch関数
 */
if (!_g._switch) {
  /**
   * switchファンクション
   * @param {*} switchVal
   */
  _g._switch = (switchVal) => {
    const caseMethod = (funcToDo) => (caseVal) => {
      const isFixedNow = !funcToDo && switchVal === caseVal;
      const thenMethod = (funcToDo, isFixedNow) => (thenFunc) => {
        const defaultMethod = (funcToDo) => (defaultFunc) => {
          return (funcToDo || defaultFunc)();
        };
        return {
          case: caseMethod(isFixedNow ? thenFunc : funcToDo),
          default: defaultMethod(isFixedNow ? thenFunc : funcToDo),
        };
      };
      return { then: thenMethod(funcToDo, isFixedNow) };
    };
    return { case: caseMethod() };
  };
}

/**
 * async-Switch関数
 */
if (!_g._asyncSwitch) {
  /**
   * switchファンクション
   * @param {*} switchVal
   */
  _g._asyncSwitch = async (switchVal) => {
    const caseMethod = async (funcToDo) => async (caseVal) => {
      const isFixedNow = !funcToDo && switchVal === caseVal;
      const thenMethod = async (funcToDo, isFixedNow) => async (thenFunc) => {
        const defaultMethod = async (funcToDo) => async (defaultFunc) => {
          return await (funcToDo || defaultFunc)();
        };
        return {
          case: await caseMethod(isFixedNow ? thenFunc : funcToDo),
          default: await defaultMethod(isFixedNow ? thenFunc : funcToDo),
        };
      };
      return { then: await thenMethod(funcToDo, isFixedNow) };
    };
    return { case: await caseMethod() };
  };
}

/**
 * try関数
 */
if (!_g._try) {
  _g._try = (execFunc) => {
    const catchMethod = (catchFunc) => {
      try {
        // console.log("try_");
        const res = execFunc();
        // console.log(res);
        return res;
      } catch (e) {
        // console.log("catch");
        return catchFunc(e);
      }
    };
    return { catch: catchMethod };
  };
}

/**
 * async-try関数
 */
if (!_g._asyncTry) {
  _g._asyncTry = (execFunc) => {
    const catchMethod = async (catchFunc) => {
      try {
        // console.log("try_");
        const res = await execFunc();
        // console.log(res);
        return res;
      } catch (e) {
        // console.log("catch");
        return await catchFunc(e);
      }
    };
    return { catch: catchMethod };
  };
}

/**
 * 共通のファンクション
 */
export default class DosCommon {
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
          value: method,
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
      if (typeof obj[key] != "function" && typeof obj[key] != "undefined")
        result.push({
          key,
          value: obj[key],
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

  // /**
  //  * コマンド実行
  //  * @param {*} command
  //  */
  // static async execCommand(command) {
  //   return new Promise((resolve, reject) => {
  //     const { exec } = require("child_process");
  //     exec(command, (err, stdout, stderr) => {
  //       if (err) return reject(stderr);
  //       else return resolve(stdout);
  //     });
  //   });
  // }
}
