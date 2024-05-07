import React, { useContext, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import newsContext from '../context/news/newsContext';
import NewsItem from './NewsItem';
import Spinner from './Spinner';

const TopHeadlines = () => {
    const base_url = "https://newsapi.org/v2/top-headlines"
    // const API_KEY = "497d794b41104ef8b2740f56d3825120";
    const API_KEY = "61424d01c67c488a9076e51c63f61276";
    const categories = ["business", "entertainment", "general", "health", "science", "sports", "technology"];
    const countries = ['ae', 'ar', 'at', 'au', 'be', 'bg', 'br', 'ca', 'ch', 'cn', 'co', 'cu', 'cz', 'de',
        'eg', 'fr', 'gb', 'gr', 'hk', 'hu', 'id', 'ie', 'il', 'in', 'it', 'jp', 'kr', 'lt', 'lv', 'ma', 'mx',
        'my', 'ng', 'nl', 'no', 'nz', 'ph', 'pl', 'pt', 'ro', 'rs', 'ru', 'sa', 'se', 'sg', 'si', 'sk', 'th',
        'tr', 'tw', 'ua', 'us', 've', 'za']
    
        // in, kr, us, ca, nl, jp, sg, hk

    const [currCategory, setCategory] = useState('general');
    const [currCountry, setCountry] = useState('us');
    const [topHeadlines, setTopHeadlines] = useState([]);
    const [currPage, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [loading, setLoading] = useState(true);

    const userContext = useContext(newsContext);
    const { getUser, isLoggedIn } = userContext;

    const fetchTopHeadlines = async (country, category, page) => {
        setCountry(country);
        setCategory(category);
        const url = await `${base_url}?country=${country}&category=${category}&pageSize=${5}&page=${page}&apiKey=${API_KEY}`;
        setLoading(true);
        let response = await fetch(url);
        response = await response.json();
        setTopHeadlines(response.articles);
        setTotalResults(response.totalResults);
        setLoading(false);
    }

    const fetchMoreData = async () => {
        const url = await `${base_url}?country=${currCountry}&category=${currCategory}&pageSize=${5}&page=${currPage + 1}&apiKey=${API_KEY}`;
        let response = await fetch(url);
        response = await response.json();
        setTopHeadlines(topHeadlines.concat(response.articles));
        setTotalResults(response.totalResults);
        setPage(currPage + 1)
    }

    const setCountryDropdown = (e) => {
        fetchTopHeadlines(e.target.value, currCategory, 1);
    }

    const setCategoryDropdown = (e) => {
        fetchTopHeadlines(currCountry, e.target.value, 1);
    }

    useEffect(() => {
        fetchTopHeadlines('us', 'general', 1);
        if (localStorage.getItem('token')) {
            getUser();
        };
    }, [isLoggedIn])

    return (
        <>
            {
                <div className='row'>
                    {
                        (!isLoggedIn)
                            ?
                            <div className='col-12'>
                                <h2 className='text-center mt-3'>
                                    <b>Please login to get personalized news</b>
                                </h2>
                            </div>
                            :
                            <div className='row'>
                                <div className='col-12'>
                                    <h2 className='text-center mt-3'>
                                        <b>Your News Feed</b>
                                    </h2>
                                </div>
                                <div className='col-lg-3 col-md-12 m-3'>
                                    <select className="form-select form-select-sm" aria-label="country" onChange={setCountryDropdown}>
                                        <option defaultValue={'Select Country'}>Select Country</option>
                                        {
                                            countries.map((ctr, index) =>
                                                <option key={index + 1} value={ctr}>{ctr}</option>
                                            )
                                        }
                                    </select>
                                </div>

                                <div className='col-lg-3 col-md-12 m-3'>
                                    <select className="form-select form-select-sm" aria-label="category" onChange={setCategoryDropdown}>
                                        <option defaultValue={'Select Category'}>Select Category</option>
                                        {
                                            categories.map((cat, index) =>
                                                <option key={index + 1} value={cat}>{cat}</option>
                                            )
                                        }
                                    </select>
                                </div>
                            </div>
                    }
                </div>
            }
            {
                (!isLoggedIn)
                    ?
                    <div className='row my-2'>
                        {
                            topHeadlines.map(
                                (item, index) =>
                                    (item.title == "[Removed]") ?
                                        ''
                                        :
                                        <div className='col-lg-4 col-md-6 col-sm-12 mt-2'
                                            key={index} style={{ height: '500px' }}>
                                            <NewsItem key={index} itemData={item} />
                                        </div>
                            )
                        }
                    </div>
                    :
                    <div className='row my-2'>
                        {loading && <Spinner />}
                        <InfiniteScroll
                            className='overflow-hidden'
                            dataLength={topHeadlines.length}
                            next={fetchMoreData}
                            hasMore={topHeadlines.length !== totalResults}
                            loader={<Spinner />}>
                            <div className='row'>
                                {
                                    topHeadlines.map(
                                        (item, index) =>
                                            (item.title == "[Removed]") ?
                                                ''
                                                :
                                                <div className='col-lg-4 col-md-6 col-sm-12 mt-2'
                                                    key={index} style={{ height: '500px' }}>
                                                    <NewsItem itemData={item} />
                                                </div>
                                    )
                                }
                            </div>
                        </InfiniteScroll>
                    </div>
            }
        </>
    )
}

export default TopHeadlines