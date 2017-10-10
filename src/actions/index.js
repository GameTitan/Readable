export const ADD_POST = "ADD_POST"
export const REMOVE_POST = "REMOVE_POST"
export const SORT_POSTS = "SORT_POSTS"
export const CREATE_POST = "CREATE_POST"
export const ADD_COMMENT = "ADD_COMMENT"

export function addComment ( {body, author, parentId, id} ) {
	return {
		type: ADD_COMMENT,
		body,
		author,
		parentId,
		id
	}
}

export function addPost ( { title, body, category, author, comments, voteScore, id } ) {
	return { 
		type: ADD_POST,
		timestamp: new Date(),
		id,
		title,
		body,
		author,
		category,
		comments,
		voteScore
	}
}

export function removePost ( id ) {
	return {
		type: REMOVE_POST,
		id
	}
}

export function sort (query) {
	return {
		type: SORT_POSTS,
		query
	}
}

export function createPost (post) {
	return {
		type: CREATE_POST,
		...post
	}
	
	
}