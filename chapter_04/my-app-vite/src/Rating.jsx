import React, { Component } from 'react';
import { IoIosStar, IoIosStarOutline } from 'react-icons/io';

class Rating extends Component {
  constructor(props) {
    super(props);
    this.state = { rating: this.props.rating || 0 };
  }

  handleClick = (ratingValue) => {
    this.setState({ rating: ratingValue });
  };

  render() {
    const { rating } = this.state;
    const totalStars = 5;

    return (
      <div style={styles.container}>
        {/* Bigger Rating Text */}
        <h2 style={styles.ratingText}>Rating: {rating}</h2>

        {/* Render stars dynamically */}
        <div style={styles.stars}>
          {Array.from({ length: totalStars }, (_, i) => {
            const starValue = i + 1;
            return rating >= starValue ? (
              <IoIosStar
                key={starValue}
                size={40}
                onClick={() => this.handleClick(starValue)}
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

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '10px',
  },
  ratingText: {
    fontSize: '36px',
    fontWeight: 'bold',
    margin: 0,
  },
  stars: {
    display: 'flex',
    flexDirection: 'row', // horizontal stars
    gap: '5px',
    cursor: 'pointer',
    color: 'orange',
  },
};
