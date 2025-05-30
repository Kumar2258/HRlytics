import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Edit,
  Camera,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Plus,
  Trash2
} from 'lucide-react';
import { useUser } from '../../context/UserContext';

const UserProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { userInfo, updateUserInfo } = useUser();

  // Mouse position for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);
  const springConfig = { stiffness: 100, damping: 30 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleSave = () => {
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    updateUserInfo({ [field]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateUserInfo({ avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      updateUserInfo({
        skills: [...userInfo.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    updateUserInfo({
      skills: userInfo.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const handleAddAchievement = () => {
    updateUserInfo({
      achievements: [...userInfo.achievements, 'New Achievement']
    });
  };

  const handleRemoveAchievement = (index: number) => {
    updateUserInfo({
      achievements: userInfo.achievements.filter((_, i) => i !== index)
    });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Success Notification */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-4 right-4 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 z-50"
            >
              <CheckCircle className="w-5 h-5" />
              Profile updated successfully!
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <motion.div
          variants={cardVariants}
          className="flex justify-between items-center bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            User Profile
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            className={`px-6 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all duration-200 ${
              isEditing
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
            }`}
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4" /> Save Changes
              </>
            ) : (
              <>
                <Edit className="w-4 h-4" /> Edit Profile
              </>
            )}
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card with 3D effect */}
          <motion.div
            variants={cardVariants}
            className="lg:col-span-1 space-y-6"
            style={{
              perspective: 2000
            }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
              style={{
                rotateX: springRotateX,
                rotateY: springRotateY
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative w-40 h-40 mx-auto mb-6 group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative w-full h-full rounded-full overflow-hidden"
                >
                  <img
                    src={userInfo.avatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                  {isEditing && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      whileHover={{ opacity: 0.9 }}
                      className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Camera className="w-8 h-8 text-white" />
                    </motion.div>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </motion.div>
              </div>
              <div className="text-center space-y-3">
                {isEditing ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative"
                  >
                    <input
                      type="text"
                      value={userInfo.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="text-xl font-bold text-center w-full bg-transparent border-b-2 border-blue-500 dark:border-blue-400 focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 px-2 py-1 text-gray-900 dark:text-white"
                      placeholder="Enter your name"
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 dark:bg-blue-400"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                ) : (
                  <motion.h3
                    whileHover={{ scale: 1.02 }}
                    className="text-xl font-bold text-gray-900 dark:text-white"
                  >
                    {userInfo.name}
                  </motion.h3>
                )}
                {isEditing ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative"
                  >
                    <input
                      type="text"
                      value={userInfo.role}
                      onChange={(e) => handleInputChange('role', e.target.value)}
                      className="text-blue-600 dark:text-blue-400 font-medium text-center w-full bg-transparent border-b-2 border-blue-500 dark:border-blue-400 focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 px-2 py-1"
                      placeholder="Enter your role"
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 dark:bg-blue-400"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                ) : (
                  <p className="text-blue-600 dark:text-blue-400 font-medium">
                    {userInfo.role}
                  </p>
                )}
              </div>
            </motion.div>

            {/* Skills Card */}
            <motion.div
              variants={cardVariants}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
            >
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {userInfo.skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="group relative"
                  >
                    <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm inline-flex items-center">
                      {skill}
                      {isEditing && (
                        <motion.button
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          onClick={() => handleRemoveSkill(skill)}
                          className="ml-2 text-red-500 hover:text-red-600"
                        >
                          <X className="w-3 h-3" />
                        </motion.button>
                      )}
                    </span>
                  </motion.div>
                ))}
              </div>
              {isEditing && (
                <div className="mt-4 flex gap-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add new skill"
                    className="flex-1 px-3 py-1 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddSkill}
                    className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                </div>
              )}
            </motion.div>
          </motion.div>

          {/* Details Cards */}
          <motion.div
            variants={cardVariants}
            className="lg:col-span-2 space-y-6"
          >
            {/* Personal Information */}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Personal Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoField
                  icon={<Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                  label="Email"
                  value={userInfo.email}
                  isEditing={isEditing}
                  onChange={(value) => handleInputChange('email', value)}
                  bgColor="bg-blue-50 dark:bg-blue-900/20"
                />
                <InfoField
                  icon={<Phone className="w-5 h-5 text-green-600 dark:text-green-400" />}
                  label="Phone"
                  value={userInfo.phone}
                  isEditing={isEditing}
                  onChange={(value) => handleInputChange('phone', value)}
                  bgColor="bg-green-50 dark:bg-green-900/20"
                />
                <InfoField
                  icon={<MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
                  label="Location"
                  value={userInfo.location}
                  isEditing={isEditing}
                  onChange={(value) => handleInputChange('location', value)}
                  bgColor="bg-purple-50 dark:bg-purple-900/20"
                />
                <InfoField
                  icon={<Briefcase className="w-5 h-5 text-orange-600 dark:text-orange-400" />}
                  label="Department"
                  value={userInfo.department}
                  isEditing={isEditing}
                  onChange={(value) => handleInputChange('department', value)}
                  bgColor="bg-orange-50 dark:bg-orange-900/20"
                />
              </div>
            </motion.div>

            {/* Bio */}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Bio
              </h4>
              {isEditing ? (
                <textarea
                  value={userInfo.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  className="w-full h-32 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-blue-500 outline-none"
                />
              ) : (
                <p className="text-gray-600 dark:text-gray-300">{userInfo.bio}</p>
              )}
            </motion.div>

            {/* Achievements */}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Key Achievements
              </h4>
              <div className="space-y-3">
                {userInfo.achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                    {isEditing ? (
                      <div className="flex-1 flex items-center gap-2">
                        <input
                          type="text"
                          value={achievement}
                          onChange={(e) => {
                            const newAchievements = [...userInfo.achievements];
                            newAchievements[index] = e.target.value;
                            updateUserInfo({ achievements: newAchievements });
                          }}
                          className="flex-1 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 outline-none"
                        />
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleRemoveAchievement(index)}
                          className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-300">{achievement}</p>
                    )}
                  </motion.div>
                ))}
                {isEditing && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddAchievement}
                    className="text-blue-600 dark:text-blue-400 flex items-center gap-2 mt-4"
                  >
                    <Plus className="w-4 h-4" />
                    Add Achievement
                  </motion.button>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

interface InfoFieldProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  isEditing: boolean;
  onChange: (value: string) => void;
  bgColor: string;
}

const InfoField: React.FC<InfoFieldProps> = ({
  icon,
  label,
  value,
  isEditing,
  onChange,
  bgColor
}) => (
  <motion.div 
    className="flex items-center gap-3"
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className={`p-2 ${bgColor} rounded-lg`}>
      {icon}
    </div>
    <div className="flex-1">
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      {isEditing ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 outline-none text-gray-900 dark:text-white"
        />
      ) : (
        <p className="text-gray-900 dark:text-white">{value}</p>
      )}
    </div>
  </motion.div>
);

export default UserProfile; 