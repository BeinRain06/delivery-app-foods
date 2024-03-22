"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var express = require("express");
var router = express.Router();
var Meal = require("./models/meal");
var Category = require("./models/category");

/* import {
  PUDDING,
  DUNDEE,
  ECCLESS,
  ETON,
  MANDAZI,
  LASAGNE,
  MADEIRA,
  MINCE,
  CHEESECAKE,
} from "../assets/images/dessert/dessert";

import {
  ESCOVIT,
  FOFOS,
  PIE,
  STEW,
  GARIDES,
  SARDINES,
  TERIYAKI,
  KEDGEREE,
  LAKSAKING,
  LANCASHIRE,
  MEDITERRANEAN,
  NASI,
} from "../assets/images/fish/fish";

import {
  DUCKCONFIT,
  FATTAH,
  TSOCHICKEN,
  HANDICHICKEN,
  IRISHSTEW,
  KATSUDON,
  JERKCHICKEN,
  KATSUCHICKEN,
  KENTUCKYCHICKEN,
  KUNPAO,
  LAMBBIRYANI,
  LAMBROGAN,
} from "../assets/images/meat/meat";

import {
  DALFRY,
  FETTUCINE,
  FLAMICHE,
  ONIONSOUP,
  LENTIL,
  MESDAMES,
  PLAKI,
  SOURSOUP,
  GOHANRICE,
  KAFTEJI,
  EGGSOUP,
  DAUPHINOISE,
} from "../assets/images/vegetarian/vegeterian"; */

/*meals*/
var meals = [{
  meats: [{
    id: Math.ceil(Math.random() * 1000000),
    foodName: "duck confit",
    /* foodPicture: { DUCKCONFIT }, */
    ratings: "3.8",
    miniDesc: "Lorem ipsum dolor sit.",
    longDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
    origin: "British",
    category: "meats",
    ingredients: ["bay leag", "white wine", "garlic"]
  }, {
    id: Math.ceil(Math.random() * 1000000),
    foodName: "egyptian fattah",
    /* foodPicture: { FATTAH }, */
    ratings: "3.8",
    miniDesc: "Lorem ipsum dolor sit.",
    longDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
    origin: "Egyptian",
    category: "meats",
    ingredients: ["tomatoes", "onions", "pepper"]
  }, {
    id: Math.ceil(Math.random() * 1000000),
    foodName: "general tso's chicken",
    /*  foodPicture: { TSOCHICKEN }, */
    ratings: "4.1",
    miniDesc: "Lorem ipsum dolor sit.",
    longDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
    origin: "Chinese",
    category: "meats",
    ingredients: ["soy sauce", "honey", "garlic"]
  }, {
    id: Math.ceil(Math.random() * 1000000),
    foodName: "handi chicken",
    /*  foodPicture: { HANDICHICKEN }, */
    ratings: "3.8",
    miniDesc: "Lorem ipsum dolor sit.",
    longDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
    origin: "British",
    category: "meats",
    ingredients: ["bay leag", "white wine", "garlic"]
  }, {
    id: Math.ceil(Math.random() * 1000000),
    /*  foodName: { IRISHSTEW }, */
    foodPicture: "",
    ratings: "4.3",
    miniDesc: "Lorem ipsum dolor sit.",
    longDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
    origin: "Irish",
    category: "meats",
    ingredients: ["cereliac", "turnips", "carrots"]
  }, {
    id: Math.ceil(Math.random() * 1000000),
    foodName: "jerk chicken",
    /*  foodPicture: { JERKCHICKEN }, */
    ratings: "4.1",
    miniDesc: "Lorem ipsum dolor sit.",
    longDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
    origin: "Jamaican",
    category: "meats",
    ingredients: ["onions", "garlic", "lime"]
  }, {
    id: Math.ceil(Math.random() * 1000000),
    foodName: "japanese katsudon",
    /*   foodPicture: { KATSUDON }, */
    ratings: "4.3",
    miniDesc: "Lorem ipsum dolor sit.",
    longDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
    origin: "Japanese",
    category: "meats",
    ingredients: ["onions", "soy sauce", "sushi rices"]
  }, {
    id: Math.ceil(Math.random() * 1000000),
    foodName: "kentucky fried chicken",
    /*  foodPicture: { KENTUCKYCHICKEN }, */
    ratings: "4.4",
    miniDesc: "Lorem ipsum dolor sit.",
    longDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
    origin: "American",
    category: "meats",
    ingredients: ["paprica", "oregano", "basil"]
  }, {
    id: Math.ceil(Math.random() * 1000000),
    foodName: "katsu chicken curry",
    /* foodPicture: { KATSUCHICKEN }, */
    ratings: "4.3",
    miniDesc: "Lorem ipsum dolor sit.",
    longDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
    origin: "Japanese",
    category: "meats",
    ingredients: ["garlic", "carrots", "curry powder"]
  }, {
    id: Math.ceil(Math.random() * 1000000),
    foodName: "kun pao chicken",
    /*  foodPicture: { KUNPAO }, */
    ratings: "4.3",
    miniDesc: "Lorem ipsum dolor sit.",
    longDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
    origin: "Chinese",
    category: "meats",
    ingredients: ["peanuts", "garlic clove", "brown sugar"]
  }, {
    id: Math.ceil(Math.random() * 1000000),
    foodName: "lamb biryani",
    /*    foodPicture: { LAMBBIRYANI }, */
    ratings: "4.3",
    miniDesc: "Lorem ipsum dolor sit.",
    longDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
    origin: "Indian",
    category: "meats",
    ingredients: ["mint", "cirianto", "cumin seeds"]
  }, {
    id: Math.ceil(Math.random() * 1000000),
    foodName: "lamb rogan josh",
    /*   foodPicture: { LAMBROGAN }, */
    ratings: "4.3",
    miniDesc: "Lorem ipsum dolor sit.",
    longDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
    origin: "Indian",
    category: "meats",
    ingredients: ["onion", "paprika", "cinnamon stick"]
  }],
  seaFoods: [{
    id: Math.ceil(Math.random() * 1000000),
    foodName: "escovit fish",
    /*  foodPicture: { ESCOVIT }, */
    ratings: "4.2",
    miniDesc: "Lorem ipsum dolor sit.",
    longDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
    origin: "Jamaican",
    category: "seafoods",
    ingredients: ["garlic", "onions", "carrots"]
  }, {
    id: Math.ceil(Math.random() * 1000000),
    foodName: "garides sanagaki",
    /*  foodPicture: { GARIDES }, */
    ratings: "3.9",
    miniDesc: "Lorem ipsum dolor sit.",
    longDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
    origin: "Greek",
    category: "seafoods",
    ingredients: ["chopped onions", "white whine", "chopped tomatoes"]
  }, {
    id: Math.ceil(Math.random() * 1000000),
    foodName: "grilles portuguese sardines",
    /*  foodPicture: { SARDINES }, */
    ratings: "4.1",
    miniDesc: "Lorem ipsum dolor sit.",
    longDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
    origin: "Portuguese",
    category: "seafoods",
    ingredients: ["garlic", "lemon", "red chili"]
  }, {
    id: Math.ceil(Math.random() * 1000000),
    foodName: "honey teriyaki salmon",
    /*    foodPicture: { TERIYAKI }, */
    ratings: "4.2",
    miniDesc: "Lorem ipsum dolor sit.",
    longDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
    origin: "Japanese",
    category: "seafoods",
    ingredients: ["soy sauce", "olive oil", "sesame feed"]
  }, {
    id: Math.ceil(Math.random() * 1000000),
    foodName: "kedgeree",
    /*  foodPicture: { KEDGEREE }, */
    ratings: "4.3",
    miniDesc: "Lorem ipsum dolor sit.",
    longDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
    origin: "British",
    category: "seafoods",
    ingredients: ["onions", "coriander", "cuury powder"]
  }, {
    id: Math.ceil(Math.random() * 1000000),
    foodName: "laksa king",
    /*   foodPicture: { LAKSAKING }, */
    ratings: "4.3",
    miniDesc: "Lorem ipsum dolor sit.",
    longDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
    origin: "Malaysian",
    category: "seafoods",
    ingredients: ["lime", "coriander", "coconuts milk"]
  }, {
    id: Math.ceil(Math.random() * 1000000),
    foodName: "landcashire hotpot",
    /* foodPicture: { LANCASHIRE }, */
    ratings: "3.8",
    miniDesc: "Lorem ipsum dolor sit.",
    longDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
    origin: "British",
    category: "seafoods",
    ingredients: ["carrots", "baby leaves", "plain flour"]
  }, {
    id: Math.ceil(Math.random() * 1000000),
    foodName: "fish pie",
    /*  foodPicture: { PIE }, */
    ratings: "3.8",
    miniDesc: "Lorem ipsum dolor sit.",
    longDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
    origin: "British",
    category: "seafoods",
    ingredients: ["double cream", "dill", "lemon"]
  }, {
    id: Math.ceil(Math.random() * 1000000),
    foodName: "fish stew",
    /* foodPicture: { STEW }, */
    ratings: "3.8",
    miniDesc: "Lorem ipsum dolor sit.",
    longDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
    origin: "French",
    category: "seafoods",
    ingredients: ["onions", "orange", "prawns"]
  }, {
    id: Math.ceil(Math.random() * 1000000),
    foodName: "fish fofos",
    /*  foodPicture: { FOFOS }, */
    ratings: "3.8",
    miniDesc: "Lorem ipsum dolor sit.",
    longDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
    origin: "Portuguese",
    category: "seafoods",
    ingredients: ["coriander", "cumin seeds", "flour"]
  }, {
    id: Math.ceil(Math.random() * 1000000),
    foodName: "mediterranean pasta salad",
    /*   foodPicture: { MEDITERRANEAN }, */
    ratings: "3.8",
    miniDesc: "Lorem ipsum dolor sit.",
    longDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
    origin: "Italian",
    category: "seafoods",
    ingredients: ["green olive", "tuna", "pepper"]
  }, {
    id: Math.ceil(Math.random() * 1000000),
    foodName: "nasi lemak",
    /* foodPicture: { NASI }, */
    ratings: "3.8",
    miniDesc: "Lorem ipsum dolor sit.",
    longDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
    origin: "Malaysian",
    category: "seafoods",
    ingredients: ["peanuts", "cumcumber", "shallots"]
  }],
  vegetarians: [{
    id: Math.ceil(Math.random() * 1000000),
    foodName: "egg drop soup",
    /* foodPicture: { EGGSOUP }, */
    ratings: "4.2",
    miniDesc: "Lorem ipsum dolor sit.",
    longDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
    origin: "Chinese",
    category: "vegetarians",
    ingredients: ["peas", "cornstarch", "spring onions"]
  }, {
    id: Math.ceil(Math.random() * 1000000),
    foodName: "gigantes plaki",
    /*   foodPicture: { PLAKI }, */
    ratings: "4.1",
    miniDesc: "Lorem ipsum dolor sit.",
    longDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
    origin: "Greek",
    category: "vegetarians",
    ingredients: ["onions", "tomatoes", "dried oregano"]
  }, {
    id: Math.ceil(Math.random() * 1000000),
    foodName: "kafteji",
    /*  foodPicture: { KAFTEJI }, */
    ratings: "4.3",
    miniDesc: "Lorem ipsum dolor sit.",
    longDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
    origin: "Tunisiam",
    category: "vegetarians",
    ingredients: ["onions", "pumpkin", "pepper"]
  }, {
    id: Math.ceil(Math.random() * 1000000),
    foodName: "koshari",
    /* foodPicture: { SOURSOUP }, */
    ratings: "4.3",
    miniDesc: "Lorem ipsum dolor sit.",
    longDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
    origin: "Egyptian",
    category: "vegetarians",
    ingredients: ["brown lentils", "onion", "maccaroni"]
  }, {
    id: Math.ceil(Math.random() * 1000000),
    foodName: "flamiche",
    /* foodPicture: { FLAMICHE }, */
    ratings: "3.8",
    miniDesc: "Lorem ipsum dolor sit.",
    longDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
    origin: "French",
    category: "vegetarians",
    ingredients: ["plain flour", "lard", "butter"]
  }, {
    id: Math.ceil(Math.random() * 1000000),
    foodName: "french onion soup",
    /* foodPicture: { ONIONSOUP }, */
    ratings: "3.8",
    miniDesc: "Lorem ipsum dolor sit.",
    longDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
    origin: "French",
    category: "vegetarians",
    ingredients: ["onion", "plain flour", "sugar"]
  }, {
    id: Math.ceil(Math.random() * 1000000),
    foodName: "fettucine alfredo",
    /*  foodPicture: { FETTUCINE }, */
    ratings: "3.8",
    miniDesc: "Lorem ipsum dolor sit.",
    longDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
    origin: "Italian",
    category: "vegetarians",
    ingredients: ["fettucine", "nutmeg", "corn flour"]
  }, {
    id: Math.ceil(Math.random() * 1000000),
    foodName: "french lentil",
    /* foodPicture: { LENTIL }, */
    ratings: "3.8",
    miniDesc: "Lorem ipsum dolor sit.",
    longDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
    origin: "French",
    category: "vegetarians",
    ingredients: ["onion", "garlic", "carrots"]
  }, {
    id: Math.ceil(Math.random() * 1000000),
    foodName: "fennel dauphinoise",
    /*  foodPicture: { DAUPHINOISE }, */
    ratings: "3.8",
    miniDesc: "Lorem ipsum dolor sit.",
    longDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
    origin: "French",
    category: "vegetarians",
    ingredients: ["butter", "milk", "garlic"]
  }, {
    id: Math.ceil(Math.random() * 1000000),
    foodName: "full mesdames",
    /* foodPicture: { MESDAMES }, */
    ratings: "3.8",
    miniDesc: "Lorem ipsum dolor sit.",
    longDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
    origin: "Egyptian",
    category: "vegetarians",
    ingredients: ["lemon", "cumin", "garlic clove"]
  }, {
    id: Math.ceil(Math.random() * 1000000),
    foodName: "japanese gohan rice",
    /* foodPicture: { GOHANRICE }, */
    ratings: "3.8",
    miniDesc: "Lorem ipsum dolor sit.",
    longDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
    origin: "Japanese",
    category: "vegetarians",
    ingredients: ["mirin", "pickle juice", "spring onion"]
  }],
  desserts: [{
    id: Math.ceil(Math.random() * 1000000),
    foodName: "dundee cake",
    /* foodPicture: { DUNDEE }, */
    ratings: "3.8",
    miniDesc: "Lorem ipsum dolor sit.",
    longDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
    origin: "British",
    category: "desserts",
    ingredients: ["orange", "milk", "dried fruits"]
  }, {
    id: Math.ceil(Math.random() * 1000000),
    foodName: "eton mess",
    /* foodPicture: { ETON }, */
    ratings: "4.0",
    miniDesc: "Lorem ipsum dolor sit.",
    longDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
    origin: "British",
    category: "desserts",
    ingredients: ["strawberries", "double cream", "mint"]
  }, {
    id: Math.ceil(Math.random() * 1000000),
    foodName: "eccles cake",
    /*     foodPicture: { ECCLESS }, */
    ratings: "4.0",
    miniDesc: "Lorem ipsum dolor sit.",
    longDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
    origin: "British",
    category: "desserts",
    ingredients: ["butter", "lemon", "cinnamon"]
  }, {
    id: Math.ceil(Math.random() * 1000000),
    foodName: "home made mandazi",
    /*  foodPicture: { MANDAZI }, */
    ratings: "4.2",
    miniDesc: "Lorem ipsum dolor sit.",
    longDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
    origin: "Kenyan",
    category: "desserts",
    ingredients: ["milk", "sugar", "eggs"]
  }, {
    id: Math.ceil(Math.random() * 1000000),
    foodName: "lasagne",
    /* foodPicture: { LASAGNE }, */
    ratings: "3.8",
    miniDesc: "Lorem ipsum dolor sit.",
    longDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
    origin: "British",
    category: "desserts",
    ingredients: ["onion", "celery", "garlic"]
  }, {
    id: Math.ceil(Math.random() * 1000000),
    foodName: "madeira cake",
    /* foodPicture: { MADEIRA }, */
    ratings: "3.8",
    miniDesc: "Lorem ipsum dolor sit.",
    longDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
    origin: "British",
    category: "desserts",
    ingredients: ["milk", "lemon", "mixed peel"]
  }, {
    id: Math.ceil(Math.random() * 1000000),
    foodName: "mince pies",
    /* foodPicture: { MINCE }, */
    ratings: "3.8",
    miniDesc: "Lorem ipsum dolor sit.",
    longDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
    origin: "British",
    category: "desserts",
    ingredients: ["butter", "plain flour", "icing sugar"]
  }, {
    id: Math.ceil(Math.random() * 1000000),
    foodName: "newyork cheesecake",
    /*  foodPicture: { CHEESECAKE }, */
    ratings: "3.8",
    miniDesc: "Lorem ipsum dolor sit.",
    longDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
    origin: "American",
    category: "desserts",
    ingredients: ["lemon juice", "sugar", "sour cream"]
  }, {
    id: Math.ceil(Math.random() * 1000000),
    foodName: "christmas pudding Flapjack",
    /*  foodPicture: { PUDDING }, */
    ratings: "3.8",
    miniDesc: "Lorem ipsum dolor sit.",
    longDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
    origin: "British",
    category: "desserts",
    ingredients: ["orange", "golden syrup", "christams pudding"]
  }]
}];

/*get all Meals*/

//GET
router.get("/", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _meals;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return Meal.find().populate("category");
        case 3:
          _meals = _context.sent;
          res.json({
            success: true,
            data: _meals
          });
          _context.next = 11;
          break;
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            success: false,
            error: "Error: cannot find meals"
          });
          console.log(_context.t0);
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 7]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

//GET DESSERTS
router.get("/desserts", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var desserts;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return Meal.find({
            category: idDessert
          }).populate("category");
        case 3:
          desserts = _context2.sent;
          res.json({
            success: true,
            data: desserts
          });
          _context2.next = 11;
          break;
        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            success: false,
            error: "Error: cannot find desserts"
          });
          console.log(_context2.t0);
        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.get("/seafoods", /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var seafoods;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return Meal.find({
            category: idSeafoods
          }).populate("category");
        case 3:
          seafoods = _context3.sent;
          res.json({
            success: true,
            data: seafoods
          });
          _context3.next = 11;
          break;
        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            success: false,
            error: "Error: cannot find desserts"
          });
          console.log(_context3.t0);
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
router.get("/meats", /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var meats;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return Meal.find({
            category: idMeats
          }).populate("category");
        case 3:
          meats = _context4.sent;
          res.json({
            success: true,
            data: meats
          });
          _context4.next = 11;
          break;
        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          res.status(500).json({
            success: false,
            error: "Error: cannot find desserts"
          });
          console.log(_context4.t0);
        case 11:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 7]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
router.get("/vegetarians", /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var vegetarians;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return Meal.find({
            category: idVegetarians
          }).populate("category");
        case 3:
          vegetarians = _context5.sent;
          res.json({
            success: true,
            data: vegetarians
          });
          _context5.next = 11;
          break;
        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          res.status(500).json({
            success: false,
            error: "Error: cannot find desserts"
          });
          console.log(_context5.t0);
        case 11:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 7]]);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());

//POST
router.post(("/", ( /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var newFood, category, saveMeal;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          newFood = new Meal({
            name: req.body.name,
            image: req.body.image,
            sm_desc: req.body.sm_desc,
            lg_desc: req.body.lg_desc,
            category: req.body.category,
            // id of one inside collection category
            rating: req.body.rating,
            price: req.body.price,
            origin: req.body.origin
          });
          _context6.prev = 1;
          category = Category.findById(newFood.category);
          if (category) {
            _context6.next = 7;
            break;
          }
          throw new Error("error: category not find");
        case 7:
          _context6.next = 9;
          return newFood.save();
        case 9:
          saveMeal = _context6.sent;
          res.json({
            success: true,
            data: saveMeal
          });
        case 11:
          _context6.next = 17;
          break;
        case 13:
          _context6.prev = 13;
          _context6.t0 = _context6["catch"](1);
          res.status(500).json({
            success: false,
            error: "Error: something went wrong can;t creat meals"
          });
          console.log(_context6.t0);
        case 17:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[1, 13]]);
  }));
  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}())));

//PUT
router.put("/:id", /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var mealUpdate, category;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return Meal.findByIdAndUpdate(req.params.id, {
            $set: {
              name: req.body.name,
              image: req.body.image,
              sm_desc: req.body.sm_desc,
              lg_desc: req.body.lg_desc,
              category: req.body.category,
              // id of one inside collection category
              rating: req.body.rating,
              price: req.body.price,
              origin: req.body.origin
            }
          }, {
            "new": true
          });
        case 3:
          mealUpdate = _context7.sent;
          category = Category.findById(mealUpdate.category);
          if (category) {
            _context7.next = 7;
            break;
          }
          throw new Error("Error: category didn't match");
        case 7:
          res.json({
            success: true,
            data: mealUpdate
          });
          _context7.next = 14;
          break;
        case 10:
          _context7.prev = 10;
          _context7.t0 = _context7["catch"](0);
          res.status(500).json({
            success: false,
            error: "something went wrong in update"
          });
          console.log(_context7.t0);
        case 14:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 10]]);
  }));
  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}());

//DELETE
router["delete"]("/:id", /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return Meal.findByIdAndDelete(req.params.id);
        case 3:
          res.json({
            success: true,
            data: {}
          });
          _context8.next = 10;
          break;
        case 6:
          _context8.prev = 6;
          _context8.t0 = _context8["catch"](0);
          res.status(500).json({
            success: false,
            error: "something went wrong in delete"
          });
          console.log(_context8.t0);
        case 10:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 6]]);
  }));
  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}());
module.exports = router;