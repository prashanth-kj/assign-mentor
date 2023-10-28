import mongoose  from "./index.js";

 const studentSchema =new mongoose.Schema({
        name:{
             type:String,
             required:[true, 'student name is required']
        },
        currentMentor:{
              type:mongoose.Schema.Types.ObjectId,
              ref:"mentorModel"
        },
        previousMentors:[
            {
                type:mongoose.Schema.Types.Mixed,
                ref:"mentorModel"
            }
        ]
 });

 const studentModel= mongoose.model('students',studentSchema)
  
 export default studentModel