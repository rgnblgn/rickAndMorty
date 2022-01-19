import React, {useEffect, useState} from 'react'
import './index.scss'
import { Link, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchChars } from '../../services/chars/action';
import loadingSpinner from '../../assets/Spinner-3.gif'

function HomePage(props){
  const location = useLocation()
  const pageNum = location.state ? props.allChars.length / 20 : 1
  const [pageNumber,setPageNumber] = useState(pageNum)

  useEffect(() => {
    fetchOrScroll();
    clearLocationState();
    window.addEventListener('scroll',handleScroll)  
    return () =>{      
      window.removeEventListener("scroll", handleScroll)};
  },[pageNumber]);
  
  /**
   * Fetch if user is at bottom of page and start or Scroll if we come back from character detail. 
   */
  const fetchOrScroll= ()=>{
    if(!location.state){
      props.fetchChars(pageNumber)
    }else{
      let lastEnteredChar = document.getElementById(location.state.id)
      lastEnteredChar.scrollIntoView()
    }
  }

  /**
   * Clear location state if there is existed
   */
  const clearLocationState=()=>{
    location.state = null
    window.history.replaceState({}, {})
  }

  /**
   * Handle scroll and set page number when we reach bottom of page
   * @param {Object} e 
   */
  const handleScroll = (e) =>{
    if(e.target.documentElement.scrollTop + window.innerHeight  >= e.target.documentElement.scrollHeight){
      setPageNumber(pageNumber+1)
    }
  }

  /**
   * List all characters by page
   * @returns 
   */
  const getCharsList = ()=>{
    return (
      props.allChars && props.allChars.map((item)=>{
        return( <li key={item.id} id={item.id} data-testid='characters'>
          <Link to="/charDetail/" 
          state={{...item}}>
          {item.name}
          <img src={item.image} alt={item.id}></img>
          </Link>
        </li>)
        })
    )
  }

  return (
    <div className='homePage'>
          <ul>
          {getCharsList()}
          </ul>
        <nav>
      </nav>
      <div className={props.isLoading ? 'displayLoading':'hideLoading'}><img alt='erer' src={loadingSpinner}></img></div>
    </div>
    )
}

HomePage.propTypes = {
  fetchChars: PropTypes.func,
  chars: PropTypes.array,
  allChars : PropTypes.array,
  isLoading : PropTypes.bool
}

function mapStateToProps(state) {
  return {
    chars: state.charsReducer.chars,
    allChars : state.charsReducer.allChars,
    isLoading:state.charsReducer.isLoading
  }
} 

export default connect(mapStateToProps,{fetchChars})(HomePage);