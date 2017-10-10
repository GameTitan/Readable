import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as DataAPI from '../utils/DataAPI'

class PostDisplay extends Component {

	state = {
		voteScore : 0
	}

	deletePost = () => {
		DataAPI.delPost( this.props.post.id )
		this.props.delete( this.props.post.id )
	}

	vote = (option, id) => {
		DataAPI.vote(option, id)
		if (option === "upVote") {
			this.setState((prevState) => ({
				voteScore: prevState.voteScore+1
			}))
		} else {
			this.setState((prevState) => ({
				voteScore: prevState.voteScore-1
			}))
		}
	}

	componentDidMount() {
		const { voteScore } = this.props.post
		this.setState({
			voteScore
		})
	}

	render() {
		const { post } = this.props

		return (
			<div className="post" key={post.id} >
	            <Link to={`/${post.category}/${post.id}/false`}><h2 className="post-title"> {post.title} </h2></Link>
	            <button className="delete" onClick={this.deletePost} >Delete</button>
	            <Link className="edit" to={`/${post.category}/${post.id}/true`} >Edit</Link>
	            <h4 className="post-info"> By: {post.author}, posted in {post.category} </h4>
	            <p className="post-content"> {post.body} </p>
	            <h5 className='voteScore'>{this.state.voteScore}</h5>
	            <button className="up-button" onClick={() => this.vote('upVote', post.id)} >Up Vote</button>
	            <button className="down-button" onClick={() => this.vote('downVote', post.id)} >Down Vote</button>
	            {post.comments && post.comments[0] ? post.comments.map((comment) => 

	              	<div className="comment" key={comment.id}>
	                	<blockquote className="inner-comment">{comment.body} <span className="author">{comment.author}</span></blockquote>
	              	</div>

	            ) : 
	              	<div>
	                	No Comments Found
	              	</div>
	            }
	         </div>
		)
	}

}

export default PostDisplay