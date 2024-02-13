const mongoose = require('mongoose');

const percentageSchema = new mongoose.Schema({
  quizId:{
    type: String,
  
    required: true

  },
  
  percentageAnswer: [{
    percentageAnswer_1:{
        type: Number,
        required: true

    },
    percentageAnswer_2:{
        type: Number,
        required:true
    },
    percentageAnswer_3:{
        type: Number
    },
    percentageAnswer_4:{
        type: Number
    }
    
  

  }],

})
module.exports = mongoose.model('percentage', percentageSchema);

