import mongoose from "mongoose";


const users = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    lastName: {
        type: String,
        default: "last name"
    },
    location: {
        type: String,
        default: "florida"
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    avatar: String,
    avatarPublicId: String,
},
{timestamps:true});

// converts the schema into basic object with details that can be obtained from this method
users.methods.toJSON = function (){
    const obj = this.toObject();
    return obj;
}


export default mongoose.model("Users", users)