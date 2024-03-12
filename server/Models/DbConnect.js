const mongoose = require('mongoose');
const User = require('./Schema');


const DbConnect = ()=>{
      mongoose.connect(process.env.MONGO_URI)
      .then((r)=>console.log("Connected to Db"))
      .catch((e)=>console.log(e))
  }

//  const dataDelete = async () => {
//     const dataDel = await User.deleteMany({});
//     console.log(dataDel)
// }
//  dataDelete();

  module.exports = DbConnect;