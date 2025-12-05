import { useState } from "react";
import { Plus, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function CreateOrder() {
  const [orderItems, setOrderItems] = useState([
    { id: 1, images: ["/placeholder.jpg", "/placeholder.jpg", "/placeholder.jpg", "/placeholder.jpg"] }
  ]);

  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">ID-1758936755066-233</h2>
          <Button variant="outline" className="border-[#4880ff] text-[#4880ff]" data-testid="button-add-new-party">
            + Add New Party
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div>
            <Label>Party Name</Label>
            <Select>
              <SelectTrigger className="mt-1" data-testid="select-party-name">
                <SelectValue placeholder="Shine Sports" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="shine-sports">Shine Sports</SelectItem>
                <SelectItem value="abc-sports">ABC Sports</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Order Placed By</Label>
            <Select>
              <SelectTrigger className="mt-1" data-testid="select-order-placed-by">
                <SelectValue placeholder="Dhanush S" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dhanush">Dhanush S</SelectItem>
                <SelectItem value="rakshith">Rakshith</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Priority</Label>
            <Select>
              <SelectTrigger className="mt-1" data-testid="select-priority">
                <SelectValue placeholder="High" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="row-span-2">
            <Label>Add Note</Label>
            <Textarea 
              placeholder="Write Here" 
              className="mt-1 h-[calc(100%-20px)]"
              data-testid="textarea-note"
            />
          </div>
          <div>
            <Label>Dispatch Date</Label>
            <Select>
              <SelectTrigger className="mt-1" data-testid="select-dispatch-date">
                <SelectValue placeholder="25-09-2025" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="25-09-2025">25-09-2025</SelectItem>
                <SelectItem value="26-09-2025">26-09-2025</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Dispatch Time</Label>
            <Select>
              <SelectTrigger className="mt-1" data-testid="select-dispatch-time">
                <SelectValue placeholder="10:30 AM" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10:30">10:30 AM</SelectItem>
                <SelectItem value="11:00">11:00 AM</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Dispatch Place</Label>
            <Select>
              <SelectTrigger className="mt-1" data-testid="select-dispatch-place">
                <SelectValue placeholder="10:30 AM" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bejai">Bejai, Kapikad Road</SelectItem>
                <SelectItem value="mangalore">Mangalore</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Create Order</h3>
        
        {orderItems.map((item, index) => (
          <div key={item.id} className="mb-6 pb-6 border-b border-gray-200 last:border-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <div className="flex flex-wrap gap-3 mb-4">
                  <div className="w-32 h-40 bg-gray-100 rounded-lg overflow-hidden relative">
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <span className="text-white text-xs">Main Image</span>
                    </div>
                    <button className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <X className="w-3 h-3 text-white" />
                    </button>
                  </div>
                  {[1, 2, 3].map((img) => (
                    <div key={img} className="w-20 h-24 bg-gray-100 rounded-lg overflow-hidden relative">
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                        <span className="text-white text-[10px]">Image</span>
                      </div>
                      <button className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                        <X className="w-2 h-2 text-white" />
                      </button>
                    </div>
                  ))}
                  <div className="w-20 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-[#4880ff]">
                    <Plus className="w-6 h-6 text-gray-400" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Item</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="T-shirt" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tshirt">T-shirt</SelectItem>
                        <SelectItem value="shirt">Shirt</SelectItem>
                        <SelectItem value="pant">Pant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Qty</Label>
                    <Input placeholder="50" className="mt-1" />
                  </div>
                  <div>
                    <Label>Size</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="M - Medium" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="s">S - Small</SelectItem>
                        <SelectItem value="m">M - Medium</SelectItem>
                        <SelectItem value="l">L - Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mt-4">
                  <Label>Custom Note</Label>
                  <Textarea placeholder="Enter notes..." className="mt-1" />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Material</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Fabric" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fabric">Fabric</SelectItem>
                      <SelectItem value="cotton">Cotton</SelectItem>
                      <SelectItem value="polyester">Polyester</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Distribution Type</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Full" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full">Full</SelectItem>
                        <SelectItem value="half">Half</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Back Color</Label>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-300" />
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <Label>Front Color</Label>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-purple-500 border border-gray-300" />
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Spec 1</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Full" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full">Full</SelectItem>
                        <SelectItem value="half">Half</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Sleeve Type</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Full Sleeve" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full">Full Sleeve</SelectItem>
                        <SelectItem value="half">Half Sleeve</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Sleeve Color</Label>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-500 border border-gray-300" />
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Checkbox id="tower" />
                    <Label htmlFor="tower">Tower</Label>
                    <div className="w-6 h-6 rounded-full bg-gray-800 border border-gray-300" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="rib" />
                    <Label htmlFor="rib">RIB</Label>
                    <div className="w-6 h-6 rounded-full bg-blue-500 border border-gray-300" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="cuff" />
                    <Label htmlFor="cuff">CUFF</Label>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Spec 2</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Net Fold" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="netfold">Net Fold</SelectItem>
                        <SelectItem value="plain">Plain</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Neck Type</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="2" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Sleeve Color</Label>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-500 border border-gray-300" />
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Checkbox id="tipping" />
                    <Label htmlFor="tipping">Tipping</Label>
                    <div className="w-6 h-6 rounded-full bg-blue-500 border border-gray-300" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="patti" />
                    <Label htmlFor="patti">Patti</Label>
                    <div className="w-6 h-6 rounded-full bg-blue-500 border border-gray-300" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <Button 
                variant="outline" 
                className="border-[#4880ff] text-[#4880ff] mr-2"
                data-testid="button-add-item"
              >
                + Add Item
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline" className="border-[#4880ff] text-[#4880ff]" data-testid="button-preview">
          Preview
        </Button>
        <Button className="bg-[#4880ff] text-white" data-testid="button-create-order">
          Create Order
        </Button>
        <Button variant="outline" data-testid="button-cancel">
          Cancel
        </Button>
      </div>
    </div>
  );
}
