import { Calendar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PageHeader({ 
  title, 
  showDateFilter = true, 
  showAddButton = true, 
  addButtonText = "Add New Order",
  onAddClick 
}) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
      <h1 className="text-2xl font-bold text-gray-800" data-testid="page-title">{title}</h1>
      
      <div className="flex flex-wrap items-center gap-4">
        {showDateFilter && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 min-w-[140px]">
              <span className="text-sm text-gray-500">From Date</span>
              <Calendar className="w-4 h-4 text-gray-400 ml-auto" />
            </div>
            <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 min-w-[140px]">
              <span className="text-sm text-gray-500">To Date</span>
              <Calendar className="w-4 h-4 text-gray-400 ml-auto" />
            </div>
            <Button 
              variant="outline" 
              className="border-blue-500 text-blue-500"
              data-testid="button-apply-filter"
            >
              Apply
            </Button>
          </div>
        )}
        
        {showAddButton && (
          <Button 
            className="bg-[#4880ff] text-white"
            onClick={onAddClick}
            data-testid="button-add-new"
          >
            <Plus className="w-4 h-4 mr-2" />
            {addButtonText}
          </Button>
        )}
      </div>
    </div>
  );
}
