const express = require('express');
const router = express.Router();

const submitController = require('../controllers/userAnswer.controller');

router.route('/:quizId/:userId')
.post (submitController.createUserAnswer)
 router.route('/:quizId')
.get(submitController.getAllAnwnser)



module.exports = router;