import React from 'react';

export default class Comment extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {comment} = this.props;
		const userVote = parseInt(comment['current_user-vote']);

		const dateGMT = (dateUTC => {
			const t = dateUTC.split(/[- :]/);
			return new Date(Date.UTC(t[0] , t[1] - 1 , t[2] , t[3] , t[4] , t[5]));
		})(comment.date);
		
		const timeSincePost = (date => {

			var seconds = Math.floor((new Date() - date)/1000);

			var interval = Math.floor(seconds/31536000);

			if ( interval > 1 ) {
				return interval + " " + this.props.lang['years-ago'];
			}
			interval = Math.floor(seconds/2592000);
			if ( interval > 1 ) {
				return interval + " " + this.props.lang['months-ago'];
			}
			interval = Math.floor(seconds/86400);
			if ( interval > 1 ) {
				return interval + " " + this.props.lang['days-ago'];
			}
			interval = Math.floor(seconds/3600);
			if ( interval > 1 ) {
				return interval + " " + this.props.lang['hours-ago'];
			}
			interval = Math.floor(seconds/60);
			if ( interval > 1 ) {
				return interval + " " + this.props.lang['mins-ago'];
			}
			return Math.floor(seconds) + " " + this.props.lang['seconds-ago'];
		})(new Date(dateGMT));

		return (
			<div className={"comment" + (comment.stillLoading || comment.deleting ? " is-loading" : "")}>
				{this.props.customLabel ?
					this.props.customLabel(comment)
					:
					null
				}
				<span className="username">{comment.author && comment.author[0] ? comment.author[0].username : comment.guest_author_name}</span>
				<span> - </span>
				<span className="date">
					{
						!comment.date ?
							this.props.lang['just-now']
							:
							(timeSincePost)
					}
				</span>
				<div className="comment-contents">{comment.text}</div>
				<div className="comment-actions vertical-align-children-middle">
					{this.props.allowReplyToComment ? <span>Cevap Yaz</span> : null }

					<span className={comment.rating > 0 ? 'positive' : (comment.rating < 0 ? 'negative' : null)}>
						{comment.rating < 0 ? '-' : '+'}
						{comment.rating}
					</span>

					{this.props.loggedInUser && comment.author_uid === this.props.loggedInUser.id ?
						<span className="delete" onClick={() => this.props.deleteComment(comment.id)}>{this.props.lang['delete']}</span>
						:
						null
					}

					<span onClick={() => this.props.toggleLike(comment.id)} className={userVote === 1 ? 'like liked' : 'like'}></span>
					<span onClick={() => this.props.toggleDislike(comment.id)} className={userVote === -1 ? 'dislike disliked' : 'dislike'}></span>
				</div>
			</div>
		)
	}
}