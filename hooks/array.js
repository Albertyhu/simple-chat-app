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

const isUsernameUnique = (username, MapSet) => {
  if (MapSet.has(username)) return false;
  return true;
};

module.exports = {
  convertUserMapToArray,
  removeFromMap,
  getNameById,
  isUsernameUnique,
};
