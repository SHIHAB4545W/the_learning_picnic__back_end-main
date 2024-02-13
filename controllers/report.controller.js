
const asyncWrapper = require("../middleware/asyncWrapper")
const httpStatusText = require("../utils/httpStatusText")
const appError = require("../utils/appError")
const quiz_Result= require('../models/quizResult.model')
const report_Result =require('../models/report.model')
const Answer_user =require('../models/userAnswer.model')
const precentages = require('../models/percentage.model')

const CreateReport = asyncWrapper(async (req, res,next) => {
    

    
    const userId = req.params.userId

    const reportFeedback = await quiz_Result.find({userId:userId});
    
    if (!reportFeedback) {
        const error = appError.create('report not found', 404, httpStatusText.FAIL)
        return next(error)
    }
   

    for (let i = 0; i < reportFeedback.length-1; i++){
    

                let quizId =reportFeedback[i].quizGrade[0].quizId;
                let grade =reportFeedback[i].quizGrade[0].grade;


    const  report = new report_Result({
        quizGrade:[{
            quizId:quizId,
            grade:grade
        }],
        userId:userId


    })  
    for(let j = 1; j < reportFeedback.length; j++){

                report.quizGrade.push({
                    quizId:reportFeedback[j].quizGrade[0].quizId,
                    grade:reportFeedback[j].quizGrade[0].grade
                })
                await report.save();
    
            
                res.status(200).json({ status: httpStatusText.SUCCESS, data: { report } });
            }
            }
    
})

const singleReportforST =asyncWrapper(async (req, res,next) => {

    
   
const userId = req.params.userId
const quizId =req.params.quizId
    const reportFeedback = await report_Result.findOne({userId:userId});
    console.log(reportFeedback);
    for(let j = 0; j < reportFeedback.quizGrade.length; j++){
        if (quizId===reportFeedback.quizGrade[j].quizId) {
        const singleReport = reportFeedback.quizGrade[j]

        res.status(200).json({ status: httpStatusText.SUCCESS, data: { singleReport  } });
            
        }
    }
  
    





})

const allReportForTeacher =asyncWrapper(async (req, res,next) => {

    const report = await report_Result.find({});
    if(!report) {
        const error = appError.create('quiz not found', 404, httpStatusText.FAIL)
                return next(error)
    }
    else{
        res.status(200).json({ status: httpStatusText.SUCCESS, data: { report  } });
            }

})

const ReportForStudent =asyncWrapper(async (req, res,next) => {
     userId = req.params.userId;
    const report = await report_Result.findOne({userId:userId})

    if(!report) {
        const error = appError.create('report not found', 404, httpStatusText.FAIL)
                return next(error)
    }
    else{
        
        res.status(200).json({ status: httpStatusText.SUCCESS, data: { report  } });
            }

})

const getPrecentage =asyncWrapper(async (req, res,next) => {
    quizId = req.params.quizId;
   const precentagesReport = await precentages.find({quizId:quizId});



   res.status(200).json({ status: httpStatusText.SUCCESS, data: { precentagesReport  } });



})
















module.exports={
    CreateReport,
    ReportForStudent,
    singleReportforST,
    allReportForTeacher,
    getPrecentage
    
    
}

