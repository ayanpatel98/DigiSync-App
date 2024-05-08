import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import newsContext from '../context/news/newsContext';

// web socket connection
const socket = io.connect("http://localhost:5000");

const NewsDiscussion = () => {
    const [currentMessage, setCurrentMessage] = useState("");
    const context = useContext(newsContext);
    const { getUser, user, discussionMessageList, setDiscussionMessageList } = context;

    useEffect(() => {
        getUser();
    }, [])

    useEffect(() => {
        // add message when message is received
        socket.on("receive_message", (data) => {
            setDiscussionMessageList((list) => [...list, data]);
        });
    }, [socket])

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                author: user,
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() +
                    ':' +
                    new Date(Date.now()).getMinutes(),
            };
            // sent message via web socket connection
            await socket.emit("send_message", messageData);
            setDiscussionMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    }

    return (
        // Chatbox Section
        <div className='row chatWrapper'>
            <div className='col-12 m-4 text-center'><h2>Community Discussion</h2></div>
            <div className='col-sm-8 p-2 chatBox border border-primary border-2 rounded-2'>
                {
                    // Chat message list length check
                    (discussionMessageList && discussionMessageList.length > 0) ?
                        discussionMessageList.map((item, index) => {
                            return (
                                <div key={index} className='d-inline-block w-100'>
                                    <div className={item.author === user ? 'float-end': 'float-start'}
                                        style={{ width: '40%' }}>
                                        <div className={item.author === user ? 'bg-success border-2 rounded-2 p-1'
                                            : 'bg-primary border-2 rounded-2 p-1'}
                                        >{item.message}</div>
                                        <div className='chatAuthor d-inline-block'><b>{item.author}</b></div>
                                        <div className='chatTime d-inline-block mx-2'>{item.time}</div>
                                    </div>
                                </div>
                            )
                        })
                        :
                        <h5>You can join the conversation, please start typing...</h5>
                }
            </div>
            <div className='col-sm-8 mt-3 chatBoxWrapper'>
                <div className="input-group">
                    <input type="text" onChange={(event) => { setCurrentMessage(event.target.value) }}
                        value={currentMessage} className="form-control" placeholder="Type a message"
                        aria-label="Recipient's username" aria-describedby="button-addon2" />
                    <button className="btn btn-outline-primary" type="button" id="button-addon2"
                        onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    )
}

export default NewsDiscussion;
