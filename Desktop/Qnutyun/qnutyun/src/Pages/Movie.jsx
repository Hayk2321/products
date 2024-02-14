import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, A11y } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { useBasket } from '../Context/BasketContext';

function Modal({ isOpen, onClose, videoKey, movieDetails, onAddToBasket }) {
  

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className=" p-8 rounded-lg">
        <span className="absolute top-0 right-0 cursor-pointer" onClick={onClose}>&times;</span>
        <iframe
          className='trailer-video h-[500px] w-[1000px]'
          src={`https://www.youtube.com/embed/${videoKey}`}
          title="Trailer"
          allowFullScreen
        />
      </div>
      <button onClick={onClose} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-[100%] absolute bottom-[706px] right-[460px]">X</button>
      </div>
  );
}

function Movie() {
  const apiKey = "eb1687f82c5b176ca281e94e94648b25";
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [movieDetails2, setMovieDetails2] = useState(null);
  const [trailers, setTrailers] = useState([]);
  const navigate = useNavigate();
  const { basketItems , addToBasket} = useBasket();
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [similarMovies, setSimilarMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    async function fetchMovieCredits() {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMovieDetails2(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieCredits();
  }, [id]);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    async function fetchSimilarMovies() {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}&language=en-US`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSimilarMovies(data.results.slice(0, 4)); 
      } catch (error) {
        console.error('Error fetching similar movies:', error);
      }
    };

    fetchSimilarMovies();
  }, [id]);

  useEffect(() => {
    async function fetchTrailers() {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTrailers(data.results.slice(0, 4)); 
      } catch (error) {
        console.error('Error fetching trailers:', error);
      }
    };

    fetchTrailers();
  }, [id]);

  if (!movieDetails) { 
    return <div className='text-[150px] p-[350px]  not-italic font-bold leading-[normal] text-center bg-amber-600 h-[2000px] w-[2000px] text-white'>Loading...</div>; 
  }

  function handleTrailerClick(trailerKey) {
    setSelectedTrailer(trailerKey);
  };

  function closeModal() {
    setSelectedTrailer(null);
  };

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (searchQuery.trim() !== '') {
        navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      }
    } 
  };

  function handleAddToBasket(movie) {
    addToBasket(movie);
  }

  return (
    <div className='bg-[linear-gradient(106deg,_#383838_1.22%,_#8A8A8A_99.05%)] h-[1500px]'>
      <div className='inline-flex justify-center items-center'>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        <p className='ml-[130px] mt-[102px] text-[#FFF] font-[Prompt] text-[40px] not-italic font-bold leading-[normal]'>Movie<p className="text-[#FAFF00] ml-[115px] relative bottom-[60px]">X</p></p>
        <Link to={'/favorites'}>
          <div>
            <button className='text-[46px] relative top-[50px] left-[1050px] cursor-pointer' >
              <i className="fa fa-heart text-[red]"></i>
              {basketItems.length > 0 && ( 
                <span className="text-white text-xs absolute top-0 right-0 mt-[-10px] mr-[-10px] bg-red-500 rounded-full w-5 h-5 flex items-center justify-center">{basketItems.length}</span>
              )}
            </button>
          </div>
        </Link>
        <form action="">
          <input type="text"
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown} 
          className='w-[410px] text-[26px] mt-[90px] ml-[1075px] h-[100px] p-[30px] text-[white] font-[Prompt] bg-[#383838] rounded-[50px] border-[2px] border-[solid] border-[#FAFF00]' />
          <i style={{ "fontSize": "36px", "marginTop": "100px", "marginLeft": "-74px", "color": "white" }} className='fa fa-search w-[36px] h-[36px] mt-[100px] -ml-[74px] text-[white]' />
        </form>
      </div>

      <img className='rounded-[25px] relative left-[130px]' src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} />
      <div className='font-bold text-[#FFFFFF] text-[32px] left-[800px] absolute top-[210px]'>
        <h1 className='text-[#FFF500] '>{movieDetails.title}</h1>
        <p className='relative top-[50px] '> 🕒 {movieDetails.release_date}</p>
        <p className='relative top-[100px]'> ⭐ {movieDetails.vote_average}</p>
      </div>

      <div className='relative top-[20px] '>
        <Swiper
          modules={[Navigation, A11y]}
          spaceBetween={-120}
          slidesPerView={5}
          navigation
        >
          {movieDetails2.cast && movieDetails2.cast.map((actor) => (
            <SwiperSlide key={actor.id}>
              <img
                className='rounded-[120px] h-[120px] w-[120px] relative  left-[130px]'
                src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVKTCvhbnqwyIbeN8eZAzlzb9s9d6LBnNWsw&usqp=CAU'}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className='flex justify-around items-center relative top-[120px]'>
        {trailers.map((trailer, index) => (
          <div key={index} onClick={() => handleTrailerClick(trailer.key)}>
            <img
              className='rounded-[20px] h-[280px] w-[400px]'
              src={`https://img.youtube.com/vi/${trailer.key}/0.jpg`}
              alt={trailer.name}
            />
          </div>
        ))}
      </div>
      <h1 className='text-center text-[32px] font-bold top-[150px] relative'>Similar Films</h1>
      <div className="flex justify-around items-center relative  top-[40px]">
        {similarMovies.map((movie) => (
          <div key={movie.id} className="h-[550px] text-[22px] rounded-[40px] relative bottom-[-150px] pt-[30px] text-center w-[400px] border-[3px] border-[solid] border-[rgb(250,255,0)] p-[20px]">
            <Link to={`/movie/${movie.id}`}>
              <img
                className="h-[450px] relative top-[-40px] rounded-[90px]  w-[500px]   p-[20px] "
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <h1 className='relative top-[-45px] text-center text-[22px] '>{movie.title}</h1>
              <h1 className='absolute top-[495px] left-[5px] text-[22px] '> 🕒 {movie.release_date}</h1>
              <h1 className='absolute top-[495px] left-[305px] text-[22px] '> ⭐{movie.vote_average}</h1>
            </Link>
            <button className='absolute top-[500px] left-[250px] text-[22px]' onClick={() => handleAddToBasket(movie)}>❤️</button>
          </div>
        ))}
      </div>

      <div className='w-full absolute top-[2200px] h-[250px] flex-shrink-0 bg-[#FAFF00]'>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
        <a className='text-[36px]' href="https://www.instagram.com/ararat_itcenter/"><i className="fa fa-instagram rounded-[20px] w-[40px] h-[39.999px] absolute text-[36px] text-[#383838] top-[105px] left-[130px]" ></i></a>
        <a className='text-[36px]' href="https://www.telegram.org/"><i className="fa fa-telegram rounded-[20px] w-[40px] h-[39.999px] absolute text-[36px] text-[#383838] top-[105px] left-[270px]" ></i></a>
        <a className='text-[36px]' href="https://www.facebook.com/AraratITCenter/"><i className="fa fa-facebook-square rounded-[20px] w-[40px] h-[39.999px] absolute text-[36px] top-[105px] text-[#383838] left-[200px]" ></i></a>
        <p className='left-[1635px] absolute top-[87px] text-[#FFF] font-[Prompt] text-[40px] not-italic font-bold leading-[normal]'>Movie<p className='left-[115px] absolute top-[0px] text-[#383838] font-[Prompt] text-[40px] not-italic font-bold leading-[normal]'>X</p></p>
      </div>

      <Modal
        isOpen={selectedTrailer !== null}
        onClose={closeModal}
        videoKey={selectedTrailer}
        movieDetails={selectedMovie}
       
      />
    </div>
  );
}

export default Movie;
