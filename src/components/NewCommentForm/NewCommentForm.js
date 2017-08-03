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

	onCommentorNameInputChange(e) {
		this.setState({
			commentorName     :e.target.value ,
			commentorNameError:!NewCommentForm._isCommentorNameValid(e.target.value)
		});
	}

	onCommentInputChange(e) {
		this.setState({
			text     :e.target.value ,
			textError:!NewCommentForm._isCommentValid(e.target.value)
		});
	}

	static _isCommentorNameValid(commentorName) {
		return commentorName && commentorName.length >= 3 && commentorName.length <= 20;
	}

	static _isCommentValid(comment) {
		return comment && comment.length >= 1 && comment.length <= 2000;
	}

	onNewCommentAdd() {

		let newState = this.state;

		// hide validation errors on submit click
		newState.showErrors = false;

		// data validation
		let errors = '';
		if ( !this.props.loggedInUser && !NewCommentForm._isCommentorNameValid(this.state.commentorName) ) {
			newState.commentorNameError = true;
			newState.showErrors = true;
			errors += "\n" + this.props.lang['comment-author-validation-error'];
		}
		if ( !NewCommentForm._isCommentValid(this.state.text) ) {
			newState.textError = true;
			newState.showErrors = true;
			errors += "\n" + this.props.lang['comment-text-validation-error'];
		}
		if ( errors ) {
			errors = 'Hata!' + "\n" + '------' + errors;
			alert(errors);

		} else {

			// set as saving new comment
			newState.addingNewComment = true;

			// run ajax
			if ( this.props.saveNewComment ) this.props.saveNewComment(newState.commentorName , newState.text , () => {
				this.setState({
					commentorName   :'' ,
					text            :'' ,
					addingNewComment:false
				});
			});

		}

		this.setState(newState);
	}

	render() {
		return (
			<div className="add-comment horizontal-align-left">
				<input disabled={this.state.addingNewComment || this.props.loggedInUser} value={this.props.loggedInUser ? this.props.loggedInUser.username : this.state.commentorName} className={this.state.showErrors ? (this.state.commentorNameError ? 'invalid' : 'valid') : ''} type="text" placeholder={this.props.lang['comment-author-placeholder']} onChange={this.onCommentorNameInputChange}/>
				<textarea disabled={this.state.addingNewComment} value={this.state.text} className={this.state.showErrors ? (this.state.textError ? 'invalid' : 'valid') : ''} placeholder={this.props.lang['comment-placeholder']} onChange={this.onCommentInputChange}/>
				<button disabled={this.state.addingNewComment} onClick={this.onNewCommentAdd}>{this.props.lang['add-comment']}</button>
			</div>
		);
	}
}