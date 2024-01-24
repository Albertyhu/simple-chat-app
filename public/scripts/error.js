socket.on("connect_error", (err)=>{
    switch(error.message){
        case "Invalid username": 
            console.log("Username is invalid");
            socket.off("connect_error")
            return; 
        default: 
            return; 
    }    
})