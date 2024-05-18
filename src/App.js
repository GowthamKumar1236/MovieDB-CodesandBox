import {useState} from 'react'
import {Route, Switch} from 'react-router-dom'

import PopularMovies from './components/PopularMovies'
import SearchMovies from './components/SearchMovies'
import TopRatedMovies from './components/TopRatedMovies'
import UpcomingMovies from './components/UpcomingMovies'
import SingleMovieDetails from './components/SingleMovieDetails'

import SearchMoviesContext from './context/SearchMoviesContext'

import './App.css'

const API_KEY = 'a1fa1fbf5f4f90fba00db78b03e59436' // My Api key

const App = () => {
  const [searchResponse, setSearchResponse] = useState({})
  const [apiStatus, setApiStatus] = useState('INITIAL')
  const [searchInput, setSearchInput] = useState('')

  const onChangeSearchInput = keyWord => setSearchInput(keyWord)

  const getUpdatedData = responseData => ({
    totalPages: responseData.total_pages,
    totalResults: responseData.total_results,
    results: responseData.results.map(eachMovie => ({
      id: eachMovie.id,
      posterPath: `https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`,
      voteAverage: eachMovie.vote_average,
      title: eachMovie.title,
    })),
  })

  const onSearchMovie = async (page = 1) => {
    setApiStatus('IN_PROGRESS')
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchInput}&page=${page}`

    const response = await fetch(apiUrl)
    const jsonData = await response.json()
    setSearchResponse(getUpdatedData(jsonData))
    setApiStatus('SUCCESS')
  }

  return (
    <SearchMoviesContext.Provider
      value={{
        searchResponse,
        apiStatus,
        onSearchMovie,
        searchInput,
        onChangeSearchInput,
      }}
    >
      <div className="bg-container">
        <Switch>
          <Route exact path="/" component={PopularMovies} />
          <Route exact path="/search" component={SearchMovies} />
          <Route exact path="/top-rated" component={TopRatedMovies} />
          <Route exact path="/upcoming" component={UpcomingMovies} />
          <Route exact path="/movie/:id" component={SingleMovieDetails} />
        </Switch>
      </div>
    </SearchMoviesContext.Provider>
  )
}

export default App
