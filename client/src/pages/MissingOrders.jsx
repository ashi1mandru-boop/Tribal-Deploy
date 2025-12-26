import { Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/PageHeader";
import { useLocation } from "wouter";
const missedOrders = [
  { jobId: "OR-2351", orderId: "ID-1758982813302-535", totalItemsUpdated: 15, updatedBy: "deekshith_designer", orderPlacedBy: "deekshith_designer", updatedDateTime: "30-09-2025", missedItems: 5, historyTab: "New" },
  { jobId: "OR-2351", orderId: "ID-1758982813302-535", totalItemsUpdated: 15, updatedBy: "deekshith_designer", orderPlacedBy: "deekshith_designer", updatedDateTime: "30-09-2025", missedItems: 5, historyTab: "New" },
  { jobId: "OR-2351", orderId: "ID-1758982813302-535", totalItemsUpdated: 15, updatedBy: "deekshith_designer", orderPlacedBy: "deekshith_designer", updatedDateTime: "30-09-2025", missedItems: 5, historyTab: "New" },
];

export function MissingOrders() {

   const [, setLocation] = useLocation();
  
  const onAddClick = (e) => {
      e.preventDefault();
      setLocation("/create-order");
      }
  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen">
      <PageHeader title="Hi, Pradeep" onAddClick={onAddClick} />
      
      <div className="border-b border-gray-200 mb-6" />

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold text-gray-800">Missed Order Details</h2>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Input
                placeholder="Search by order id"
                className="w-48 lg:w-64 bg-gray-50 border-gray-200 pl-4 pr-10"
                data-testid="input-search"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>

            <Button variant="ghost" className="bg-gray-50 text-gray-600">
              <span className="text-sm">Filter by date range</span>
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#ebf3ff]">
                <th className="text-left py-4 px-6 font-bold text-sm text-gray-800 rounded-l-lg">Job ID</th>
                <th className="text-left py-4 px-6 font-bold text-sm text-gray-800">Order ID</th>
                <th className="text-center py-4 px-6 font-bold text-sm text-gray-800">Total Items Updated</th>
                <th className="text-left py-4 px-6 font-bold text-sm text-gray-800">Updated By</th>
                <th className="text-left py-4 px-6 font-bold text-sm text-gray-800">Order_placed by</th>
                <th className="text-center py-4 px-6 font-bold text-sm text-gray-800">Updated Date&Time</th>
                <th className="text-center py-4 px-6 font-bold text-sm text-gray-800">Missed Items</th>
                <th className="text-center py-4 px-6 font-bold text-sm text-gray-800 rounded-r-lg">Items recorded History Tab</th>
              </tr>
            </thead>
            <tbody>
              {missedOrders.map((order, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50" data-testid={`row-missed-order-${index}`}>
                  <td className="py-4 px-6 text-sm text-gray-700">{order.jobId}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">{order.orderId}</td>
                  <td className="py-4 px-6 text-sm text-gray-700 text-center">{order.totalItemsUpdated}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">{order.updatedBy}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">{order.orderPlacedBy}</td>
                  <td className="py-4 px-6 text-sm text-gray-700 text-center">{order.updatedDateTime}</td>
                  <td className="py-4 px-6 text-sm text-gray-700 text-center">{order.missedItems}</td>
                  <td className="py-4 px-6 text-sm text-gray-700 text-center">{order.historyTab}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
