import React, { useState,useEffect,URLSearchParams} from "react";
import axios from "./axios";
import "./Row.css";
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer'
// const movieTrailer = require('movie-trailer');
const baseURL = "https://image.tmdb.org/t/p/original/";
const Row = ({title,fetchUrl,isLargeRow})=>{
    const [movies,setmovies] = useState([]);
    const [trailerUrl,setTrailerUrl] = useState('');
    useEffect(()=>{
        const fetchData = async()=>{
            const request  = await axios.get(fetchUrl);
            console.table(request);
            setmovies(request.data.results);
            return request;
        };
        fetchData();
    },[fetchUrl]);
    const opts = {
        height: '390px',
        width: "100%",
        playerVars: {
          autoplay: 1,
        },
      };
    const handleClick=(movie)=>{
        if(trailerUrl){
            setTrailerUrl('');
        }
        else{
            movieTrailer(movie?.title || "")
            .then((url)=>{
                let urlParams = new URLSearchParams(new URL(url).search);
                // console.log(urlParams)
                setTrailerUrl(urlParams.get('v'));
            }).catch((error)=>console.log(error))
        }
    }
    // console.log(movies);
    return(
        <div className="row">
            <h2 className={`row_title ${isLargeRow && "row_titleIsLarge"}`}>{title}</h2>
            <div className={`row_posters `}>
                {/* several row_poster*/}
                {movies.map((movie)=>{
                    return(
                            <img 
                            key={(movie.id)}
                            onClick={()=>handleClick(movie)}
                            className={`row_poster ${isLargeRow && 'row_posterLarge'}`}
                            src= {`${baseURL}${isLargeRow? movie.poster_path:movie.backdrop_path}`} alt={movie.name}
                             />
                    )
                })}
            </div>
            <div style={{padding:"40px"}}>
                {trailerUrl && <YouTube vidoeId={trailerUrl} opts={opts} />}

            </div>
        </div>
    );
}
export default Row;