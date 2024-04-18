import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem';

const TopHeadlines = () => {
    const API_KEY = "497d794b41104ef8b2740f56d3825120";
    const [topHeadlines, setTopHeadlines] = useState([]);

    const fetchTopHeadlines = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=general&pageSize=${10}&page=${1}&apiKey=${API_KEY}`
        let response = await fetch(url);
        response = await response.json();
        setTopHeadlines(response.articles);
        console.log(topHeadlines)
    }

    useEffect(()=>{fetchTopHeadlines()}, [])

    return (
        <>
            {
                topHeadlines.map(
                    (item)=>
                    (item.title=="[Removed]") ? '' : <NewsItem key={item.title} itemData={item}/>    
                )
            }
        </>
    )
}

export default TopHeadlines