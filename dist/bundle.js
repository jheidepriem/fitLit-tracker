/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* COLORS */\n#F8F6F6 * {\n  font-size: 14px;\n  margin: 0;\n  padding: 0;\n  font-family: \"Open Sans\";\n}\n\nbody,\nhtml {\n  height: 100vh;\n  width: 100vw;\n}\n\nbody {\n  display: flex;\n}\n\n.left-side {\n  height: 100vh;\n  width: 25vw;\n  border: 3px solid black;\n}\n\n.friends-list,\n.step-goal,\n.user-info {\n  border: 2px solid black;\n  height: 25vh;\n  width: auto;\n}\n\nmain {\n  height: 100vh;\n  width: 75vw;\n  border: 3px solid green;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.hydration-graph {\n  height: 25vh;\n  width: 65vw;\n  border: 3px solid red;\n  display: flex;\n  justify-content: center;\n  margin-top: 8%;\n  margin-bottom: 8%;\n}\n\n.graph-wrapper {\n  height: 45vh;\n  width: 75vw;\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n}\n\n.step-graph,\n.sleep-graph {\n  height: 40vh;\n  width: 30vw;\n  border: 3px solid blue;\n  display: flex;\n  justify-content: center;\n}\n\n.step-graph {\n  border-radius: 150px;\n}", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"AAAA,WAAA;AAEA;EAIE,eAAA;EACA,SAAA;EACA,UAAA;EACA,wBAAA;AAHF;;AAMA;;EAEE,aAAA;EACA,YAAA;AAHF;;AAMA;EACE,aAAA;AAHF;;AAMA;EACE,aAAA;EACA,WAAA;EACA,uBAAA;AAHF;;AAMA;;;EAGE,uBAAA;EACA,YAAA;EACA,WAAA;AAHF;;AAMA;EACE,aAAA;EACA,WAAA;EACA,uBAAA;EACA,aAAA;EACA,sBAAA;EACA,mBAAA;AAHF;;AAMA;EACE,YAAA;EACA,WAAA;EACA,qBAAA;EACA,aAAA;EACA,uBAAA;EACA,cAAA;EACA,iBAAA;AAHF;;AAMA;EACE,YAAA;EACA,WAAA;EACA,aAAA;EACA,6BAAA;EACA,mBAAA;AAHF;;AAMA;;EAEE,YAAA;EACA,WAAA;EACA,sBAAA;EACA,aAAA;EACA,uBAAA;AAHF;;AAMA;EACE,oBAAA;AAHF","sourcesContent":["/* COLORS */\n\n#F8F6F6 /*light silver */\n\n\n* {\n  font-size: 14px;\n  margin: 0;\n  padding: 0;\n  font-family: \"Open Sans\";\n}\n\nbody,\nhtml {\n  height: 100vh;\n  width: 100vw;\n}\n\nbody {\n  display: flex;\n}\n\n.left-side {\n  height: 100vh;\n  width: 25vw;\n  border: 3px solid black;\n}\n\n.friends-list,\n.step-goal,\n.user-info {\n  border: 2px solid black;\n  height: 25vh;\n  width: auto;\n}\n\nmain {\n  height: 100vh;\n  width: 75vw;\n  border: 3px solid green;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.hydration-graph {\n  height: 25vh;\n  width: 65vw;\n  border: 3px solid red;\n  display: flex;\n  justify-content: center;\n  margin-top: 8%;\n  margin-bottom: 8%;\n}\n\n.graph-wrapper {\n  height: 45vh;\n  width: 75vw;\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n}\n\n.step-graph,\n.sleep-graph {\n  height: 40vh;\n  width: 30vw;\n  border: 3px solid blue;\n  display: flex;\n  justify-content: center;\n}\n\n.step-graph {\n  border-radius: 150px;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/turing-logo.png");

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class UserRepository {
  constructor(data){
    this.userData = data
  }

  retrieveUserData(id){
    let singleUserData = this.userData.find((user) => user.id === id)
    return singleUserData
  }

  findAverageStepGoal(){
    const sum = this.userData.reduce((total, user) => {
      total = total += user.dailyStepGoal 
      return total 
    }, 0)
    let average = sum / this.userData.length
    return average
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UserRepository);

/***/ }),
/* 8 */
/***/ ((module) => {

class Hydration {
    constructor(id) {
        this.id = id;
        this.userHistory = [];
    };

    filterUserHistory(hydrationData) {
        this.userHistory = hydrationData.filter((history) => {
            if(history.userID === this.id) {
                return history
            };
        });
    };

    getTotalOunces() {
        const sum = this.userHistory.reduce((total, day) => {
            return total += day.numOunces
        }, 0)
        return sum
    };

    getTotalAvg() {
        return this.getTotalOunces() / this.userHistory.length
    };

    getDailyOunces(day) {
        const dailyOunces = this.userHistory.find((entry) => {
            return entry.date === day
        })
        return dailyOunces.numOunces
    };

    getWeeklyOunces() {
        const weeklyHistory = this.userHistory.slice(-7)
        const weeklyOunces = weeklyHistory.map(day => day.numOunces)
        return weeklyOunces
    };
};

module.exports = Hydration;

/***/ }),
/* 9 */
/***/ ((module) => {

class Sleep {
  constructor(userID, sleepData) {
    this.id = userID
    this.sleepHistory = []
  }

  filterSleepData(data) {
    this.sleepHistory = data.filter((sleepEntry) => {
      if(sleepEntry.userID === this.id)
      return sleepEntry
    });
  };

}

module.exports = Sleep;

/***/ }),
/* 10 */
/***/ ((module) => {

class User {
  constructor(userData) {
    this.id = userData.id;
    this.name = userData.name;
    this.address = userData.address;
    this.email = userData.email;
    this.strideLength = userData.strideLength;
    this.dailyStepGoal = userData.dailyStepGoal;
    this.friends = userData.friends;
  }

  findFirstName() {
    return this.name.split(" ")[0];
  }
}

module.exports = User;


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Your fetch requests will live here!
const fetchApiUrl = (path) => {
  return fetch(`https://fitlit-api.herokuapp.com/api/v1/${path}`)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log(`${path} error`))
}

const fetchAllData = () => {
  return Promise.all([
    fetchApiUrl('users'),
    fetchApiUrl('hydration'),
    fetchApiUrl('sleep')
  ])
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ fetchAllData });

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _images_turing_logo_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _UserRepository__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _src_Hydration__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony import */ var _src_Hydration__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_src_Hydration__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _src_Sleep__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _src_Sleep__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_src_Sleep__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _User__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(10);
/* harmony import */ var _User__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_User__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _src_apiCalls__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(11);
// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS file


// An example of how you tell webpack to use an image (also need to link to it in the index.html)



// An example of how you tell webpack to use a JS file








// Query Selectors
let userInfo = document.querySelector('.user-info')
let stepGoalDisplay = document.querySelector('.step-goal')
let friendsListDisplay = document.querySelector('friends-list')
let hydroGraph = document.getElementById("weekWater")
let todayWater = document.getElementById(".today-water")


//Global Variables
let user 
let currentRepo 
let hydration
let sleep
let userData

//EventListeners


//Functions

const fetchApiCalls = () => {
  _src_apiCalls__WEBPACK_IMPORTED_MODULE_6__["default"].fetchAllData()
  .then(data => {
    userData = data[0].userData;
    hydration = data[1].hydration;
    sleep = data[2].sleep;
    createNewUser();
    console.log(data)
  })
}

const createNewUser = () => {
  user = new (_User__WEBPACK_IMPORTED_MODULE_5___default())(userData);

}

const getRandomIndex = array => {
  return Math.floor(Math.random() * array.length);
}

const createUserCard = () => {
  user = new (_User__WEBPACK_IMPORTED_MODULE_5___default())(userData[getRandomIndex(userData)])
  currentRepo = new _UserRepository__WEBPACK_IMPORTED_MODULE_2__["default"](userData)
  userInfo.innerHTML = ''
  userInfo.innerHTML += `
    <h2>Hi, ${user.findFirstName()}</h2>
    <h3>Address:${user.address}</h3>
    <h3>Email:${user.email}</h3>
  `
  stepGoalDisplay.innerHTML = `
    <h3>Stride Length: ${user.strideLength}</h3>
    <h3>Daily Step Goal: ${user.dailyStepGoal}</h3>
    <h3>Average Step Goal: ${currentRepo.findAverageStepGoal()}</h3>
  `
}


const displayDailyOunces = () => {
  hydration = new (_src_Hydration__WEBPACK_IMPORTED_MODULE_3___default())(user.id)
  hydration.filterUserHistory()
  console.log(hydration)
  todayWater.innerHTML = `
  <h2>Today's Ounces: ${hydration.getDailyOunces()}</h2>
  `
}



const pageLoad = (createUserCard(), fetchApiCalls())  
window.addEventListener('load',pageLoad)
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map