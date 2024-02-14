import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useBasket } from '../Context/BasketContext'; 

const apiKey = "eb1687f82c5b176ca281e94e94648b25";
const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc`;

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const { basketItems } = useBasket();

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
        .catch(error => {
          console.error('Error fetching movies:', error);
        });
    };

    fetchMovies();
  }, []);

  function getRandomMovies(array, num){
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };

  function handleKeyDown(event){
    if (event.key === 'Enter') {
      event.preventDefault();
      if (searchQuery.trim() !== '') {
        navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      }
    } 
  };

 
  return (
    <div className='bg-[linear-gradient(106deg,_#383838_1.22%,_#8A8A8A_99.05%)]  h-[1300px] '>
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
        <form>
          <input 
            type="text" 
            className='w-[410px] text-[26px] mt-[90px] ml-[1075px] h-[100px] p-[30px] text-[white] font-[Prompt] bg-[#383838] rounded-[50px] border-[2px] border-[solid] border-[#FAFF00]' 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown} />
          <i style={{ "fontSize": "36px", "marginTop": "100px", "marginLeft": "-74px", "color": "white" }} className='  fa fa-search w-[36px] h-[36px] mt-[100px] -ml-[74px] text-[white]' />
        </form>
      </div>
    </div>
  );
}
