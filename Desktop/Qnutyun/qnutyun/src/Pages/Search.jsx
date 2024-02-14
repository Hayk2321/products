import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import { useBasket } from '../Context/BasketContext';
import { useNavigate } from 'react-router-dom';

function Search() {
  const apiKey = "eb1687f82c5b176ca281e94e94648b25";
  const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToBasket, removeFromBasket ,basketItems} = useBasket();
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const navigate = useNavigate();

  function handleAddToBasket(movie) {
    const isFavorite = favoriteMovies.some((favMovie) => favMovie.id === movie.id);
    if (isFavorite) {
      removeFromBasket(movie.id); 
      setFavoriteMovies(favoriteMovies.filter((favMovie) => favMovie.id !== movie.id));
    } else {
      addToBasket(movie); 
      setFavoriteMovies([...favoriteMovies, movie]);
    }
  }

  useEffect(() => {
    if (!query) return;

    fetch(apiUrl + query)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setSearchResults(data.results);
      })
      .catch(error => {
        console.error('Error fetching search results:', error);
      });
  }, [apiUrl, query]);

  function movieArray(array, size){
    const movieArr = [];
    let index = 0;
    while (index < array.length) {
      movieArr.push(array.slice(index, size + index));
      index += size;
    }
    return movieArr;
  };

  const movieResults = movieArray(searchResults, 12);
  function handleKeyDown(event){
    if (event.key === 'Enter') {
      event.preventDefault();
      if (searchQuery.trim() !== '') {
        navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      }
    } 
  };
  return (
    <div>
      <div className='bg-[linear-gradient(106deg,_#383838_1.22%,_#8A8A8A_99.05%)]  h-[200px]'>
        <div className='inline-flex justify-center items-center'>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
          <p className='ml-[130px] mt-[102px] text-[#FFF] font-[Prompt] text-[40px] not-italic font-bold leading-[normal]'>Movie<p className="text-[#FAFF00] ml-[115px] relative bottom-[60px]">X</p></p>
          <Link to={'/favorites'}>
            <button className="heart-button" >
              <p className='text-[42px] relative top-[30px] left-[1050px]'><i className="fa fa-heart text-[red]  " ></i></p>
              {basketItems.length > 0 && ( 
                <span className="text-white text-xs absolute top-[110px] right-[650px] mt-[-10px] mr-[-10px] bg-red-500 rounded-full w-5 h-5 flex items-center justify-center">{basketItems.length}</span>
              )}
            </button>
          </Link>
          <form action="">
            <input 
              type="text"
              value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
              className='w-[410px] text-[26px] relative top-[-10px] ml-[1075px] h-[100px] p-[30px] text-[white] font-[Prompt] bg-[#383838] rounded-[50px] border-[2px] border-[solid] border-[#FAFF00]' />
            <i style={{ "fontSize": "36px", "marginTop": "100px", "marginLeft": "-74px", "color": "white" }} className='  fa fa-search w-[36px] relative  h-[36px] top-[-10px] -ml-[74px] text-[white]' />
          </form>
        </div>
      </div>
      <Swiper
        modules={[Pagination]}
        slidesPerView={1}
        spaceBetween={20}
        pagination={{ clickable: true, renderBullet: (index, className) => `<span class="${className}">${index + 1}</span>` }}
      >
        {movieResults.map((movie, index) => (
          <SwiperSlide key={index} >
            
            <div className="grid grid-cols-4 gap-[40px] h-[1700px]">
              {movie.map((movie) => (
                <div>
                  <Link to={`/movie/${movie.id}`}>
                  <div key={movie.id} className=" h-[450px] text-[22px] rounded-[40px]  right-[-30px] relative bottom-[-150px] pt-[30px] text-center w-[400px] border-[3px] border-[solid] border-[rgb(250,255,0)] p-[20px]">
                      <img
                        className="h-[350px] relative top-[-40px] rounded-[90px] w-[400px] p-[20px]"
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                      />
                      <h1 className='text-center text-[22px] relative top-[-45px]'>{movie.title}</h1>
                      <h1 className='relative top-[-10px] left-[-105px]'>🕒 {movie.release_date}</h1>
                      <h1 className='relative top-[-44px] left-[135px]'>⭐{movie.vote_average}</h1>
                    </div>
                  </Link>
                  <button className='relative top-[105px] left-[295px] text-[22px]' onClick={() => handleAddToBasket(movie)} > ❤️</button>
                </div>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='w-full absolute top-[1940px] h-[250px] flex-shrink-0 bg-[#FAFF00]'>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
        <a className='text-[36px]' href="https://www.instagram.com/ararat_itcenter/"><i className="fa fa-instagram rounded-[20px] w-[40px] h-[39.999px] absolute text-[36px] text-[#383838] top-[105px] left-[130px]" ></i></a>
        <a className='text-[36px]' href="https://www.telegram.org/"><i className="fa fa-telegram rounded-[20px] w-[40px] h-[39.999px] absolute text-[36px] text-[#383838] top-[105px] left-[270px]" ></i></a>
        <a className='text-[36px]' href="https://www.facebook.com/AraratITCenter/"><i className="fa fa-facebook-square rounded-[20px] w-[40px] h-[39.999px] absolute text-[36px] top-[105px] text-[#383838] left-[200px]" ></i></a>
        <p className='left-[1635px] absolute top-[87px] text-[#FFF] font-[Prompt] text-[40px] not-italic font-bold leading-[normal]'>Movie<p className='left-[115px] absolute top-[0px] text-[#383838] font-[Prompt] text-[40px] not-italic font-bold leading-[normal]'>X</p></p>
      </div>
    </div>
  );
}

export default Search;
