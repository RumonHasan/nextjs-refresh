import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home({pokemon}) {
  // const [pokemon, setPokemon] = useState([]);

  // client side approach
  // useEffect(()=>{
  //   const getPokemon = async ()=>{
  //     const response = await fetch('https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json');
  //     setPokemon(await response.json());
  //   }
  //   getPokemon();
  // },[]);

  // console.log(pokemon);
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon List</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.grid}>
          {pokemon.map((pokemon)=>{
            return (
              <div className={styles.card} key={pokemon.id}>
                <Link href={`/pokemon/${pokemon.id}`}>
                  <a>
                    <img
                      src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
                      alt={pokemon.name}
                    />
                    <h3>{pokemon.name}</h3>
                  </a>
                </Link>
              </div>
            )
          })}
      </div>
    </div>
  )
}

// static site generation approach
export const getStaticProps = async ()=>{
  const response = await fetch('https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json');
  return {
    props:{
      pokemon: await response.json()
    }
  }
}


// server side approach of getting the props using server side
// export const getServerSideProps = async ()=>{
//   const response = await fetch('https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json');
//   return {
//     props:{
//       pokemon: await response.json()
//     }
//   }
// }
