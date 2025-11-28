import React, { Component } from 'react';
import { IoStar, IoStarOutline } from 'react-icons/io5';

class Rating extends Component {
  constructor(props) {
    super(props);

    // Initialize component state.
    // If a rating prop is provided, use it — otherwise default to 0.
    this.state = { rating: this.props.rating || 0 };
  }

  // When a star is clicked, update the rating state
  handleClick(ratingValue) {
    this.setState({ rating: ratingValue });
  }

  // Render a single star (filled or outline) based on the rating
  renderStar(index) {
    // If the current rating is >= index, show a filled star
    return this.state.rating >= index ? (
      <IoStar 
        key={index}
        onClick={() => this.handleClick(index)}
        style={{
          cursor: 'pointer',   // Make the star clickable
          color: '#FFD700',    // Gold color
          fontSize: '2rem'     // Star size
        }}
      />
    ) : (
      // Otherwise show an outlined star
      <IoStarOutline 
        key={index}
        onClick={() => this.handleClick(index)}
        style={{
          cursor: 'pointer',
          color: '#FFD700',
          fontSize: '2rem'
        }}
      />
    );
  }

  render() {
    // Always render 5 stars by mapping numbers 1–5
    return (
      <div>
        {[1, 2, 3, 4, 5].map((i) => this.renderStar(i))}
      </div>
    );
  }
}

export default Rating;
