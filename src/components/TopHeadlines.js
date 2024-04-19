import React, { useContext, useEffect, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import NewsItem from './NewsItem';

const TopHeadlines = () => {
    const base_url = "https://newsapi.org/v2/top-headlines"
    const API_KEY = "497d794b41104ef8b2740f56d3825120";
    const categories = ["business", "entertainment", "general", "health", "science", "sports", "technology"];
    const countries = ['ae', 'ar', 'at', 'au', 'be', 'bg', 'br', 'ca', 'ch', 'cn', 'co', 'cu', 'cz', 'de',
        'eg', 'fr', 'gb', 'gr', 'hk', 'hu', 'id', 'ie', 'il', 'in', 'it', 'jp', 'kr', 'lt', 'lv', 'ma', 'mx',
        'my', 'ng', 'nl', 'no', 'nz', 'ph', 'pl', 'pt', 'ro', 'rs', 'ru', 'sa', 'se', 'sg', 'si', 'sk', 'th',
        'tr', 'tw', 'ua', 'us', 've', 'za']

    const [currCategory, setCategory] = useState('general');
    const [currCountry, setCountry] = useState('us');
    const [topHeadlines, setTopHeadlines] = useState([]);

    const userContext = useContext(noteContext);
    const { getUser, isLoggedIn } = userContext;

    const fetchTopHeadlines = async (country, category) => {
        setCountry(country);
        setCategory(category);
        const url = await `${base_url}?country=${country}&category=${category}&pageSize=${10}&page=${1}&apiKey=${API_KEY}`;
        let response = await fetch(url);
        response = await response.json();
        setTopHeadlines(response.articles);
    }

    const setCountryDropdown = (e) => {
        fetchTopHeadlines(e.target.value, currCategory);
    }

    const setCategoryDropdown = (e) => {
        fetchTopHeadlines(currCountry, e.target.value);
    }

    useEffect(() => {
        fetchTopHeadlines('us', 'general');
        if (localStorage.getItem('token')) {
            getUser();
        };
    }, [isLoggedIn])

    return (
        <div className='row'>
            {
                (!isLoggedIn)
                    ?
                    <h1 className='text-center mt-8'>
                        <b>Please login to get personalized experience</b>
                    </h1>
                    :
                    <div className='row m-3'>
                        <div className='col-sm-3'>
                            <select className="form-select form-select-sm" aria-label="country" onChange={setCountryDropdown}>
                                <option selected>Select Country</option>
                                {
                                    countries.map((ctr, index)=>
                                        <option key={index+1} value={ctr}>{ctr}</option>
                                    )
                                }
                            </select>
                        </div>

                        <div className='col-sm-3'>
                            <select className="form-select form-select-sm" aria-label="category"  onChange={setCategoryDropdown}>
                                <option selected>Select Category</option>
                                {
                                    categories.map((cat, index)=>
                                        <option key={index+1} value={cat}>{cat}</option>
                                    )
                                }
                            </select>
                        </div>
                    </div>
            }
            {
                topHeadlines.map(
                    (item, index) =>
                        (item.title == "[Removed]") ?
                            ''
                            :
                            <div className='col-sm-4 overflow-hidden mt-2' style={{ height: '500px' }}>
                                <button>add item</button>
                                <NewsItem key={index} itemData={item} />
                            </div>
                )
            }
        </div>
    )
}

export default TopHeadlines