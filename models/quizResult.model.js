const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  
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

  userId:{
    type: String,
  
    required: true
  },
 
  lessonName:{
    type: String,
    required: true
  }

 
})


 module.exports = mongoose.model('quizResult', resultSchema);
