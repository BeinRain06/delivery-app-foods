"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var express = require("express");
require("dotenv").config();
var router = express.Router();
var bcrypt = require("bcryptjs");
var User = require("../models/user");
var Favourite = require("../models/favourite");

// middleware that is specific to this router
var middlewareUser = router.use(express.urlencoded({
  extended: false
}));

// install and require npm **jsonwebtoken** package
var jwt = require("jsonwebtoken");
var createToken = function createToken(id, isAdmin) {
  var secret = process.env.secret;
  // jwt signing
  return jwt.sign({
    id: id,
    isAdmin: isAdmin
  }, secret, {
    expiresIn: "3d"
  });
};

/*get Favourites*/

//GET all

router.get("/", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var users;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return User.find().select("-passwordHash");
        case 3:
          users = _context.sent;
          res.json({
            success: true,
            data: users
          });
          _context.next = 10;
          break;
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            success: false,
            error: "Error: cannot list users"
          });
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 7]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

// User login

router.get("/login", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var email, user, maxAge, token;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          email = req.body.email;
          _context2.next = 4;
          return User.findOne({
            email: email
          }).select("-passwordHash");
        case 4:
          user = _context2.sent;
          maxAge = 3 * 1000 * 60 * 60 * 24; // 3days in ms
          //jwt signing
          token = createToken(user.id, user.isAdmin);
          res.cookie("jwt", {
            token: token,
            user: user.id
          }, {
            httpOnly: true,
            maxAge: maxAge
          });
          res.json({
            success: true,
            data: user
          });
          _context2.next = 15;
          break;
        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            success: false,
            error: "Error: cannot find  user "
          });
          console.log(_context2.t0);
        case 15:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 11]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

//POST user register
/*new user*/
router.post("/register", /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var password, user, userExist, userId, maxAge, token;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          password = req.body.password;
          user = new User({
            name: req.body.name,
            passwordHash: bcrypt.hashSync(password, 10),
            city: req.body.city,
            street: req.body.street,
            country: req.body.country,
            phone: req.body.phone,
            email: req.body.email,
            isAdmin: req.body.isAdmin
          }); //check if user email already exist
          _context3.next = 5;
          return User.findOne({
            email: user.email
          });
        case 5:
          userExist = _context3.sent;
          if (!userExist) {
            _context3.next = 8;
            break;
          }
          throw new Error("This email Already Exist. Cannot create User !");
        case 8:
          _context3.next = 10;
          return user.save();
        case 10:
          user = _context3.sent;
          userId = user.id;
          maxAge = 3 * 1000 * 60 * 60 * 24; // 3days in ms
          //jwt signing
          token = createToken(user.id, user.isAdmin);
          res.cookie("jwt", {
            token: token
          }, {
            httpOnly: true,
            maxAge: maxAge
          });
          res.cookie("userId", {
            userId: userId
          }, {
            httpOnly: true,
            maxAge: maxAge
          });
          res.status(200).json({
            success: true,
            data: user
          });
          console.log("token - ".concat(user.name, " :"), token);
          _context3.next = 24;
          break;
        case 20:
          _context3.prev = 20;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            success: false,
            error: "Error: cannot create  user "
          });
          console.log(_context3.t0);
        case 24:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 20]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());

/*simple sign in (useremail, userpassword) */
router.post("/login", /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var user, secret, maxAge, userId, token;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          //find user by email
          // console.log("req :", req.body);
          console.log("in the users-route -> this email: ".concat(req.body.email, ", along with this password: ").concat(req.body.password));
          _context4.next = 4;
          return User.findOne({
            email: req.body.email
          });
        case 4:
          user = _context4.sent;
          console.log("this User:", user);
          secret = process.env.secret;
          if (user) {
            _context4.next = 9;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            success: false,
            error: "Error: user doesn't exist or incorrect email"
          }));
        case 9:
          if (!(user && bcrypt.compareSync(req.body.password, user.passwordHash))) {
            _context4.next = 20;
            break;
          }
          maxAge = 3 * 1000 * 60 * 60 * 24; // 3days in ms
          //jwt signing
          userId = user.id;
          token = createToken(user.id, user.isAdmin);
          res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge
          });
          res.cookie("userId", userId, {
            httpOnly: false,
            maxAge: maxAge
          });
          console.log("token send:", token);
          console.log("User ".concat(user.name, " Authenticated!"));
          return _context4.abrupt("return", res.status(200).json({
            success: true,
            message: "User ".concat(user.name, " Authenticated!"),
            data: {
              userName: user.name,
              userEmail: user.email
            }
          }));
        case 20:
          return _context4.abrupt("return", res.status(400).json({
            success: false,
            error: " Incorrect User password"
          }));
        case 21:
          _context4.next = 27;
          break;
        case 23:
          _context4.prev = 23;
          _context4.t0 = _context4["catch"](0);
          res.status(500).json({
            success: false,
            error: "Error: cannot find  user "
          });
          console.log(_context4.t0);
        case 27:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 23]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());

//PUT(update user)
router.put("/register", /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var newPassword, user, updateUser, userId, maxAge, token;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return User.findOne({
            email: req.body.email
          });
        case 3:
          user = _context5.sent;
          if (!req.body.isAdmin) {
            _context5.next = 6;
            break;
          }
          throw new Error("Invalid Update! Specifying Admin parameter");
        case 6:
          if (!(req.body.password === "")) {
            _context5.next = 10;
            break;
          }
          throw new Error("Empty String! Cannot be password");
        case 10:
          if (!(req.body.password.length < 6)) {
            _context5.next = 14;
            break;
          }
          throw new Error("password is at least 6 characters!");
        case 14:
          newPassword = req.body.password;
        case 15:
          if (!user) {
            _context5.next = 27;
            break;
          }
          _context5.next = 18;
          return User.findByIdAndUpdate(user.id, {
            name: req.body.name,
            passwordHash: bcrypt.hashSync(newPassword, 10),
            city: req.body.city,
            street: req.body.city,
            country: req.body.country,
            phone: req.body.phone,
            email: req.body.email
          }, {
            "new": true
          });
        case 18:
          updateUser = _context5.sent;
          userId = user.id;
          maxAge = 3 * 1000 * 60 * 60 * 24; // 3days in ms
          //jwt signing
          token = createToken(user.id, user.isAdmin);
          res.cookie("jwt", {
            token: token
          }, {
            httpOnly: true,
            maxAge: maxAge
          });
          res.cookie("userId", {
            userId: userId
          }, {
            httpOnly: true,
            maxAge: maxAge
          });
          return _context5.abrupt("return", res.status(200).json({
            success: true,
            data: updateUser
          }));
        case 27:
          throw new Error("Cannot found User!");
        case 28:
          _context5.next = 34;
          break;
        case 30:
          _context5.prev = 30;
          _context5.t0 = _context5["catch"](0);
          res.status(500).json({
            success: false,
            error: "Error: cannot update  user "
          });
          console.log(_context5.t0);
        case 34:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 30]]);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());

//delete User (quite for Admin)
router["delete"]("/:userId", /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var user;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return User.findByIdAndDelete(req.params.userId);
        case 3:
          user = _context6.sent;
          res.status(200).json({
            success: true,
            data: {}
          });
          _context6.next = 11;
          break;
        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          res.status(500).json({
            success: false,
            error: "Error: cannot delete  user "
          });
          console.log(_context6.t0);
        case 11:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 7]]);
  }));
  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());

/*get Favourites*/

//GET an User favourite
router.get("/favourites", /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var userId, user, favourites;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          userId = req.cookie.jwt.user;
          /* const favourites = await Favourite.findBy({}).sort({ ratings: -1 }).limit(3); */
          _context7.next = 4;
          return User.findById(userId).populate({
            path: "favourites",
            populate: {
              path: "meal",
              populate: ["name", "origin", "longDesc", "ratings"]
            }
          });
        case 4:
          user = _context7.sent;
          favourites = user.favourites;
          res.json({
            success: true,
            data: favourites
          });
          _context7.next = 12;
          break;
        case 9:
          _context7.prev = 9;
          _context7.t0 = _context7["catch"](0);
          res.status(500).json({
            success: false,
            error: "Error: cannot find  user favourites"
          });
        case 12:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 9]]);
  }));
  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}());
module.exports = router;