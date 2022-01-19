import React from 'react'
import { Link, useLocation } from "react-router-dom";
import './index.scss'

export default function CharDetail(props){
    const location = useLocation()
    const charProfile = location.state ? location.state : props.charProfile;
    
    /**
     * display 5 episode's number which character is played.
     * @returns 
     */
    const getEpisodes = () =>{
       const isEpisodesLengthBiggerThan4 = charProfile.episode.length > 4;
       let lastEpisodes = charProfile.episode.reverse()

       if(isEpisodesLengthBiggerThan4) lastEpisodes.length = 5

       return lastEpisodes.map((item,index)=>{
         const episodeIndex = item.indexOf('episode/') + 8
         const episodeNumber = item.slice(episodeIndex)
         return (<li key={index} data-testid='episodes'> Episode Number : {episodeNumber}</li>)
       })
    }

    return (<div className='container'>
       <nav>
        <Link to="/" state={{id:charProfile.id}}><span className='backKey'>&#8592; Back</span></Link> 
      </nav>
      <div className='charDetail' data-testid='charDetail'>
        <img src={charProfile.image} alt={charProfile.id} ></img>
        <div className='details'>
          <h2>{charProfile.name}</h2>
          <span><b>Location</b> : {charProfile.location.name}</span>    
          <h4>Last Episodes : </h4>
          <ol>
          {getEpisodes()}
          </ol>
        </div> 
      </div>
    </div>)
}