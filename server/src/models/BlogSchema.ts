import mongoose, { Document, Schema, Types } from "mongoose";

export interface IBlog extends Document {
    title: string;
    content: string;
    image?: string;
    user?: Types.ObjectId;
    createdOn: Date;
}

const blogSchema = new Schema<IBlog>({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        data: Buffer,           // Store the binary image data as Buffer
        contentType: String,    // Store the MIME type of the image
      },
    user: {
        type: Types.ObjectId,
        ref: "User",
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
});

const Blog = mongoose.model<IBlog>("blog", blogSchema);

export default Blog;
