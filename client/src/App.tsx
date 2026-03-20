import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { AppRoutes } from "@/app/routes/AppRoutes";
import "@/styles/App.css";

function App() {
  return (
    <>
      <QueryClientProvider client={new QueryClient()}>
        <AppRoutes />
      </QueryClientProvider>
      <Toaster />
    </>
  );
}

export default App;
