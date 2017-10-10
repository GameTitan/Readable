import {
	ADD_POST,
	REMOVE_POST,
	CREATE_POST,
	ADD_COMMENT
} from '../actions'


export default function post(state = { posts : [] }, action) {

	switch (action.type) {
		case CREATE_POST:
		case ADD_POST:

			let { id, timestamp, title, body, author, category, comments, voteScore } = action

			return {
				...state,
				posts: [
					...state.posts,
					{
						id,
						timestamp,
						title,
						body,
						author,
						category,
						comments,
						voteScore
					}
				]
			} 
		case REMOVE_POST:

			return {
				...state,
				posts: state.posts.filter((post) => post.id !== action.id)
			}
		case ADD_COMMENT:

			let edit = this.state.posts.find(element => {
				return element.id === action.id
			})


			edit.comments.append({
				timestamp: Date.now(),
				id: action.id,
				parentId :action.parentId,
				body: action.body,
				author: action.author,
				voteScore: 1
			})

			return {
				...state,
				posts: [
					...state.posts,
					edit
				]
			}

		default:
			return state
	}
}