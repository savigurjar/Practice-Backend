// const cloudinary = require('cloudinary').v2;
// const Problem = require("../models/problem");
// const SolutionVideo = require("../models/solutionVideo");

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

// const generateUploadSignature = async (req, res) => {
//   try {
//     const { problemId } = req.params;
//     const userId = req.result._id;

//     const problem = await Problem.findById(problemId);
//     if (!problem) return res.status(404).json({ error: 'Problem not found' });

//     const timestamp = Math.floor(Date.now() / 1000);
//     const publicId = `leetcode-solutions/${problemId}/${userId}_${timestamp}`;

//     const signature = cloudinary.utils.api_sign_request(
//       { timestamp, public_id: publicId },
//       process.env.CLOUDINARY_API_SECRET
//     );

//     res.json({
//       signature,
//       timestamp,
//       public_id: publicId,
//       api_key: process.env.CLOUDINARY_API_KEY,
//       cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//       upload_url: `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/video/upload`,
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to generate upload credentials' });
//   }
// };

// const saveVideoMetadata = async (req, res) => {
//   try {
//     const { problemId, cloudinaryPublicId, secureUrl, duration } = req.body;
//     const userId = req.result._id;

//     // Fetch problem to get its title
//     const problem = await Problem.findById(problemId);
//     if (!problem) return res.status(404).json({ error: "Problem not found" });

//     // Check if video already exists for this user/problem
//     const existingVideo = await SolutionVideo.findOne({ problemId, userId });
//     if (existingVideo) {
//       return res.status(409).json({ error: "Video already exists for this user/problem" });
//     }

//     // Fetch Cloudinary video info
//     const cloudinaryResource = await cloudinary.api.resource(cloudinaryPublicId, { resource_type: "video" });
//     if (!cloudinaryResource) return res.status(400).json({ error: "Video not found on Cloudinary" });

//     // Generate thumbnail URL
//     const thumbnailUrl = cloudinary.url(cloudinaryResource.public_id, {
//       resource_type: "video",
//       format: "jpg",
//       transformation: [
//         { width: 400, height: 225, crop: "fill" },
//         { start_offset: "auto" }
//       ]
//     });

//     const videoSolution = await SolutionVideo.create({
//       problemId,
//       userId,
//       cloudinaryPublicId,
//       secureUrl,
//       duration: cloudinaryResource.duration || duration,
//       thumbnailUrl,
//       title: problem.title, // ✅ Use problem title
//       status: 'approved',
//       views: 0,
//       likes: 0,
//       commentsCount: 0
//     });

//     res.status(201).json({
//       message: "Video solution saved successfully",
//       videoSolution
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to save video metadata" });
//   }
// };


// const deleteVideo = async (req, res) => {
//   try {
//     const { problemId } = req.params;
//     const userId = req.result._id;

//     const video = await SolutionVideo.findOne({ problemId, userId });
//     if (!video) return res.status(404).json({ error: "No video found" });

//     await cloudinary.uploader.destroy(video.cloudinaryPublicId, { resource_type: "video", invalidate: true });
//     await video.deleteOne();

//     res.json({ message: "Video deleted successfully" });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to delete video" });
//   }
// };

// const getVideoStatus = async (req, res) => {
//   try {
//     const videos = await SolutionVideo.find({}, "problemId status duration thumbnailUrl");

//     const videoMap = {};
//     videos.forEach(v => {
//       videoMap[v.problemId.toString()] = {
//         status: v.status,
//         duration: v.duration,
//         thumbnailUrl: v.thumbnailUrl
//       };
//     });

//     res.json(videoMap);

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to fetch video status" });
//   }
// };

// module.exports = { generateUploadSignature, saveVideoMetadata, deleteVideo, getVideoStatus };

const cloudinary = require('cloudinary').v2;
const Problem = require("../models/problem");
const SolutionVideo = require("../models/solutionVideo");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Helper function to generate unique public ID
const generatePublicId = (problemId, userId) => {
  const timestamp = Math.floor(Date.now() / 1000);
  return `leetcode-solutions/${problemId}/${userId}_${timestamp}`;
};

// Regular upload signature (for small files < 100MB)
const generateUploadSignature = async (req, res) => {
  try {
    const { problemId } = req.params;
    const userId = req.result._id;

    const problem = await Problem.findById(problemId);
    if (!problem) return res.status(404).json({ error: 'Problem not found' });

    const timestamp = Math.floor(Date.now() / 1000);
    const publicId = generatePublicId(problemId, userId);

    const signature = cloudinary.utils.api_sign_request(
      { timestamp, public_id: publicId },
      process.env.CLOUDINARY_API_SECRET
    );

    res.json({
      signature,
      timestamp,
      public_id: publicId,
      api_key: process.env.CLOUDINARY_API_KEY,
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      upload_url: `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/video/upload`,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate upload credentials' });
  }
};

// Large file upload signature (for files > 100MB)
const generateLargeUploadSignature = async (req, res) => {
  try {
    const { problemId } = req.params;
    const userId = req.result._id;
    const { fileSize, fileName, fileType } = req.query;

    const problem = await Problem.findById(problemId);
    if (!problem) return res.status(404).json({ error: 'Problem not found' });

    // Validate file size (max 1GB)
    const maxSize = 1024 * 1024 * 1024; // 1GB
    if (parseInt(fileSize) > maxSize) {
      return res.status(413).json({ error: 'File size exceeds 1GB limit' });
    }

    const timestamp = Math.floor(Date.now() / 1000);
    const publicId = generatePublicId(problemId, userId);
    
    // Parameters for large upload initialization
    const params = {
      timestamp,
      public_id: publicId,
      resource_type: 'video',
      chunk_size: 20 * 1024 * 1024, // 20MB chunks
    };

    // Optional: Add context for better tracking
    const context = {
      problem_id: problemId,
      user_id: userId,
      original_filename: fileName || '',
      uploaded_at: new Date().toISOString()
    };

    const signature = cloudinary.utils.api_sign_request(
      params,
      process.env.CLOUDINARY_API_SECRET
    );

    res.json({
      signature,
      timestamp,
      public_id: publicId,
      api_key: process.env.CLOUDINARY_API_KEY,
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      upload_url: `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/video/upload/large`,
      chunk_size: 20 * 1024 * 1024,
      context: JSON.stringify(context)
    });

  } catch (error) {
    console.error('Large upload signature error:', error);
    res.status(500).json({ error: 'Failed to generate upload credentials' });
  }
};

const saveVideoMetadata = async (req, res) => {
  try {
    const { problemId, cloudinaryPublicId, secureUrl, duration } = req.body;
    const userId = req.result._id;

    // Fetch problem to get its title
    const problem = await Problem.findById(problemId);
    if (!problem) return res.status(404).json({ error: "Problem not found" });

    // Check if video already exists for this user/problem
    const existingVideo = await SolutionVideo.findOne({ problemId, userId });
    if (existingVideo) {
      // Delete old video from Cloudinary
      try {
        await cloudinary.uploader.destroy(existingVideo.cloudinaryPublicId, { 
          resource_type: "video", 
          invalidate: true 
        });
      } catch (cloudinaryError) {
        console.warn('Could not delete old Cloudinary video:', cloudinaryError);
      }
      // Update existing video instead of creating conflict
      existingVideo.cloudinaryPublicId = cloudinaryPublicId;
      existingVideo.secureUrl = secureUrl;
      existingVideo.uploadedAt = new Date();
      await existingVideo.save();
      return res.status(200).json({
        message: "Video solution updated successfully",
        videoSolution: existingVideo
      });
    }

    // Fetch Cloudinary video info with retry logic for large files
    let cloudinaryResource;
    let retries = 3;
    
    while (retries > 0) {
      try {
        cloudinaryResource = await cloudinary.api.resource(cloudinaryPublicId, { 
          resource_type: "video" 
        });
        break;
      } catch (error) {
        retries--;
        if (retries === 0) throw error;
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, 1000 * (3 - retries)));
      }
    }

    if (!cloudinaryResource) {
      return res.status(400).json({ error: "Video not found on Cloudinary" });
    }

    // Generate thumbnail URL with multiple fallback options
    let thumbnailUrl;
    try {
      // Try to get thumbnail at 10% of video duration
      thumbnailUrl = cloudinary.url(cloudinaryPublicId, {
        resource_type: "video",
        format: "jpg",
        transformation: [
          { width: 400, height: 225, crop: "fill" },
          { start_offset: Math.floor(cloudinaryResource.duration * 0.1) || "auto" }
        ]
      });
    } catch (thumbnailError) {
      console.warn('Could not generate thumbnail:', thumbnailError);
      // Fallback to a default thumbnail
      thumbnailUrl = null;
    }

    const videoSolution = await SolutionVideo.create({
      problemId,
      userId,
      cloudinaryPublicId,
      secureUrl,
      duration: cloudinaryResource.duration || duration || 0,
      thumbnailUrl,
      title: problem.title,
      status: 'approved',
      views: 0,
      likes: 0,
      commentsCount: 0,
      format: cloudinaryResource.format,
      bytes: cloudinaryResource.bytes,
      width: cloudinaryResource.width,
      height: cloudinaryResource.height,
      uploadedAt: new Date()
    });

    res.status(201).json({
      message: "Video solution saved successfully",
      videoSolution
    });

  } catch (error) {
    console.error('Save video metadata error:', error);
    
    // Check for specific Cloudinary errors
    if (error.message.includes('Resource not found')) {
      return res.status(404).json({ 
        error: "Video processing is still in progress. Please wait a moment and try again." 
      });
    }
    
    res.status(500).json({ 
      error: "Failed to save video metadata",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const deleteVideo = async (req, res) => {
  try {
    const { problemId } = req.params;
    const userId = req.result._id;

    const video = await SolutionVideo.findOne({ problemId, userId });
    if (!video) return res.status(404).json({ error: "No video found" });

    // Delete from Cloudinary
    try {
      await cloudinary.uploader.destroy(video.cloudinaryPublicId, { 
        resource_type: "video", 
        invalidate: true 
      });
    } catch (cloudinaryError) {
      console.warn('Cloudinary deletion error:', cloudinaryError);
      // Continue with database deletion even if Cloudinary fails
    }

    await video.deleteOne();

    res.json({ message: "Video deleted successfully" });

  } catch (err) {
    console.error('Delete video error:', err);
    res.status(500).json({ error: "Failed to delete video" });
  }
};

const getVideoStatus = async (req, res) => {
  try {
    const videos = await SolutionVideo.find({}, "problemId status duration thumbnailUrl title uploadedAt");

    const videoMap = {};
    videos.forEach(v => {
      videoMap[v.problemId.toString()] = {
        status: v.status,
        duration: v.duration,
        thumbnailUrl: v.thumbnailUrl,
        title: v.title,
        uploadedAt: v.uploadedAt
      };
    });

    res.json(videoMap);

  } catch (err) {
    console.error('Get video status error:', err);
    res.status(500).json({ error: "Failed to fetch video status" });
  }
};

// New endpoint to check upload status
const checkUploadStatus = async (req, res) => {
  try {
    const { problemId } = req.params;
    const userId = req.result._id;

    const video = await SolutionVideo.findOne({ problemId, userId });
    
    if (!video) {
      return res.status(404).json({ 
        exists: false,
        message: "No video found for this problem" 
      });
    }

    // Check if video exists on Cloudinary
    try {
      const cloudinaryResource = await cloudinary.api.resource(video.cloudinaryPublicId, { 
        resource_type: "video" 
      });
      
      res.json({
        exists: true,
        video: {
          secureUrl: video.secureUrl,
          duration: video.duration,
          thumbnailUrl: video.thumbnailUrl,
          title: video.title,
          uploadedAt: video.uploadedAt,
          cloudinaryStatus: cloudinaryResource.status || 'active'
        }
      });
    } catch (cloudinaryError) {
      // Video might have been deleted from Cloudinary
      res.json({
        exists: false,
        message: "Video not found on Cloudinary"
      });
    }

  } catch (error) {
    console.error('Check upload status error:', error);
    res.status(500).json({ error: "Failed to check upload status" });
  }
};

module.exports = { 
  generateUploadSignature, 
  generateLargeUploadSignature,
  saveVideoMetadata, 
  deleteVideo, 
  getVideoStatus,
  checkUploadStatus 
};
