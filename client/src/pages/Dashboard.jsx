import { useState } from "react";
import { Package, CheckCircle, Truck, Clock, Pause, Users, Search, Grid3X3, BarChart3, ChevronDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatsCards } from "@/components/StatsCards";
import { PageHeader } from "@/components/PageHeader";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  { date: "20-10-2025", orders: 250 },
  { date: "21-10-2025", orders: 1100 },
  { date: "22-10-2025", orders: 950 },
  { date: "23-10-2025", orders: 700 },
  { date: "24-10-2025", orders: 400 },
  { date: "25-10-2025", orders: 850 },
  { date: "26-10-2025", orders: 150 },
  { date: "27-10-2025", orders: 120 },
  { date: "28-10-2025", orders: 750 },
  { date: "29-10-2025", orders: 800 },
  { date: "30-10-2025", orders: 650 },
  { date: "31-10-2025", orders: 550 },
  { date: "01-11-2025", orders: 400 },
  { date: "02-11-2025", orders: 1200 },
];

const orders = [
  { id: 1, partyName: "Friends Club", orderId: "OR-0012000D", receivedDate: "20.09.2025", receivedTime: "10:30 AM", dispatchDate: "30.10.2025", status: "Delivered" },
  { id: 2, partyName: "Kishor Kumar", orderId: "OR-0012000D", receivedDate: "20.09.2025", receivedTime: "10:30 AM", dispatchDate: "30.10.2025", status: "Pending" },
  { id: 3, partyName: "Kishor Kumar", orderId: "OR-0012000D", receivedDate: "20.09.2025", receivedTime: "10:30 AM", dispatchDate: "30.10.2025", status: "Pending" },
  { id: 4, partyName: "Rockers Club", orderId: "OR-0012000D", receivedDate: "20.09.2025", receivedTime: "10:30 AM", dispatchDate: "30.10.2025", status: "Delivered" },
  { id: 5, partyName: "Kishor Kumar", orderId: "OR-0012000D", receivedDate: "20.09.2025", receivedTime: "10:30 AM", dispatchDate: "30.10.2025", status: "Pending" },
  { id: 6, partyName: "Rockers Club", orderId: "OR-0012000D", receivedDate: "20.09.2025", receivedTime: "10:30 AM", dispatchDate: "30.10.2025", status: "Delivered" },
  { id: 7, partyName: "Kishor Kumar", orderId: "OR-0012000D", receivedDate: "20.09.2025", receivedTime: "10:30 AM", dispatchDate: "30.10.2025", status: "Pending" },
  { id: 8, partyName: "Kishor Kumar", orderId: "OR-0012000D", receivedDate: "20.09.2025", receivedTime: "10:30 AM", dispatchDate: "30.10.2025", status: "Pending" },
];

const stats = [
  { title: "Total Orders", value: "50", icon: Package, bgColor: "bg-blue-100", iconColor: "text-blue-600" },
  { title: "Completed", value: "32", icon: CheckCircle, bgColor: "bg-green-100", iconColor: "text-green-600" },
  { title: "Processed", value: "10", icon: Truck, bgColor: "bg-teal-100", iconColor: "text-teal-600" },
  { title: "Processing", value: "2", icon: Clock, bgColor: "bg-blue-100", iconColor: "text-blue-500" },
  { title: "On Hold", value: "2", icon: Pause, bgColor: "bg-orange-100", iconColor: "text-orange-500" },
  { title: "Que", value: "1", icon: Users, bgColor: "bg-purple-100", iconColor: "text-purple-600" },
];

export function Dashboard() {
  const [viewMode, setViewMode] = useState("chart");

  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen">
      <PageHeader title="Hi, Pradeep" />
      
      <div className="border-b border-gray-200 mb-6" />

      <div className="mb-6">
        <StatsCards stats={stats} />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold text-gray-800">Order Details</h2>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Input
                placeholder="Search"
                className="w-48 lg:w-64 bg-gray-50 border-gray-200 pl-4 pr-10"
                data-testid="input-search"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>

            <Button 
              variant="ghost" 
              size="icon" 
              className={`bg-gray-50 ${viewMode === 'grid' ? 'bg-blue-100' : ''}`}
              onClick={() => setViewMode("grid")}
              data-testid="button-grid-view"
            >
              <Grid3X3 className="w-4 h-4 text-gray-600" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className={`bg-gray-50 ${viewMode === 'chart' ? 'bg-blue-100' : ''}`}
              onClick={() => setViewMode("chart")}
              data-testid="button-chart-view"
            >
              <BarChart3 className="w-4 h-4 text-gray-600" />
            </Button>

            <Button variant="ghost" className="bg-gray-50 text-gray-600" data-testid="button-filter-all">
              <span className="text-sm">All</span>
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="ghost" className="bg-gray-50 text-gray-600" data-testid="button-filter-date">
              <span className="text-sm">Filter by date range</span>
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {viewMode === "chart" ? (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip />
                <Bar dataKey="orders" fill="#4880ff" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#ebf3ff]">
                  <th className="text-left py-4 px-6 font-bold text-sm text-gray-800 rounded-l-lg">Party Name</th>
                  <th className="text-center py-4 px-6 font-bold text-sm text-gray-800">Order-ID</th>
                  <th className="text-center py-4 px-6 font-bold text-sm text-gray-800">Received Date</th>
                  <th className="text-center py-4 px-6 font-bold text-sm text-gray-800">Received Time</th>
                  <th className="text-center py-4 px-6 font-bold text-sm text-gray-800">Dispatch Date</th>
                  <th className="text-center py-4 px-6 font-bold text-sm text-gray-800 rounded-r-lg">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50" data-testid={`row-order-${order.id}`}>
                    <td className="py-4 px-6 text-sm text-gray-700 font-medium">{order.partyName}</td>
                    <td className="py-4 px-6 text-sm text-gray-600 text-center">{order.orderId}</td>
                    <td className="py-4 px-6 text-sm text-gray-600 text-center">{order.receivedDate}</td>
                    <td className="py-4 px-6 text-sm text-gray-600 text-center">{order.receivedTime}</td>
                    <td className="py-4 px-6 text-sm text-gray-600 text-center">{order.dispatchDate}</td>
                    <td className="py-4 px-6 text-center">
                      <span
                        className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-white ${
                          order.status === "Delivered" ? "bg-green-500" : "bg-amber-500"
                        }`}
                        data-testid={`status-${order.id}`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
