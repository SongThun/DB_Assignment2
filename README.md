# DB_Assignment2
## Client side
create vite-project
```
npm create vite@latest
```
> Choose React -> JavaScript


initlize client
```
cd vite-project
npm install
npm run dev
```

install neccessary libraries
```
install react-router-dom axios moment react-bootstrap react-bootstrap-time-picker
```

overwrite the files then run with
```
npm run dev
```

## Server side
create server directory
```
mkdir server
cd server
```
install dependencies
```
npm install express mysql2 cors body-parser cookie-parser express-session
npm install -D nodemon
```

in package.json add
```
"type": "module"
"start": "nodemon server.js" // in "script"
```

reconfigure database connection in database.js
```
user: 'root',
host: 'localhost',
database: // database name,
password: // password
```

overwrite the files then run with 
```
npm start
```
