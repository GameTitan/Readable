import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as DataAPI from '../utils/DataAPI';
import UUID from 'uuid/v1';

class Post extends Component {

	state = {
		post: {},
		add: {bool: false}
	}

	delCom = (id) => {
		DataAPI.delComment(id)
		this.setState({
			post: {
				...this.state.post,
				comments: this.state.post.comments.filter(comment => comment.id !== id)
			}
		})
	}

	addComment = () => {
		this.setState({
			add: {bool: true, body: '', author: ''}
		})
	}

	authorChange = (e) => {
	    const { add } = this.state
	    this.setState({
	      	add: {
	        	...add,
	        	author: e.target.value
	      	}
	    })
	    this.forceUpdate()
	}

	bodyChange = (e) => {
	    const { add } = this.state
	    this.setState({
	      	add: {
	        	...add,
	        	body: e.target.value
	      	}
	    })
	    this.forceUpdate()
	}

	componentDidMount() {
		let { post_id } = this.props.match.params

		let post = this.props.state.posts.find((element) => {
			return element.id === post_id
		})

		if(post) {
			this.setState({post})
		}

	}

	handleSub = (e) => {
		e.preventDefault()	
		const { body, author } = this.state.add
		const post = { body, author, id: UUID(), timestamp: Date.now(), parentId: this.state.post.id }

		DataAPI.addComment(post)
		this.setState({post: {
			...this.state.post,
			comments: [
				...this.state.post.comments,
				post
			]
		}})
	}

	editCom = (e) => {
		DataAPI.editComment(e.target.getAttribute('data'), e.target.value)
		console.log(e.target.value)
	}

	handleBody = (e) => {
		const body = e.target.value
		this.setState({post: { ...this.state.post, body}})
	}

	handleTitle = (e) => {
		const title = e.target.value
		this.setState({post: { ...this.state.post, title}})
	}

	handlePostSub = (e) => {
		e.preventDefault()
		DataAPI.editPost(this.state.post).then( data => console.log(data) )
	}

	render() {
		const { post } = this.state

		return(
			<div>
				<Link to="/" className="back">Back</Link>	
				{this.state.post.title !== undefined ?
					<div>
						<div className="full-post post" >
						<div className="edit-form">
							{this.props.match.params.edit === 'true' ?
								<input onChange={this.handleTitle} className="editTitle" type="textarea" value={this.state.post.title} />
							:
					            <h2 className="post-title"> {this.state.post.title} </h2>
					        }
					          	<h4 className="post-info"> By: {post.author}, posted in {post.category} </h4>
					        {this.props.match.params.edit === 'true' ?
					        	<input onChange={this.handleBody} className="editBody" type="textarea" value={this.state.post.body} />
					        :
					            <p className="post-content"> {this.state.post.body} </p>
					        }
					        {this.props.match.params.edit === 'true' &&
					        	<input type="submit" className="editPostSub" value="Change" onClick={this.handlePostSub} />
					        } 
				        </div>
				            <h5 className='voteScore'>{post.voteScore}</h5>
				            <button className="up-button" >Up Vote</button>
				            <button className="down-button" >Down Vote</button>
				        </div>
				        <div>
					        {post.comments ? post.comments.map((comment) => 
				              	<div className="comment" key={comment.id}>
				                	<blockquote className="inner-comment"><input type="textarea" data={comment.id} placeholder={comment.body} onChange={this.editCom} /> <span className="author">--{comment.author}</span></blockquote>
				                	<button onClick={() => this.delCom(comment.id)} className="delete"></button>
				              	</div>

				            ) : 
				              	<div>
				                	No Comments Found
				              	</div>
				            }
				            <div className="comment addcom">
				            	{ this.state.add.bool ?

				            		<form onSubmit={this.handleSub}>

							            <label>
							                <span> Set Body </span>
							                <input type="textarea" value={this.state.add.body} onChange={this.bodyChange} />
							            </label>
							            <label>
							                <span> By: </span>
							                <input type="textarea" value={this.state.add.author} onChange={this.authorChange} />
							            </label>
				            			<input type="submit" id="sub2" value="submit" />
				            		</form>				            		
				            		:

				            		<button className="add-comment" onClick={this.addComment}>Add Comment</button>
				            	}
				            </div>
			            </div>
		            </div>
		        :
		        	<div>
		        		<p>Content Not Found</p>
		        		<Link to="/">Go To Home Page</Link>
		        	</div>
		        }
          	</div>
		)
	}

}

function mapStateToProps(state) {
	return {
		state
	}
}

export default connect(mapStateToProps)(Post)