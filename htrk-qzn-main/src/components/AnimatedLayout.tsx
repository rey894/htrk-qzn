import { Outlet, useLocation } from "react-router-dom";

/**
 * Wraps route content with a subtle fade-in animation on navigation.
 * Respects prefers-reduced-motion for accessibility.
 */
export function AnimatedLayout() {
  const location = useLocation();

  return (
    <div key={location.pathname} className="animate-fade-in min-h-screen">
      <Outlet />
    </div>
  );
}
