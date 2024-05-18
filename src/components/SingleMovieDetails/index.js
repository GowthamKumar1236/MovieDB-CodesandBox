import {Link} from 'react-router-dom'
import './index.css'

const SingleMovieDetails = props => {
  const {movieDetails} = props
  const {id, title, posterPath, voteAverage} = movieDetails

  return (
    <li className="movie-card-container">
      <img className="movie-card-image" alt={title} src={posterPath} />
      <div className="title-rating">
        <h1 className="title">{title}</h1>
        <p className="rating">Rating: {voteAverage}</p>
      </div>
      <Link to={`/movie/${id}`} className="details-button">
        <button className="view-details" type="button">
          View Details
        </button>
      </Link>
    </li>
  )
}

export default SingleMovieDetails
