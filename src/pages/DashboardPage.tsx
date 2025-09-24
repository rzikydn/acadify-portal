import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Home,
  User,
  BookOpen,
  LogOut,
  BarChart3,
  Bell,
  Menu,
  X,
  Clock,
  Users,
  Target,
  Award,
  CheckCircle,
  AlertCircle,
  BookOpenCheck,
  Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeCourse, setActiveCourse] = useState<string | null>(null);

  const menuItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: User, label: 'Profile', active: false },
    { icon: BookOpen, label: 'Courses', active: false },
    { icon: LogOut, label: 'Logout', active: false },
  ];

  const courses = [
    { name: 'Database Systems', progress: 75, color: 'bg-blue-500' },
    { name: 'Web Programming', progress: 88, color: 'bg-green-500' },
    { name: 'Machine Learning', progress: 62, color: 'bg-purple-500' },
  ];

  const assignments = [
    { title: 'Database Design Project', due: 'Oct 18', priority: 'high' },
    { title: 'React Component Library', due: 'Oct 20', priority: 'medium' },
    { title: 'ML Model Implementation', due: 'Oct 25', priority: 'low' },
  ];

  const projects = [
    { name: 'E-Commerce Platform', status: 'In Progress', completion: 65 },
    { name: 'Data Analytics Dashboard', status: 'Review', completion: 90 },
    { name: 'Mobile App Prototype', status: 'Planning', completion: 25 },
  ];

  const studyHours = [
    { course: 'Database Systems', hours: 12, color: 'bg-blue-400' },
    { course: 'Web Programming', hours: 18, color: 'bg-green-400' },
    { course: 'Machine Learning', hours: 8, color: 'bg-purple-400' },
  ];

  const attendanceData = [
    { day: 'Monday', status: 'present', course: 'Database Systems' },
    { day: 'Tuesday', status: 'present', course: 'Web Programming' },
    { day: 'Wednesday', status: 'absent', course: 'Machine Learning' },
    { day: 'Thursday', status: 'present', course: 'Database Systems' },
    { day: 'Friday', status: 'present', course: 'Web Programming' },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const iconHoverVariants = {
    hover: { scale: 1.1, rotate: 3, transition: { duration: 0.2 } }
  };

  const cardHoverVariants = {
    hover: { 
      scale: 1.05, 
      rotate: 1,
      transition: { duration: 0.3 }
    }
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement logout logic here (e.g., clear auth tokens)
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* Sidebar */}
      <motion.div
        className={`${
          sidebarCollapsed ? 'w-64' : 'w-256'
        } bg-[#0f62c1] text-white h-screen fixed left-0 top-0 z-40 transition-all duration-300 shadow-xl`}
        initial={false}
        animate={{ width: sidebarCollapsed ? 94 : 256 }}
      >
        <div className="p-6">
          {/* Logo/Brand */}
          <div className="flex items-center justify-between mb-8">
            <motion.div
              className={`flex items-center space-x-3 ${sidebarCollapsed ? 'justify-center' : 'justify-start'}`}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              {!sidebarCollapsed && (
                <h1 className="text-2xl font-bold tracking-wide">ACADIFY</h1>
              )}
            </motion.div>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="lg:hidden  ml-0.5"
            >
              {sidebarCollapsed ? <Menu className="w-6 h-6" /> : <X className="w-6 h-6" />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {menuItems.map((item, index) => (
              <motion.a
                key={item.label}
                href="#"
                className={`flex items-center space-x-3 px-2.5 py-3 rounded-xl transition-all duration-200 ${
                  item.active
                    ? 'bg-blue-800/60 shadow-lg'
                    : 'hover:bg-blue-700/50'
                }`}
                whileHover="hover"
              >
                <motion.div variants={iconHoverVariants}>
                  <item.icon className="w-6 h-6" />
                </motion.div>
                {!sidebarCollapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </motion.a>
            ))}
          </nav>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className={`flex-1 ${sidebarCollapsed ? 'ml-20' : 'ml-64'} transition-all duration-300`}>
        {/* Header */}
        <motion.div
          className="bg-gray-200 shadow-md p-6 flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center space-x-4">
            <motion.div
              className="w-12 h-12 flex-shrink-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
        
            </motion.div>
            <div>
              <motion.h2
                className="text-2xl font-bold text-gray-800 cursor-pointer"
                whileHover={{ 
                  scale: 1.05,
                  textShadow: "0 0 8px rgba(15, 98, 193, 0.3)"
                }}
              >
                Hello, Wildan 👋
              </motion.h2>
              <p className="text-gray-500">Welcome back to Acadify Dashboard</p>
            </div>
          </div>
        </motion.div>

        {/* Dashboard Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Academic Status Card */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300"
              custom={0}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover={cardHoverVariants}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <motion.div
                    className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center"
                    variants={iconHoverVariants}
                    whileHover="hover"
                  >
                    <BarChart3 className="w-6 h-6 text-green-600" />
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Academic Status</h3>
                    <p className="text-gray-500 text-sm">Current Performance</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">GPA</span>
                  <span className="text-2xl font-bold text-green-600">3.75</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Credits</span>
                  <span className="text-2xl font-bold text-blue-600">90</span>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress to Graduation</span>
                    <span>75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-green-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '75%' }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Active Courses Card */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300"
              custom={1}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover={cardHoverVariants}
            >
              <div className="flex items-center space-x-3 mb-4">
                <motion.div
                  className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center"
                  variants={iconHoverVariants}
                  whileHover="hover"
                >
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </motion.div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Active Courses</h3>
                  <p className="text-gray-500 text-sm">{courses.length} courses enrolled</p>
                </div>
              </div>
              <div className="space-y-3">
                {courses.map((course, index) => (
                  <motion.div
                    key={course.name}
                    className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 + 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setActiveCourse(course.name)}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-800">{course.name}</span>
                      <span className="text-sm text-gray-500">{course.progress}%</span>
                    </div>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                      <motion.div
                        className={`${course.color} h-1.5 rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        transition={{ duration: 0.8, delay: index * 0.2 + 0.8 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Announcements Card */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 border-l-4 border-yellow-400"
              custom={2}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover={cardHoverVariants}
            >
              <div className="flex items-center space-x-3 mb-4">
                <motion.div
                  className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center"
                  variants={iconHoverVariants}
                  whileHover="hover"
                >
                  <Bell className="w-6 h-6 text-yellow-600 animate-pulse" />
                </motion.div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Announcements</h3>
                  <p className="text-gray-500 text-sm">Latest updates</p>
                </div>
              </div>
              <div className="space-y-3">
                <motion.div
                  className="p-4 bg-yellow-50 rounded-lg border-l-2 border-yellow-400"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-800">⚡ Midterm exams start on October 15</p>
                      <p className="text-sm text-gray-600 mt-1">Prepare for Database Systems and Web Programming exams</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Assignments Due Card - Elongated */}
            <motion.div
              className="md:col-span-2 bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 border-l-4 border-red-400"
              custom={3}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover={cardHoverVariants}
            >
              <div className="flex items-center space-x-3 mb-4">
                <motion.div
                  className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center"
                  variants={iconHoverVariants}
                  whileHover="hover"
                >
                  <CheckCircle className="w-6 h-6 text-red-600" />
                </motion.div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Assignments Due</h3>
                  <p className="text-gray-500 text-sm">Upcoming deadlines</p>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {assignments.map((assignment, index) => (
                  <motion.div
                    key={assignment.title}
                    className={`p-4 rounded-lg border-l-4 ${
                      assignment.priority === 'high' ? 'bg-red-50 border-red-400' :
                      assignment.priority === 'medium' ? 'bg-yellow-50 border-yellow-400' :
                      'bg-green-50 border-green-400'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-800">{assignment.title}</h4>
                      <Calendar className="w-4 h-4 text-gray-500" />
                    </div>
                    <p className="text-sm text-gray-600">Due: {assignment.due}</p>
                    <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                      assignment.priority === 'high' ? 'bg-red-200 text-red-800' :
                      assignment.priority === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                      'bg-green-200 text-green-800'
                    }`}>
                      {assignment.priority} priority
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Projects Card - Elongated */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 border-l-4 border-blue-400"
              custom={4}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover={cardHoverVariants}
            >
              <div className="flex items-center space-x-3 mb-4">
                <motion.div
                  className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center"
                  variants={iconHoverVariants}
                  whileHover="hover"
                >
                  <Target className="w-6 h-6 text-blue-600" />
                </motion.div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Active Projects</h3>
                  <p className="text-gray-500 text-sm">Current work progress</p>
                </div>
              </div>
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.name}
                    className="p-4 bg-blue-50 rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 + 1.2 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-gray-800">{project.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        project.status === 'In Progress' ? 'bg-blue-200 text-blue-800' :
                        project.status === 'Review' ? 'bg-yellow-200 text-yellow-800' :
                        'bg-gray-200 text-gray-800'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Progress</span>
                      <span>{project.completion}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="bg-blue-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${project.completion}%` }}
                        transition={{ duration: 1, delay: index * 0.2 + 1.5 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Study Hours Card - Elongated */}
            <motion.div
              className="md:col-span-2 bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 border-l-4 border-green-400"
              custom={5}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover={cardHoverVariants}
            >
              <div className="flex items-center space-x-3 mb-4">
                <motion.div
                  className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center"
                  variants={iconHoverVariants}
                  whileHover="hover"
                >
                  <Clock className="w-6 h-6 text-green-600" />
                </motion.div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Study Hours</h3>
                  <p className="text-gray-500 text-sm">Weekly breakdown by course</p>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {studyHours.map((item, index) => (
                  <motion.div
                    key={item.course}
                    className="p-4 bg-green-50 rounded-lg"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + 1.5 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <h4 className="font-semibold text-gray-800 mb-2">{item.course}</h4>
                    <div className="flex items-center space-x-2">
                      <div className={`w-4 h-4 ${item.color} rounded-full`}></div>
                      <span className="text-2xl font-bold text-gray-800">{item.hours}h</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">This week</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Attendance Card */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 border-l-4 border-purple-400"
              custom={6}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover={cardHoverVariants}
            >
              <div className="flex items-center space-x-3 mb-4">
                <motion.div
                  className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center"
                  variants={iconHoverVariants}
                  whileHover="hover"
                >
                  <Users className="w-6 h-6 text-purple-600" />
                </motion.div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Attendance</h3>
                  <p className="text-gray-500 text-sm">Weekly record</p>
                </div>
              </div>
              <div className="space-y-3">
                {attendanceData.map((record, index) => (
                  <motion.div
                    key={record.day}
                    className="flex items-center justify-between p-3 bg-purple-50 rounded-lg"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 1.8 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div>
                      <span className="font-medium text-gray-800">{record.day}</span>
                      <p className="text-sm text-gray-500">{record.course}</p>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${
                      record.status === 'present' ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;