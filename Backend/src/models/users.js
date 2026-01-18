
const mongoose = require('mongoose');
const { Schema } = mongoose;

const streakDaySchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  problemCount: {
    type: Number,
    default: 0
  },
  problemsSolved: [{
    type: Schema.Types.ObjectId,
    ref: "problem"
  }]
});

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
    socialProfiles: {
        linkedin: {
            type: String,
            trim: true
        },
        x: {                // Twitter / X
            type: String,
            trim: true
        },
        leetcode: {
            type: String,
            trim: true
        },
        github: {           // ✅ NEW
            type: String,
            trim: true
        }
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
            ref: "problem"
        }],
        default: []
    },
    
    // NEW FIELDS FOR DASHBOARD STATS
    totalPoints: {
        type: Number,
        default: 0
    },
    currentStreak: {
        type: Number,
        default: 0
    },
    maxStreak: {
        type: Number,
        default: 0
    },
    lastActiveDate: {
        type: Date
    },
    streakHistory: [streakDaySchema]

}, { timestamps: true })

// pre ke bad post chelega , pure mongodb ka ye h
userSchema.post('findOneAndDelete', async function (userInfo) {
    if (userInfo) {
        await mongoose.model('submission').deleteMany({ userId: userInfo._id })
    }
})


const User = mongoose.model('user', userSchema);
module.exports = User;
