// import { useParams, useNavigate } from 'react-router';
// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import axiosClient from "../../utils/axiosClient";

// function AdminUpload() {
//   const { problemId } = useParams();
//   const navigate = useNavigate();

//   const [uploading, setUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [uploadedVideo, setUploadedVideo] = useState(null);
//   const [error, setError] = useState("");

//   const { register, handleSubmit, watch, reset } = useForm();
//   const selectedFile = watch('videoFile')?.[0];

//   const onSubmit = async (data) => {
//     if (!data.videoFile?.[0]) return;

//     const file = data.videoFile[0];
//     setUploading(true);
//     setUploadProgress(0);
//     setError("");

//     try {
//       // 1️⃣ Get upload signature from backend
//       const signatureResponse = await axiosClient.get(`/video/create/${problemId}`);
//       const { signature, timestamp, public_id, api_key, cloud_name, upload_url } = signatureResponse.data;

//       // 2️⃣ Upload to Cloudinary
//       const formData = new FormData();
//       formData.append('file', file);
//       formData.append('signature', signature);
//       formData.append('timestamp', timestamp);
//       formData.append('public_id', public_id);
//       formData.append('api_key', api_key);

//       const uploadResponse = await axios.post(upload_url, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//         onUploadProgress: (progressEvent) => {
//           const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//           setUploadProgress(progress);
//         },
//       });

//       const cloudinaryResult = uploadResponse.data;

//       // 3️⃣ Save video metadata (Option 1: title from problem)
//       const metadataResponse = await axiosClient.post('/video/save', {
//         problemId,
//         cloudinaryPublicId: cloudinaryResult.public_id,
//         secureUrl: cloudinaryResult.secure_url,
//         duration: cloudinaryResult.duration,
//       });

//       setUploadedVideo(metadataResponse.data.videoSolution);
//       reset();
//       setUploadProgress(0);

//     } catch (err) {
//       console.error('Upload error:', err);
//       setError(err.response?.data?.error || 'Upload failed. Please try again.');
//       setUploadProgress(0);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const formatFileSize = (bytes) => {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   };

//   const formatDuration = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   return (
//     <div className="max-w-md mx-auto p-6">
//       <div className="card bg-base-100 shadow-xl">
//         <div className="card-body">
//           <h2 className="card-title">Upload Video Solution</h2>

//           {/* Back Button */}
//           <button
//             className="btn btn-sm btn-ghost mb-4"
//             onClick={() => navigate('/admin/video')}
//           >
//             ← Back to Videos
//           </button>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             {/* File Input */}
//             <div className="form-control w-full">
//               <label className="label">
//                 <span className="label-text">Choose video file</span>
//               </label>
//               <input
//                 type="file"
//                 accept="video/*"
//                 {...register('videoFile', { required: true })}
//                 className="file-input file-input-bordered w-full"
//                 disabled={uploading}
//               />
//             </div>

//             {/* Selected File Info */}
//             {selectedFile && (
//               <div className="alert alert-info">
//                 <div>
//                   <h3 className="font-bold">Selected File:</h3>
//                   <p>{selectedFile.name}</p>
//                   <p>Size: {formatFileSize(selectedFile.size)}</p>
//                 </div>
//               </div>
//             )}

//             {/* Upload Progress */}
//             {uploading && (
//               <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
//                 <div
//                   className="bg-blue-500 h-4 rounded-full"
//                   style={{ width: `${uploadProgress}%` }}
//                 ></div>
//                 <p className="text-sm mt-1">{uploadProgress}% uploaded</p>
//               </div>
//             )}

//             {/* Error Message */}
//             {error && (
//               <div className="alert alert-error">
//                 <span>{error}</span>
//               </div>
//             )}

//             {/* Uploaded Video Info */}
//             {uploadedVideo && (
//               <div className="alert alert-success space-y-2">
//                 <h3 className="font-bold">Upload Successful!</h3>
//                 <p>Duration: {formatDuration(uploadedVideo.duration)}</p>
//                 <p>Status: {uploadedVideo.status}</p>
//                 {uploadedVideo.thumbnailUrl && (
//                   <img src={uploadedVideo.thumbnailUrl} alt="Video thumbnail" className="w-32 mt-2 rounded" />
//                 )}
//               </div>
//             )}

//             {/* Upload Button */}
//             <div className="card-actions justify-end">
//               <button
//                 type="submit"
//                 disabled={uploading}
//                 className={`btn btn-primary ${uploading ? 'loading' : ''}`}
//               >
//                 {uploading ? 'Uploading...' : 'Upload Video'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminUpload;


import { useParams, useNavigate } from 'react-router';
import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import axiosClient from "../../utils/axiosClient";

function AdminUpload() {
  const { problemId } = useParams();
  const navigate = useNavigate();

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [error, setError] = useState("");
  const [uploadStage, setUploadStage] = useState('');
  const [existingVideo, setExistingVideo] = useState(null);
  
  const abortControllerRef = useRef(null);

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
  const selectedFile = watch('videoFile')?.[0];

  useEffect(() => {
    checkExistingVideo();
  }, [problemId]);

  const checkExistingVideo = async () => {
    try {
      const response = await axiosClient.get(`/video/status/${problemId}`);
      if (response.data.exists) {
        setExistingVideo(response.data.video);
      }
    } catch (error) {
      console.log('No existing video found:', error);
    }
  };

  const uploadChunkedToCloudinary = async (file, signatureData) => {
    const { signature, timestamp, public_id, api_key, cloud_name, upload_url } = signatureData;
    
    // Validate required fields
    if (!signature || !timestamp || !public_id || !api_key || !cloud_name || !upload_url) {
      throw new Error('Invalid upload signature data');
    }

    const initFormData = new FormData();
    initFormData.append('signature', signature);
    initFormData.append('timestamp', timestamp);
    initFormData.append('public_id', public_id);
    initFormData.append('api_key', api_key);
    initFormData.append('resource_type', 'video');
    initFormData.append('chunk_size', 20 * 1024 * 1024);

    setUploadStage('initializing');
    
    // Step 1: Initialize upload
    const initResponse = await axios.post(upload_url, initFormData, {
      timeout: 30000,
      signal: abortControllerRef.current?.signal
    });
    
    if (!initResponse.data.upload_id) {
      throw new Error('Failed to initialize upload: No upload_id received');
    }
    
    const { upload_id } = initResponse.data;

    // Step 2: Upload chunks
    const CHUNK_SIZE = 20 * 1024 * 1024;
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    const etags = [];

    setUploadStage('uploading_chunks');

    for (let i = 0; i < totalChunks; i++) {
      if (abortControllerRef.current?.signal.aborted) {
        throw new Error('Upload cancelled');
      }

      const start = i * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, file.size);
      const chunk = file.slice(start, end);

      const chunkFormData = new FormData();
      chunkFormData.append('file', chunk);
      chunkFormData.append('upload_id', upload_id);
      chunkFormData.append('part_number', i + 1);

      try {
        const chunkResponse = await axios.post(upload_url, chunkFormData, {
          timeout: 60000,
          signal: abortControllerRef.current?.signal,
          onUploadProgress: (progressEvent) => {
            // Calculate chunk-level progress
            const chunkProgress = Math.round((progressEvent.loaded * 100) / (progressEvent.total || chunk.size));
            const overallProgress = Math.round(((i * 100) + chunkProgress) / totalChunks);
            setUploadProgress(overallProgress);
          }
        });
        
        if (chunkResponse.data.etag) {
          etags.push({
            part_number: i + 1,
            etag: chunkResponse.data.etag
          });
        }

        // Update overall progress
        const progress = Math.round(((i + 1) / totalChunks) * 100);
        setUploadProgress(progress);

      } catch (error) {
        console.error(`Chunk ${i + 1} failed:`, error);
        throw new Error(`Failed to upload chunk ${i + 1}: ${error.message}`);
      }
    }

    // Step 3: Complete the upload
    setUploadStage('finalizing');
    
    const completeFormData = new FormData();
    completeFormData.append('upload_id', upload_id);
    completeFormData.append('signature', signature);
    completeFormData.append('timestamp', timestamp);
    completeFormData.append('public_id', public_id);
    completeFormData.append('api_key', api_key);

    if (etags.length > 0) {
      completeFormData.append('etags', JSON.stringify(etags));
    }

    const completeResponse = await axios.post(upload_url, completeFormData, {
      timeout: 30000,
      signal: abortControllerRef.current?.signal
    });
    
    if (!completeResponse.data.public_id) {
      throw new Error('Upload completion failed: No public_id received');
    }
    
    return completeResponse.data;
  };

  const onSubmit = async (data) => {
    if (!data.videoFile?.[0]) {
      setError('Please select a video file');
      return;
    }

    const file = data.videoFile[0];
    setUploading(true);
    setUploadProgress(0);
    setError("");
    setUploadedVideo(null);
    
    abortControllerRef.current = new AbortController();

    try {
      // Validate file size
      if (file.size > 1024 * 1024 * 1024) {
        throw new Error('File size exceeds 1GB limit');
      }

      // Determine upload type
      const isLargeFile = file.size > 100 * 1024 * 1024;
      
      let signatureResponse;
      if (isLargeFile) {
        signatureResponse = await axiosClient.get(`/video/create-large/${problemId}`, {
          params: {
            fileSize: file.size,
            fileName: file.name,
            fileType: file.type
          },
          timeout: 10000
        });
      } else {
        signatureResponse = await axiosClient.get(`/video/create/${problemId}`, {
          timeout: 10000
        });
      }

      if (!signatureResponse.data) {
        throw new Error('Failed to get upload signature from server');
      }

      const signatureData = signatureResponse.data;

      // Upload to Cloudinary
      let cloudinaryResult;
      if (isLargeFile) {
        cloudinaryResult = await uploadChunkedToCloudinary(file, signatureData);
      } else {
        setUploadStage('uploading');
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('signature', signatureData.signature);
        formData.append('timestamp', signatureData.timestamp);
        formData.append('public_id', signatureData.public_id);
        formData.append('api_key', signatureData.api_key);

        const uploadResponse = await axios.post(signatureData.upload_url, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          timeout: 300000, // 5 minutes for large files
          signal: abortControllerRef.current?.signal,
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setUploadProgress(progress);
            }
          },
        });

        if (!uploadResponse.data.secure_url) {
          throw new Error('Upload failed: No secure_url received from Cloudinary');
        }
        
        cloudinaryResult = uploadResponse.data;
      }

      // Wait for Cloudinary processing
      setUploadStage('processing');
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Save video metadata
      setUploadStage('saving_metadata');
      
      const metadataResponse = await axiosClient.post('/video/save', {
        problemId,
        cloudinaryPublicId: cloudinaryResult.public_id,
        secureUrl: cloudinaryResult.secure_url,
        duration: cloudinaryResult.duration,
        width: cloudinaryResult.width,
        height: cloudinaryResult.height,
        format: cloudinaryResult.format,
        bytes: cloudinaryResult.bytes,
      }, {
        timeout: 15000
      });

      if (!metadataResponse.data?.videoSolution) {
        throw new Error('Failed to save video metadata');
      }

      setUploadedVideo(metadataResponse.data.videoSolution);
      setExistingVideo(metadataResponse.data.videoSolution);
      reset();
      setUploadProgress(100);
      
      setTimeout(() => {
        setUploadProgress(0);
        setUploadStage('');
      }, 3000);

    } catch (err) {
      console.error('Upload error:', err);
      console.error('Error details:', {
        name: err.name,
        message: err.message,
        code: err.code,
        response: err.response?.data,
        status: err.response?.status
      });

      let errorMessage = 'Upload failed. Please try again.';
      
      if (err.name === 'AbortError' || err.message === 'Upload cancelled') {
        errorMessage = 'Upload was cancelled.';
      } else if (err.response?.status === 413) {
        errorMessage = 'File is too large. Maximum size is 1GB.';
      } else if (err.code === 'ERR_NETWORK') {
        errorMessage = 'Network error. Please check your connection.';
      } else if (err.code === 'ECONNABORTED') {
        errorMessage = 'Request timeout. Please try again.';
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      setUploadProgress(0);
      setUploadStage('');
    } finally {
      setUploading(false);
      abortControllerRef.current = null;
    }
  };

  const cancelUpload = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setUploading(false);
      setUploadProgress(0);
      setUploadStage('');
      setError('Upload cancelled.');
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDuration = (seconds) => {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStageText = (stage) => {
    switch(stage) {
      case 'initializing': return 'Initializing upload...';
      case 'uploading_chunks': return 'Uploading chunks...';
      case 'uploading': return 'Uploading file...';
      case 'processing': return 'Processing video...';
      case 'finalizing': return 'Finalizing upload...';
      case 'saving_metadata': return 'Saving video information...';
      default: return 'Processing...';
    }
  };

  // Debug log to see what's happening
  console.log('Component state:', {
    uploading,
    uploadProgress,
    uploadStage,
    error,
    selectedFile: selectedFile?.name
  });

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex justify-between items-center mb-4">
            <h2 className="card-title text-2xl">Upload Video Solution</h2>
            <div className="badge badge-primary">Problem #{problemId}</div>
          </div>

          <button
            className="btn btn-sm btn-ghost mb-6"
            onClick={() => navigate('/admin/video')}
          >
            ← Back to Videos
          </button>

          {/* Debug info - remove in production */}
          {process.env.NODE_ENV === 'development' && (
            <div className="alert alert-warning mb-4">
              <div className="flex-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="font-bold">Debug Info</h3>
                  <p>Stage: {uploadStage}</p>
                  <p>Progress: {uploadProgress}%</p>
                  <p>File: {selectedFile?.name}</p>
                </div>
              </div>
            </div>
          )}

          {/* Existing Video Warning */}
          {existingVideo && !uploadedVideo && (
            <div className="alert alert-warning mb-6">
              <div className="flex-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.962-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <div>
                  <h3 className="font-bold">Existing Video Found</h3>
                  <p className="text-sm">Uploading a new video will replace the existing one.</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* File Input */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-lg font-semibold">Choose video file</span>
              </label>
              <input
                type="file"
                accept="video/*"
                {...register('videoFile', { 
                  required: 'Please select a video file',
                  validate: {
                    maxSize: (file) => {
                      if (file[0]?.size > 1024 * 1024 * 1024) {
                        return 'File size must be less than 1GB';
                      }
                      return true;
                    }
                  }
                })}
                className={`file-input file-input-bordered file-input-primary w-full ${errors.videoFile ? 'file-input-error' : ''}`}
                disabled={uploading}
              />
              {errors.videoFile && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.videoFile.message}</span>
                </label>
              )}
            </div>

            {/* Selected File Info */}
            {selectedFile && !uploading && (
              <div className="alert alert-info shadow-lg">
                <div className="flex-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div>
                    <h3 className="font-bold">Selected File:</h3>
                    <p className="font-medium truncate">{selectedFile.name}</p>
                    <div className="text-sm mt-1 space-y-1">
                      <p><strong>Size:</strong> {formatFileSize(selectedFile.size)}</p>
                      <p><strong>Type:</strong> {selectedFile.type}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Upload Progress */}
            {uploading && (
              <div className="space-y-4 p-4 border rounded-lg bg-base-100">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-semibold">{getStageText(uploadStage)}</span>
                    {uploadStage === 'uploading_chunks' && (
                      <span className="text-sm text-gray-500 ml-2">
                        (Large file upload)
                      </span>
                    )}
                  </div>
                  <span className="font-bold text-lg">{uploadProgress}%</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-primary to-secondary h-4 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={cancelUpload}
                    className="btn btn-error btn-sm"
                    disabled={!uploading}
                  >
                    Cancel Upload
                  </button>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="alert alert-error shadow-lg">
                <div className="flex-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="font-bold">Error</h3>
                    <p className="break-words">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Upload Success */}
            {uploadedVideo && (
              <div className="alert alert-success shadow-lg">
                <div className="flex-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg">Upload Successful! 🎉</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <p><strong>Duration:</strong> {formatDuration(uploadedVideo.duration)}</p>
                      <p><strong>Size:</strong> {formatFileSize(uploadedVideo.bytes)}</p>
                      {uploadedVideo.width && uploadedVideo.height && (
                        <p><strong>Resolution:</strong> {uploadedVideo.width}×{uploadedVideo.height}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Upload Button */}
            <div className="card-actions justify-end">
              <button
                type="button"
                onClick={() => navigate('/admin/video')}
                className="btn btn-ghost"
                disabled={uploading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={uploading || !selectedFile || selectedFile?.size > 1024 * 1024 * 1024}
                className={`btn btn-primary ${uploading ? 'loading' : ''}`}
              >
                {uploading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Uploading...
                  </>
                ) : existingVideo ? (
                  'Replace Video'
                ) : (
                  'Upload Video'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminUpload;
