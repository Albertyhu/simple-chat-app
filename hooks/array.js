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

module.exports = {convertUserMapToArray} 