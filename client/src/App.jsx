import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";
import NotFound from "@/pages/not-found.jsx";

import { Dashboard } from "@/pages/Dashboard.jsx";
import { Orders } from "@/pages/Orders.jsx";
import { OrdersQueue } from "@/pages/OrdersQueue.jsx";
import { MissingOrders } from "@/pages/MissingOrders.jsx";
import { DispatchDates } from "@/pages/DispatchDates.jsx";
import { Reports } from "@/pages/Reports.jsx";
import { Attributes } from "@/pages/Attributes.jsx";
import { OrderDetail } from "@/pages/OrderDetail.jsx";
import { CreateOrder } from "@/pages/CreateOrder.jsx";
import { Settings } from "@/pages/Settings.jsx";
import { Login } from "@/pages/Login.jsx";

function MainLayout({ children }) {
  const sidebarStyle = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={sidebarStyle}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function Router() {
  const [location] = useLocation();
  
  if (location === "/login") {
    return <Login />;
  }

  return (
    <MainLayout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/orders" component={Orders} />
        <Route path="/orders-queue" component={OrdersQueue} />
        <Route path="/missing-orders" component={MissingOrders} />
        <Route path="/dispatch-dates" component={DispatchDates} />
        <Route path="/reports" component={Reports} />
        <Route path="/attributes" component={Attributes} />
        <Route path="/order/:id" component={OrderDetail} />
        <Route path="/create-order" component={CreateOrder} />
        <Route path="/settings" component={Settings} />
        <Route component={NotFound} />
      </Switch>
    </MainLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
