This is a chat app created with Node JS, Socket.io library, and EJS. 

It allows persistent user sessions. That means that a user can be in the same chat thread in multiple devices. 

The difficulty in building this app is tracking down all the information that is generated and passed around. 

The authentication doen't include password security yet because I haven't had time to implement it. 

The user is allowed to create a prviate chat room and invite another online user to it. 

Once the user logs into the web app, the client first fetches account information if it exists from the server through CRUD operations. 

From then on, information is passed through sockets betweene the client and the server. 

The app is not backed by a databse yet. 

As long as the server runs and doesn't restart, all the client's information is saved. 

