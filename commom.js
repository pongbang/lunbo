/*
 * @description: 获取元素对象下标
 * @param: {Object} item 需要获取的DOM对象
 * @return: {Number} i 下标
 * @Date: 2022-05-17 21:12:05
 */
function getElementIdx(item) {
  var elements = item.parentNode.children;
  for (var i = 0, len = elements.length; i < len; i++) {
    if (elements[i] === item) {
      return i;
    }
  }
}
/**
 * @description: 设置任意的标签中间的任意文本内容
 * @param {Object} obj 需要获取的DOM对象
 * @param {String} text 需要设置的文本内容
 * textContent 不支持ie8
 * innerText 都可以
 * 不支持的话,这个属性的类型是undefined
 */
function setInnerText(element, text) {
  var key = element.textContent == 'undefined' ? 'innerText' : 'textContent';
  element[key] = text;
}
/**
 * @description: 获取元素实际样式
 * @param {Object} obj 需要获取的DOM对象
 * @param {String} attr 需要查询的样式
 * @return currentStyle ie兼容 chrome不兼容 不支持伪元素
 * getComputedStyle chrome兼容 ie5-8不兼容 支持
 */
function getStyle(obj, attr) {
  return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
}
function $(ele) {
  return document.querySelector(ele);
}
function $$(ele) {
  return document.querySelectorAll(ele);
}
/**
 * @description: 添加监听
 * @param {Object} element 监听的DOM对象
 * @param {String} type 事件类型
 * @param {Function} fn 监听绑定的回调
 */
function addEventListener(element, type, fn) {
  if (element.addEventListener) {
    element.addEventListener(type, fn, false);//标准浏览器写法
  } else if (element.attachEvent) {
    element.attachEvent("on" + type, fn);//IE
  } else {
    element["on" + type] = fn;//都不行用 对象.属性 .onclick
  }
}
/**
 * @description: 解除监听
 * @param {Object} element 监听的DOM对象
 * @param {String} type 事件类型
 * @param {Function} fn 监听绑定的回调
 */
function removeEventListener(element, type, fn) {
  if (element.removeEventListener) {
    element.removeEventListener(type, fn, false);
  } else if (element.detachEvent) {
    element.detachEvent("on" + type, fn);
  } else {
    element["on" + type] = null;
  }
}
/**
 * @description: 监听
 * @param {Object} element 需要监听的DOM对象
 * @param {String} type 事件类型
 * @param {Function} fn 监听绑定的回调
 * @param {Boolean} capture true 捕获阶段监听 false 冒泡阶段监听
 * @return {JSON} remove:Function 返回一个用于解除监听的函数
 */
function eventListener(element, type, fn, capture) {
  capture = capture || false;//什么阶段
  if (element.addEventListener) {
    element.addEventListener(type, fn, false);
  } else if (element.attachEvent) {
    element.attachEvent("on" + type, fn);
  }
  return {
    'remove': function () {
      if (element.removeEventListener) {
        element.removeEventListener(type, fn, false);
      } else if (element.detachEvent) {
        element.detachEvent("on" + type, fn);
      }
    }
  }
}