# SoftwareProject

##Client Side == Client-server pattern

```
This pattern consists of two parties; a server and multiple clients. 
The server component will provide services to multiple client components. 
Clients request services from the server and the server provides relevant services to those clients. 
Furthermore, the server continues to listen to client requests.
On the front end we have users pages and admin pages which represents these multile clients.
```

##Server Side == Model-view-controller pattern
```
This pattern, also known as MVC pattern, divides an interactive application in to 3 parts as,

model — contains the core functionality and data
view — displays the information to the user (more than one view may be defined)
controller — handles the input from the user
This is done to separate internal representations of information from the ways information is presented to, and accepted from, the user. It decouples components and allows efficient code reuse.

Usage
Architecture for World Wide Web applications in major programming languages.
Web frameworks such as Django and Rails.

Although it is not used default MVC pattern because server response does not return HTML page it return json stringify objects which is in the end basic string which needs to be parsed in order to see results on page.
```

### How to install

```
npm install
cd client
npm install

to run in localhost

npm run dev

to run tests

npm test
```

### You should create keys.js in config folder.Example config/keys.js:
``` 
module.exports = {
    mongoURI: '...',
    secretOrKey: '...',
    sendgridKey: '...'
}
```
