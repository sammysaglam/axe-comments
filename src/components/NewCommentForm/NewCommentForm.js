import React from 'react';

export default class NewCommentForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			commentorName:'' ,
			text         :''
		}

		this.onNewCommentAdd = this.onNewCommentAdd.bind(this);
		this.onCommentorNameInputChange = this.onCommentorNameInputChange.bind(this);
		this.onCommentInputChange = this.onCommentInputChange.bind(this);
	}

	onCommentorNameInputChange(event) {
		this.setState({
			commentorName     :event.target.value ,
			commentorNameError:!NewCommentForm.isCommentorNameValid(event.target.value)
		});
	}

	onCommentInputChange(event) {
		this.setState({
			text     :event.target.value ,
			textError:!NewCommentForm.isCommentValid(event.target.value)
		});
	}

	static isCommentorNameValid(commentorName) {

		const MIN_COMMENTOR_NAME_LENGTH = 3;
		const MAX_COMMENTOR_NAME_LENGTH = 20;

		return (
			commentorName
			&&
			commentorName.length >= MIN_COMMENTOR_NAME_LENGTH
			&&
			commentorName.length <= MAX_COMMENTOR_NAME_LENGTH
		);
	}

	static isCommentValid(comment) {

		const MIN_COMMENT_LENGTH = 1;
		const MAX_COMMENT_LENGTH = 2000;

		return (
			comment
			&&
			comment.length >= MIN_COMMENT_LENGTH
			&&
			comment.length <= MAX_COMMENT_LENGTH
		);
	}

	onNewCommentAdd() {

		const newState = {};

		// hide validation errors on submit click
		newState.showErrors = false;

		// data validation
		let errors = '';
		if ( !this.props.loggedInUser && !NewCommentForm.isCommentorNameValid(this.state.commentorName) ) {
			newState.commentorNameError = true;
			newState.showErrors = true;
			errors += '\n' + this.props.lang['comment-author-validation-error'];
		}
		if ( !NewCommentForm.isCommentValid(this.state.text) ) {
			newState.textError = true;
			newState.showErrors = true;
			errors += '\n' + this.props.lang['comment-text-validation-error'];
		}
		if ( errors ) {
			errors = 'Hata! \n ------ ' + errors;
			alert(errors);

		} else {

			// set as saving new comment
			newState.addingNewComment = true;

			// run ajax
			if ( this.props.saveNewComment ) {
				this.props.saveNewComment(newState.commentorName , newState.text , () => {
					this.setState({
						commentorName   :'' ,
						text            :'' ,
						addingNewComment:false
					});
				});
			}

		}

		this.setState(newState);
	}

	render() {
		return (
			<div className="add-comment horizontal-align-left">
				<input
					disabled={this.state.addingNewComment || this.props.loggedInUser}
					value={this.props.loggedInUser ? this.props.loggedInUser.username : this.state.commentorName}
					className={
						(
							this.state.showErrors && (
								this.state.commentorNameError ? 'invalid' : 'valid'
							)

						) || ''
					}
					type="text" placeholder={this.props.lang['comment-author-placeholder']}
					onChange={this.onCommentorNameInputChange}
				/>

				<textarea
					disabled={this.state.addingNewComment}
					value={this.state.text}
					className={
						(
							this.state.showErrors && (
								this.state.textError ? 'invalid' : 'valid'
							)

						) || ''
					}
					placeholder={this.props.lang['comment-placeholder']}
					onChange={this.onCommentInputChange}
				/>

				<button disabled={this.state.addingNewComment} onClick={this.onNewCommentAdd}>{this.props.lang['add-comment']}</button>
			</div>
		);
	}
}