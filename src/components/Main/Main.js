import React from 'react';
import NewCommentForm from '../NewCommentForm/NewCommentForm';
import Comment from '../Comment/Comment';

const LangDefaults = {
	'no-comments-yet'                :'No comments yet...' ,
	'just-now'                       :'just now...' ,
	'mins-ago'                       :'minutes ago' ,
	'comment-author-validation-error':'Your name must be min 3, max 20 characters' ,
	'comment-text-validation-error'  :'Your comment cannot be empty, and cannot exceed 2000 characters' ,
	'comment-author-placeholder'     :'Your Name' ,
	'comment-placeholder'            :'write a comment...' ,
	'add-comment'                    :'Add Comment' ,
	'delete'                         :'Delete'
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
					this.props.comments === null ?
						<div className="is-loading"/>
						:
						this.props.comments.length === 0 ?
							<div className="no-comments-yet">{this.lang['no-comments-yet']}</div>
							:
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