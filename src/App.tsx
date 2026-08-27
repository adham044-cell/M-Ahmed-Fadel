import React, { useState, useEffect } from 'react';
import { PageView } from './types';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { PublicNavbar } from './components/PublicNavbar';
import { StudentNavbar } from './components/StudentNavbar';
import { AdminNavbar } from './components/AdminNavbar';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { StudentHomePage } from './pages/StudentHomePage';
import { AboutPage } from './pages/AboutPage';
import { CoursesPage } from './pages/CoursesPage';
import { MyCoursesPage } from './pages/MyCoursesPage';
import { CourseDetailsPage } from './pages/CourseDetailsPage';
import { ProfilePage } from './pages/ProfilePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

// Admin Pages
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminCoursesPage } from './pages/admin/AdminCoursesPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminLogsPage } from './pages/admin/AdminLogsPage';

// Floating WhatsApp Widget
import { MessageCircle } from 'lucide-react';

const AppContent: React.FC = () => {
  const { isAuthenticated, isAdmin, isStudent } = useAuth();
  
  // Initial page view: if logged in as student -> student-home, if admin -> admin-dashboard, else home
  const [currentPage, setCurrentPage] = useState<PageView>(() => {
    if (isAuthenticated) {
      return isAdmin ? 'admin-dashboard' : 'student-home';
    }
    return 'home';
  });

  const [activeCourseId, setActiveCourseId] = useState<string>('course-3rd-sec-comprehensive');

  // Scroll to top whenever page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Handle opening a specific course
  const handleOpenCourse = (courseId: string) => {
    setActiveCourseId(courseId);
    setCurrentPage('course-details');
  };

  // WhatsApp click handler
  const handleWhatsAppFloatingClick = () => {
    window.open('https://wa.me/+201018432929', '_blank', 'noopener,noreferrer');
  };

  // Determine which navbar to render
  const renderNavbar = () => {
    // Hide navbar on login / register page for clean distraction-free layout
    if (currentPage === 'login' || currentPage === 'register') {
      return null;
    }

    if (isAuthenticated) {
      if (isAdmin) {
        return <AdminNavbar currentPage={currentPage} onNavigate={setCurrentPage} />;
      }
      return <StudentNavbar currentPage={currentPage} onNavigate={setCurrentPage} />;
    }

    return <PublicNavbar currentPage={currentPage} onNavigate={setCurrentPage} />;
  };

  // Determine which page content to render
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return isAuthenticated && isStudent ? (
          <StudentHomePage onNavigate={setCurrentPage} onOpenCourse={handleOpenCourse} />
        ) : (
          <HomePage onNavigate={setCurrentPage} onOpenCourse={handleOpenCourse} />
        );

      case 'student-home':
        return <StudentHomePage onNavigate={setCurrentPage} onOpenCourse={handleOpenCourse} />;

      case 'about':
        return <AboutPage onNavigate={setCurrentPage} />;

      case 'courses':
        return <CoursesPage onNavigate={setCurrentPage} onOpenCourse={handleOpenCourse} />;

      case 'my-courses':
        return <MyCoursesPage onNavigate={setCurrentPage} onOpenCourse={handleOpenCourse} />;

      case 'course-details':
        return <CourseDetailsPage courseId={activeCourseId} onNavigate={setCurrentPage} />;

      case 'profile':
        return <ProfilePage onNavigate={setCurrentPage} onOpenCourse={handleOpenCourse} />;

      case 'login':
        return <LoginPage onNavigate={setCurrentPage} />;

      case 'register':
        return <RegisterPage onNavigate={setCurrentPage} />;

      case 'admin-dashboard':
        return <AdminDashboardPage onNavigate={setCurrentPage} onOpenCourse={handleOpenCourse} />;

      case 'admin-courses':
        return <AdminCoursesPage onNavigate={setCurrentPage} onOpenCourse={handleOpenCourse} />;

      case 'admin-users':
        return <AdminUsersPage onNavigate={setCurrentPage} />;

      case 'admin-logs':
        return <AdminLogsPage onNavigate={setCurrentPage} />;

      default:
        return <HomePage onNavigate={setCurrentPage} onOpenCourse={handleOpenCourse} />;
    }
  };

  const showFooter = currentPage !== 'login' && currentPage !== 'register';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-amber-500 selection:text-white">
      {/* Navigation Bar */}
      {renderNavbar()}

      {/* Main Content View */}
      <main className="flex-1">
        {renderPage()}
      </main>

      {/* Footer */}
      {showFooter && <Footer onNavigate={setCurrentPage} />}

      {/* Floating WhatsApp Quick Contact Button */}
      <button
        id="floating-whatsapp-btn"
        onClick={handleWhatsAppFloatingClick}
        className="fixed bottom-6 left-6 z-40 p-3.5 sm:p-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-2xl shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center group"
        aria-label="تواصل عبر الواتساب"
        title="تواصل مع مستر أحمد فاضل عبر واتساب: 01018432929"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:mr-2 transition-all duration-300 text-xs font-bold font-latin">
          01018432929
        </span>
      </button>
    </div>
  );
};

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ToastProvider>
  );
}
