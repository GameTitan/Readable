import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Category from './components/Category';
import Post from './components/Post';
import './index.css';
import * as DataAPI from './utils/DataAPI';
import reducer from './reducers';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const checkType = store => next => action => {
  if(action.type === "CREATE_POST") {
  	const {id, timestamp, title, body, author, category} = action
	DataAPI.addPost({id, timestamp, title, body, author, category})
  }
  next(action);
}

const store = createStore(
	reducer,
	composeEnhancers(
	applyMiddleware(checkType))
)

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<div>
				<Route exact path="/" component={App} />
				<Route exact path="/:category" component={Category} />
				<Route path="/:category/:post_id/:edit" component={Post} />
			</div>
  		</BrowserRouter>
  	</Provider>,
  	document.getElementById('root')
);
