# COMP3380 Project Group8 ReadMe
## Members
Tehillah Kangamba ,80% contribution
Kismat, Ali  , 20% contribution
## Description
This project was built with next js and typescript (which is a subset of javascript that lets you use explicit data types) to serve as both a frontend and server to make calls to the database separated from the front end . Next JS uses a folder routing system in the pages folder . So all backend calls are in the api folder .
The frontend then makes rest api calls to the backend to get the data.For example index.tsx is the home page of our website and has functions like  fetchNumEpisodes () which makes an api call to api/numepisodes on the same domain found in pages/api/numepisodes.tsx where the sql query is run .
## Requirements
1. Node JS - https://nodejs.org/en/download
If you do not already have Node ,you will need to install the current stable version of Node JS . After installation you can run then run the program.
2. Python and the prodbc and  library

## Building Tables check build_tables folder
Unzip the project.The file main.py builds the tables from the csv's in the build_tables folder. Running main.We used it to build the tables on the school server. The tables have already been built for convenience . Our dataset is large ,so it might take a while , it was reduced to just titles from 2016-2018 but in order to have quality dataset for the sake of our queries we needed a lot of the data so that we have all the title types and atleast enough of the credited cast as possile.

## HOW TO RUN

1. Open the project folder on terminal and first run the npm command below.
   npm install
2. Then run the npm command below.
    npm run build
3. Then start the program by running the command below in terminal after a .successful build.	
	npm run start
4. Then open your browser and enter the url http://localhost:3000/ ,the web page should load
5. If run build did not work run  the code npm command below and open the url http://localhost:3000/
    npm run dev

## Queries
### Main queries
The first 4 buttons run prewritten queries like
1. **Get All 10 star movies** ,this get all titles with 10 rating. Code is in the file ***pages/api/topmovies.tsx***
2. **Num Episodes of TV Shows** , this gets every tv show in the data set and computes how many episodes they have. Code is in the file ***pages/api/numepisodes.tsx***
3. **Female led movies** , gets all movies where the majority of the cast is women and having a high number of votes and high ratings ,so that it gets the most popular movies with a high rating .Code is in the file ***pages/api/femaleled.tsx***
4. **Actors who got the most work** ,  gets actors who appeared in most titles. Code is in the file ***pages/api/actorwork.tsx***

### Table queries
This queries retrieves all the tables in our database. To acces you need to press the **See individual tables** button and it will load a new page .Click on select option and pick which table you want to see and then click on **Get Table** button aand wait for table to be ready and when it says its ready scroll down to see the table.
