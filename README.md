# DB_Assignment2
## 20/04/2024 update
### server
database.js: 
* function createDatabase(): check login user (import in AuthController.js)
* connect(): give Model access to variable db (import in Model.js and Rental.js)

### client
Login.jsx:
* when user access through router '.../login', if not logout beforehand than confirm their logout
  
Table.jsx: 
* reloadData(data, add): add boolean 'add' to indicate the action belonged to 'SubmitAdd' or 'SubmitEdit'
  if (add) then move the record to the top
  add class 'new-record' to the newly edited or created record (change background in Table.css)
* record.map() (in table section): add className if exists to record
* handleDelete(): put the delete request in if (confirm(...))

Other page (except Court.jsx, CourtRental.jsx): add true, false to reloadData of SubmitAdd, SubmitEdit  

## Setup
### Client side
In project folder, create vite-project
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

### Server side
In project folder, create server directory
```
mkdir server
cd server
npm init -y
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

# Components guide
![Normal Page](normalPage.png)
![Modal](modal.png)
