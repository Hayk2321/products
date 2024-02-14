import React from 'react'
import { useBasket } from '../Context/BasketContext';
export default function Basket() {
    const { basketItems, removeFromBasket } = useBasket();

    return (
   
    <div className='bg-[linear-gradient(106deg,_#383838_1.22%,_#8A8A8A_99.05%)]  h-[250px]'>
      <div className='inline-flex justify-center items-center'>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        <p className='ml-[130px] mt-[102px] text-[#FFF] font-[Prompt] text-[40px] not-italic font-bold leading-[normal]'>Movie<p className="text-[#FAFF00] ml-[115px] relative bottom-[60px]">X</p></p>
        <form action="">
          <input 
            type="text" className='w-[410px] text-[26px] mt-[90px] ml-[1075px] h-[100px] p-[30px] text-[white] font-[Prompt] bg-[#383838] rounded-[50px] border-[2px] border-[solid] border-[#FAFF00]' />
          <i style={{ "fontSize": "36px", "marginTop": "100px", "marginLeft": "-74px", "color": "white" }} className='  fa fa-search w-[36px] h-[36px] mt-[100px] -ml-[74px] text-[white]' />
        </form>
        </div>
        <h1 className='text-center text-[32px] relative top-[35px] font-[Prompt] not-italic font-bold leading-[normal] '>Favorite Films</h1>
        <div className='grid grid-cols-4 gap-[30px] ml-[50px]  '>
        {basketItems.map((item) => (
            
                <div key={item.id} className='h-[550px] text-[22px] rounded-[40px] relative bottom-[-100px] pt-[30px] text-center w-[400px] border-[3px] border-[solid] border-[rgb(250,255,0)] p-[20px]'>
                    <img className="h-[450px] relative top-[-40px] rounded-[90px]  w-[500px]   p-[20px] " key={item.id} src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt={item.title}  />
                    <h1 className='relative text-center top-[-30px] text-[22px] '>{item.title}</h1>
                    <h1 className='absolute top-[505px] left-[25px] text-[22px] '> 🕒 {item.release_date}</h1>
                    <h1 className='absolute top-[505px] left-[285px] text-[22px] '> ⭐{item.vote_average}</h1>
                    <button className='relative top-[-550px] left-[215px] text-[22px] bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-[100%]' onClick={() => removeFromBasket(item.id)}>X</button>
                </div>
             
           ))}
          </div>   
    </div>
    );
}
