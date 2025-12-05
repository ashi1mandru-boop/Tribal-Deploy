import { Search, Grid3X3, BarChart3, ChevronDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatsCards } from "@/components/StatsCards";
import { PageHeader } from "@/components/PageHeader";

const productStats = [
  { title: "T shirt's", value: "124" },
  { title: "Pants", value: "575" },
  { title: "Caps", value: "97" },
  { title: "Hijabs", value: "54" },
  { title: "Shorts", value: "68" },
  { title: "Screens", value: "76" },
];

const dispatchOrders = [
  { id: "OR-2351", orderId: "ID-1758982813302-535", customer: "SAGAR SPORTS", itemsCount: 1, orderPlacedBy: "deekshith_designer", receivedDateTime: "27-09-2025 19:58:25", dispatchDate: "30-09-2025", dispatchTime: "05:00", status: "New" },
  { id: "OR-2351", orderId: "ID-1758982813302-535", customer: "SAGAR SPORTS", itemsCount: 1, orderPlacedBy: "deekshith_designer", receivedDateTime: "27-09-2025 19:58:25", dispatchDate: "30-09-2025", dispatchTime: "05:00", status: "New" },
  { id: "OR-2351", orderId: "ID-1758982813302-535", customer: "SAGAR SPORTS", itemsCount: 1, orderPlacedBy: "deekshith_designer", receivedDateTime: "27-09-2025 19:58:25", dispatchDate: "30-09-2025", dispatchTime: "05:00", status: "New" },
  { id: "OR-2351", orderId: "ID-1758982813302-535", customer: "SAGAR SPORTS", itemsCount: 1, orderPlacedBy: "deekshith_designer", receivedDateTime: "27-09-2025 19:58:25", dispatchDate: "30-09-2025", dispatchTime: "05:00", status: "New" },
  { id: "OR-2351", orderId: "ID-1758982813302-535", customer: "SAGAR SPORTS", itemsCount: 1, orderPlacedBy: "deekshith_designer", receivedDateTime: "27-09-2025 19:58:25", dispatchDate: "30-09-2025", dispatchTime: "05:00", status: "New" },
  { id: "OR-2351", orderId: "ID-1758982813302-535", customer: "SAGAR SPORTS", itemsCount: 1, orderPlacedBy: "deekshith_designer", receivedDateTime: "27-09-2025 19:58:25", dispatchDate: "30-09-2025", dispatchTime: "05:00", status: "New" },
];

export function DispatchDates() {
  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen">
      <PageHeader title="Hi, Pradeep" />
      
      <div className="border-b border-gray-200 mb-6" />

      <div className="mb-6">
        <StatsCards />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {productStats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-xs text-gray-500 font-medium mb-2">{stat.title}</p>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold text-gray-800">Dispatch Order Details</h2>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Input
                placeholder="Search"
                className="w-48 lg:w-64 bg-gray-50 border-gray-200 pl-4 pr-10"
                data-testid="input-search"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>

            <Button variant="ghost" size="icon" className="bg-gray-50">
              <Grid3X3 className="w-4 h-4 text-gray-600" />
            </Button>
            <Button variant="ghost" size="icon" className="bg-gray-50">
              <BarChart3 className="w-4 h-4 text-gray-600" />
            </Button>

            <Button variant="ghost" className="bg-gray-50 text-gray-600">
              <span className="text-sm">All</span>
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="ghost" className="bg-gray-50 text-gray-600">
              <span className="text-sm">Completed Items</span>
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>

            <Button className="bg-[#4880ff] text-white" data-testid="button-export">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#ebf3ff]">
                <th className="text-left py-4 px-4 font-bold text-sm text-gray-800 rounded-l-lg">ID</th>
                <th className="text-left py-4 px-4 font-bold text-sm text-gray-800">Order ID</th>
                <th className="text-left py-4 px-4 font-bold text-sm text-gray-800">Customer Name</th>
                <th className="text-center py-4 px-4 font-bold text-sm text-gray-800">Items Count</th>
                <th className="text-left py-4 px-4 font-bold text-sm text-gray-800">Order_placed by</th>
                <th className="text-left py-4 px-4 font-bold text-sm text-gray-800">Received Date&Time</th>
                <th className="text-left py-4 px-4 font-bold text-sm text-gray-800">dispatch_date</th>
                <th className="text-left py-4 px-4 font-bold text-sm text-gray-800">dispatch_time</th>
                <th className="text-center py-4 px-4 font-bold text-sm text-gray-800 rounded-r-lg">last_updated_status</th>
              </tr>
            </thead>
            <tbody>
              {dispatchOrders.map((order, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50" data-testid={`row-dispatch-${index}`}>
                  <td className="py-4 px-4 text-sm text-gray-700">{order.id}</td>
                  <td className="py-4 px-4 text-sm text-gray-700">{order.orderId}</td>
                  <td className="py-4 px-4 text-sm text-gray-700">{order.customer}</td>
                  <td className="py-4 px-4 text-sm text-gray-700 text-center">{order.itemsCount}</td>
                  <td className="py-4 px-4 text-sm text-gray-700">{order.orderPlacedBy}</td>
                  <td className="py-4 px-4 text-sm text-gray-700">{order.receivedDateTime}</td>
                  <td className="py-4 px-4 text-sm text-gray-700">{order.dispatchDate}</td>
                  <td className="py-4 px-4 text-sm text-gray-700">{order.dispatchTime}</td>
                  <td className="py-4 px-4 text-sm text-gray-700 text-center">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
