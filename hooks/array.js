const convertUserMapToArray = (userMap) => {
  var userArray = [];
  userMap.forEach((value, key) => {
    var user= {
      username: key,
      id: value,
    };
    userArray.push(user);
  });
  return userArray;
};

const convertMapToArray = (userMap) => {
  try{
    var userArray = [];
    userMap.forEach((value, key) => {
      var user= {
        value, 
        id: key,
      };
      userArray.push(user);
    });
    return userArray;
  } catch(e){
    console.log(`convertMapToArray ${e}`)
  }
};

const removeFromMap = (id, MAP) => {
  var cloneMap = new Map(MAP);
  let target = "";
  cloneMap.forEach((value, key) => {
    if (id === value) {
      target = key;
    }
  });
  cloneMap.delete(target);
  return cloneMap;
};

const getNameById = (id, MAP) => {
  let username = "";
  MAP.forEach((value, key) => {
    if (value === id) username = key;
  });
  return username;
};

//takes a Set of Socket Ids, finds the corresponding username and returns them into an array 
const createArrayOfUsers = (setObj, mapObj) =>{
  if(setObj){
    const userArray = []; 
    setObj?.forEach(ID =>{
      const userN = getNameById(ID, mapObj)
      const user = {
        username: userN, 
        id: ID, 
      }
      userArray.push(user)
    })
    return userArray 
  }
  console.log("setObj is undefined: ", setObj)
  return null; 
}

const isUsernameUnique = (username, MapSet) => {
  if (MapSet.has(username)) return false;
  return true;
};

const CompareArrays = (arr1, arr2) =>{
  if(Array.isArray(arr1) && Array.isArray(arr2)){
    if(arr1.length === arr2.length){
      const size = arr1.length; 
      const sorted1 = arr1.slice().sort((a,b) => a - b)
      const sorted2 = arr2.slice().sort((a,b) => a - b)
      for(var i = 0; i < size; i++){
        if(sorted1[i] != sorted2[i]){
          return false 
        }
      }
      return true
    }
  }
  return false; 
}

const printSocketRooms = (socket, username) => {  
  try{
    const rooms = Array.from(socket.rooms);
    console.log(`user: ${username}-${socket.id}`)
    console.log(`Socket ID: ${socket.id}, Rooms: ${rooms.join(', ')} \n`);  
  } catch(e){console.log(`printSocketRooms ${e}`)}

};

//Converts an array to a Set and then converts it back to an array so it has unique values. 
const convertToUniqueArray = (arr) =>{
  try{
    let tempSet = new Set(arr); 
    return Array.from(arr); 
  }catch(e){console.log(`convertToUniqueArray ${e}`)}
}

module.exports = { 
  convertUserMapToArray, 
  convertMapToArray, 
  removeFromMap,
  getNameById,
  createArrayOfUsers, 
  isUsernameUnique,
  CompareArrays,
  printSocketRooms,
  convertToUniqueArray 
};
