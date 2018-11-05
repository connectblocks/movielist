import React, { Component } from 'react';
import axios from 'axios';

class MovieListEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      own: props.own
    }   
  }

  handleOwnClick = event => {
    if(event.target.value === 'No') {
      axios.post('/movies', { movieId: this.props.item.id })
        .then((res) => {
          this.setState({ own: 'Yes'})   
        })
        .catch(err => console.log(err))
    } else {
      axios.delete('/movies', {data: { movieId: this.props.item.id }})
        .then((res) => {
          this.setState({ own: 'No'})   
        })
        .catch(err => console.log(err))
      }
  }

  render () {
    const inStyle = this.state.own === 'Yes' ? 'Green' : 'Grey';
    return (
      <div className='listEntryView'>
        <h3>{this.props.item.title}</h3>
        <div className='listEntryItem'><b>Release Date: </b>{this.props.item.release_date}</div>
        <div className='listEntryItem'>
          <span><b>Own the movie: </b></span>    
          <button onClick={this.handleOwnClick} value={this.state.own} style={{color: 'White', backgroundColor: inStyle, borderRadius: '5px', borderStyle: 'none'}}>{this.state.own}</button>
        </div>
        <div className='listEntryItem'><b>Overview</b>
          <div className='overviewDetails'>{this.props.item.overview}</div>
        </div>
      </div>
    )
  }
}

export default MovieListEntry; 