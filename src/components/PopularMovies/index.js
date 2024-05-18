import {Component} from 'react'
import Loader from 'react-loader-spinner'

import SingleMovieDetails from '../SingleMovieDetails'
import GlobalNavBar from '../GlobalNavBar'
import Pagination from '../Pagination'

import './index.css'

class PopularMovies extends Component {
  state = {
    isLoading: true,
    popularMovies: {},
  }

  componentDidMount() {
    this.getPopularMovies()
  }

  getUpdatedData = responseData => ({
    totalPages: responseData.total_pages,
    totalResults: responseData.total_results,
    results: responseData.results.map(eachMovie => ({
      id: eachMovie.id,
      posterPath: `https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`,
      voteAverage: eachMovie.vote_average,
      title: eachMovie.title,
    })),
  })

  getPopularMovies = async (page = 1) => {
    const API_KEY = 'a1fa1fbf5f4f90fba00db78b03e59436'
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    const updatedData = this.getUpdatedData(data)
    this.setState({
      isLoading: false,
      popularMovies: updatedData,
    })
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderPopularMovies = () => {
    const {popularMovies} = this.state
    const {results} = popularMovies

    return (
      <ul className="list-items-container">
        {results.map(movie => (
          <SingleMovieDetails key={movie.id} movieDetails={movie} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading, popularMovies} = this.state

    return (
      <>
        <GlobalNavBar />
        <div className="popular-movies-container">
          {isLoading ? this.renderLoadingView() : this.renderPopularMovies()}
        </div>
        <Pagination
          totalPages={popularMovies.totalPages}
          apiCallback={this.getPopularMovies}
        />
      </>
    )
  }
}

export default PopularMovies
