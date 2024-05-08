## About the application:
- This is a web-based application a.k.a 'DigiSync', it is based on the news data provided by the 'https://newsapi.org' api. 

- This application is developed using technologies such as Javascript, React.js, Node.js/Express.js and MongoDB Compass which creates it a full-stack MERN application. By using this application a user can get a personalized experience to view the news articles across the globe, either countrywise or categorywise. The news articles is viewed in a card like format on the screen and a user has the freedom to save/delete the news as a bookmark for his personal records and can also visit the origin/root website of the news article. Navigation is implemented in the UI so that bookmarks can be viewed on a separated page which can be navigated from throught the application.

- Without logging in, the user just can see the home page containing only limited news article cards with out personalization. To get the above described personalized experience, a user has to signup/register to this application and can also login to this application in future. This application is very secure for a user because security mechanisms such as JSON Web Token authentication and several validations are implemented which makes this application to have a robust authentication mechanism.

- Finally, all the registered users can have a live real-time communication chat session for the discussion of the news articles by navigating in to the UI to a separate discussions page. This functionality was made possible using web-sockets.


## Installation and setup:

## Application Walkthrough:
- All the news articles being displayed on the home page, either before or agter logging, are populated using the 'https://newsapi.org' api which are being fetched in the frontend itself. The data such as registered users and their bookmarked news articles are saved in the MongoDB database with the help of Node.js backend.

- For the backend and database part, implementation is done in the 'backend' folder, Mongoose library is used to make a connection/interact with the MongoDB database and for defining the database table/collection schema in the 'backend/models' folder. For the JWT authentication implementation, 'bcrypt.js' library is used. Also, for implementing web-sockets, 'socket.io' library is used. API endpoints/routes are created in the 'backend/routes' folder which contains endpoints related to authentication and news data manipulation within the database. The backend server along with the api routes and web-socket server are defined in the 'backend/index.js' file.

-> Note: The connection string to connect Node.js backend to the MongoDB database is included in the 'backend/db.js' file.

- For the front-end part, implementation is done in the '<root_dir>/src' folder where all the code related to components, context APIs, and styling is written. 'Bootstrap' CSS framework is used for styling pusposes. 'InfiniteScroll' library is used to enable a functionality for a logged in user where a user can scroll through the news article cards on the home page infinitely to the bottom, fetching the news articles batch wise upon scrolling (to prevent fetching all the news article at once) and until there are no news articles to fetch. Context API is defined in the '/context/news' folder where all the global states are stored.

-> Note: The API Key for the 'https://newsapi.org' api is included in the 'src/components/TopHeadlines.js' file. There is also another alternate API_KEY commented, in case the current one throws an error of request limit exceeded.
