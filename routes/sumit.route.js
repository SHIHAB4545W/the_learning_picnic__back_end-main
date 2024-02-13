const express = require('express');
const router = express.Router();

const submitController = require('../controllers/submit.controller');

router.route('/:quizId')
.post(submitController.checkAnswer)
.get(submitController.createprecentage)
// .post (submitController.createUserAnswer)
// router.route('/')
// .get(submitController.getAllAnwnser)



module.exports = router;