import { useState } from "react";
import { Search, Grid3X3, BarChart3, ChevronDown, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatsCards } from "@/components/StatsCards";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

const orders = [
  { id: 1, partyName: "Friends Club", orderId: "OR-0012000D", receivedDate: "20.09.2025", receivedTime: "10:30 AM", dispatchDate: "30.10.2025", status: "Delivered" },
  { id: 2, partyName: "Kishor Kumar", orderId: "OR-0012000D", receivedDate: "20.09.2025", receivedTime: "10:30 AM", dispatchDate: "30.10.2025", status: "Pending" },
  { id: 3, partyName: "Kishor Kumar", orderId: "OR-0012000D", receivedDate: "20.09.2025", receivedTime: "10:30 AM", dispatchDate: "30.10.2025", status: "Hold" },
  { id: 4, partyName: "Rockers Club", orderId: "OR-0012000D", receivedDate: "20.09.2025", receivedTime: "10:30 AM", dispatchDate: "30.10.2025", status: "Delivered" },
  { id: 5, partyName: "Kishor Kumar", orderId: "OR-0012000D", receivedDate: "20.09.2025", receivedTime: "10:30 AM", dispatchDate: "30.10.2025", status: "Pending" },
  { id: 6, partyName: "Rockers Club", orderId: "OR-0012000D", receivedDate: "20.09.2025", receivedTime: "10:30 AM", dispatchDate: "30.10.2025", status: "Delivered" },
  { id: 7, partyName: "Kishor Kumar", orderId: "OR-0012000D", receivedDate: "20.09.2025", receivedTime: "10:30 AM", dispatchDate: "30.10.2025", status: "Pending" },
  { id: 8, partyName: "Kishor Kumar", orderId: "OR-0012000D", receivedDate: "20.09.2025", receivedTime: "10:30 AM", dispatchDate: "30.10.2025", status: "Pending" },
];

const getStatusColor = (status) => {
  switch (status) {
    case "Delivered":
      return "bg-green-500";
    case "Pending":
      return "bg-amber-500";
    case "Hold":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

export function Orders() {
  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen">
      <PageHeader title="Hi, Pradeep" />
      
      <div className="border-b border-gray-200 mb-6" />

      <div className="mb-6">
        <StatsCards />
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

            <Button variant="ghost" size="icon" className="bg-gray-50" data-testid="button-grid-view">
              <Grid3X3 className="w-4 h-4 text-gray-600" />
            </Button>
            <Button variant="ghost" size="icon" className="bg-gray-50" data-testid="button-chart-view">
              <BarChart3 className="w-4 h-4 text-gray-600" />
            </Button>

            <Button variant="ghost" className="bg-gray-50 text-gray-600">
              <span className="text-sm">All</span>
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="ghost" className="bg-gray-50 text-gray-600">
              <span className="text-sm">Filter by date range</span>
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
                <tr 
                  key={order.id} 
                  className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer" 
                  data-testid={`row-order-${order.id}`}
                >
                  <td className="py-4 px-6 text-sm text-gray-700 font-medium">{order.partyName}</td>
                  <td className="py-4 px-6 text-sm text-gray-600 text-center">{order.orderId}</td>
                  <td className="py-4 px-6 text-sm text-gray-600 text-center">{order.receivedDate}</td>
                  <td className="py-4 px-6 text-sm text-gray-600 text-center">{order.receivedTime}</td>
                  <td className="py-4 px-6 text-sm text-gray-600 text-center">{order.dispatchDate}</td>
                  <td className="py-4 px-6 text-center">
                    <span
                      className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-white ${getStatusColor(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
