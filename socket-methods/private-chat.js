const ReceivePrivateChat =({io, socket, messageStore})=>{
  socket.on("private-message", (event)=>{
    const {
      username, 
      msg, 
      roomKey, 
      authorSocketId, 
      date, 
    } = event; 
    io.emit(`room-${roomKey}`, event)
    console.log('fired')
    messageStore.saveMessages(roomKey, username, authorSocketId, msg, date)
  })
}

module.exports = {
    ReceivePrivateChat, 
}