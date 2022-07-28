import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from '../../styles/Details.module.css';
import Head from "next/head";
import Link from "next/link";

// getting static paths for site generation for getting static props
export const getStaticPaths = async ()=>{
    const response = await fetch('https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json');
    const pokemon = await response.json();
    // note the id needs to be string
    return {
        paths: pokemon.map((pokemon)=>({
            params: {id: pokemon.id.toString()},
        })),
        fallback: false
    }
}

// static side generation approach
export const getStaticProps = async ({params})=>{
    // id is gathered through the params on the server side
    const id = params.id;
    const response = await fetch(`https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`);
    return {
        props:{
            pokemonDetails: await response.json()
        },
        revalidate: 30, // this enables us to revalidate the data for a static site generation
    }

}

// // server side approach
// export const getServerSideProps = async ({params})=>{
//     // id is gathered through the params on the server side
//     const id = params.id;
//     const response = await fetch(`https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`);
//     return {
//         props:{
//             pokemonDetails: await response.json()
//         }
//     }
// }

const Details = ({pokemonDetails})=>{
    // client side approach
    // const router = useRouter();
    // const {id} = router.query;
    // const [pokemonDetails, setPokemonDetails] = useState(null);

    // // client side rendering
    // useEffect(()=>{
    //     const getPokemon = async ()=>{
    //       const response = await fetch(`https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`);
    //       setPokemonDetails(await response.json());
    //     }
    //     if(id){
    //         getPokemon();
    //     }
    //   },[id]);

    // if(!pokemonDetails){
    //     return null;
    // }

    return (
        <div>
            <Head>
                <title>
                    {pokemonDetails.name}
                </title>
            </Head>
            <div>
                <Link href={"/"}>
                    <a>
                        Back to Home
                    </a>
                </Link>
            </div>
            <div>
                <div>
                    <img
                        className={styles.picture}
                        src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemonDetails.image}`}
                        alt={pokemonDetails.name}
                    />
                </div>
            </div>
            <div>
                <div className={styles.name}>{pokemonDetails.name}</div>
                <div className={styles.type}>{pokemonDetails.type.join(',')} </div>
            </div>
            <table>
                <thead className={styles.header}>
                    <tr>
                        <th>Name</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {pokemonDetails.stats.map((detail, index)=>{
                        return (
                            <tr key={index}>
                                <td className={styles.attribute}>{detail.name}</td>
                                <td>{detail.value}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
};

export default Details;