import React from 'react';
import NewCommentForm from '../NewCommentForm/NewCommentForm';
import Comment from '../Comment/Comment';
import PropTypes from 'prop-types';

export default class AxeComments extends React.Component {
	constructor(props) {
		super(props);

		this.lang = {
			...LangDefaults ,
			...props.lang
		}
	}

	render() {
		return (
			<div className="axe-comments-root">
				{this.props.showNewCommentForm ?
					<NewCommentForm
						createNewComment={this.props.createNewComment}
						loggedInUser={this.props.loggedInUser}
						lang={this.lang}
					/>
					:
					null
				}
				{
					// loading
					(this.props.comments === null && <div className="is-loading"/>)

					||

					// no comments
					(this.props.comments.length === 0 && <div className="no-comments-yet">{this.lang['no-comments-yet']}</div>)

					||

					// comments
					this.props.comments.map(comment =>
						<Comment
							key={comment.id}
							customLabel={this.props.customLabel}
							comment={comment}
							allowReplyToComment={this.props.allowReplyToComment}
							loggedInUser={this.props.loggedInUser}
							deleteComment={this.props.deleteComment}
							toggleLike={this.props.toggleLike}
							toggleDislike={this.props.toggleDislike}
							lang={this.lang}
						/>
					)
				}
			</div>
		);
	}
}

AxeComments.propTypes = {
	allowReplyToComment:PropTypes.bool ,
	comments           :React.PropTypes.arrayOf(PropTypes.shape({
		'author_uid'       :PropTypes.oneOfType([
			PropTypes.number ,
			PropTypes.string
		]) ,
		'current_user-vote':PropTypes.oneOfType([
			PropTypes.number ,
			PropTypes.string
		]) ,
		'date'             :PropTypes.string.isRequired ,
		'guest_author_name':PropTypes.string ,
		'id'               :PropTypes.oneOfType([
			PropTypes.number ,
			PropTypes.string
		]).isRequired ,
		'rating'           :PropTypes.oneOfType([
			PropTypes.number ,
			PropTypes.string
		]) ,
		'stillLoading'     :PropTypes.bool ,
		'text'             :PropTypes.string.isRequired
	})) ,
	customLabel        :PropTypes.func ,
	deleteComment      :PropTypes.func.isRequired ,
	lang               :PropTypes.shape({
		'no-comments-yet'                :PropTypes.string ,
		'comment-author-validation-error':PropTypes.string ,
		'comment-text-validation-error'  :PropTypes.string ,
		'comment-author-placeholder'     :PropTypes.string ,
		'comment-placeholder'            :PropTypes.string ,
		'add-comment'                    :PropTypes.string ,
		'delete'                         :PropTypes.string ,
		'error'                          :PropTypes.string ,
		'just-now'                       :PropTypes.string ,
		'years-ago'                      :PropTypes.string ,
		'months-ago'                     :PropTypes.string ,
		'days-ago'                       :PropTypes.string ,
		'hours-ago'                      :PropTypes.string ,
		'mins-ago'                       :PropTypes.string
	}) ,
	loggedInUser       :PropTypes.oneOfType([
		PropTypes.shape({
			'id'      :PropTypes.oneOfType([
				PropTypes.number ,
				PropTypes.string
			]).isRequired ,
			'username':PropTypes.string.isRequired
		}) ,
		PropTypes.oneOf([false])
	]) ,
	createNewComment     :PropTypes.func ,
	showNewCommentForm :PropTypes.bool ,
	toggleDislike      :PropTypes.func.isRequired ,
	toggleLike         :PropTypes.func.isRequired
};

const LangDefaults = {
	'no-comments-yet'                :'No comments yet...' ,
	'comment-author-validation-error':'Your name must be min 3, max 20 characters' ,
	'comment-text-validation-error'  :'Your comment cannot be empty, and cannot exceed 2000 characters' ,
	'comment-author-placeholder'     :'Your Name' ,
	'comment-placeholder'            :'write a comment...' ,
	'add-comment'                    :'Add Comment' ,
	'delete'                         :'Delete' ,
	'error'                          :'Error' ,
	'just-now'                       :'just now...' ,
	'years-ago'                      :'years ago' ,
	'months-ago'                     :'months ago' ,
	'days-ago'                       :'days ago' ,
	'hours-ago'                      :'hours ago' ,
	'mins-ago'                       :'minutes ago'
};