import { Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatsCards } from "@/components/StatsCards";
import { PageHeader } from "@/components/PageHeader";

const departments = [
  { name: "Stitching", totalOrder: 5789, new: 0, clear: 0, pending: 0, hold: 0, entry: 0, delay: 0, outOfStock: 0 },
  { name: "Payment", totalOrder: 5789, new: 0, clear: 0, pending: 0, hold: 0, entry: 0, delay: 0, outOfStock: 0 },
  { name: "Printing", totalOrder: 5789, new: 0, clear: 0, pending: 0, hold: 0, entry: 0, delay: 0, outOfStock: 0 },
  { name: "Setting", totalOrder: 5789, new: 0, clear: 0, pending: 0, hold: 0, entry: 0, delay: 0, outOfStock: 0 },
  { name: "Designer", totalOrder: 5789, new: 0, clear: 0, pending: 0, hold: 0, entry: 0, delay: 0, outOfStock: 0 },
  { name: "Screen", totalOrder: 5789, new: 0, clear: 0, pending: 0, hold: 0, entry: 0, delay: 0, outOfStock: 0 },
  { name: "Admin", totalOrder: 5789, new: 0, clear: 0, pending: 0, hold: 0, entry: 0, delay: 0, outOfStock: 0 },
  { name: "Cutting", totalOrder: 5789, new: 0, clear: 0, pending: 0, hold: 0, entry: 0, delay: 0, outOfStock: 0 },
  { name: "Stitching", totalOrder: 5789, new: 0, clear: 0, pending: 0, hold: 0, entry: 0, delay: 0, outOfStock: 0 },
];

export function Reports() {
  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen">
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <Button className="bg-[#4880ff] text-white" data-testid="button-all">All</Button>
        <Button variant="outline" className="flex items-center gap-2" data-testid="button-department">
          <span>Department</span>
          <ChevronDown className="w-4 h-4" />
        </Button>
        <Button variant="outline" className="flex items-center gap-2" data-testid="button-users">
          <span>Users</span>
          <ChevronDown className="w-4 h-4" />
        </Button>
        <div className="flex-1" />
        <PageHeader title="" showDateFilter={true} showAddButton={true} />
      </div>

      <div className="mb-6">
        <StatsCards />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold text-gray-800">All Departments</h2>
          
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
                <th className="text-left py-4 px-6 font-bold text-sm text-gray-800 rounded-l-lg">Name</th>
                <th className="text-center py-4 px-6 font-bold text-sm text-gray-800">Total Order</th>
                <th className="text-center py-4 px-6 font-bold text-sm text-gray-800">New</th>
                <th className="text-center py-4 px-6 font-bold text-sm text-gray-800">Clear</th>
                <th className="text-center py-4 px-6 font-bold text-sm text-gray-800">Pending</th>
                <th className="text-center py-4 px-6 font-bold text-sm text-gray-800">Hold</th>
                <th className="text-center py-4 px-6 font-bold text-sm text-gray-800">Entry</th>
                <th className="text-center py-4 px-6 font-bold text-sm text-gray-800">Delay</th>
                <th className="text-center py-4 px-6 font-bold text-sm text-gray-800 rounded-r-lg">Out of stock</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50" data-testid={`row-department-${index}`}>
                  <td className="py-4 px-6 text-sm text-gray-700 font-medium">{dept.name}</td>
                  <td className="py-4 px-6 text-sm text-gray-700 text-center">{dept.totalOrder}</td>
                  <td className="py-4 px-6 text-sm text-blue-600 text-center">{dept.new}</td>
                  <td className="py-4 px-6 text-sm text-blue-600 text-center">{dept.clear}</td>
                  <td className="py-4 px-6 text-sm text-blue-600 text-center">{dept.pending}</td>
                  <td className="py-4 px-6 text-sm text-blue-600 text-center">{dept.hold}</td>
                  <td className="py-4 px-6 text-sm text-blue-600 text-center">{dept.entry}</td>
                  <td className="py-4 px-6 text-sm text-blue-600 text-center">{dept.delay}</td>
                  <td className="py-4 px-6 text-sm text-blue-600 text-center">{dept.outOfStock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
