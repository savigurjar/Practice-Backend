import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axiosClient from "../../utils/axiosClient";
import { 
  Search, 
  ArrowLeft, 
  Trash2, 
  Filter, 
  ChevronLeft, 
  ChevronRight,
  Eye,
  Mail,
  User,
  Shield,
  Crown,
  TrendingUp,
  Trophy,
  Calendar,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Code,
  Edit,
  RefreshCw,
  AlertTriangle,
  AlertCircle,
  ShieldAlert,
  PlusCircle,
  CheckCircle,
  XCircle,
  Save,
  X,
  Clock,
  Award,
  Activity,
  Key,
  Users,
  Zap
} from "lucide-react";

const AdminAllUsers = () => {
  const navigate = useNavigate();
  
  // Existing states
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewDialog, setViewDialog] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // New states for create user modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createUserData, setCreateUserData] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
    password: '',
    age: '',
    role: 'user'
  });
  const [createError, setCreateError] = useState('');
  const [createSuccess, setCreateSuccess] = useState('');

  // States for edit user modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUserData, setEditUserData] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
    age: '',
    role: 'user',
    socialProfiles: {
      github: '',
      linkedin: '',
      x: '',
      leetcode: ''
    }
  });
  const [editError, setEditError] = useState('');
  const [editSuccess, setEditSuccess] = useState('');

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage, refreshTrigger]);

  const fetchUsers = async (page = 1) => {
    try {
      setLoading(true);
      const { data } = await axiosClient.get(`/user/admin/users?page=${page}`, {
        withCredentials: true,
      });
      
      if (data.success) {
        setUsers(Array.isArray(data.users) ? data.users : []);
        setTotalUsers(data.totalUsers || 0);
        setTotalPages(data.totalPages || 1);
        setCurrentPage(data.currentPage || 1);
      } else {
        setError(data.message || "Failed to fetch users");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    setDeletingId(userId);
    setConfirmDelete(true);
    setDeleteInput("");
  };

  const confirmDeleteAction = async () => {
    if (deleteInput !== "DELETE") {
      alert('Please type "DELETE" to confirm');
      return;
    }

    try {
      await axiosClient.delete(`/user/admin/users/${deletingId}`, {
        withCredentials: true,
      });
      
      setUsers(prev => prev.filter(user => user._id !== deletingId));
      setTotalUsers(prev => prev - 1);
      setConfirmDelete(false);
      setDeletingId(null);
      setDeleteInput("");
      setRefreshTrigger(prev => prev + 1);
    } catch (err) {
      console.error(err);
      setError("Failed to delete user");
      setConfirmDelete(false);
      setDeletingId(null);
    }
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setViewDialog(true);
  };

  const handleEditUser = (user) => {
    setEditUserData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      emailId: user.emailId || '',
      age: user.age || '',
      role: user.role || 'user',
      socialProfiles: {
        github: user.socialProfiles?.github || '',
        linkedin: user.socialProfiles?.linkedin || '',
        x: user.socialProfiles?.x || '',
        leetcode: user.socialProfiles?.leetcode || ''
      }
    });
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleCreateUser = async () => {
    try {
      setCreateError('');
      setCreateSuccess('');
      
      // Basic validation
      if (!createUserData.firstName.trim() || !createUserData.emailId.trim() || !createUserData.password.trim()) {
        setCreateError('Please fill in all required fields (First Name, Email, Password)');
        return;
      }

      if (createUserData.password.length < 6) {
        setCreateError('Password must be at least 6 characters long');
        return;
      }

      const response = await axiosClient.post('/user/admin/register', createUserData, {
        withCredentials: true,
      });

      if (response.status === 201) {
        setCreateSuccess('User created successfully!');
        // Reset form
        setCreateUserData({
          firstName: '',
          lastName: '',
          emailId: '',
          password: '',
          age: '',
          role: 'user'
        });
        // Refresh users list
        setRefreshTrigger(prev => prev + 1);
        // Close modal after 2 seconds
        setTimeout(() => {
          setShowCreateModal(false);
          setCreateSuccess('');
        }, 2000);
      }
    } catch (err) {
      console.error('Error creating user:', err);
      setCreateError(err.response?.data || 'Failed to create user. Please try again.');
    }
  };

  const handleUpdateUser = async () => {
    try {
      setEditError('');
      setEditSuccess('');
      
      // Basic validation
      if (!editUserData.firstName.trim() || !editUserData.emailId.trim()) {
        setEditError('Please fill in all required fields (First Name, Email)');
        return;
      }

      const response = await axiosClient.put(`/user/admin/users/${selectedUser._id}`, editUserData, {
        withCredentials: true,
      });

      if (response.data.success) {
        setEditSuccess('User updated successfully!');
        // Refresh users list
        setRefreshTrigger(prev => prev + 1);
        // Close modal after 2 seconds
        setTimeout(() => {
          setShowEditModal(false);
          setEditSuccess('');
          setViewDialog(false);
        }, 2000);
      }
    } catch (err) {
      console.error('Error updating user:', err);
      setEditError(err.response?.data?.message || 'Failed to update user. Please try again.');
    }
  };

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      user?.firstName?.toLowerCase().includes(query) ||
      user?.lastName?.toLowerCase().includes(query) ||
      user?.emailId?.toLowerCase().includes(query) ||
      user?._id?.toLowerCase().includes(query);
    
    const matchesRole = 
      selectedRole === "All" || 
      user?.role?.toLowerCase() === selectedRole.toLowerCase();
    
    return matchesSearch && matchesRole;
  });

  const roleOptions = ["All", "Admin", "User"];

  // Calculate stats
  const stats = {
    totalUsers,
    totalAdmins: users.filter(u => u.role === 'admin').length,
    totalRegularUsers: users.filter(u => u.role === 'user').length,
    totalProblemsSolved: users.reduce((sum, user) => sum + (user.problemSolved?.length || 0), 0),
    totalPoints: users.reduce((sum, user) => sum + (user.totalPoints || 0), 0),
    averageStreak: users.reduce((sum, user) => sum + (user.currentStreak || 0), 0) / users.length || 0,
    totalActiveDays: users.reduce((sum, user) => sum + (user.totalActiveDays || 0), 0),
  };

  if (loading) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black">
        {/* Back Button */}
        <button
          onClick={() => navigate("/admin")}
          className="fixed top-6 left-6 z-50 flex items-center gap-2
          px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700
          bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm
          hover:bg-gray-50 dark:hover:bg-gray-700/80
          shadow-sm hover:shadow-md transition-all"
        >
          <ArrowLeft size={18} className="text-gray-700 dark:text-gray-300" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Back to Dashboard
          </span>
        </button>

        {/* Loading Spinner */}
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-b-blue-500 border-l-transparent border-r-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 font-medium">Loading users...</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Fetching user data</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black">
        {/* Back Button */}
        <button
          onClick={() => navigate("/admin")}
          className="fixed top-6 left-6 z-50 flex items-center gap-2
          px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700
          bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm
          hover:bg-gray-50 dark:hover:bg-gray-700/80
          shadow-sm hover:shadow-md transition-all"
        >
          <ArrowLeft size={18} className="text-gray-700 dark:text-gray-300" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Back to Dashboard
          </span>
        </button>

        {/* Error Message */}
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl border border-red-200 dark:border-red-800 p-8 shadow-lg">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="text-red-500 dark:text-red-400" size={32} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-3">
              Error Loading Users
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
              {error}
            </p>
            <button
              onClick={() => fetchUsers(1)}
              className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
            >
              Retry Loading
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black">
      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-red-200 dark:border-red-800 max-w-md w-full p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                <AlertTriangle className="text-red-500 dark:text-red-400" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Delete User Account</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">This action cannot be undone</p>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                Are you sure you want to delete this user account? All user data including stats, progress, and submissions will be permanently removed.
              </p>
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mt-4">
                <p className="text-sm text-red-700 dark:text-red-300 font-medium">
                  ⚠️ Warning: Admin accounts cannot be deleted.
                </p>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Type <span className="font-bold text-red-600 dark:text-red-400">DELETE</span> to confirm
              </label>
              <input
                type="text"
                value={deleteInput}
                onChange={(e) => setDeleteInput(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 
                  rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition
                  text-gray-900 dark:text-white"
                placeholder="Type DELETE here"
              />
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setConfirmDelete(false);
                  setDeletingId(null);
                  setDeleteInput("");
                }}
                className="flex-1 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 
                  text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteAction}
                disabled={deleteInput !== "DELETE"}
                className={`flex-1 py-2.5 font-medium rounded-lg transition-colors
                  ${deleteInput === "DELETE" 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-red-300 dark:bg-red-800/50 text-white/70 dark:text-gray-500 cursor-not-allowed'
                  }`}
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-green-200 dark:border-green-800 max-w-md w-full p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <PlusCircle className="text-green-500 dark:text-green-400" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Create New User</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Add a new user to the system</p>
              </div>
            </div>

            {/* Success Message */}
            {createSuccess && (
              <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="flex items-center gap-2 text-green-800 dark:text-green-300">
                  <CheckCircle size={18} />
                  <span>{createSuccess}</span>
                </div>
              </div>
            )}

            {/* Error Message */}
            {createError && (
              <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex items-center gap-2 text-red-800 dark:text-red-300">
                  <XCircle size={18} />
                  <span>{createError}</span>
                </div>
              </div>
            )}

            <form onSubmit={(e) => { e.preventDefault(); handleCreateUser(); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={createUserData.firstName}
                    onChange={(e) => setCreateUserData({...createUserData, firstName: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 
                      rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition
                      text-gray-900 dark:text-white"
                    placeholder="John"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={createUserData.lastName}
                    onChange={(e) => setCreateUserData({...createUserData, lastName: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 
                      rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition
                      text-gray-900 dark:text-white"
                    placeholder="Doe"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    required
                    value={createUserData.emailId}
                    onChange={(e) => setCreateUserData({...createUserData, emailId: e.target.value})}
                    className="w-full pl-10 pr-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 
                      rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition
                      text-gray-900 dark:text-white"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password *
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="password"
                    required
                    value={createUserData.password}
                    onChange={(e) => setCreateUserData({...createUserData, password: e.target.value})}
                    className="w-full pl-10 pr-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 
                      rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition
                      text-gray-900 dark:text-white"
                    placeholder="••••••••"
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Password must be at least 6 characters long
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Age */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    value={createUserData.age}
                    onChange={(e) => setCreateUserData({...createUserData, age: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 
                      rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition
                      text-gray-900 dark:text-white"
                    min="1"
                    max="120"
                    placeholder="25"
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Role
                  </label>
                  <select
                    value={createUserData.role}
                    onChange={(e) => setCreateUserData({...createUserData, role: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 
                      rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition
                      text-gray-900 dark:text-white"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-6">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>Note:</strong> New users will start with 0 points, 0 streak, and empty problem history.
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setCreateError('');
                    setCreateSuccess('');
                  }}
                  className="flex-1 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 
                    text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors
                    flex items-center justify-center gap-2"
                >
                  <PlusCircle size={18} />
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-blue-200 dark:border-blue-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <Edit className="text-blue-500 dark:text-blue-400" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Edit User</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Update user information</p>
                </div>
              </div>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X size={24} />
              </button>
            </div>

            {/* Success Message */}
            {editSuccess && (
              <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="flex items-center gap-2 text-green-800 dark:text-green-300">
                  <CheckCircle size={18} />
                  <span>{editSuccess}</span>
                </div>
              </div>
            )}

            {/* Error Message */}
            {editError && (
              <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex items-center gap-2 text-red-800 dark:text-red-300">
                  <XCircle size={18} />
                  <span>{editError}</span>
                </div>
              </div>
            )}

            <form onSubmit={(e) => { e.preventDefault(); handleUpdateUser(); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editUserData.firstName}
                    onChange={(e) => setEditUserData({...editUserData, firstName: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 
                      rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition
                      text-gray-900 dark:text-white"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={editUserData.lastName}
                    onChange={(e) => setEditUserData({...editUserData, lastName: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 
                      rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition
                      text-gray-900 dark:text-white"
                  />
                </div>

                {/* Email */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="email"
                      required
                      value={editUserData.emailId}
                      onChange={(e) => setEditUserData({...editUserData, emailId: e.target.value})}
                      className="w-full pl-10 pr-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 
                        rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition
                        text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Age */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    value={editUserData.age}
                    onChange={(e) => setEditUserData({...editUserData, age: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 
                      rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition
                      text-gray-900 dark:text-white"
                    min="1"
                    max="120"
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Role
                  </label>
                  <select
                    value={editUserData.role}
                    onChange={(e) => setEditUserData({...editUserData, role: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 
                      rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition
                      text-gray-900 dark:text-white"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                {/* Social Profiles */}
                <div className="md:col-span-2">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Social Profiles</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                        GitHub
                      </label>
                      <div className="relative">
                        <Github className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          type="url"
                          value={editUserData.socialProfiles.github}
                          onChange={(e) => setEditUserData({
                            ...editUserData,
                            socialProfiles: {...editUserData.socialProfiles, github: e.target.value}
                          })}
                          className="w-full pl-10 pr-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 
                            rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition
                            text-gray-900 dark:text-white text-sm"
                          placeholder="https://github.com/username"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                        LinkedIn
                      </label>
                      <div className="relative">
                        <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          type="url"
                          value={editUserData.socialProfiles.linkedin}
                          onChange={(e) => setEditUserData({
                            ...editUserData,
                            socialProfiles: {...editUserData.socialProfiles, linkedin: e.target.value}
                          })}
                          className="w-full pl-10 pr-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 
                            rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition
                            text-gray-900 dark:text-white text-sm"
                          placeholder="https://linkedin.com/in/username"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                        Twitter/X
                      </label>
                      <div className="relative">
                        <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          type="url"
                          value={editUserData.socialProfiles.x}
                          onChange={(e) => setEditUserData({
                            ...editUserData,
                            socialProfiles: {...editUserData.socialProfiles, x: e.target.value}
                          })}
                          className="w-full pl-10 pr-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 
                            rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition
                            text-gray-900 dark:text-white text-sm"
                          placeholder="https://twitter.com/username"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                        LeetCode
                      </label>
                      <div className="relative">
                        <Code className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          type="url"
                          value={editUserData.socialProfiles.leetcode}
                          onChange={(e) => setEditUserData({
                            ...editUserData,
                            socialProfiles: {...editUserData.socialProfiles, leetcode: e.target.value}
                          })}
                          className="w-full pl-10 pr-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 
                            rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition
                            text-gray-900 dark:text-white text-sm"
                          placeholder="https://leetcode.com/username"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Note */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 mb-6">
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  <strong>Note:</strong> User statistics (points, streak, solved problems) cannot be edited manually.
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 
                    text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors
                    flex items-center justify-center gap-2"
                >
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* User Details Modal */}
      {viewDialog && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                    {selectedUser.firstName?.[0]}{selectedUser.lastName?.[0]}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {selectedUser.firstName} {selectedUser.lastName || ''}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
                      <Mail size={14} />
                      {selectedUser.emailId}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                        ${selectedUser.role === "admin"
                          ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                        }`}>
                        {selectedUser.role === "admin" ? <Shield size={12} className="mr-1" /> : <User size={12} className="mr-1" />}
                        {selectedUser.role}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <Calendar size={12} />
                        Joined: {new Date(selectedUser.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setViewDialog(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column - Basic Info */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Basic Information</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">User ID</label>
                      <div className="px-3 py-2 bg-gray-50 dark:bg-gray-900 rounded-lg text-sm font-mono text-gray-800 dark:text-gray-200 break-all">
                        {selectedUser._id}
                      </div>
                    </div>
                    
                    {selectedUser.age && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Age</label>
                        <div className="px-3 py-2 bg-gray-50 dark:bg-gray-900 rounded-lg text-gray-800 dark:text-gray-200">
                          {selectedUser.age}
                        </div>
                      </div>
                    )}

                    {/* Social Profiles */}
                    {(selectedUser.socialProfiles?.github || selectedUser.socialProfiles?.linkedin || selectedUser.socialProfiles?.x || selectedUser.socialProfiles?.leetcode) && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Social Profiles</label>
                        <div className="flex flex-wrap gap-2">
                          {selectedUser.socialProfiles.github && (
                            <a href={selectedUser.socialProfiles.github} target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors">
                              <Github size={14} />
                              GitHub
                            </a>
                          )}
                          {selectedUser.socialProfiles.linkedin && (
                            <a href={selectedUser.socialProfiles.linkedin} target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                              <Linkedin size={14} />
                              LinkedIn
                            </a>
                          )}
                          {selectedUser.socialProfiles.x && (
                            <a href={selectedUser.socialProfiles.x} target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-3 py-1.5 bg-black hover:bg-gray-800 text-white rounded-lg transition-colors">
                              <Twitter size={14} />
                              Twitter
                            </a>
                          )}
                          {selectedUser.socialProfiles.leetcode && (
                            <a href={selectedUser.socialProfiles.leetcode} target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors">
                              <Code size={14} />
                              LeetCode
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column - Stats */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance Stats</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{selectedUser.totalPoints || 0}</div>
                      <div className="text-sm text-blue-700 dark:text-blue-300 font-medium flex items-center gap-1">
                        <Award size={14} />
                        Total Points
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/10 rounded-xl p-4 border border-green-200 dark:border-green-800">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">{selectedUser.problemSolved?.length || 0}</div>
                      <div className="text-sm text-green-700 dark:text-green-300 font-medium flex items-center gap-1">
                        <Trophy size={14} />
                        Problems Solved
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/10 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{selectedUser.currentStreak || 0}</div>
                      <div className="text-sm text-purple-700 dark:text-purple-300 font-medium flex items-center gap-1">
                        <Zap size={14} />
                        Current Streak
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-900/10 rounded-xl p-4 border border-orange-200 dark:border-orange-800">
                      <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{selectedUser.maxStreak || 0}</div>
                      <div className="text-sm text-orange-700 dark:text-orange-300 font-medium flex items-center gap-1">
                        <TrendingUp size={14} />
                        Max Streak
                      </div>
                    </div>
                  </div>

                  {/* Additional Stats */}
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">{selectedUser.totalActiveDays || 0}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Active Days</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {selectedUser.streakHistory?.length || 0}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Streak Entries</div>
                    </div>
                  </div>

                  {/* Solved Problems */}
                  {selectedUser.problemSolved && selectedUser.problemSolved.length > 0 && (
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Recently Solved Problems
                      </label>
                      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 max-h-40 overflow-y-auto">
                        <div className="flex flex-wrap gap-1">
                          {selectedUser.problemSolved.slice(0, 10).map((problemId, index) => (
                            <span key={index} className="px-2 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-xs">
                              Problem {index + 1}
                            </span>
                          ))}
                          {selectedUser.problemSolved.length > 10 && (
                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs text-gray-600 dark:text-gray-400">
                              +{selectedUser.problemSolved.length - 10} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <a
                  href={`mailto:${selectedUser.emailId}`}
                  className="flex-1 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Mail size={18} />
                  Send Email
                </a>
                <button
                  onClick={() => {
                    setViewDialog(false);
                    handleEditUser(selectedUser);
                  }}
                  className="flex-1 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Edit size={18} />
                  Edit User
                </button>
                <button
                  onClick={() => setViewDialog(false)}
                  className="flex-1 py-2.5 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Back Button */}
      <button
        onClick={() => navigate("/admin")}
        className="fixed top-6 left-6 z-40 flex items-center gap-2
        px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700
        bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm
        hover:bg-gray-50 dark:hover:bg-gray-700/80
        shadow-sm hover:shadow-md transition-all duration-200"
      >
        <ArrowLeft size={18} className="text-gray-700 dark:text-gray-300" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Back to Dashboard
        </span>
      </button>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 pt-20 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                User Management
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Manage all registered users and their accounts
              </p>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 
              border border-blue-200 dark:border-blue-800 px-4 py-2 rounded-lg">
              <ShieldAlert size={14} className="inline mr-2" />
              Administrator Mode • {totalUsers} total users
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <Users className="text-blue-600 dark:text-blue-400" size={20} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalUsers}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Total Users</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                  <Shield className="text-red-600 dark:text-red-400" size={20} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalAdmins}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Admins</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <Trophy className="text-green-600 dark:text-green-400" size={20} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalProblemsSolved}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Problems Solved</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <Activity className="text-purple-600 dark:text-purple-400" size={20} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalPoints}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Total Points</div>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters Bar */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-6 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-end">
              {/* Search Input */}
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search users by name or email..."
                  className="w-full h-[44px] pl-10 pr-4 bg-gray-50 dark:bg-gray-900 
                    border border-gray-200 dark:border-gray-700 
                    rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                    outline-none transition text-gray-900 dark:text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Role Filter */}
              <div className="flex flex-wrap gap-2">
                {roleOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setSelectedRole(option)}
                    className={`h-[44px] px-4 rounded-lg text-sm font-medium transition-colors
                      ${selectedRole === option
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {/* Refresh Button */}
              <button
                onClick={handleRefresh}
                className="h-[44px] px-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 
                  text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                <RefreshCw size={18} />
                Refresh Users
              </button>

              {/* Create New User Button */}
              <button
                onClick={() => setShowCreateModal(true)}
                className="h-[44px] px-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 
                  text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                <PlusCircle size={18} />
                Create New User
              </button>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Stats
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                          <User className="text-gray-400" size={24} />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          No Users Found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 max-w-md">
                          {searchQuery || selectedRole !== "All" 
                            ? "No users match your search criteria. Try adjusting your filters."
                            : "No users found in the system."
                          }
                        </p>
                        {users.length === 0 && (
                          <button
                            onClick={() => setShowCreateModal(true)}
                            className="mt-4 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors"
                          >
                            Create First User
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr 
                      key={user._id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                            {user.firstName?.[0]}{user.lastName?.[0]}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {user.firstName} {user.lastName || ''}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                              <Mail size={12} />
                              {user.emailId}
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                          ${user.role === "admin"
                            ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                          }`}>
                          {user.role === "admin" ? <Shield size={12} className="mr-1" /> : <User size={12} className="mr-1" />}
                          {user.role}
                        </span>
                      </td>
                      
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Trophy size={12} className="text-yellow-500" />
                            <span className="text-sm">{user.problemSolved?.length || 0} solved</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Crown size={12} className="text-purple-500" />
                            <span className="text-sm">{user.totalPoints || 0} points</span>
                          </div>
                          {user.currentStreak > 0 && (
                            <div className="flex items-center gap-2">
                              <TrendingUp size={12} className="text-green-500" />
                              <span className="text-sm">{user.currentStreak} day streak</span>
                            </div>
                          )}
                        </div>
                      </td>
                      
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                          <Calendar size={14} />
                          {new Date(user.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewUser(user)}
                            className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 
                              text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                          >
                            <Eye size={14} />
                            View
                          </button>
                          <button
                            onClick={() => handleEditUser(user)}
                            className="px-3 py-1.5 bg-gray-500 hover:bg-gray-600 
                              text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                          >
                            <Edit size={14} />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user._id, `${user.firstName} ${user.lastName}`)}
                            disabled={user.role === 'admin'}
                            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors flex items-center gap-2
                              ${user.role === 'admin'
                                ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                                : 'bg-red-500 hover:bg-red-600 text-white'
                              }`}
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Page {currentPage} of {totalPages} • {users.length} users showing
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors
                  ${currentPage === 1
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
              >
                <ChevronLeft size={18} />
                Previous
              </button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return pageNum <= totalPages ? (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 rounded-lg font-medium transition-colors
                        ${currentPage === pageNum
                          ? 'bg-blue-500 text-white'
                          : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                    >
                      {pageNum}
                    </button>
                  ) : null;
                })}
              </div>
              
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors
                  ${currentPage === totalPages
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
              >
                Next
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Guidelines Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 
          rounded-2xl border border-blue-100 dark:border-gray-700 p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <Shield className="text-blue-500 dark:text-blue-400" size={28} />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                User Management Guidelines
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                  <span>Admins cannot be deleted - modify their role to "user" first if needed</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                  <span>New users start with default statistics (0 points, 0 streak)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                  <span>Review user activity before taking administrative actions</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                  <span>Use the "View" option to see complete user statistics before editing</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <PlusCircle size={18} />
                Create New User
              </button>
              <button
                onClick={handleRefresh}
                className="px-4 py-2.5 bg-transparent border border-gray-300 dark:border-gray-600 
                  text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 
                  font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw size={18} />
                Refresh List
              </button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>👑 You are viewing and managing all user accounts in the system. Total {totalUsers} users registered.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminAllUsers;