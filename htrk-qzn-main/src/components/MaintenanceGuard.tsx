import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { APP_CONFIG } from "@/config/app";

interface Props {
  children: ReactNode;
}

export const MaintenanceGuard = ({ children }: Props) => {
  const location = useLocation();

  if (!APP_CONFIG.maintenanceMode) {
    return <>{children}</>;
  }

  // Allow maintenance page (avoid redirect loop)
  if (location.pathname === "/maintenance") {
    return <>{children}</>;
  }

  // Allow admin access
  if (
    APP_CONFIG.allowAdminDuringMaintenance &&
    location.pathname.startsWith("/admin")
  ) {
    return <>{children}</>;
  }

  return <Navigate to="/maintenance" replace />;
};
