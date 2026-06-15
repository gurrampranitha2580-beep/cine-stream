import "../styles/search.css";

function SearchBar({ searchText, setSearchText }){

  return(
    <div className="search-bar">

      <input
        type="text"
        placeholder="Search movies..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

    </div>
  )
}

export default SearchBar;