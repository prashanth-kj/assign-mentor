import express from 'express'
import mentorRoutes from './mentor.js'
import studentRoutes from './student.js'
const router= express.Router();

router.use('/mentor',mentorRoutes);
router.use('/student',studentRoutes);

export default router

  