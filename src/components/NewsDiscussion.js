import React, { useContext, useEffect } from 'react';
import newsContext from '../context/news/newsContext';

const NewsDiscussion = () => {
    const context = useContext(newsContext);
    const { getUser } = context;

    useEffect(() => {
        getUser();
    }, [])

    return (
        <div className='row chatWrapper'>
            <div className='col-12 m-4 text-center'><h2>Member Discussion</h2></div>
            <div className='col-sm-8 p-2 chatBox border border-primary border-2 rounded-2'>
                <div className='d-inline-block w-100'>
                    <div className='bg-primary float-start' style={{width:'40%'}}>vfml</div>
                </div>
                <div className='d-inline-block w-100'>
                    <div className='bg-primary float-end' style={{width:'40%'}}>vfml</div>
                </div>
            </div>
            <div className='col-sm-8 mt-3 chatBoxWrapper'>
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Type a message" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                        <button className="btn btn-outline-primary" type="button" id="button-addon2">Send</button>
                </div>
            </div>
        </div>
    )
}

export default NewsDiscussion;
