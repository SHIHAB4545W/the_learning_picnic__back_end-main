const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quiz.controller');
const {validationSchema}=require('../middleware/validationSchema')

router.route('/:lessonId')
    .post(quizController.createQuiz)
    .get(quizController.retrieveLessonQuizes)

router.route('/:lessonId/:quizId')
    .delete(quizController.deleteQuiz)

router.route('/:id')
    .get(quizController.retrieveQuize)


router.route('/')
    .get(quizController.retrieveQuizes)
    
    

module.exports = router;
