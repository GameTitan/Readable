import React, { Component } from 'react';
import PostDisplay from './PostDisplay';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Category extends Component {

	state = {
		posts : []
	}

	componentDidMount() {
		let { posts } = this.props.state
		posts = posts.filter( post => post.category === this.props.match.params.category )
		this.setState({posts})
	}

	render () {
		return (
			<div>
				<Link to="/" className="back">Back</Link>
				<h1 className="category-head">{this.props.match.params.category}</h1>
				{this.state.posts[0] ?  this.state.posts.map((post) => (post.id !== undefined) && 
		          	<div key={post.id}>
          				<PostDisplay post={post} />
          			</div>

		        ) : 
		        	<div className="none">
		        		No Posts Found
		        	</div>
		        }
			</div>

		)
	}

}

function mapStateToProps ( state ) {
  return {
    state
  }
}

export default connect(mapStateToProps)(Category);