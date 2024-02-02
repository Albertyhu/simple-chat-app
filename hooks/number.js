const genRandNum = (size) => {
  return Math.floor(Math.random() * size);
};

const createRandomDate = () =>{
  try{
    var myDate = new Date(); 
    myDate.setHours(myDate.getHours() + genRandNum(1000))
    return myDate; 
  } catch(e){
    console.log(`createRandomDate ${e}`)
    throw e; 
  }
}

module.exports = {
  genRandNum,
  createRandomDate, 
};
