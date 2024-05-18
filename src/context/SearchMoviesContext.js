import React from 'react'

const SearchMoviesContext = React.createContext({
  searchResponse: {},
  onSearchMovie: () => {},
})

export default SearchMoviesContext
