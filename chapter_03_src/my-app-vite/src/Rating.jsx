import React, { Component } from 'react';
import { IoStar, IoStarOutline } from 'react-icons/io5';

class Rating extends Component {
  constructor(props) {
    super(props);
    this.state = { rating: this.props.rating || 0 };
  }

  handleClick(ratingValue) {
    this.setState({ rating: ratingValue });
  }

  renderStar(index) {
    return this.state.rating >= index ? (
      <IoStar 
        key={index} 
        onClick={() => this.handleClick(index)} 
        style={{ cursor: 'pointer', color: '#FFD700', fontSize: '2rem' }}
      />
    ) : (
      <IoStarOutline 
        key={index} 
        onClick={() => this.handleClick(index)} 
        style={{ cursor: 'pointer', color: '#FFD700', fontSize: '2rem' }}
      />
    );
  }

  render() {
    // Always render 5 stars
    return <div>{[1, 2, 3, 4, 5].map((i) => this.renderStar(i))}</div>;
  }
}

export default Rating;
