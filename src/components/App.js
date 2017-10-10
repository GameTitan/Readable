import React, { Component } from 'react';
import { addPost, removePost, createPost } from '../actions';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../App.css';
import * as DataAPI from '../utils/DataAPI';
import PostDisplay from './PostDisplay';
import UUID from 'uuid/v1';

class App extends Component {

  state = {
    initialData : [],
    categories : [],
    update : true,
    add: {
      bool: false
    }
  }

  onUpdate = () => {
    this.state.initialData.forEach((data, index) => {    
      const { title, body, category, author, comments, voteScore, id } = data
      if (!this.props.state.posts.find( post => post.title === title)) {
        this.props.add({ title, body, category, author, comments, voteScore, id })
      } else if (!this.props.state.posts.find( post => post.title === title).comments) {
        this.props.delete(id)

        this.props.add({ title, body, category, author, comments, voteScore, id })
      }

    })
  }

  addPost = () => {
    this.setState({add: {bool: true, body: '', title: '', category: this.state.categories[0].name, author: ''}})
    this.forceUpdate()
  }

  handleSub = (e) => {
    e.preventDefault()
    this.props.create({
      id: UUID(),
      timestamp: Date.now(),
      title: this.state.add.title,
      body: this.state.add.body,
      author: this.state.add.author,
      category: this.state.add.category
    })
    DataAPI.getAll().then((initialData) => {
      this.setState({ initialData })
      this.onUpdate() 
      this.forceUpdate()
    }) 
    this.setState({add: {bool: false}})
  }

  componentDidMount() {
    DataAPI.getAll().then((initialData) => {
      this.setState({ initialData })
      this.onUpdate() 
    })  

    DataAPI.getCategories().then((categories) => {
      this.setState({categories: categories.categories})
    })

  }

  titleChange = (e) => {
    const { add } = this.state
    this.setState({
      add: {
        ...add,
        title: e.target.value
      }
    })
    this.forceUpdate()
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

  categoryChange = (e) => {
    const { add } = this.state
    this.setState({
      add: {
        ...add,
        category: e.target.value
      }
    })
    this.forceUpdate()
  }

  handleDel = (id) => {
    this.props.delete(id)
    this.setState(prevState => {
      return ({
        initialData: prevState.initialData.filter(post => post.id !== id)
      })
    })
    this.onUpdate()
    this.forceUpdate()
  }

  componentDidUpdate() {
    this.state.initialData.forEach((data, index) => {
      const all = this.state.initialData
      DataAPI.getPostComments(all[index]).then(data => {
        all[index] = {
          ...all[index],
          comments: data
        }
        this.setState({
          initialData: all
        })
        this.onUpdate()
        this.setState({
          update: false
        })
      })
    })
  }

  shouldComponentUpdate(nextState) {
    return this.state.update
  }

  render() {
    return (
      <div className="App">
        <div className="categories">
          <ul className="nav">
            {this.state.categories.map((category) => 
              <li key={category.name}> <Link to={`/${category.path}`}> {category.name} </Link> </li>
            )}
          </ul>
        </div>
        {this.props.state.posts.map((post) => (post.id !== undefined) && 
          <div key={post.id}>
            <PostDisplay post={post} delete={this.handleDel} refresh={() => {this.setState({forUpdate: 'abc'})}} />
          </div>
        )}
        <div className="post add-post">
          {this.state.add.bool ? 
            
            <form onSubmit={this.handleSub} className="add-form">
              <h2>Create A Post</h2>
              <label>
                <span> Set Title </span>
                <input type="textarea" value={this.state.add.title} onChange={this.titleChange} />
              </label>
              <label>
                <span> Set Body </span>
                <input type="textarea" value={this.state.add.body} onChange={this.bodyChange} />
              </label>
              <label>
                <span> By: </span>
                <input type="textarea" value={this.state.add.author} onChange={this.authorChange} />
              </label>
              <label>
                <span> Choose A Category </span>
                <select value={this.state.add.category} onChange={this.categoryChange}>
                  {this.state.categories.map(cat =>
                    <option key={cat.name} value={cat.name}>{cat.name}</option>
                  )}
                </select>
              </label>
              <input id="sub" type="submit" value="Submit" />
            </form>
              :
            <button className="add" onClick={this.addPost}> Add Post </button>
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps ( state ) {
  return {
    state
  }
}

function mapDispatchToProps ( dispatch ) {
  return {
    add: (data) => dispatch(addPost(data)),
    delete: (data) => dispatch(removePost(data)),
    create: (data) => dispatch(createPost(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
