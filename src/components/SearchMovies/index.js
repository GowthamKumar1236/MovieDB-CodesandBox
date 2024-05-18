import Loader from 'react-loader-spinner'

import GlobalNavBar from '../GlobalNavBar'
import Pagination from '../Pagination'
import SingleMovieDetails from '../SingleMovieDetails'

import SearchMoviesContext from '../../context/SearchMoviesContext'

import './index.css'

const SearchMovies = () => {
  const renderNoView = () => (
    <div className="no-view-container">
      <h1 className="heading">No results found</h1>
      <p className="try-text">Try to search again</p>
    </div>
  )

  const renderMovies = searchResponse => {
    const {results} = searchResponse

    if (!results.length) {
      return renderNoView()
    }
    return (
      <ul className="list-items-container">
        {results.map(movie => (
          <SingleMovieDetails key={movie.id} movieDetails={movie} />
        ))}
      </ul>
    )
  }

  const renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  const renderSearchResultView = value => {
    const {searchResponse, apiStatus} = value

    switch (apiStatus) {
      case 'IN_PROGRESS':
        return renderLoadingView()
      case 'SUCCESS':
        return renderMovies(searchResponse)
      default:
        return renderNoView()
    }
  }

  return (
    <SearchMoviesContext.Consumer>
      {value => {
        const {searchResponse, onSearchMovie} = value

        return (
          <>
            <GlobalNavBar />
            <div className="search-results-container">
              {renderSearchResultView(value)}
            </div>
            <Pagination
              totalPages={searchResponse.totalPages}
              apiCallback={onSearchMovie}
            />
          </>
        )
      }}
    </SearchMoviesContext.Consumer>
  )
}

export default SearchMovies
