const convertUserMapToArray = (userMap) =>{
        var userArray = [];
        userMap.forEach((value, key) =>{
            var user = {
                username: key, 
                id: value
            }
            userArray.push(user)
        })
        return userArray
}

const removeFromMap = (id, MAP) =>{
    var cloneMap = new Map(MAP)
    let target = ""; 
    cloneMap.forEach((value, key) => {
        if(id === value){
            target = key; 
        }
    }) 
    cloneMap.delete(target)
    return cloneMap
}

const getNameById = (ID, MAP) =>{
    let username = ""; 
    MAP.forEach((value, key)=>{
        if(value === ID) 
           username = key; 
    })
    return username; 
}

module.exports = {
    convertUserMapToArray,
    removeFromMap,
    getNameById, 
} 