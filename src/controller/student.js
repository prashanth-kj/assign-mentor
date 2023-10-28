import mentorModel from "../module/mentor.js";
import studentModel from "../module/student.js";

const createStudent =async(req,res)=>{
          
       try {
          let newStudent= await studentModel.create({
               name:req.body.name   
        })

         res.status(201).send({
            message:`newStudent ${req.body.name} created sucessfully`,
            student:newStudent
         })
       } catch (error) {
          res.status(500).send({
            message: "Internal server Error",
            error: error.message
          });
       }
}

const changeMentor = async (req, res) => {
   try {
     const studentId = req.params.studentid;
     const mentorId = req.body._id;
 
     const student = await studentModel.findOne({ _id: studentId });
 
     if (!student) {
          return res.status(400).send({
            message: "Student not found"
          });
     }
 
     if (!student.currentMentor) {
       // If there's no current mentor, set current mentor
          student.currentMentor = mentorId;
          await student.save();
          res.status(201).send({
            message: "Assigned student to mentor successfully",
            student
          });
     } else {
       // Fetch information about the current mentor
       const currentMentor = await mentorModel.findOne({ _id: student.currentMentor });
 
            if (!currentMentor) {
              return res.status(400).send({
                message: "Current mentor not found"
              });
            }
            const mentorSubdocument = {
              id: currentMentor._id,
              name: currentMentor.name
            };
     
            // Update the student document by pushing the mentor subdocument to previousMentors
            student.previousMentors.push(mentorSubdocument);
            student.currentMentor = mentorId;
            await student.save();
 
            res.status(201).send({
              message: "Changed mentor to student successfully",
              student: student,
            });
     }
   } catch (error) {
          res.status(500).send({
            message: "An error occurred while changing the mentor",
            error: error.message
          });
   }
 }
 
const previousAssignMentor= async (req,res)=>{
     try {

        let studentId=req.params.studentid; 
        let student=await studentModel.findOne({_id:studentId})
          
        if (student.previousMentors && student.previousMentors.length > 0) {
            res.status(200).send({
              message: "List of previous mentors for the student",
              previousMentors: student.previousMentors
            });
        }
        else{
            res.status(200).send({
              message: "this student have no previous mentor"
            });
        }

      }
      catch (error) {
        res.status(500).send({
          message: "Internal server Error",
          error: error.message
        });
     }
}


export default {
     createStudent,
     changeMentor,
     previousAssignMentor
     
}