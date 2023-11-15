// import logo from './logo.svg';
import './App.css';
import React , {useState  , useEffect}  from 'react'
import Mainlist from './components/Mainlist'
import fav from "./components/fav"
import removefav from "./components/removefav"

function App() {
  let [movies , setMovies]  = useState([]);
  let [searchQuery , setSearchQuery]  = useState("star wars");
  const getMovieRequest = async (searchQuery) => {
    try {
        const url = `https://www.omdbapi.com/?s=${searchQuery}&apikey=b511a478`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseJson = await response.json();
        console.log(responseJson);

        if (responseJson.Search) {
            setMovies(responseJson.Search);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const onChange  = (e) =>{
  setSearchQuery(e.target.value.toString() )
    console.log(e.target.value.toString()) ;
}

useEffect(()=>{
  getMovieRequest(searchQuery) ;
} , [searchQuery]);

let [favouriteMovies, setfavouriteMovies] = useState([]);
const saveToLocalStorage = (item ) =>{
  localStorage.setItem("react-movie-app-fav" , JSON.stringify(item))
}
const onClickfavouriteMovies = (movie)=>{
    let newFavMovieList = [...favouriteMovies  , movie] ;
    setfavouriteMovies(newFavMovieList) ;
    console.log(favouriteMovies) ;
    saveToLocalStorage(newFavMovieList);
}

const onClickremovefavouriteMovies = (movie) =>{
    let newFavMovieList = favouriteMovies.filter((favourite) => favourite.imdbID != movie.imdbID) ;
    setfavouriteMovies(newFavMovieList) ;
    saveToLocalStorage(newFavMovieList);
}
useEffect(()=>{
  let newFavMovieList = JSON.parse(localStorage.getItem("react-movie-app-fav"));
  if (newFavMovieList === null) newFavMovieList = movies;
  setfavouriteMovies(newFavMovieList)
} , [])

  return (
    <><header>
    <div className="heading">MovieManager</div>
    {/* Search bar */}
    <input
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={(e) => onChange(e)  }
    />
  </header>
    <Mainlist heading = {"Movies"} movies = {movies} Addfav ={fav} setfav = {onClickfavouriteMovies}/> 
    <Mainlist heading = {"Favourites"} movies = {favouriteMovies} Addfav ={removefav} setfav = {onClickremovefavouriteMovies}/> 
    </>
  );
}

export default App;
