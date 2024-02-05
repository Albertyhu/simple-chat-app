Live site: https://chat-app-brax.onrender.com/
 
# Chat App

This is a chat app created with Node JS, Socket.io library, and EJS. 

It allows persistent user sessions. That means that a user can be in the same chat thread in multiple devices. 

The difficulty in building this app is tracking down all the information that is generated and passed around. 

The authentication doen't include password security yet because I haven't had time to implement it. 

The user is allowed to create a prviate chat room and invite another online user to it. 

Once the user logs into the web app, the client first fetches account information if it exists from the server through CRUD operations. 

From then on, information is passed through sockets between the client and the server. 

The app is not backed by a databse yet. 

As long as the server runs and doesn't restart, all the client's information and chat history are saved. 

### The challenge of creating multiple chat rooms  

Sending a message to a single user involves the following code 

```
socket.to(<user's socket>).emit("name", callback)
```

However, because different chatrooms are opened in separate pages, a user who is a member of all those chatrooms will have different sockets for each one, each with its unique socket id. 

Thus, when sending a message to one user, and you want to make sure the user receives the notification in whatever chat room he is in, it's necessary to retrieve all the user's socket id's and put them in an array. 

```
const socketArray = [<array of sockets>]
socketArray.forEach(socket => {
    socket.to(socket).emit("name", callback)
})
```