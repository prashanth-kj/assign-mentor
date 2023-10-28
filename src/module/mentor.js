import mongoose from "./index.js";

const mentorSchema = new mongoose.Schema({
     
       name:{
           type:String,
           required:[true,"Mentor name is required"]
       }
    
});

const mentorModel = mongoose.model('mentors',mentorSchema);

export default mentorModel
