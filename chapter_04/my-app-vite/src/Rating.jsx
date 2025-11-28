import React, { Component } from 'react';
import { IoIosStar, IoIosStarOutline } from 'react-icons/io';

class Rating extends Component {
  constructor(props) {
    super(props);

    // Initialize the component state.
    // If a rating prop is passed, use it; otherwise default to 0.
    this.state = { rating: this.props.rating || 0 };
  }

  // Update rating when a star is clicked
  handleClick = (ratingValue) => {
    this.setState({ rating: ratingValue });
  };

  render() {
    const { rating } = this.state;
    const totalStars = 5; // Always display 5 stars

    return (
      <div style={styles.container}>
        {/* Display the current rating in larger text */}
        <h2 style={styles.ratingText}>Rating: {rating}</h2>

        {/* Render the 5 stars dynamically */}
        <div style={styles.stars}>
          {Array.from({ length: totalStars }, (_, i) => {
            const starValue = i + 1; // Convert index (0–4) to star number (1–5)

            // If rating >= star number, show filled star; otherwise outlined star
            return rating >= starValue ? (
              <IoIosStar
                key={starValue}
                size={40} // size of the star icon
                onClick={() => this.handleClick(starValue)} // update rating on click
              />
            ) : (
              <IoIosStarOutline
                key={starValue}
                size={40}
                onClick={() => this.handleClick(starValue)}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Rating;

// Inline styles for layout and appearance
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column', // Text on top, stars below
    alignItems: 'flex-start', // Align items to the left
    gap: '10px', // Spacing between rating text and stars
  },
  ratingText: {
    fontSize: '36px', // Larger rating text
    fontWeight: 'bold',
    margin: 0,
  },
  stars: {
    display: 'flex',
    flexDirection: 'row', // Show stars in a horizontal line
    gap: '5px', // Space between stars
    cursor: 'pointer', // Make stars clickable
    color: 'orange', // Star color
  },
};
