var AxeCommentsRedux =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// actions
var UPDATE_CSRF_TOKEN = 'axe-comments/update-csrf-token';
var FLAG_AS_FETCHING_COMMENTS = 'axe-comments/flag-as-fetching-comments';
var UPDATE_COMMENTS = 'axe-comments/fetch-comments';
var TOGGLE_COMMENT_LIKE = 'axe-comments/toggle-like';
var TOGGLE_COMMENT_DISLIKE = 'axe-comments/toggle-dislike';
var DELETE_COMMENT = 'axe-comments/delete-comment';
var SAVE_NEW_COMMENT = 'axe-comments/save-new-comment';

// default state
var defaultState = {
	csrfToken: null,
	comments: null,
	fetching: false,
	abortFetch: false
};

// reducer
var reducer = exports.reducer = function reducer() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
	var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	switch (action.type) {
		case UPDATE_CSRF_TOKEN:
			return _extends({}, state, {
				csrfToken: action.csrfToken
			});

		case FLAG_AS_FETCHING_COMMENTS:
			return _extends({}, state, {
				fetching: true,
				abortFetch: false
			});

		case UPDATE_COMMENTS:
			{
				var newState = {};

				if (!state.abortFetch) {
					newState = {
						fetching: false,
						comments: action.comments
					};
				} else {
					newState = {
						fetching: false,
						abortFetch: false
					};
				}

				return _extends({}, state, newState);
			}

		case TOGGLE_COMMENT_LIKE:
			return _extends({}, state, {
				abortFetch: true,
				comments: state.comments.map(function (comment) {
					if (comment.id === action.commentId) {

						var newRating = comment.rating;
						var newComment = {};

						// comment is already liked, so unlike comment
						if (parseInt(comment['current_user-vote']) === 1) {

							// dec rating
							newRating--;

							// return new comment
							newComment = _extends({}, comment, {
								rating: newRating,
								'current_user-vote': 0
							});
						} else {

							// inc rating
							newRating++;

							// comment currently has a dislike on it
							if (parseInt(comment['current_user-vote']) === -1) {
								newRating++;
							}

							// return new comment
							newComment = _extends({}, comment, {
								rating: newRating,
								'current_user-vote': 1
							});
						}

						return newComment;
					}

					return comment;
				})
			});

		case TOGGLE_COMMENT_DISLIKE:
			return _extends({}, state, {
				abortFetch: true,
				comments: state.comments.map(function (comment) {
					if (comment.id === action.commentId) {

						var newRating = comment.rating;
						var newComment = {};

						// comment is already disliked, so undislike comment
						if (parseInt(comment['current_user-vote']) === -1) {

							// dec rating
							newRating++;

							newComment = _extends({}, comment, {
								rating: newRating,
								'current_user-vote': 0
							});
						} else {

							// dec rating
							newRating--;

							// comment currently has a like on it
							if (parseInt(comment['current_user-vote']) === 1) {
								newRating--;
							}

							newComment = _extends({}, comment, {
								rating: newRating,
								'current_user-vote': -1
							});
						}

						return newComment;
					}

					return comment;
				})
			});

		case DELETE_COMMENT:
			{
				return _extends({}, state, {
					abortFetch: true,
					comments: state.comments.filter(function (comment) {
						return comment.id.toString() !== action.commentId.toString();
					})
				});
			}

		case SAVE_NEW_COMMENT:
			{

				return _extends({}, state, {
					comments: [{
						'id': action.commentData.id,
						'guest_author_name': action.commentData.commentorName,
						'text': action.commentData.text,
						'stillLoading': true,
						'date': ''
					}].concat(_toConsumableArray(state.comments))
				});
			}

		default:
			return state;
	}
};

// action creators
var actionCreators = exports.actionCreators = function actionCreators(apiUrls) {

	var fetchComments = function fetchComments() {
		return function (dispatch) {
			dispatch({
				type: FLAG_AS_FETCHING_COMMENTS
			});

			var fetchUrl = typeof apiUrls['fetchComments'] === 'function' ? apiUrls['fetchComments']() : apiUrls['fetchComments'];

			return fetch(fetchUrl ? fetchUrl : '/get-comments', {
				credentials: 'include',
				headers: new Headers({
					'X-Requested-With': 'XMLHttpRequest'
				})

			}).then(function (response) {
				return response.json();
			}).then(function (data) {
				dispatch({
					type: UPDATE_COMMENTS,
					comments: data
				});
			});
		};
	};

	var toggleCommentLike = function toggleCommentLike(comment, notLoggedInError) {
		return function (dispatch, getState) {

			// vars
			var csrfToken = getState().axeComments.csrfToken;


			if (comment['current_user-vote'] === 1) {

				var fetchUrl = typeof apiUrls['toggleCommentLike'] === 'function' ? apiUrls['toggleCommentLike']('unlike') : apiUrls['toggleCommentLike'];

				// save at back-end
				var formData = new FormData();
				formData.append('csrf', csrfToken);
				formData.append('commentId', comment.id);
				fetch(fetchUrl ? fetchUrl : '/unlike-comment', {
					credentials: 'include',
					headers: new Headers({
						'X-Requested-With': 'XMLHttpRequest'
					}),
					method: 'POST',
					body: formData
				}).then(function (response) {
					return response.blob();
				}).then(function (response) {
					if (!response.size && notLoggedInError) {
						notLoggedInError();
					}
				});
			} else {

				var _fetchUrl = typeof apiUrls['toggleCommentLike'] === 'function' ? apiUrls['toggleCommentLike']('like') : apiUrls['toggleCommentLike'];

				// save at back-end
				var _formData = new FormData();
				_formData.append('csrf', csrfToken);
				_formData.append('commentId', comment.id);
				fetch(_fetchUrl ? _fetchUrl : '/like-comment', {
					credentials: 'include',
					headers: new Headers({
						'X-Requested-With': 'XMLHttpRequest'
					}),
					method: 'POST',
					body: _formData
				}).then(function (response) {
					return response.blob();
				}).then(function (response) {
					if (!response.size && notLoggedInError) {
						notLoggedInError();
					}
				});
			}

			// dispatch action
			dispatch({
				type: TOGGLE_COMMENT_LIKE,
				commentId: comment.id
			});
		};
	};

	var toggleCommentDislike = function toggleCommentDislike(comment, notLoggedInError) {
		return function (dispatch, getState) {

			// vars
			var csrfToken = getState().axeComments.csrfToken;


			if (comment['current_user-vote'] === -1) {

				var fetchUrl = typeof apiUrls['toggleCommentDislike'] === 'function' ? apiUrls['toggleCommentDislike']('undislike') : apiUrls['toggleCommentDislike'];

				// save at back-end
				var formData = new FormData();
				formData.append('csrf', csrfToken);
				formData.append('commentId', comment.id);
				fetch(fetchUrl ? fetchUrl : '/undislike-comment', {
					credentials: 'include',
					headers: new Headers({
						'X-Requested-With': 'XMLHttpRequest'
					}),
					method: 'POST',
					body: formData
				}).then(function (response) {
					return response.blob();
				}).then(function (response) {
					if (!response.size && notLoggedInError) {
						notLoggedInError();
					}
				});
			} else {

				var _fetchUrl2 = typeof apiUrls['toggleCommentDislike'] === 'function' ? apiUrls['toggleCommentDislike']('dislike') : apiUrls['toggleCommentDislike'];

				// save at back-end
				var _formData2 = new FormData();
				_formData2.append('csrf', csrfToken);
				_formData2.append('commentId', comment.id);
				fetch(_fetchUrl2 ? _fetchUrl2 : '/dislike-comment', {
					credentials: 'include',
					headers: new Headers({
						'X-Requested-With': 'XMLHttpRequest'
					}),
					method: 'POST',
					body: _formData2
				}).then(function (response) {
					return response.blob();
				}).then(function (response) {
					if (!response.size && notLoggedInError) {
						notLoggedInError();
					}
				});
			}

			// dispatch action
			dispatch({
				type: TOGGLE_COMMENT_DISLIKE,
				commentId: comment.id
			});
		};
	};

	var deleteComment = function deleteComment(comment) {
		return function (dispatch, getState) {

			// vars
			var csrfToken = getState().axeComments.csrfToken;

			var fetchUrl = typeof apiUrls['deleteComment'] === 'function' ? apiUrls['deleteComment']() : apiUrls['deleteComment'];

			// back-end
			var formData = new FormData();
			formData.append('csrf', csrfToken);
			formData.append('commentId', comment.id);
			fetch(fetchUrl ? fetchUrl : '/delete-comment', {
				credentials: 'include',
				headers: new Headers({
					'X-Requested-With': 'XMLHttpRequest'
				}),
				method: 'POST',
				body: formData
			});

			// dispatch action
			dispatch({
				type: DELETE_COMMENT,
				commentId: comment.id
			});
		};
	};

	var createNewComment = function createNewComment(commentorName, text, callback) {
		return function (dispatch, getState) {

			// vars
			var csrfToken = getState().axeComments.csrfToken;

			var fetchUrl = typeof apiUrls['createNewComment'] === 'function' ? apiUrls['createNewComment']() : apiUrls['createNewComment'];

			// backend
			var formData = new FormData();
			formData.append('csrf', csrfToken);
			formData.append('commentorName', commentorName);
			formData.append('text', text);
			fetch(fetchUrl ? fetchUrl : '/create-new-comment', {
				credentials: 'include',
				headers: new Headers({
					'X-Requested-With': 'XMLHttpRequest'
				}),
				method: 'POST',
				body: formData
			}).then(function (response) {
				return response.json();
			}).then(function () {
				dispatch(fetchComments());
				callback();
			});

			var RAND_MAX = 1000000000;

			// reducer
			dispatch({
				type: SAVE_NEW_COMMENT,
				commentData: {
					id: 0 - Math.floor(Math.random() * RAND_MAX + 1),
					commentorName: commentorName,
					text: text
				}
			});
		};
	};

	return {
		fetchComments: fetchComments,
		toggleCommentLike: toggleCommentLike,
		toggleCommentDislike: toggleCommentDislike,
		deleteComment: deleteComment,
		createNewComment: createNewComment
	};
};

/***/ })
/******/ ]);