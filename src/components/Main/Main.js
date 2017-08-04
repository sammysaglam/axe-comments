import React from 'react';
import NewCommentForm from '../NewCommentForm/NewCommentForm';
import Comment from '../Comment/Comment';
import PropTypes from 'prop-types';

const LangDefaults = {
	'no-comments-yet'                :'No comments yet...' ,
	'just-now'                       :'just now...' ,
	'mins-ago'                       :'minutes ago' ,
	'comment-author-validation-error':'Your name must be min 3, max 20 characters' ,
	'comment-text-validation-error'  :'Your comment cannot be empty, and cannot exceed 2000 characters' ,
	'comment-author-placeholder'     :'Your Name' ,
	'comment-placeholder'            :'write a comment...' ,
	'add-comment'                    :'Add Comment' ,
	'delete'                         :'Delete' ,
	'error'                          :'Error'
};

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
			<div className="comments">
				{this.props.showNewCommentForm ?
					<NewCommentForm
						saveNewComment={this.props.saveNewComment}
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
		author_uid         :PropTypes.oneOfType([
			PropTypes.number ,
			PropTypes.string
		]) ,
		'current_user-vote':PropTypes.oneOfType([
			PropTypes.number ,
			PropTypes.string
		]) ,
		date               :PropTypes.string.isRequired ,
		guest_author_name  :PropTypes.string ,
		id                 :PropTypes.oneOfType([
			PropTypes.number ,
			PropTypes.string
		]).isRequired ,
		rating             :PropTypes.oneOfType([
			PropTypes.number ,
			PropTypes.string
		]) ,
		text               :PropTypes.string.isRequired ,
	})) ,
	customLabel        :PropTypes.func ,
	deleteComment      :PropTypes.func.isRequired ,
	lang               :PropTypes.shape({}) ,
	loggedInUser       :PropTypes.oneOfType([
		PropTypes.object ,
		PropTypes.oneOf([false])
	]) ,
	saveNewComment     :PropTypes.func ,
	showNewCommentForm :PropTypes.bool ,
	toggleDislike      :PropTypes.func.isRequired ,
	toggleLike         :PropTypes.func.isRequired
}