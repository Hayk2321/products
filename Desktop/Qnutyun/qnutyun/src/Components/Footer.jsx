import React from 'react'

export default function Footer() {
  return (
    <div className='w-full absolute top-[3150px] h-[250px] flex-shrink-0 bg-[#FAFF00]  '>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
        <a className='text-[36px]' href="https://www.instagram.com/ararat_itcenter/"><i className="fa fa-instagram rounded-[20px] w-[40px] h-[39.999px] absolute text-[36px] text-[#383838] top-[105px] left-[130px]" ></i></a>
        <a className='text-[36px]' href="https://www.telegram.org/"><i className="fa fa-telegram rounded-[20px] w-[40px] h-[39.999px] absolute text-[36px] text-[#383838] top-[105px] left-[270px]" ></i></a>
        <a className='text-[36px]' href="https://www.facebook.com/AraratITCenter/"><i className="fa fa-facebook-square rounded-[20px] w-[40px] h-[39.999px] absolute text-[36px] top-[105px] text-[#383838] left-[200px]" ></i></a>
        <p className='left-[1635px] absolute top-[87px] text-[#FFF] font-[Prompt] text-[40px] not-italic font-bold leading-[normal] '>Movie<p className='left-[115px] absolute top-[0px] text-[#383838] font-[Prompt] text-[40px] not-italic font-bold leading-[normal]'>X</p></p>
        
    </div>
  )
}

