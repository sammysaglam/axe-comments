var AxeComments =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = react;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _NewCommentForm = __webpack_require__(3);

var _NewCommentForm2 = _interopRequireDefault(_NewCommentForm);

var _Comment = __webpack_require__(4);

var _Comment2 = _interopRequireDefault(_Comment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LangDefaults = {
	'no-comments-yet': 'No comments yet...',
	'just-now': 'just now...',
	'mins-ago': 'minutes ago',
	'comment-author-validation-error': 'Your name must be min 3, max 20 characters',
	'comment-text-validation-error': 'Your comment cannot be empty, and cannot exceed 2000 characters',
	'comment-author-placeholder': 'Your Name',
	'comment-placeholder': 'write a comment...',
	'add-comment': 'Add Comment',
	'delete': 'Delete'
};

var AxeComments = function (_React$Component) {
	_inherits(AxeComments, _React$Component);

	function AxeComments(props) {
		_classCallCheck(this, AxeComments);

		var _this = _possibleConstructorReturn(this, (AxeComments.__proto__ || Object.getPrototypeOf(AxeComments)).call(this, props));

		_this.lang = _extends({}, LangDefaults, props.lang);
		return _this;
	}

	_createClass(AxeComments, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			return _react2.default.createElement(
				'div',
				{ className: 'comments' },
				this.props.showNewCommentForm ? _react2.default.createElement(_NewCommentForm2.default, {
					saveNewComment: this.props.saveNewComment,
					loggedInUser: this.props.loggedInUser,
					lang: this.lang
				}) : null,
				this.props.comments === null ? _react2.default.createElement('div', { className: 'is-loading' }) : this.props.comments.length === 0 ? _react2.default.createElement(
					'div',
					{ className: 'no-comments-yet' },
					this.lang['no-comments-yet']
				) : this.props.comments.map(function (comment) {
					return _react2.default.createElement(_Comment2.default, {
						key: comment.id,
						customLabel: _this2.props.customLabel,
						comment: comment,
						allowReplyToComment: _this2.props.allowReplyToComment,
						loggedInUser: _this2.props.loggedInUser,
						deleteComment: _this2.props.deleteComment,
						toggleLike: _this2.props.toggleLike,
						toggleDislike: _this2.props.toggleDislike,
						lang: _this2.lang
					});
				})
			);
		}
	}]);

	return AxeComments;
}(_react2.default.Component);

exports.default = AxeComments;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NewCommentForm = function (_React$Component) {
	_inherits(NewCommentForm, _React$Component);

	function NewCommentForm(props) {
		_classCallCheck(this, NewCommentForm);

		var _this = _possibleConstructorReturn(this, (NewCommentForm.__proto__ || Object.getPrototypeOf(NewCommentForm)).call(this, props));

		_this.state = {
			commentorName: '',
			text: ''
		};

		_this.onNewCommentAdd = _this.onNewCommentAdd.bind(_this);
		_this.onCommentorNameInputChange = _this.onCommentorNameInputChange.bind(_this);
		_this.onCommentInputChange = _this.onCommentInputChange.bind(_this);
		return _this;
	}

	_createClass(NewCommentForm, [{
		key: 'onCommentorNameInputChange',
		value: function onCommentorNameInputChange(e) {
			this.setState({
				commentorName: e.target.value,
				commentorNameError: !NewCommentForm._isCommentorNameValid(e.target.value)
			});
		}
	}, {
		key: 'onCommentInputChange',
		value: function onCommentInputChange(e) {
			this.setState({
				text: e.target.value,
				textError: !NewCommentForm._isCommentValid(e.target.value)
			});
		}
	}, {
		key: 'onNewCommentAdd',
		value: function onNewCommentAdd() {
			var _this2 = this;

			var newState = this.state;

			// hide validation errors on submit click
			newState.showErrors = false;

			// data validation
			var errors = '';
			if (!this.props.loggedInUser && !NewCommentForm._isCommentorNameValid(this.state.commentorName)) {
				newState.commentorNameError = true;
				newState.showErrors = true;
				errors += "\n" + this.props.lang['comment-author-validation-error'];
			}
			if (!NewCommentForm._isCommentValid(this.state.text)) {
				newState.textError = true;
				newState.showErrors = true;
				errors += "\n" + this.props.lang['comment-text-validation-error'];
			}
			if (errors) {
				errors = 'Hata!' + "\n" + '------' + errors;
				alert(errors);
			} else {

				// set as saving new comment
				newState.addingNewComment = true;

				// run ajax
				if (this.props.saveNewComment) this.props.saveNewComment(newState.commentorName, newState.text, function () {
					_this2.setState({
						commentorName: '',
						text: '',
						addingNewComment: false
					});
				});
			}

			this.setState(newState);
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ className: 'add-comment horizontal-align-left' },
				_react2.default.createElement('input', { disabled: this.state.addingNewComment || this.props.loggedInUser, value: this.props.loggedInUser ? this.props.loggedInUser.username : this.state.commentorName, className: this.state.showErrors ? this.state.commentorNameError ? 'invalid' : 'valid' : '', type: 'text', placeholder: this.props.lang['comment-author-placeholder'], onChange: this.onCommentorNameInputChange }),
				_react2.default.createElement('textarea', { disabled: this.state.addingNewComment, value: this.state.text, className: this.state.showErrors ? this.state.textError ? 'invalid' : 'valid' : '', placeholder: this.props.lang['comment-placeholder'], onChange: this.onCommentInputChange }),
				_react2.default.createElement(
					'button',
					{ disabled: this.state.addingNewComment, onClick: this.onNewCommentAdd },
					this.props.lang['add-comment']
				)
			);
		}
	}], [{
		key: '_isCommentorNameValid',
		value: function _isCommentorNameValid(commentorName) {
			return commentorName && commentorName.length >= 3 && commentorName.length <= 20;
		}
	}, {
		key: '_isCommentValid',
		value: function _isCommentValid(comment) {
			return comment && comment.length >= 1 && comment.length <= 2000;
		}
	}]);

	return NewCommentForm;
}(_react2.default.Component);

exports.default = NewCommentForm;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Comment = function (_React$Component) {
	_inherits(Comment, _React$Component);

	function Comment(props) {
		_classCallCheck(this, Comment);

		return _possibleConstructorReturn(this, (Comment.__proto__ || Object.getPrototypeOf(Comment)).call(this, props));
	}

	_createClass(Comment, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var comment = this.props.comment;

			var userVote = parseInt(comment['current_user-vote']);

			var dateGMT = function (dateUTC) {
				var t = comment.date.split(/[- :]/);
				return new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]));
			}(comment.date);

			var timeSincePost = function (date) {

				var seconds = Math.floor((new Date() - date) / 1000);

				var interval = Math.floor(seconds / 31536000);

				if (interval > 1) {
					return interval + " " + _this2.props.lang['years-ago'];
				}
				interval = Math.floor(seconds / 2592000);
				if (interval > 1) {
					return interval + " " + _this2.props.lang['months-ago'];
				}
				interval = Math.floor(seconds / 86400);
				if (interval > 1) {
					return interval + " " + _this2.props.lang['days-ago'];
				}
				interval = Math.floor(seconds / 3600);
				if (interval > 1) {
					return interval + " " + _this2.props.lang['hours-ago'];
				}
				interval = Math.floor(seconds / 60);
				if (interval > 1) {
					return interval + " " + _this2.props.lang['mins-ago'];
				}
				return Math.floor(seconds) + " " + _this2.props.lang['seconds-ago'];
			}(new Date(dateGMT));

			return _react2.default.createElement(
				'div',
				{ className: "comment" + (comment.stillLoading || comment.deleting ? " is-loading" : "") },
				this.props.customLabel ? this.props.customLabel(comment) : null,
				_react2.default.createElement(
					'span',
					{ className: 'username' },
					comment.author && comment.author[0] ? comment.author[0].username : comment.guest_author_name
				),
				_react2.default.createElement(
					'span',
					null,
					' - '
				),
				_react2.default.createElement(
					'span',
					{ className: 'date' },
					!comment.date ? this.props.lang['just-now'] : timeSincePost
				),
				_react2.default.createElement(
					'div',
					{ className: 'comment-contents' },
					comment.text
				),
				_react2.default.createElement(
					'div',
					{ className: 'comment-actions vertical-align-children-middle' },
					this.props.allowReplyToComment ? _react2.default.createElement(
						'span',
						null,
						'Cevap Yaz'
					) : null,
					_react2.default.createElement(
						'span',
						{ className: comment.rating > 0 ? 'positive' : comment.rating < 0 ? 'negative' : null },
						comment.rating < 0 ? '-' : '+',
						comment.rating
					),
					this.props.loggedInUser && comment.author_uid === this.props.loggedInUser.id ? _react2.default.createElement(
						'span',
						{ className: 'delete', onClick: function onClick() {
								return _this2.props.deleteComment(comment.id);
							} },
						this.props.lang['delete']
					) : null,
					_react2.default.createElement('span', { onClick: function onClick() {
							return _this2.props.toggleLike(comment.id);
						}, className: userVote === 1 ? 'like liked' : 'like' }),
					_react2.default.createElement('span', { onClick: function onClick() {
							return _this2.props.toggleDislike(comment.id);
						}, className: userVote === -1 ? 'dislike disliked' : 'dislike' })
				)
			);
		}
	}]);

	return Comment;
}(_react2.default.Component);

exports.default = Comment;

/***/ })
/******/ ]);