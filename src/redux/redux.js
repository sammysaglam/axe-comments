import createReduxDuckling from 'redux-ducklings';

const ReduxBundleCreator = (() => {

	// actions
	const REDUX_ACTIONS = {
		UPDATE_CSRF_TOKEN:'axe-comments/UPDATE_CSRF_TOKEN' ,
		FLAG_AS_FETCHING_COMMENTS:'axe-comments/FLAG_AS_FETCHING_COMMENTS' ,
		UPDATE_COMMENTS:'axe-comments/UPDATE_COMMENTS' ,
		TOGGLE_COMMENT_LIKE:'axe-comments/TOGGLE_COMMENT_LIKE' ,
		TOGGLE_COMMENT_DISLIKE:'axe-comments/TOGGLE_COMMENT_DISLIKE' ,
		DELETE_COMMENT:'axe-comments/DELETE_COMMENT' ,
		SAVE_NEW_COMMENT:'axe-comments/SAVE_NEW_COMMENT'
	};

	// default state
	const defaultState = {
		csrfToken:null ,
		comments:null ,
		fetching:false ,
		abortFetch:false
	};

	// reducer
	const createReducer = ACTIONS => () => (state = defaultState , action = {}) => {
		switch (action.type) {
			case ACTIONS.UPDATE_CSRF_TOKEN:
				return {
					...state ,
					csrfToken:action.csrfToken
				};

			case ACTIONS.FLAG_AS_FETCHING_COMMENTS:
				return {
					...state ,
					fetching:true ,
					abortFetch:false
				};

			case ACTIONS.UPDATE_COMMENTS: {
				let newState = {};

				if ( !state.abortFetch ) {
					newState = {
						fetching:false ,
						comments:action.comments
					};

				} else {
					newState = {
						fetching:false ,
						abortFetch:false
					};
				}

				return {
					...state ,
					...newState
				};
			}

			case ACTIONS.TOGGLE_COMMENT_LIKE:
				return {
					...state ,
					abortFetch:true ,
					comments:state.comments.map(comment => {
						if ( comment.id === action.commentId ) {

							let newRating = comment.rating;
							let newComment = {};

							// comment is already liked, so unlike comment
							if ( parseInt(comment['current_user-vote']) === 1 ) {

								// dec rating
								newRating--;

								// return new comment
								newComment = {
									...comment ,
									rating:newRating ,
									'current_user-vote':0
								}

							} else {

								// inc rating
								newRating++;

								// comment currently has a dislike on it
								if ( parseInt(comment['current_user-vote']) === -1 ) {
									newRating++;
								}

								// return new comment
								newComment = {
									...comment ,
									rating:newRating ,
									'current_user-vote':1
								}

							}

							return newComment;
						}

						return comment;
					})
				};

			case ACTIONS.TOGGLE_COMMENT_DISLIKE:
				return {
					...state ,
					abortFetch:true ,
					comments:state.comments.map(comment => {
						if ( comment.id === action.commentId ) {

							let newRating = comment.rating;
							let newComment = {};

							// comment is already disliked, so undislike comment
							if ( parseInt(comment['current_user-vote']) === -1 ) {

								// dec rating
								newRating++;

								newComment = {
									...comment ,
									rating:newRating ,
									'current_user-vote':0
								}

							} else {

								// dec rating
								newRating--;

								// comment currently has a like on it
								if ( parseInt(comment['current_user-vote']) === 1 ) {
									newRating--;
								}

								newComment = {
									...comment ,
									rating:newRating ,
									'current_user-vote':-1
								}
							}

							return newComment;
						}

						return comment;
					})
				};

			case ACTIONS.DELETE_COMMENT: {
				return {
					...state ,
					abortFetch:true ,
					comments:state.comments.filter(comment => comment.id.toString() !== action.commentId.toString())
				};
			}

			case ACTIONS.SAVE_NEW_COMMENT: {
				return {
					...state ,
					comments:[
						{
							'id':action.commentData.id ,
							'guest_author_name':action.commentData.commentorName ,
							'text':action.commentData.text ,
							'stillLoading':true ,
							'date':''
						} ,
						...state.comments
					]
				}
			}

			default:
				return state;
		}
	}

	// action creators
	const actionCreators = ACTIONS => apiUrls => {

		const fetchComments = () => dispatch => {
			dispatch({
				type:ACTIONS.FLAG_AS_FETCHING_COMMENTS
			});

			const fetchUrl = typeof apiUrls['fetchComments'] === 'function' ? apiUrls['fetchComments']() : apiUrls['fetchComments'];

			return fetch(fetchUrl ? fetchUrl : '/get-comments' , {
				credentials:'include' ,
				headers:new Headers({
					'X-Requested-With':'XMLHttpRequest'
				})

			}).then(response => response.json()).then(data => {
				dispatch({
					type:ACTIONS.UPDATE_COMMENTS ,
					comments:data
				});
			});
		};

		const toggleCommentLike = (comment , notLoggedInError) => (dispatch , getState) => {

			// vars
			const {csrfToken} = getState().axeComments;

			if ( comment['current_user-vote'] === 1 ) {

				const fetchUrl = typeof apiUrls['toggleCommentLike'] === 'function' ? apiUrls['toggleCommentLike']('unlike') : apiUrls['toggleCommentLike'];

				// save at back-end
				const formData = new FormData();
				formData.append('csrf' , csrfToken);
				formData.append('commentId' , comment.id);
				fetch(fetchUrl ? fetchUrl : '/unlike-comment' , {
					credentials:'include' ,
					headers:new Headers({
						'X-Requested-With':'XMLHttpRequest'
					}) ,
					method:'POST' ,
					body:formData
				}).then(response => response.blob()).then(response => {
					if ( !response.size && notLoggedInError ) {
						notLoggedInError();
					}
				});

			} else {

				const fetchUrl = typeof apiUrls['toggleCommentLike'] === 'function' ? apiUrls['toggleCommentLike']('like') : apiUrls['toggleCommentLike'];

				// save at back-end
				const formData = new FormData();
				formData.append('csrf' , csrfToken);
				formData.append('commentId' , comment.id);
				fetch(fetchUrl ? fetchUrl : '/like-comment' , {
					credentials:'include' ,
					headers:new Headers({
						'X-Requested-With':'XMLHttpRequest'
					}) ,
					method:'POST' ,
					body:formData
				}).then(response => response.blob()).then(response => {
					if ( !response.size && notLoggedInError ) {
						notLoggedInError();
					}
				});

			}

			// dispatch action
			dispatch({
				type:ACTIONS.TOGGLE_COMMENT_LIKE ,
				commentId:comment.id
			});
		};

		const toggleCommentDislike = (comment , notLoggedInError) => (dispatch , getState) => {

			// vars
			const {csrfToken} = getState().axeComments;

			if ( comment['current_user-vote'] === -1 ) {

				const fetchUrl = typeof apiUrls['toggleCommentDislike'] === 'function' ? apiUrls['toggleCommentDislike']('undislike') : apiUrls['toggleCommentDislike'];

				// save at back-end
				const formData = new FormData();
				formData.append('csrf' , csrfToken);
				formData.append('commentId' , comment.id);
				fetch(fetchUrl ? fetchUrl : '/undislike-comment' , {
					credentials:'include' ,
					headers:new Headers({
						'X-Requested-With':'XMLHttpRequest'
					}) ,
					method:'POST' ,
					body:formData
				}).then(response => response.blob()).then(response => {
					if ( !response.size && notLoggedInError ) {
						notLoggedInError();
					}
				});

			} else {

				const fetchUrl = typeof apiUrls['toggleCommentDislike'] === 'function' ? apiUrls['toggleCommentDislike']('dislike') : apiUrls['toggleCommentDislike'];

				// save at back-end
				const formData = new FormData();
				formData.append('csrf' , csrfToken);
				formData.append('commentId' , comment.id);
				fetch(fetchUrl ? fetchUrl : '/dislike-comment' , {
					credentials:'include' ,
					headers:new Headers({
						'X-Requested-With':'XMLHttpRequest'
					}) ,
					method:'POST' ,
					body:formData
				}).then(response => response.blob()).then(response => {
					if ( !response.size && notLoggedInError ) {
						notLoggedInError();
					}
				});

			}

			// dispatch action
			dispatch({
				type:ACTIONS.TOGGLE_COMMENT_DISLIKE ,
				commentId:comment.id
			});
		};

		const deleteComment = comment => (dispatch , getState) => {

			// vars
			const {csrfToken} = getState().axeComments;
			const fetchUrl = typeof apiUrls['deleteComment'] === 'function' ? apiUrls['deleteComment']() : apiUrls['deleteComment'];

			// back-end
			const formData = new FormData();
			formData.append('csrf' , csrfToken);
			formData.append('commentId' , comment.id);
			fetch(fetchUrl ? fetchUrl : '/delete-comment' , {
				credentials:'include' ,
				headers:new Headers({
					'X-Requested-With':'XMLHttpRequest'
				}) ,
				method:'POST' ,
				body:formData
			});

			// dispatch action
			dispatch({
				type:ACTIONS.DELETE_COMMENT ,
				commentId:comment.id
			});
		};

		const createNewComment = (commentorName , text , callback) => (dispatch , getState) => {

			// vars
			const {csrfToken} = getState().axeComments;
			const fetchUrl = typeof apiUrls['createNewComment'] === 'function' ? apiUrls['createNewComment']() : apiUrls['createNewComment'];

			// backend
			const formData = new FormData();
			formData.append('csrf' , csrfToken);
			formData.append('commentorName' , commentorName);
			formData.append('text' , text);
			fetch(fetchUrl ? fetchUrl : '/create-new-comment' , {
				credentials:'include' ,
				headers:new Headers({
					'X-Requested-With':'XMLHttpRequest'
				}) ,
				method:'POST' ,
				body:formData
			}).then(response => response.json()).then(() => {
				dispatch(fetchComments());
				callback();
			});

			const RAND_MAX = 1000000000;

			// reducer
			dispatch({
				type:ACTIONS.SAVE_NEW_COMMENT ,
				commentData:{
					id:0 - Math.floor((Math.random() * RAND_MAX) + 1) ,
					commentorName ,
					text
				}
			});
		};

		return {
			fetchComments ,
			toggleCommentLike ,
			toggleCommentDislike ,
			deleteComment ,
			createNewComment
		};
	}

	return createReduxDuckling(
		REDUX_ACTIONS ,
		createReducer ,
		actionCreators
	);
})();

module.exports = ReduxBundleCreator;