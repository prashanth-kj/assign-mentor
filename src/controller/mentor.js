import mentorModel from "../module/mentor.js";
import studentModel from "../module/student.js";

const createMentor=async(req,res)=>{  
       try {

            let newMentor=await mentorModel.create({
                name:req.body.name
            });

             res.status(201).send({
              message: `mentor ${req.body.name} is created sucessfully`,
              mentor:newMentor
            })
        
       } catch (error) {
            res.status(500).send({
              message: "Internal server Error",
              error: error.message
            });
       }
        
}

const assignStudent=async(req,res)=>{
        try {
          let mentorId=req.params.mentorid;

          let studentId=req.body._id;
 
            let student=await studentModel.findOne({_id:studentId});
              if(!student){
                   res.status(400).send({
                     message:"student Not found"
                   })
              }
              else{
                    if(student.currentMentor){
                      res.status(400).send({
                        message:"mentor assigned the student already"
                      })
                    }
                    else{
                        await studentModel.updateOne({ _id: studentId }, { $set: { currentMentor: mentorId } });
                        
                        res.status(201).send({
                          message:"assign student to mentor sucessfully",
                          student
                        })
 
                    }
              }
        } catch (error) {
              res.status(500).send({
                message: "Internal server Error",
                error: error.message
              });
        }
}
 
const getAllstudentByMentor=async(req,res)=>{

     try {
          let mentorId=req.params.mentorid;

          let students=await studentModel.find({currentMentor:mentorId})

            res.status(200).send({
                message:"get all students by mentor",
                students
            })
     } catch (error) {
          res.status(500).send({
            message: "Internal server Error",
            error: error.message
          });
     }
}


export default {
     createMentor,
     assignStudent,
     getAllstudentByMentor
  

}