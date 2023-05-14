# notes-mern

## Running with docker:
Make sure you have your MongoDB daemon running.\
`systemctl start mongod`
### Server:
`cd server/`\
`docker build --tag notes:server .`\
`docker run -p 5000:5000 -d --network host notes:client`

### Client:
`cd client/`\
`docker build --tag notes:client .`\
`docker run -p 5173:5173 -d --network host notes:client`

Note: You might want to assign a common network if you are running your MongoDB instance inside a docker container as well instead of sharing the local host. 


## Building the Project:

### Server:
`cd server/`\
`npm i`\
`npm start`

### Client:
`cd client/`\
`npm i`\
`npm run dev`