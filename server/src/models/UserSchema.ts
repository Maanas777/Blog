import mongoose, { Schema, Document } from "mongoose";


export interface IUser extends Document {
    name?: string;
    email: string;
    phone: number;
    password: string;
  
}

const userSchema: Schema<IUser> = new Schema<IUser>({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
       
    },
    password: {
        type: String,
        required: true,
    },
 

});

const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;
