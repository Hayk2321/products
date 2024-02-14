import React, { useState, useEffect } from 'react';
const apiKey = "eb1687f82c5b176ca281e94e94648b25";
const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc`;
export default function Header2() {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        const fetchMovies = () => {
          fetch(apiUrl)
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(data => {
              const randomMovies = getRandomMovies(data.results, 3); 
              setMovies(randomMovies);
            })
           
        };
    
        fetchMovies();
      }, []);
      function getRandomMovies(array, num){
        const shuffled = array.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
      };
  return (
    <div className='absolute bottom-[-300px]'>
        <h1  className="cursor-pointer bg-[#FAFF00] h-[40px] text-[18px] justify-center items-center flex w-[200px] pl-[42px] pr-[42px]  py-[40px] font-[Prompt] font-bold leading-[normal] text-center relative left-[490px] top-[820px] rounded-[50px] ">Watch Now</h1>
        
        <div className=" grid grid-cols-3 gap-10 mt-24 ml-[208px] ">
      
      {movies.map(movie => (
        <img  key={movie.id} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
      ))}
    </div>
        <h1 className="text-[#FAFF00] font-[Prompt] ml-[130px] mt-[60px] text-[30px] not-italic font-bold leading-[normal] tracking-[1.5px]  ">Watch everywhere.</h1>
        <p className="text-[#FFF] font-[Prompt] text-[24px] ml-[130px] mt-[30px] not-italic font-medium leading-[normal]  ">Stream unlimited movies and TV shows 
        on your phone, tablet, laptop,
         and TV without paying more.</p>
     </div>
  )
}
