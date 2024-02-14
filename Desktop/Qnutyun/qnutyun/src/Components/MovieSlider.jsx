import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, A11y } from 'swiper/modules';
import { useBasket } from '../Context/BasketContext';
const apiKey = "eb1687f82c5b176ca281e94e94648b25";
const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc`;

function MovieSlider() {
  const [movies, setMovies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToBasket } = useBasket();

  const handleAddToBasket = (movie) => {
    addToBasket(movie);
  };
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <Swiper
        modules={[Navigation, A11y]}
        spaceBetween={-40}
        slidesPerView={4}
        navigation
      >
        <h1 className='text-center text-[32px] relative top-[-710px] font-bold  '>Most Popular Films</h1>
        {movies.map(movie => (
          <SwiperSlide key={movie.id}>
            
              <div key={movie.id} className='flex justify-center h-[700px] '>
              <Link to={`/movie/${movie.id}`}>
                  <div className='h-[550px] text-[22px] rounded-[40px] relative bottom-[-100px] pt-[30px] text-center w-[400px] border-[3px] border-[solid] border-[rgb(250,255,0)] p-[20px] '>
                    <img className='h-[450px] relative top-[-40px] rounded-[90px]  w-[500px]   p-[20px]  ' src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                  </div>
                  <h1 className='relative text-center top-[-20px] text-[22px] '>{movie.title}</h1>
                  <h1 className='absolute top-[605px] left-[85px] text-[22px] '> 🕒 {movie.release_date}</h1>
                  <h1 className='absolute top-[605px] left-[365px] text-[22px] '> ⭐{movie.vote_average}</h1>
                  
                  
                </Link>
                <button className='absolute top-[605px] left-[325px] text-[22px]' onClick={() => handleAddToBasket(movie)}>❤️</button>
        
              </div>
            
          </SwiperSlide>
        ))}
      </Swiper>
      
    </div>
  );
}

export default MovieSlider;

