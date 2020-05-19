/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}
/**
 * @param {string} str
 * @returns {Boolean} 手机号码验证
 */
export function tel(tel) {
  var reg = /^1\d{10}$/
  if (!reg.test(tel)) {
    return false
  }
  return true
}
/**
 * @param {string} str
 * @returns {Boolean}  银行卡验证
 */
export function BankCards(str) {
  var reg = /^([1-9]{1})(\d{14}|\d{18})$/
  if (!reg.test(str)) {
    return false
  }
  return true
}
/**
 * @param {string} str
 * @returns {Boolean}  身份证验证
 */
export function idcard(str) {
  var reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
  if (!reg.test(str)) {
    return false
  }
  return true
}

var toString = Object.prototype.toString

export function isFunction(obj) {
  return toString.call(obj) === '[object Function]'
}

export function eq(a, b, aStack, bStack) {
  // === 结果为 true 的区别出 +0 和 -0
  if (a === b) return a !== 0 || 1 / a === 1 / b

  // typeof null 的结果为 object ，这里做判断，是为了让有 null 的情况尽早退出函数
  if (a == null || b == null) return false

  // 判断 NaN
  // eslint-disable-next-line no-self-compare
  if (a !== a) return b !== b

  // 判断参数 a 类型，如果是基本类型，在这里可以直接返回 false
  var type = typeof a
  if (type !== 'function' && type !== 'object' && typeof b !== 'object') { return false }

  // 更复杂的对象使用 deepEq 函数进行深度比较
  return deepEq(a, b, aStack, bStack)
}

export function deepEq(a, b, aStack, bStack) {
  // a 和 b 的内部属性 [[class]] 相同时 返回 true
  var className = toString.call(a)
  if (className !== toString.call(b)) return false

  switch (className) {
    case '[object RegExp]':
    case '[object String]':
      return '' + a === '' + b
    case '[object Number]':
      // eslint-disable-next-line no-self-compare
      if (+a !== +a) return +b !== +b
      return +a === 0 ? 1 / +a === 1 / b : +a === +b
    case '[object Date]':
    case '[object Boolean]':
      return +a === +b
  }

  var areArrays = className === '[object Array]'
  // 不是数组
  if (!areArrays) {
    // 过滤掉两个函数的情况
    if (typeof a !== 'object' || typeof b !== 'object') return false

    var aCtor = a.constructor
    var bCtor = b.constructor
    // aCtor 和 bCtor 必须都存在并且都不是 Object 构造函数的情况下，aCtor 不等于 bCtor， 那这两个对象就真的不相等啦
    if (
      aCtor === bCtor &&
      !(
        isFunction(aCtor) &&
        aCtor instanceof aCtor &&
        isFunction(bCtor) &&
        bCtor instanceof bCtor
      ) &&
      'constructor' in a && 'constructor' in b
    ) {
      return false
    }
  }

  aStack = aStack || []
  bStack = bStack || []
  var length = aStack.length

  // 检查是否有循环引用的部分
  while (length--) {
    if (aStack[length] === a) {
      return bStack[length] === b
    }
  }

  aStack.push(a)
  bStack.push(b)

  // 数组判断
  if (areArrays) {
    length = a.length
    if (length !== b.length) return false

    while (length--) {
      if (!eq(a[length], b[length], aStack, bStack)) return false
    }
  } else { // 对象判断
    var keys = Object.keys(a)
    var key
    length = keys.length

    if (Object.keys(b).length !== length) return false
    while (length--) {
      key = keys[length]
      if (!(b.hasOwnProperty(key) && eq(a[key], b[key], aStack, bStack))) { return false }
    }
  }
  aStack.pop()
  bStack.pop()
  return true
}
