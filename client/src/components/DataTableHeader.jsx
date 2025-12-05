import { Search, Grid3X3, BarChart3, ChevronDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function DataTableHeader({ 
  title, 
  showSearch = true, 
  showExport = true,
  showViewToggle = true,
  showFilters = true,
  exportText = "Export",
  onExport 
}) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      
      <div className="flex flex-wrap items-center gap-3">
        {showSearch && (
          <div className="relative">
            <Input
              placeholder="Search"
              className="w-48 lg:w-64 bg-gray-50 border-gray-200 pl-4 pr-10"
              data-testid="input-search"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        )}

        {showViewToggle && (
          <>
            <Button variant="ghost" size="icon" className="bg-gray-50" data-testid="button-grid-view">
              <Grid3X3 className="w-4 h-4 text-gray-600" />
            </Button>
            <Button variant="ghost" size="icon" className="bg-gray-50" data-testid="button-chart-view">
              <BarChart3 className="w-4 h-4 text-gray-600" />
            </Button>
          </>
        )}

        {showFilters && (
          <>
            <Button variant="ghost" className="bg-gray-50 text-gray-600" data-testid="button-filter-all">
              <span className="text-sm">All</span>
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="ghost" className="bg-gray-50 text-gray-600" data-testid="button-filter-date">
              <span className="text-sm">Filter by date range</span>
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </>
        )}

        {showExport && (
          <Button 
            className="bg-[#4880ff] text-white"
            onClick={onExport}
            data-testid="button-export"
          >
            <Download className="w-4 h-4 mr-2" />
            {exportText}
          </Button>
        )}
      </div>
    </div>
  );
}
