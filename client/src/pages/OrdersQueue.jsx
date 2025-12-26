import { useState } from "react";
import { Search, Grid3X3, BarChart3, ChevronDown, Download, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";

const categories = [
  { name: "Full-Sublimation", count: 2 },
  { name: "Full-Sublimation", count: 2 },
  { name: "Full-Sublimation", count: 2 },
  { name: "Full-Sublimation", count: 2 },
  { name: "Full-Sublimation", count: 2 },
  { name: "Full-Sublimation", count: 2 },
  { name: "Full-Sublimation", count: 2 },
];

const lastOrders = [
  { id: "ID-17589 82813", customer: "SAGAR SPORTS", count: 2, placedBy: "Rakshith", receiveDate: "30-09-2025", receiveTime: "10:00AM", dispatchDate: "30-09-2025", dispatchTime: "10:00AM", location: "Bejai, Kapikad" },
  { id: "ID-17589 82813", customer: "SAGAR SPORTS", count: 2, placedBy: "Rakshith", receiveDate: "30-09-2025", receiveTime: "10:00AM", dispatchDate: "30-09-2025", dispatchTime: "10:00AM", location: "Bejai, Kapikad" },
];

const orderDetails = [
  { 
    id: "ID-17589 82813", 
    customer: "SAGAR SPORTS", 
    itemsCount: 2, 
    placedBy: "Rakshith", 
    receiveDate: "30-09-2025", 
    receiveTime: "10:00AM", 
    dispatchDate: "30-09-2025", 
    dispatchTime: "10:00AM", 
    location: "Bejai, Kapikad",
    items: "T-Shirt\nPant",
    designer: "New",
    setting: "New",
    rawMaterial: "New",
    screen: "New",
    cutting: "New",
    printing: "New",
    fusing: "New",
    stitching: "New",
    trimming: "New",
    payment: "New",
    dispatch: "New",
  },
];

const departments = ["Designer", "Setting", "Raw Material", "Screen", "Cutting", "Printing", "Fusing", "Stitching", "Trimming", "Payment", "Dispatch"];

export function OrdersQueue() {
  const [activeTab, setActiveTab] = useState("Designer");
  const [, setLocation] = useLocation();

const onAddClick = (e) => {
    e.preventDefault();
    setLocation("/create-order");
    }

  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen">
      <PageHeader title="Hi, Deekshith"  onAddClick={onAddClick}/>
      
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map((cat, index) => (
          <div 
            key={index}
            className="flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2 whitespace-nowrap"
          >
            <span className="text-sm text-gray-700">{cat.name}</span>
            <span className="bg-[#4880ff] text-white text-xs px-2 py-0.5 rounded-full">{cat.count}</span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">Last Orders</h2>
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <tbody>
              {lastOrders.map((order, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 text-sm text-gray-700">{order.id}</td>
                  <td className="py-3 text-sm text-gray-700">{order.customer}</td>
                  <td className="py-3 text-sm text-gray-700">{order.count}</td>
                  <td className="py-3 text-sm text-gray-700">{order.placedBy}</td>
                  <td className="py-3 text-sm text-gray-700">{order.receiveDate}<br/>{order.receiveTime}</td>
                  <td className="py-3 text-sm text-gray-700">{order.dispatchDate}<br/>{order.dispatchTime}</td>
                  <td className="py-3 text-sm text-gray-700">{order.location}</td>
                  <td className="py-3">
                    <div className="flex gap-1">
                      {[...Array(10)].map((_, i) => (
                        <div key={i} className="w-6 h-6 rounded bg-green-500 flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-gray-800">Order Details</h2>
            <div className="flex gap-2">
              <Button 
                variant={activeTab === "Designer" ? "default" : "outline"}
                className={activeTab === "Designer" ? "bg-[#4880ff]" : ""}
                onClick={() => setActiveTab("Designer")}
                data-testid="tab-designer"
              >
                Designer
              </Button>
              <Button 
                variant={activeTab === "Settings" ? "default" : "outline"}
                className={activeTab === "Settings" ? "bg-[#4880ff]" : ""}
                onClick={() => setActiveTab("Settings")}
                data-testid="tab-settings"
              >
                Settings
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Input
                placeholder="Search"
                className="w-48 lg:w-64 bg-gray-50 border-gray-200 pl-4 pr-10"
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
              <span className="text-sm">Filter by date range</span>
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>

            <Button className="bg-[#4880ff] text-white">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#ebf3ff]">
                <th className="text-left py-3 px-4 font-bold text-gray-800 rounded-l-lg">ID</th>
                <th className="text-left py-3 px-4 font-bold text-gray-800">Customer Name</th>
                <th className="text-center py-3 px-4 font-bold text-gray-800">Items Count</th>
                <th className="text-left py-3 px-4 font-bold text-gray-800">Placed by</th>
                <th className="text-left py-3 px-4 font-bold text-gray-800">Receive Date</th>
                <th className="text-left py-3 px-4 font-bold text-gray-800">Dispatch Date</th>
                <th className="text-left py-3 px-4 font-bold text-gray-800">Location</th>
                {departments.map((dept) => (
                  <th key={dept} className="text-center py-3 px-2 font-bold text-gray-800 whitespace-nowrap">{dept}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(8)].map((_, rowIndex) => (
                <tr key={rowIndex} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-700">ID-17589<br/>82813</td>
                  <td className="py-3 px-4 text-gray-700">SAGAR SPORTS</td>
                  <td className="py-3 px-4 text-center text-gray-700">2</td>
                  <td className="py-3 px-4 text-gray-700">Rakshith</td>
                  <td className="py-3 px-4 text-gray-700">30-09-2025<br/>10:00AM</td>
                  <td className="py-3 px-4 text-gray-700">30-09-2025<br/>10:00AM</td>
                  <td className="py-3 px-4 text-gray-700">Bejai,<br/>Kapikad</td>
                  {departments.map((dept, i) => (
                    <td key={dept} className="py-3 px-2 text-center">
                      {i < 3 ? (
                        <div className="w-6 h-6 rounded bg-green-500 flex items-center justify-center mx-auto">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      ) : i === 3 ? (
                        <div className="w-6 h-6 rounded bg-blue-500 flex items-center justify-center mx-auto">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">New</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
