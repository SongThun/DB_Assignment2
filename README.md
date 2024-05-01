# DB_Assignment2
## 20/04/2024 update
### server

#### MySQL:
* create user 'sManager'
* GRANT privileges to 'sManager'
<br>

<br>
### Login username: sManager | password: 123456

<br>
## Setup
### Client side

#### 1. create a new Folder
#### 2. open terminal at that folder
#### 3. enter 
```
npm create vite@latest
```
Then you will be asked to enter the name of folder, just enter!
> Choose React -> JavaScript
and then do like the user manual of terminal

install neccessary libraries
```
install react-router-dom
install axios
install moment
install react-bootstrap
install react-bootstrap-time-picker
```
#### 4. open the folder source of this code, then download folder 'src' in the github, replace the folder src in your computer with folder you have just download
#### 5. download file index.html , package-lock.json , package.json, vite.config.js and then replace them with like the way you replace folder src. Remember that location is very important, so do not change the location when you replace file.

overwrite the files then run with
```
npm run dev
```

### Server side

#### 6. Run and insert all database by 2 file of sql.
#### 7. In project folder, create server directory
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
#### 8.after that, copy all file in server.zip into folder server. 

overwrite the files then run with 
```
npm start
```

REMEMBER That the terminal that run "npm run dev" is one terminal, and it has its own location
         The terminal that run "npm start" is another terminal, and it has its own location.

if you cannot login when you enter the password, please Ctrl + C the terminal of "npm start" then enter again npm start.

# Components guide
![Normal Page](normalPage.png)
![Modal](modal.png)
