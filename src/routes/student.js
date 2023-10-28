import express from 'express'
import studentController from '../controller/student.js'
 const router =express.Router()

   router.post('/create',studentController.createStudent)
   router.post('/changementor/:studentid',studentController.changeMentor)
   router.get('/previousmentor/:studentid',studentController.previousAssignMentor)

export default router