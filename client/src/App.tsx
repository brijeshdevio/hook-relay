import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { AuthProvider } from "@/app/providers/AuthProvider";
import { AppRoutes } from "@/app/routes/AppRoutes";
import "@/styles/App.css";

function App() {
  return (
    <>
      <QueryClientProvider client={new QueryClient()}>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </QueryClientProvider>
      <Toaster />
    </>
  );
}

export default App;
