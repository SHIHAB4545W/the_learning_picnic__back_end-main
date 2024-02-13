const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  
  quizId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Quiz',
  required: true
  },

  userId:{
    type: String,
  
    required: true
  },
 
  answer:[
    {
      answerText:{
        type:String,
        required:true
      }
  
  }]  
})


 module.exports = mongoose.model('Answer_user', answerSchema);
