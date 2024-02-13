const express = require('express');
const router = express.Router();
const reportController =require('../controllers/report.controller')

router.route('/:userId')
.post(reportController.CreateReport )
.get(reportController.ReportForStudent )
router.route('/')
.get(reportController.allReportForTeacher )

router.route('/:userId/:quizId')
.get(reportController.singleReportforST);

router.route('/:quizId')
.get(reportController.getPrecentage )

module.exports = router;