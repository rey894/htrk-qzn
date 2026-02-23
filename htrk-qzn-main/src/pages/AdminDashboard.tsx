import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SEOHelmet } from "@/components/seo/SEOHelmet";
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Calendar, 
  Download, 
  MessageSquare, 
  Users, 
  LogOut,
  Settings,
  BarChart3,
  Upload,
  Image as ImageIcon,
  Menu,
  X,
  Home,
  ChevronRight,
  Navigation2,
  Globe
} from 'lucide-react';
import { NewsManager } from '@/components/admin/NewsManager';
import { EventsManager } from '@/components/admin/EventsManager';
import { DocumentsManager } from '@/components/admin/DocumentsManager';
import { ContactManager } from '@/components/admin/ContactManager';
import { DashboardStats } from '@/components/admin/DashboardStats';
import { BACDocumentManager } from '@/components/admin/BACDocumentManager';
import { UserManager } from '@/components/admin/UserManager';
import { SettingsManager } from '@/components/admin/SettingsManager';
import { MediaManager } from '@/components/admin/MediaManager';
import { NavigationManager } from '@/components/admin/NavigationManager';
import { PageManager } from '@/components/admin/PageManager';

type MenuItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  adminOnly?: boolean;
};

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="h-5 w-5" /> },
  { id: 'navigation', label: 'Navigation', icon: <Navigation2 className="h-5 w-5" />, adminOnly: true },
  { id: 'pages', label: 'Pages', icon: <Globe className="h-5 w-5" />, adminOnly: true },
  { id: 'news', label: 'News', icon: <FileText className="h-5 w-5" />, adminOnly: true },
  { id: 'events', label: 'Events', icon: <Calendar className="h-5 w-5" />, adminOnly: true },
  { id: 'documents', label: 'Documents', icon: <Download className="h-5 w-5" />, adminOnly: true },
  { id: 'media', label: 'Media', icon: <ImageIcon className="h-5 w-5" />, adminOnly: true },
  { id: 'contacts', label: 'Messages', icon: <MessageSquare className="h-5 w-5" />, adminOnly: true },
  { id: 'users', label: 'Users', icon: <Users className="h-5 w-5" />, adminOnly: true },
  { id: 'settings', label: 'Settings', icon: <Settings className="h-5 w-5" />, adminOnly: true },
  { id: 'bac-documents', label: 'BAC Documents', icon: <Upload className="h-5 w-5" /> },
];

export default function AdminDashboard() {
  const { user, profile, signOut, loading, isAdmin, isBAC } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState(() => {
    // Get initial tab from URL hash or default
    const hash = location.hash.replace('#', '');
    if (hash && menuItems.some(item => item.id === hash)) {
      return hash;
    }
    // Default to dashboard for admin, bac-documents for others
    // Don't use isAdmin here as it might not be loaded yet
    return 'dashboard';
  });

  useEffect(() => {
    // Only redirect if loading is complete and user doesn't have access
    // Don't redirect while loading - let the user see the loading screen
    if (!loading && !user) {
      // No user - redirect to auth
      if (location.pathname !== '/auth') {
        navigate('/auth', { replace: true });
      }
    }
    // Don't check roles immediately - let the component render and show loading
    // The component will handle showing/redirecting based on roles once they're loaded
  }, [user, loading, navigate, location.pathname]);

  // Update active tab when hash changes
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && menuItems.some(item => item.id === hash)) {
      setActiveTab(hash);
    }
  }, [location.hash]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth', { replace: true });
  };

  const handleMenuClick = (itemId: string) => {
    setActiveTab(itemId);
    navigate(`/admin#${itemId}`, { replace: true });
  };

  // Filter menu items based on user role
  const visibleMenuItems = menuItems.filter(item => {
    if (item.adminOnly && !isAdmin) return false;
    return true;
  });

  // Add timeout to prevent infinite loading
  useEffect(() => {
    if (loading) {
      const timeout = setTimeout(() => {
        console.warn('Loading timeout - forcing loading to complete');
        // This is a fallback - the actual fix is in useAuth
      }, 10000); // 10 second timeout
      return () => clearTimeout(timeout);
    }
  }, [loading]);

  // Show loading only while actually loading
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f0f0f1] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#2271b1] border-t-transparent mx-auto"></div>
          <p className="mt-4 text-[#3c434a] text-lg">Loading dashboard...</p>
          <p className="mt-2 text-sm text-[#646970]">Please wait...</p>
        </div>
      </div>
    );
  }

  // After loading completes, check access
  if (!user) {
    // No user - redirect will happen in useEffect
    return null;
  }

  // User exists but doesn't have admin or BAC access
  if (!isAdmin && !isBAC) {
    return (
      <div className="min-h-screen bg-[#f0f0f1] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-white rounded-lg shadow-sm border border-[#c3c4c7] p-8">
            <h2 className="text-2xl font-semibold text-[#1d2327] mb-4">Access Denied</h2>
            <p className="text-[#646970] mb-6">
              You don't have permission to access the admin dashboard. Please contact an administrator if you believe this is an error.
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => navigate('/')}
                className="bg-[#2271b1] hover:bg-[#135e96]"
              >
                Go to Home
              </Button>
              <Button
                onClick={handleSignOut}
                variant="outline"
                className="border-[#c3c4c7]"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHelmet
        title="Admin Dashboard"
        description="Content management system for the municipal website"
        noindex={true}
      />
      
      <div className="min-h-screen bg-[#f0f0f1] flex">
        {/* WordPress-style Sidebar */}
        <aside 
          className={`bg-[#23282d] text-white transition-all duration-300 ease-in-out ${
            sidebarOpen ? 'w-64' : 'w-20'
          } fixed left-0 top-0 h-full z-40 overflow-y-auto`}
        >
          {/* Sidebar Header */}
          <div className="h-32 bg-[#1d2327] border-b border-[#3c434a] flex items-center justify-between px-4">
            {sidebarOpen ? (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#2271b1] rounded flex items-center justify-center">
                  <Home className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-sm font-semibold text-white">Quezon Admin</h1>
                  <p className="text-xs text-[#a7aaad]">Municipality CMS</p>
                </div>
              </div>
            ) : (
              <div className="w-8 h-8 bg-[#2271b1] rounded flex items-center justify-center mx-auto">
                <Home className="h-5 w-5 text-white" />
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-[#a7aaad] hover:text-white transition-colors p-1"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="py-4">
            {visibleMenuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className={`w-full flex items-center px-4 py-3 text-left transition-colors ${
                    isActive
                      ? 'bg-[#2271b1] text-white border-l-4 border-[#72aee6]'
                      : 'text-[#a7aaad] hover:bg-[#2c3338] hover:text-white'
                  }`}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {sidebarOpen && (
                    <span className="ml-3 text-sm font-medium">{item.label}</span>
                  )}
                  {isActive && sidebarOpen && (
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* User Info at Bottom */}
          {sidebarOpen && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#1d2327] border-t border-[#3c434a]">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-[#2271b1] rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {(profile?.full_name || profile?.email || 'U').charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {profile?.full_name || 'Admin User'}
                  </p>
                  <p className="text-xs text-[#a7aaad] truncate">
                    {profile?.email || user.email}
                  </p>
                </div>
              </div>
              <Button
                onClick={handleSignOut}
                variant="ghost"
                className="w-full justify-start text-[#a7aaad] hover:text-white hover:bg-[#2c3338]"
                size="sm"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          )}
        </aside>

        {/* Main Content Area */}
        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
          {/* WordPress-style Top Bar */}
          <header className="bg-white border-b border-[#c3c4c7] h-32 sticky top-0 z-30 shadow-sm">
            <div className="h-full flex items-center justify-between px-6">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-semibold text-[#1d2327]">
                  {menuItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
                </h2>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => navigate('/')}
                  className="border-[#c3c4c7] text-[#2c3338] hover:bg-[#f6f7f7]"
                >
                  <Home className="h-4 w-4 mr-2" />
                  View Website
                </Button>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-[#1d2327]">
                      {profile?.full_name || 'Admin User'}
                    </p>
                    <p className="text-xs text-[#646970]">{profile?.email || user.email}</p>
                  </div>
                  <div className="w-10 h-10 bg-[#2271b1] rounded-full flex items-center justify-center text-white font-semibold">
                    {(profile?.full_name || profile?.email || 'U').charAt(0).toUpperCase()}
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-6">
            <div className="bg-white rounded-lg shadow-sm border border-[#c3c4c7]">
              <div className="p-6">
                {activeTab === 'dashboard' && (isAdmin || isBAC) && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-semibold text-[#1d2327] mb-4">Dashboard Overview</h2>
                    <DashboardStats />
                  </div>
                )}

                {activeTab === 'navigation' && isAdmin && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-semibold text-[#1d2327]">Navigation Menu Management</h2>
                    </div>
                    <NavigationManager />
                  </div>
                )}

                {activeTab === 'pages' && isAdmin && (
                  <div className="space-y-6">
                    <PageManager />
                  </div>
                )}

                {activeTab === 'news' && isAdmin && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-semibold text-[#1d2327]">News Management</h2>
                    </div>
                    <NewsManager />
                  </div>
                )}

                {activeTab === 'events' && isAdmin && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-semibold text-[#1d2327]">Events Management</h2>
                    </div>
                    <EventsManager />
                  </div>
                )}

                {activeTab === 'documents' && isAdmin && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-semibold text-[#1d2327]">Documents Management</h2>
                    </div>
                    <DocumentsManager />
                  </div>
                )}

                {activeTab === 'media' && isAdmin && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-semibold text-[#1d2327]">Media Library</h2>
                    </div>
                    <MediaManager />
                  </div>
                )}

                {activeTab === 'contacts' && isAdmin && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-semibold text-[#1d2327]">Contact Messages</h2>
                    </div>
                    <ContactManager />
                  </div>
                )}

                {activeTab === 'users' && isAdmin && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-semibold text-[#1d2327]">User Management</h2>
                    </div>
                    <UserManager />
                  </div>
                )}

                {activeTab === 'settings' && isAdmin && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-semibold text-[#1d2327]">Site Settings</h2>
                    </div>
                    <SettingsManager />
                  </div>
                )}

                {activeTab === 'bac-documents' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-semibold text-[#1d2327]">BAC Documents Management</h2>
                    </div>
                    <BACDocumentManager />
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
