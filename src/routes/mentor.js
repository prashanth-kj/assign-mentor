import express from 'express'
import mentorController from '../controller/mentor.js'
const router =express.Router();

router.post('/create', mentorController.createMentor)
router.post('/assignstudent/:mentorid',mentorController.assignStudent)
router.get('/getstudents/:mentorid',mentorController.getAllstudentByMentor)
export default router