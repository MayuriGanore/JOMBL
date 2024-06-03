
# Chat-App 

This is chat app in which user can register,login and authenticate also can send and receive messages.



## Running chat-app

Run the Chap-App using:

```bash
  npm run start:dev
```
## Dependencies

Install following dependencies to run chat-app

List Of Dependencies:

1)npm install @nestjs/core @nestjs/common

2)npm install @nestjs/platform-socket.io

3)npm install cookie-parser  

  npm install -D @types/cookie-parser

4)npm add -D @types/socket.io

5)npm install @nestjs/jwt

6)npm install bcryptjs 

7)npm install @nestjs/mongoose mongoose

8)npm install @nestjs/passport passport passport-jwt

9)npm install jsonwebtoken @nestjs/jwt

10)npm install express @types/express

11)npm install -g @nestjs/cli
## Features

1) WebSocket.io and Socket.io for bidirectional communication.
2) JWT token validation.Only authenticated users using JWT can enter the chatroom.
3) Both participants should be authenticated.
4) The project has functionalities such as login, register, and logout.
5) Effective Error Handling at each step.gives correct message if any error occurs.
6) Acknowledgement on successful registration and login.
7) Disconnects user if token is not valid.
## Technologies 



**Server:** Nestjs Typescript

**Database:** MongoDB

**Authentication** JWT token 


## Running App

To run App, run the following command

```bash
  npm run start:dev
```
1) Clone the github repository

2) Run chat app in code editor(eg:vscode)

3) npm install


## Postman Guide

1) REST API endpoints: http://localhost:8000.

2) WebSocket endpoint: http://localhost:3000. http://localhost:3000?token=<JWT_TOKEN>.
   
## Test Cases

1) User Registration URL:
    http://localhost:3000/users/register  
    provide email and password in body/raw section.

2) User Login URL:   
   http://localhost:3000/users/register  
   provide email and password in body/raw section

3) Authenticate URl:
   http://localhost:3000/users/authenticate?token=<JWT_TOKEN>
   provide email,password and token 

4) Chatting URL:
   Create two socket.io requests on Postman. URL: http://localhost:3000 add token (http://localhost:3000?token=<JWT_TOKEN>)
add onMessage event on both requests also add newMessage event in message section.

   