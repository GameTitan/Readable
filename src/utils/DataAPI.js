
const baseUrl = 'http://localhost:3001'
const headers = {
	Authorization: '91283c1283cj0129xj'
}

export const getAll = () => 
	fetch(`${baseUrl}/posts`, { headers, method: "GET"})
	.then((resp) => resp.json())

export const getPostComments = (post) => 
	fetch(`${baseUrl}/posts/${post.id}/comments`, { headers })
	.then((resp) => resp.json())

export const vote = ( option, id ) =>
	fetch(`${baseUrl}/posts/${id}`, {
	 	method: "POST",
	 	headers: {
	 		...headers,
      		'Content-Type': 'application/json'
	 	},
	 	body: JSON.stringify({option}) 
	})

export const delPost = (id) =>
	fetch(`${baseUrl}/posts/${id}`, {
	 method: "DELETE",
	 headers
	})

export const getCategories = () =>
	fetch(`${baseUrl}/categories`, { headers, method: "GET" })
	.then((resp) => resp.json())

export const addPost = (post) =>
	fetch(`${baseUrl}/posts`,  {
		method: "POST",
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(post)
	})

export const delComment = (id) => 
	fetch(`${baseUrl}/comments/${id}`, { headers, method: 'DELETE' })

export const editPost = (post) => 
	fetch(`${baseUrl}/posts/${post.id}`, {
		method: "PUT",
		headers: {
			...headers,
      		'Content-Type': 'application/json'
		},
		body: JSON.stringify(post)
	})

export const addComment = (comment) => 
	fetch(`${baseUrl}/comments`, {
		method: "POST",
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(comment)
	})

export const editComment = (id, body) =>
	fetch(`${baseUrl}/comments/${id}`, {
		method: "PUT",
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({body})
	})