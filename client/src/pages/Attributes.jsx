import { useState } from "react";
import { Search, ChevronDown, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { StatsCards } from "@/components/StatsCards";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Package, ShoppingBag, Palette, Ruler, Users } from "lucide-react";

const attributeStats = [
  { title: "Party's", value: "21245", icon: Users, bgColor: "bg-blue-100", iconColor: "text-blue-600" },
  { title: "Products", value: "2", icon: ShoppingBag, bgColor: "bg-green-100", iconColor: "text-green-600" },
  { title: "Materials", value: "8", icon: Package, bgColor: "bg-gray-100", iconColor: "text-gray-600" },
  { title: "Colors", value: "12", icon: Palette, bgColor: "bg-purple-100", iconColor: "text-purple-600" },
  { title: "Size", value: "6", icon: Ruler, bgColor: "bg-orange-100", iconColor: "text-orange-600" },
  { title: "Employees", value: "1", icon: Users, bgColor: "bg-teal-100", iconColor: "text-teal-600" },
];

const colors = [
  { name: "Royal Blue", code: "#1D4ED8", active: true },
  { name: "Crimson Red", code: "#DC2626", active: true },
  { name: "Jet Black", code: "#111827", active: true },
  { name: "Sun Yellow", code: "#FACC15", active: true },
  { name: "Emerald Green", code: "#059669", active: true },
  { name: "Pure White", code: "#FFFFFF", active: true },
  { name: "Charcoal Gray", code: "#374151", active: true },
];

const materials = [
  { name: "Polyester", active: true },
  { name: "Cotton", active: true },
  { name: "Poly-Cotton Blend", active: true },
  { name: "Lycra / Spandex Blend", active: true },
  { name: "Mesh Fabric", active: true },
  { name: "Interlock Knit", active: true },
  { name: "Honeycomb / Pique Fabric", active: true },
];

const products = [
  { name: "Shirt" },
  { name: "T-Shirt" },
  { name: "Boxer" },
  { name: "Pant" },
  { name: "Jacket" },
  { name: "Caps" },
  { name: "Hoodies" },
];

const parties = [
  { name: "Start Sports", location: "Bejai, Mangalore", contact1: "+91 1234567890", contact2: "+91 1234567890", gstin: "GSTIN12345678901" },
  { name: "Start Sports", location: "Bejai, Mangalore", contact1: "+91 1234567890", contact2: "+91 1234567890", gstin: "GSTIN12345678901" },
  { name: "Start Sports", location: "Bejai, Mangalore", contact1: "+91 1234567890", contact2: "+91 1234567890", gstin: "GSTIN12345678901" },
  { name: "Start Sports", location: "Bejai, Mangalore", contact1: "+91 1234567890", contact2: "+91 1234567890", gstin: "GSTIN12345678901" },
  { name: "Start Sports", location: "Bejai, Mangalore", contact1: "+91 1234567890", contact2: "+91 1234567890", gstin: "GSTIN12345678901" },
  { name: "Start Sports", location: "Bejai, Mangalore", contact1: "+91 1234567890", contact2: "+91 1234567890", gstin: "GSTIN12345678901" },
];

export function Attributes() {
  const [activeTab, setActiveTab] = useState("colors");
  const [showAddColorModal, setShowAddColorModal] = useState(false);
  const [showAddMaterialModal, setShowAddMaterialModal] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showAddPartyModal, setShowAddPartyModal] = useState(false);

  const tabs = [
    { id: "colors", label: "Colors" },
    { id: "materials", label: "Materials" },
    { id: "products", label: "Products" },
    { id: "parties", label: "Parties" },
  ];

  const handleAddClick = () => {
    switch (activeTab) {
      case "colors":
        setShowAddColorModal(true);
        break;
      case "materials":
        setShowAddMaterialModal(true);
        break;
      case "products":
        setShowAddProductModal(true);
        break;
      case "parties":
        setShowAddPartyModal(true);
        break;
    }
  };

  const getButtonText = () => {
    switch (activeTab) {
      case "colors": return "Add New Product";
      case "materials": return "Add New Product";
      case "products": return "Add New Product";
      case "parties": return "Add New Party";
      default: return "Add New";
    }
  };

  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen">
      <div className="mb-6">
        <StatsCards stats={attributeStats} />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold text-gray-800">Product Details</h2>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Input
                placeholder="Search"
                className="w-48 lg:w-64 bg-gray-50 border-gray-200 pl-4 pr-10"
                data-testid="input-search"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>

            <Button variant="ghost" className="bg-gray-50 text-gray-600">
              <span className="text-sm">All</span>
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="ghost" className="bg-gray-50 text-gray-600">
              <span className="text-sm">Filter by date range</span>
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>

            <Button 
              className="bg-[#4880ff] text-white"
              onClick={handleAddClick}
              data-testid="button-add-new"
            >
              <Plus className="w-4 h-4 mr-2" />
              {getButtonText()}
            </Button>
          </div>
        </div>

        <div className="flex gap-2 mb-6 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-[#4880ff] text-[#4880ff]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              data-testid={`tab-${tab.id}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "colors" && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#ebf3ff]">
                  <th className="text-left py-4 px-6 font-bold text-sm text-gray-800 rounded-l-lg">Name</th>
                  <th className="text-left py-4 px-6 font-bold text-sm text-gray-800">Color Code</th>
                  <th className="text-center py-4 px-6 font-bold text-sm text-gray-800">Preview</th>
                  <th className="text-center py-4 px-6 font-bold text-sm text-gray-800 rounded-r-lg">Status</th>
                </tr>
              </thead>
              <tbody>
                {colors.map((color, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50" data-testid={`row-color-${index}`}>
                    <td className="py-4 px-6 text-sm text-gray-700">{color.name}</td>
                    <td className="py-4 px-6 text-sm text-gray-700">{color.code}</td>
                    <td className="py-4 px-6">
                      <div 
                        className="w-8 h-8 rounded-full mx-auto border border-gray-200" 
                        style={{ backgroundColor: color.code }}
                      />
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <Checkbox checked={color.active} />
                        <span className="text-sm text-gray-700">Active</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "materials" && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#ebf3ff]">
                  <th className="text-left py-4 px-6 font-bold text-sm text-gray-800 rounded-l-lg">Name</th>
                  <th className="text-center py-4 px-6 font-bold text-sm text-gray-800 rounded-r-lg">Status</th>
                </tr>
              </thead>
              <tbody>
                {materials.map((material, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50" data-testid={`row-material-${index}`}>
                    <td className="py-4 px-6 text-sm text-gray-700">{material.name}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <Checkbox checked={material.active} />
                        <span className="text-sm text-gray-700">Active</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "products" && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#ebf3ff]">
                  <th className="text-left py-4 px-6 font-bold text-sm text-gray-800 rounded-l-lg rounded-r-lg">Name</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50" data-testid={`row-product-${index}`}>
                    <td className="py-4 px-6 text-sm text-gray-700">{product.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "parties" && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#ebf3ff]">
                  <th className="text-left py-4 px-6 font-bold text-sm text-gray-800 rounded-l-lg">Name</th>
                  <th className="text-left py-4 px-6 font-bold text-sm text-gray-800">Location</th>
                  <th className="text-left py-4 px-6 font-bold text-sm text-gray-800">Contact Number 1</th>
                  <th className="text-left py-4 px-6 font-bold text-sm text-gray-800">Contact Number 2</th>
                  <th className="text-left py-4 px-6 font-bold text-sm text-gray-800 rounded-r-lg">GSTIN</th>
                </tr>
              </thead>
              <tbody>
                {parties.map((party, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50" data-testid={`row-party-${index}`}>
                    <td className="py-4 px-6 text-sm text-gray-700">{party.name}</td>
                    <td className="py-4 px-6 text-sm text-gray-700">{party.location}</td>
                    <td className="py-4 px-6 text-sm text-gray-700">{party.contact1}</td>
                    <td className="py-4 px-6 text-sm text-gray-700">{party.contact2}</td>
                    <td className="py-4 px-6 text-sm text-gray-700">{party.gstin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Dialog open={showAddColorModal} onOpenChange={setShowAddColorModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Color</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="colorName">Name</Label>
              <Input id="colorName" placeholder="Enter color name" className="mt-1" />
            </div>
            <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg" />
            <div className="flex gap-4">
              <div className="flex-1">
                <Label>Hex</Label>
                <Input placeholder="#4F46E5" className="mt-1" />
              </div>
              <div className="w-20">
                <Label>Opacity</Label>
                <Input placeholder="100%" className="mt-1" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="colorActive" />
              <Label htmlFor="colorActive">Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddColorModal(false)}>Cancel</Button>
            <Button className="bg-[#4880ff]">Create Color</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showAddMaterialModal} onOpenChange={setShowAddMaterialModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Material</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="materialName">Name</Label>
              <Input id="materialName" placeholder="Enter material name" className="mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="materialCode">Material Code / SKU</Label>
                <Input id="materialCode" placeholder="Material-000123" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="unit">Unit of Measure</Label>
                <Input id="unit" placeholder="Meter" className="mt-1" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="materialActive" />
              <Label htmlFor="materialActive">Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddMaterialModal(false)}>Cancel</Button>
            <Button className="bg-[#4880ff]">Create Material</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showAddProductModal} onOpenChange={setShowAddProductModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="productName">Name</Label>
              <Input id="productName" placeholder="Enter product name" className="mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="productUnit">Unit of Measure</Label>
                <Input id="productUnit" placeholder="Meter" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="productGender">Gender</Label>
                <Input id="productGender" placeholder="Unisex" className="mt-1" />
              </div>
            </div>
            <div>
              <Label htmlFor="productSizes">Available Sizes</Label>
              <Input id="productSizes" placeholder="SL, S, M, L, XL, XXL, XXXL" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="productSku">Product Code / SKU</Label>
              <Input id="productSku" placeholder="PR00123" className="mt-1" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddProductModal(false)}>Cancel</Button>
            <Button className="bg-[#4880ff]">Create Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showAddPartyModal} onOpenChange={setShowAddPartyModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Party</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <Label htmlFor="partyName">Name</Label>
                <Input id="partyName" placeholder="ABC Sports" className="mt-1" />
              </div>
              <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-400 text-xs">Photo</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="partyPhone">Phone Number</Label>
                <Input id="partyPhone" placeholder="+91 1234567890" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="partyEmail">Email</Label>
                <Input id="partyEmail" placeholder="abc@gmail.com" className="mt-1" />
              </div>
            </div>
            <div>
              <Label htmlFor="partyAddress">Address</Label>
              <Input id="partyAddress" placeholder="Bejai, Mangalore" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="partyGstin">GSTIN</Label>
              <Input id="partyGstin" placeholder="Bejai, Mangalore" className="mt-1" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddPartyModal(false)}>Cancel</Button>
            <Button className="bg-[#4880ff]">Create Party</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
