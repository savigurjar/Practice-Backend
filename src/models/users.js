const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20
    },
    lastName: {
        type: String,

        minLength: 3,
        maxLength: 20
    },
    age: {
        type: Number,
        min: 5,
        max: 100
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        immutable: true
    }
    ,
    password: {
        type: String,
        required: true
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpire: {
        type: Date
    },

    problemSolved: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "problem",
            unique: true
        }],
    },
}, { timestamps: true })

// pre ke bad post chelega , pure mongodb ka ye h
userSchema.post('findOneAndDelete', async function (userInfo) {
    if (userInfo) {
        await mongoose.model('submission').deleteMany({ userId: userInfo._id })
    }
})


const User = mongoose.model('user', userSchema);
module.exports = User;