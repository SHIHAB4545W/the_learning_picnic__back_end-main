const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  userId:{
    type: String,
  
    required: true

  },
  
  quizGrade: [{
    quizId:{
      type:String,
      required:true,
    },
    grade:{
      type:Number,
      required: true,
    }
  

  }],

})


 module.exports = mongoose.model('report', resultSchema);
