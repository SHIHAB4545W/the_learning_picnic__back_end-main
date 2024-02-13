const Quiz = require("../models/quiz.model")
const Answer_user = require('../models/userAnswer.model')
const appError =require('../utils/appError')
const httpStatusText = require('../utils/httpStatusText')
const asyncWrapper =require('../middleware/asyncWrapper')
const model_Answer =require('../models/modelAnswer.model')
const quiz_result =require('../models/quizResult.model')


const createUserAnswer = asyncWrapper(async (req, res,next) => {
    const quizId = req.params.quizId;
    const quiz = await Quiz.findById(quizId)
    if (!quiz) {
        const error = appError.create('quiz not found', 404, httpStatusText.FAIL)
        return next(error)
    }

    const userId = req.params.userId;
    const answer = [
        {
            answerText:'a'
        },
        {
            answerText:'b'
        },
        {
            answerText:'c'
        },
        {
            answerText:'b'
        },
    ]
    

    const userAnswer = new Answer_user({
        userId: userId,
        quizId:quizId,
        answer: answer
    })
    await userAnswer.save();
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { userAnswer } });



}

)



const getAllAnwnser = asyncWrapper(async (req, res, next) => {
    const quizId =req.params.quizId;
    const userAnswer = await Answer_user.find({quizId:quizId});

    res.json({ status: httpStatusText.SUCCESS, data: { userAnswer } })
})
module.exports ={
    getAllAnwnser,
    createUserAnswer
    

}