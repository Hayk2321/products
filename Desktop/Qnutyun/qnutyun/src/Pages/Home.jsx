import Header2 from '../Components/Header2';
import MostPopularFilms from '../Components/MostPopularFilms';
import MovieSlider from '../Components/MovieSlider';
import React from 'react';
import Layout from '../Components/Layout';

export default function Home() {
  return (
    <div>
      <Layout>
        <Header2/>
        <MostPopularFilms/>
        <MovieSlider/>
      </Layout>
    </div>
  )
}
