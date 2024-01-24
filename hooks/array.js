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

const isUsernameUnique = (username, MapSet) => {
  if (MapSet.has(username)) return false;
  return true;
};

module.exports = {
  convertUserMapToArray,
  removeFromMap,
  getNameById,
  createArrayOfUsers, 
  isUsernameUnique,
};
