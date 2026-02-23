import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Menu, X, Mail, ChevronDown, Search } from "lucide-react";
import quezonSeal from "@/assets/quezon-official-seal.png";
import quezonFlag from "@/assets/quezon-flag.png";
import { useContactInfo } from "@/hooks/useContactInfo";
import { useNavigation } from "@/hooks/useNavigation";
import { formatPhoneForTel } from "@/lib/utils";

// Helper: determine if nav item is active based on current path
function isNavItemActive(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

// Fallback navigation in case database is unavailable
const fallbackNavigation = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
    submenu: [
      { name: "Town Profile", href: "/about#town-profile" },
      { name: "History", href: "/about#history" },
      { name: "Municipal Seal", href: "/about#municipal-seal" }
    ]
  },
  {
    name: "Governance",
    href: "/governance",
    submenu: [
      { name: "Mission and Vision", href: "/governance#mission" },
      { name: "Our Goals", href: "/governance/development-agenda" },
      { name: "The Mayor", href: "/governance/mayor" },
      { name: "Sangguniang Bayan", href: "/governance/sangguniang-bayan" },
      { name: "Offices", href: "/governance/offices" }
    ]
  },
  {
    name: "Services",
    href: "/services",
    submenu: [
      { name: "Business Permits", href: "/services#business" },
      { name: "Civil Registry", href: "/services#civil" },
      { name: "Building Permits", href: "/services#building" },
      { name: "Social Assistance", href: "/services#social" },
      { name: "Forms & Downloads", href: "/services#forms" },
    ]
  },
  {
    name: "Investment",
    href: "/investment"
  },
  {
    name: "Tourism",
    href: "/tourism",
    submenu: [
      { name: "What to Do", href: "/tourism/what-to-do" },
      { name: "Civic Activities", href: "/tourism/civic-activities" },
      { name: "Festivals", href: "/tourism/festivals" },
      { name: "Travel Guide", href: "/travel-guide" },
      { name: "Destinations", href: "/tourism#destinations" }
    ]
  },
  {
    name: "Transparency",
    href: "/transparency",
    submenu: [
      { name: "Full Disclosure", href: "/transparency/full-disclosure" },
      { name: "LGSF", href: "/transparency/lgsf" },
      { name: "Bayanihan Grant", href: "/transparency/bayanihan-grant" },
      { name: "Invitation to Bid", href: "/transparency/invitation-to-bid" },
      { name: "Notice of Award", href: "/transparency/notice-of-award" },
      { name: "Notice to Proceed", href: "/transparency/notice-to-proceed" },
      { name: "Contract Agreement", href: "/transparency/contract-agreement" },
      { name: "Sagip Saka", href: "/transparency/sagip-saka" }
    ]
  },
  {
    name: "News",
    href: "/news"
  }
];

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
  const [headerHeight, setHeaderHeight] = useState(120);
  const [searchQuery, setSearchQuery] = useState("");
  const headerRef = useRef<HTMLElement>(null);
  const { contactInfo } = useContactInfo();
  const { navigation: dbNavigation, loading: navLoading } = useNavigation('main');

  // Transform database navigation to component format
  const transformNavigation = () => {
    const pathname = location.pathname;
    const items = navLoading || !dbNavigation || dbNavigation.length === 0
      ? fallbackNavigation.map(({ name, href, submenu }) => ({ name, href, submenu, opensInNewTab: false }))
      : dbNavigation.map(item => ({
          name: item.label,
          href: item.href,
          submenu: item.submenu && item.submenu.length > 0
            ? item.submenu.map(sub => ({
              name: sub.label,
              href: sub.href,
              opensInNewTab: sub.opens_in_new_tab
            }))
            : undefined,
          opensInNewTab: item.opens_in_new_tab
        }));

    return items.map(item => ({
      ...item,
      current: isNavItemActive(item.href, pathname)
    }));
  };

  const navigation = transformNavigation();

  // Measure header height for mobile menu positioning
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const toggleSubmenu = (itemName: string) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page or perform search
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <header ref={headerRef} className="bg-white/92 backdrop-blur-2xl border-b border-border/60 sticky top-0 z-50 shadow-[0_2px_8px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)] relative">
      {/* Elegant Quezon Municipal background - Enhanced opacity */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: 'url(/assets/quezon-municipal-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      {/* Top bar with search - Premium Green Style with High Contrast */}
      <div className="bg-gradient-to-r from-[hsl(95_38%_35%)] via-[hsl(95_38%_32%)] to-[hsl(95_38%_35%)] backdrop-blur-2xl border-b border-[hsl(95_38%_40%)] relative z-10 shadow-[0_1px_3px_rgba(0,0,0,0.2)]">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center py-2.5">
            <form onSubmit={handleSearch} className="w-full max-w-2xl">
              <div className="relative flex items-center">
                <Search className="absolute left-3 h-4 w-4 text-white/70 z-10" />
                <Input
                  type="search"
                  placeholder="Search the website..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-12 py-2 bg-white/95 text-[hsl(35_25%_25%)] placeholder:text-[hsl(35_25%_45%)] border-[hsl(95_38%_45%)]/30 focus:border-[hsl(95_38%_45%)] focus:ring-[hsl(95_38%_45%)]/20 rounded-lg shadow-sm"
                />
                <Button
                  type="submit"
                  className="absolute right-1 h-8 px-4 bg-[hsl(95_38%_42%)] hover:bg-[hsl(95_38%_38%)] text-white rounded-md text-sm font-semibold transition-colors"
                  aria-label="Search"
                >
                  Search
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Skip to content link - DICT compliance */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-primary text-primary-foreground px-4 py-2 z-50"
        accessKey="1"
      >
        Skip to main content
      </a>

      {/* Main header - iOS style */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-between items-center py-2.5 sm:py-3 gap-2 sm:gap-4">
          {/* Logo and title */}
          <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
            <a href="/" accessKey="4" aria-label="Go to homepage" className="flex-shrink-0 transition-opacity active:opacity-70">
              <img
                src={quezonSeal}
                alt="Municipality of Quezon, Bukidnon Official Seal"
                className="h-12 w-12 sm:h-16 sm:w-16 object-contain rounded-xl"
                style={{
                  maxWidth: '64px',
                  maxHeight: '64px',
                  minWidth: '48px',
                  minHeight: '48px',
                  width: '48px',
                  height: '48px',
                  objectFit: 'contain'
                }}
              />
            </a>
            <div className="min-w-0 flex-1 overflow-hidden">
              <h1 className="text-base sm:text-xl md:text-2xl font-bold text-[hsl(95_35%_30%)] truncate tracking-tight">
                <a href="/" className="hover:text-[hsl(95_35%_25%)] transition-colors duration-200">
                  Municipality of Quezon
                </a>
              </h1>
              <p className="hidden sm:block text-xs sm:text-sm text-[hsl(35_25%_35%)] truncate font-semibold">
                Province of Bukidnon
              </p>
            </div>
          </div>

          {/* Desktop navigation - Premium Green Style */}
          <nav className="hidden md:block" accessKey="2">
            <ul className="flex space-x-10">
              {navigation.map((item, index) => (
                <li key={item.name} className="relative group">
                  <a
                    href={item.href}
                    target={item.opensInNewTab ? '_blank' : undefined}
                    rel={item.opensInNewTab ? 'noopener noreferrer' : undefined}
                    className={`text-sm font-semibold transition-all duration-300 hover:text-[hsl(95_38%_35%)] relative ${item.current
                      ? 'text-[hsl(95_38%_35%)] font-bold border-b-2 border-[hsl(95_38%_35%)] pb-1'
                      : 'text-[hsl(35_25%_25%)] hover:text-[hsl(95_38%_35%)]'
                      }`}
                    accessKey={index < 9 ? (index + 1).toString() : undefined}
                    aria-label={`Navigate to ${item.name}`}
                  >
                    {item.name}
                    {item.current && (
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[hsl(95_38%_42%)] rounded-full" />
                    )}
                  </a>
                  {item.submenu && (
                    <div className="absolute top-full left-0 mt-3 w-72 bg-white shadow-[0_8px_32px_rgba(0,0,0,0.16),0_4px_16px_rgba(0,0,0,0.12)] rounded-2xl border border-[hsl(95_38%_50%)]/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 overflow-hidden z-50">
                      <div className="relative py-2">
                        {item.submenu.map((subitem) => (
                          <a
                            key={subitem.name}
                            href={subitem.href}
                            target={subitem.opensInNewTab ? '_blank' : undefined}
                            rel={subitem.opensInNewTab ? 'noopener noreferrer' : undefined}
                            className="block px-5 py-2.5 text-sm text-[hsl(35_25%_20%)] hover:bg-[hsl(95_38%_42%_/_0.15)] hover:text-[hsl(95_38%_35%)] transition-all duration-200 font-semibold relative group/item"
                          >
                            {subitem.name}
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-[hsl(95_38%_42%)] rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile menu button - only visible below md (768px) */}
          <div className="md:hidden flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              className="relative z-50 flex items-center justify-center min-w-[44px] min-h-[44px] rounded-md bg-[hsl(95_38%_42%)] text-white hover:bg-[hsl(95_38%_35%)] hover:text-white border-2 border-[hsl(95_38%_35%)] shadow-md"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <div
              className="lg:hidden fixed bg-black/50 z-[60]"
              style={{
                top: `${headerHeight}px`,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100vw',
                height: `calc(100vh - ${headerHeight}px)`
              }}
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />
            {/* Mobile menu */}
            <div
              className="fixed left-0 right-0 w-full bg-white z-[70] shadow-[0_4px_24px_rgba(0,0,0,0.15)] overflow-y-auto border-t border-border/50"
              style={{
                top: `${headerHeight}px`,
                bottom: 0,
                left: 0,
                right: 0,
                width: '100%',
                minHeight: `calc(100vh - ${headerHeight}px)`,
                maxHeight: `calc(100vh - ${headerHeight}px)`
              }}
            >
              <nav className="py-4">
                <ul className="space-y-1 px-4">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      {item.submenu ? (
                        <Collapsible
                          open={openSubmenus[item.name] || false}
                          onOpenChange={() => toggleSubmenu(item.name)}
                        >
                          <div className="flex items-center justify-between">
                            <a
                              href={item.href}
                              target={item.opensInNewTab ? '_blank' : undefined}
                              rel={item.opensInNewTab ? 'noopener noreferrer' : undefined}
                              className={`flex-1 py-2 text-sm font-semibold transition-colors hover:text-[hsl(95_38%_35%)] ${item.current ? 'text-[hsl(95_38%_35%)]' : 'text-[hsl(35_25%_25%)]'
                                }`}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {item.name}
                            </a>
                            <CollapsibleTrigger className="p-2 -mr-2 transition-colors hover:text-[hsl(95_38%_35%)]">
                              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openSubmenus[item.name] ? 'rotate-180' : ''}`} />
                            </CollapsibleTrigger>
                          </div>
                          <CollapsibleContent className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                            <ul className="ml-4 mt-1 space-y-1 pb-2">
                              {item.submenu.map((subitem) => (
                                <li key={subitem.name}>
                                  <a
                                    href={subitem.href}
                                    target={subitem.opensInNewTab ? '_blank' : undefined}
                                    rel={subitem.opensInNewTab ? 'noopener noreferrer' : undefined}
                                    className="block py-1.5 text-sm text-[hsl(35_25%_35%)] hover:text-[hsl(95_38%_35%)] transition-colors font-medium"
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                    {subitem.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </CollapsibleContent>
                        </Collapsible>
                      ) : (
                        <a
                          href={item.href}
                          target={item.opensInNewTab ? '_blank' : undefined}
                          rel={item.opensInNewTab ? 'noopener noreferrer' : undefined}
                          className={`block py-2 text-sm font-semibold transition-colors hover:text-[hsl(95_38%_35%)] ${item.current ? 'text-[hsl(95_38%_35%)]' : 'text-[hsl(35_25%_25%)]'
                            }`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
