import { createRoot } from 'react-dom/client'
import React from 'react'
import App from './App.tsx'
import './index.css'
import { ErrorBoundary } from './components/ErrorBoundary'

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const attachReloadHandler = (buttonId: string) => {
  document.getElementById(buttonId)?.addEventListener("click", () => {
    window.location.reload();
  });
};

// Error boundary for React app
const rootElement = document.getElementById("root");
if (!rootElement) {
  // Fallback if root element is not found
  document.body.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; font-family: sans-serif; text-align: center; padding: 20px;">
      <div>
        <h1 style="color: #d32f2f; margin-bottom: 16px;">Application Error</h1>
        <p style="color: #666; margin-bottom: 24px;">Root element not found. Please check the HTML structure.</p>
        <button id="reload-app-btn-missing-root" style="background: #4CAF50; color: white; border: none; padding: 12px 24px; border-radius: 4px; cursor: pointer; font-size: 16px;">
          Reload Page
        </button>
      </div>
    </div>
  `;
  attachReloadHandler("reload-app-btn-missing-root");
  throw new Error("Root element not found");
}

// Wrap app in error boundary
try {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
} catch (error) {
  // Fallback error display
  console.error('Failed to render app:', error);
  const errorMessage = escapeHtml(error instanceof Error ? error.message : String(error));
  rootElement.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; font-family: sans-serif; text-align: center; padding: 20px;">
      <div>
        <h1 style="color: #d32f2f; margin-bottom: 16px;">Application Error</h1>
        <p style="color: #666; margin-bottom: 24px;">Failed to load the application. Please refresh the page.</p>
        <pre style="background: #f5f5f5; padding: 16px; border-radius: 4px; text-align: left; overflow: auto; max-width: 600px; margin: 20px auto; font-size: 12px;">${errorMessage}</pre>
        <button id="reload-app-btn-render-failed" style="background: #4CAF50; color: white; border: none; padding: 12px 24px; border-radius: 4px; cursor: pointer; font-size: 16px; margin-top: 16px;">
          Reload Page
        </button>
      </div>
    </div>
  `;
  attachReloadHandler("reload-app-btn-render-failed");
}
