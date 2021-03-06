import React from 'react';

export default class Comment extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {comment} = this.props;
		const userVote = parseInt(comment['current_user-vote']);

		const dateGMT = !comment.date ? null : (dateUTC => {
			const dateParts = dateUTC.split(/[- :]/);

			const YEAR = 0;
			const MONTH = 1;
			const DAY = 2;
			const HOUR = 3;
			const MINS = 4;
			const SECS = 5;

			return new Date(Date.UTC(dateParts[YEAR] , dateParts[MONTH] - 1 , dateParts[DAY] , dateParts[HOUR] , dateParts[MINS] , dateParts[SECS]));

		})(comment.date);

		const timeSincePost = !dateGMT ? null : (date => {

			const MILISECONDS_IN_1_SECOND = 1000;
			const secondsSincePost = Math.floor((new Date() - date) / MILISECONDS_IN_1_SECOND);

			const SECONDS_IN_1_YEAR = 31536000;
			const SECONDS_IN_1_MONTH = 2592000;
			const SECONDS_IN_1_DAY = 86400;
			const SECONDS_IN_1_HOUR = 3600;
			const SECONDS_IN_1_MIN = 60;

			let interval = Math.floor(secondsSincePost / SECONDS_IN_1_YEAR);

			if ( interval > 1 ) {
				return interval + ' ' + this.props.lang['years-ago'];
			}
			interval = Math.floor(secondsSincePost / SECONDS_IN_1_MONTH);
			if ( interval > 1 ) {
				return interval + ' ' + this.props.lang['months-ago'];
			}
			interval = Math.floor(secondsSincePost / SECONDS_IN_1_DAY);
			if ( interval > 1 ) {
				return interval + ' ' + this.props.lang['days-ago'];
			}
			interval = Math.floor(secondsSincePost / SECONDS_IN_1_HOUR);
			if ( interval > 1 ) {
				return interval + ' ' + this.props.lang['hours-ago'];
			}
			interval = Math.floor(secondsSincePost / SECONDS_IN_1_MIN);
			if ( interval > 1 ) {
				return interval + ' ' + this.props.lang['mins-ago'];
			}

			return Math.floor(secondsSincePost) + ' ' + this.props.lang['seconds-ago'];

		})(new Date(dateGMT));

		return (
			<div className={'comment' + (comment.stillLoading || comment.deleting ? ' is-loading' : '')}>
				{this.props.customLabel ?
					<span className="custom-label">{this.props.customLabel(comment)}</span>
					:
					null
				}
				<span className="username">{comment.author && comment.author ? comment.author.username : comment.guest_author_name}</span>
				<span> - </span>
				<span className="date">
					{
						comment.date ?
							timeSincePost
							:
							this.props.lang['just-now']
					}
				</span>
				<div className="comment-contents">{comment.text}</div>
				<div className="comment-actions vertical-align-children-middle">
					{this.props.allowReplyToComment ? <span>Cevap Yaz</span> : null}

					<span className={(comment.rating > 0 && 'positive') || (comment.rating < 0 && 'negative') || 'neutral'}>
						{comment.rating < 0 ? '' : '+'}
						{comment.rating}
					</span>

					{
						this.props.loggedInUser
						&&
						(
							(comment.author_uid && comment.author_uid.toString() === this.props.loggedInUser.id.toString())
							||
							(this.props.loggedInUser.allowedToDeleteComment && this.props.loggedInUser.allowedToDeleteComment(comment))
						)
							?
							<span className="delete" onClick={() => this.props.deleteComment(comment)}>{this.props.lang['delete']}</span>
							:
							null
					}

					<span onClick={() => this.props.toggleLike(comment)} className={userVote === 1 ? 'like liked' : 'like'}>
						{
							userVote === 1 ?
								<img src={require('./img/liked.png')}/>
								:
								<img src={require('./img/like.png')}/>
						}

					</span>
					<span onClick={() => this.props.toggleDislike(comment)} className={userVote === -1 ? 'dislike disliked' : 'dislike'}>
						{
							userVote === -1 ?
								<img src={require('./img/disliked.png')}/>
								:
								<img src={require('./img/dislike.png')}/>
						}
					</span>
				</div>
			</div>
		)
	}
}