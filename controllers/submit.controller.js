const Quiz = require("../models/quiz.model")
const Answer_user = require('../models/userAnswer.model')
const appError =require('../utils/appError')
const httpStatusText = require('../utils/httpStatusText')
const asyncWrapper =require('../middleware/asyncWrapper')
const model_Answer =require('../models/modelAnswer.model')
const quiz_result =require('../models/quizResult.model')
const percentage =require('../models/percentage.model')





const checkAnswer = asyncWrapper(async (req, res, next) =>
{

            const quizId = req.params.quizId;

            const modelAnswer = await model_Answer.find({quizId: quizId});
            const userAnswer =await Answer_user.find({quizId: quizId});
            let score = 0
          
          

            // console.log(userAnswer[0].answer[0].answerText);
            
            for(let j=0;  j < userAnswer[0].answer.length; j++){
                
        
                if(modelAnswer[0].answers[j].answerText === userAnswer[0].answer[j].answerText ){
                    score++;
                    
                }
            
        
            }
           

         
            
            const quiz = await Quiz.findById(quizId)
        
        
            const userId = "maged123"
            const lessonName =quiz.lessonName
            
        
           const grade = (score/ modelAnswer[0].answers.length)*100 ;

        
        
           const quizResult = new quiz_result ({
                userId:userId,
                lessonName:lessonName,
           quizGrade:[
            {
            quizId:quizId,
            grade:grade
           }
            
           ]
                
            })
            await quizResult.save();
            res.status(200).json({ status: httpStatusText.SUCCESS, data: { quizResult } });
        

        
    
 
  


    
// res.json({ status: httpStatusText.SUCCESS, QuizResult: {" Final grade is ": grade , "Final Score is": score  }})
})

const createprecentage = asyncWrapper(async (req, res, next) => {
    const quizId = req.params.quizId;
    const percentageResult = await percentage.find({quizId:quizId})
    const modelAnswer = await model_Answer.find({quizId: quizId});
    const userAnswer =await Answer_user.find({quizId: quizId});
    
    if (!percentageResult) {

        const error = appError.create('percentage not found', 404, httpStatusText.FAIL)
        return next(error)
    }
    if (!userAnswer) {

        const error = appError.create('Answer not found', 404, httpStatusText.FAIL)
        return next(error)
    }

    const arrayOfScore =[];
    let score_1, score_2, score_3, score_4;
    let arrayOfzeroScore =[score_1=0,score_2=0,score_3=0,score_4=0]
    let AnswerScore_result =0; 
    
    for(let i=0; i < userAnswer[0].answer.length; i++){
    for(let j=0;  j < userAnswer.length; j++){

        if(modelAnswer[0].answers[i].answerText === userAnswer[j].answer[i].answerText ){
                console.log(arrayOfzeroScore[i]++);

        }
    }
    AnswerScore_result = (arrayOfzeroScore[i]/userAnswer.length)*100;
    arrayOfScore.push(AnswerScore_result)
    console.log(arrayOfScore);
}


    const newPrecentage = new percentage({
       quizId:quizId,
       percentageAnswer:[{
        percentageAnswer_1:arrayOfScore[0],
        percentageAnswer_2:arrayOfScore[1],
        percentageAnswer_3:arrayOfScore[2],
        percentageAnswer_4:arrayOfScore[3]

        
       }]
    })
    await newPrecentage.save();
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { precentages: newPrecentage } });


}
)










module.exports={
    
    checkAnswer,
    createprecentage

}




























// const getAllAnwnser =  async(req, res) => {
//     let score = 0;
//     const answers= await answer.find();
//         res.json(answers);
//         for(let j = 0; j < correctAnswer; j++) { 
        
//             if(answers[j].answer === correctAnswer[j].answer) {
//                 score++;
//                     console.log('correctAnswer',correctAnswer[j]);
//                     console.log('score',score);
//             }
//             else{
//                     console.log('wrongAnswer');
//             }
//         }
//             grade = (score / correctAnswer.length)*100 ;
//                 console.log('grade :',grade,"%");
//                     console.log('your final score is',score);
//     }
    

// const addAnswer = async (req, res) => {
    
//     const errors =validationResult(req);
            
//             if(!errors.isEmpty()){
//                 return res.status(400).json({errors: errors.array()})
//                 } 
//                     const newAnswer = new answer(req.body);
//                     await newAnswer.save();
//                         res.status(201).json(newAnswer);

// }



