import { Link, useLocation } from "react-router-dom";
import { Target, Calendar, Users, Building2, Award } from "lucide-react";

export function GovernanceTabs() {
  const location = useLocation();
  
  // Determine active tab based on current route
  const getActiveTab = () => {
    if (location.pathname === '/governance/sangguniang-bayan') return 'council';
    if (location.pathname === '/governance/offices') return 'departments';
    if (location.pathname === '/governance/mayor') return 'mayor';
    if (location.pathname === '/governance/development-agenda') return 'agenda';
    return 'mission';
  };

  const activeTab = getActiveTab();

  return (
    <section className="py-0">
      <div className="sticky top-[120px] z-40 bg-white backdrop-blur-lg border-b-2 border-[#8DC87B] shadow-sm mb-0">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex flex-wrap justify-center items-stretch gap-1 sm:gap-2 py-2 sm:py-3">
            <Link 
              to="/governance"
              onClick={(e) => {
                if (location.pathname === '/governance') {
                  e.preventDefault();
                  const missionSection = document.getElementById('mission');
                  if (missionSection) {
                    missionSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }
              }}
              className={`flex flex-col items-center justify-center gap-1 px-2 sm:px-3 md:px-4 py-2 rounded-lg font-semibold text-[10px] sm:text-xs md:text-sm transition-all duration-200 min-w-[4rem] sm:min-w-0 ${
                activeTab === 'mission'
                  ? 'bg-[#5F9A4E] text-white shadow-md'
                  : 'text-[#4A4A4A] hover:bg-[#8DC87B]/15 hover:text-[#4A4A4A]'
              }`}
            >
              <Target className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="text-center leading-tight">Mission and Vision</span>
            </Link>
            <Link 
              to="/governance/development-agenda"
              className={`flex flex-col items-center justify-center gap-1 px-2 sm:px-3 md:px-4 py-2 rounded-lg font-semibold text-[10px] sm:text-xs md:text-sm transition-all duration-200 min-w-[4rem] sm:min-w-0 ${
                activeTab === 'agenda'
                  ? 'bg-[#5F9A4E] text-white shadow-md'
                  : 'text-[#4A4A4A] hover:bg-[#8DC87B]/15 hover:text-[#4A4A4A]'
              }`}
            >
              <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="text-center leading-tight">Our Goals</span>
            </Link>
            <Link 
              to="/governance/mayor"
              className={`flex flex-col items-center justify-center gap-1 px-2 sm:px-3 md:px-4 py-2 rounded-lg font-semibold text-[10px] sm:text-xs md:text-sm transition-all duration-200 min-w-[4rem] sm:min-w-0 ${
                activeTab === 'mayor'
                  ? 'bg-[#5F9A4E] text-white shadow-md'
                  : 'text-[#4A4A4A] hover:bg-[#8DC87B]/15 hover:text-[#4A4A4A]'
              }`}
            >
              <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="text-center leading-tight">The Mayor</span>
            </Link>
            <Link 
              to="/governance/sangguniang-bayan"
              className={`flex flex-col items-center justify-center gap-1 px-2 sm:px-3 md:px-4 py-2 rounded-lg font-semibold text-[10px] sm:text-xs md:text-sm transition-all duration-200 min-w-[4rem] sm:min-w-0 ${
                activeTab === 'council'
                  ? 'bg-[#5F9A4E] text-white shadow-md'
                  : 'text-[#4A4A4A] hover:bg-[#8DC87B]/15 hover:text-[#4A4A4A]'
              }`}
            >
              <Building2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="text-center leading-tight">Sangguniang Bayan</span>
            </Link>
            <Link 
              to="/governance/offices"
              className={`flex flex-col items-center justify-center gap-1 px-2 sm:px-3 md:px-4 py-2 rounded-lg font-semibold text-[10px] sm:text-xs md:text-sm transition-all duration-200 min-w-[4rem] sm:min-w-0 ${
                activeTab === 'departments'
                  ? 'bg-[#5F9A4E] text-white shadow-md'
                  : 'text-[#4A4A4A] hover:bg-[#8DC87B]/15 hover:text-[#4A4A4A]'
              }`}
            >
              <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="text-center leading-tight">Offices</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
