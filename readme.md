Live site: https://chat-app-brax.onrender.com/
 
Note: Because the app is hosted on a free tier on Render, there is usually a long cold start before the app is fully loaded. 

# Chat App

This is a chat app created with Node JS, Socket.io library, and EJS. 

It allows persistent user sessions. That means that a user can be in the same chat thread in multiple devices. 

The difficulty in building this app is tracking down all the information that is generated and passed around. 

The authentication doesn't include password security yet because I haven't had time to implement it. 

The user is allowed to create a private chat room and invite another online user to it. 

Once the user logs into the web app, the client first fetches account information if it exists from the server through CRUD operations. 

From then on, information is passed through sockets between the client and the server. 

The app is not backed by a database yet. 

As long as the server runs and doesn't restart, all the client's information and chat history are saved. 

### The challenge of creating multiple chat rooms  

Socket IDs are used to identify a member of a chatroom. They are necessary to provide functionality for sending a message to a specific user or inviting them to a private chat room.


However, because different chatrooms are opened on separate pages, a user who is a member of all those chatrooms will have different sockets for each one, each with its own unique socket ID.


Thus, when sending a message to one user and you want to make sure the user receives the notification in whatever chat room he is in, it's necessary to retrieve all the user's socket IDs and put them in an array.

```
const socketArray = [<array of sockets>]
socketArray.forEach(socket => {
    socket.to(socket).emit("name", callback)
})
```