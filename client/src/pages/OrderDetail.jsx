import { useState } from "react";
import { Link, useParams } from "wouter";
import { ChevronLeft, ExternalLink, Check, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const orderDetails = {
  id: "ID-1758936755066-233",
  partyName: "SHINE SPORTS",
  location: "Mangalore",
  orderReceivedDate: "01-05-2025",
  orderReceivedTime: "12:30pm",
  dispatchDate: "05-06-2025",
  dispatchTime: "12:30pm",
  placedBy: "Dhanush S",
  dispatchPlace: "Bejai, Kapikad Road",
  priority: "Medium",
  progress: 26,
};

const departments = [
  { name: "Designer", status: "Processed", changedOn: "05-05-2025, 12:30pm", changedBy: "Deekshith", comments: "Order have been finalized and approved." },
  { name: "Raw-Material", status: "Processed", changedOn: "05-05-2025, 12:30pm", changedBy: "Deekshith", comments: "Order have been finalized and approved." },
  { name: "Cutting", status: "Processing", changedOn: "05-05-2025, 12:30pm", changedBy: "Deekshith", comments: "Order have been finalized and approved." },
  { name: "Stitching", status: "NA", changedOn: "--", changedBy: "--", comments: "--" },
  { name: "Setting", status: "NA", changedOn: "--", changedBy: "--", comments: "--" },
  { name: "Fusing", status: "NA", changedOn: "--", changedBy: "--", comments: "--" },
  { name: "Trimming", status: "NA", changedOn: "--", changedBy: "--", comments: "--" },
  { name: "Printing", status: "NA", changedOn: "--", changedBy: "--", comments: "--" },
];

const orderItems = [
  { 
    sl: 1, 
    item: "T-shirt", 
    size: "M", 
    qty: 50, 
    distType: "Plain", 
    material: "Plain", 
    spec1: "Narrow", 
    sleeveType: "Half", 
    sleeveColor: "red", 
    spec2: "NET Fold", 
    neckType: 2, 
    color: "red",
    images: ["/placeholder1.jpg", "/placeholder2.jpg", "/placeholder3.jpg"]
  },
  { 
    sl: 2, 
    item: "T-shirt", 
    size: "L", 
    qty: 50, 
    distType: "Plain", 
    material: "Plain", 
    spec1: "Plain", 
    sleeveType: "Half", 
    sleeveColor: "red", 
    spec2: "NET Fold", 
    neckType: 2, 
    color: "red",
    images: ["/placeholder1.jpg", "/placeholder2.jpg", "/placeholder3.jpg"]
  },
];

const qcSpecs = [
  { name: "Ironing", checked: true },
  { name: "Packing", checked: true },
  { name: "Screening", checked: true },
  { name: "Embroidery", checked: false },
  { name: "Button", checked: false },
  { name: "Small Fusing", checked: false },
];

const assignDepts = [
  { name: "Cutting", checked: true },
  { name: "Printing", checked: true },
  { name: "Screen", checked: true },
  { name: "Raw-material", checked: true },
  { name: "Setting", checked: false },
  { name: "Fusing", checked: false },
  { name: "Stitching", checked: false },
  { name: "Small Fusing", checked: false },
];

export function OrderDetail() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showChangeDateModal, setShowChangeDateModal] = useState(false);

  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen">
      <div className="flex items-center gap-2 mb-6">
        <Button 
          variant={activeTab === "overview" ? "default" : "outline"}
          className={activeTab === "overview" ? "bg-[#4880ff]" : ""}
          onClick={() => setActiveTab("overview")}
          data-testid="tab-order-overview"
        >
          Order Overview
        </Button>
        <Button 
          variant={activeTab === "progress" ? "default" : "outline"}
          className={activeTab === "progress" ? "bg-[#4880ff]" : ""}
          onClick={() => setActiveTab("progress")}
          data-testid="tab-progress-report"
        >
          Progress Report
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4" data-testid="order-id">{orderDetails.id}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              <div>
                <p className="text-xs text-gray-500 mb-1">Party Name</p>
                <p className="text-sm font-semibold text-gray-800">{orderDetails.partyName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Location</p>
                <p className="text-sm font-semibold text-gray-800">{orderDetails.location}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Order Received Date</p>
                <p className="text-sm font-semibold text-gray-800">{orderDetails.orderReceivedDate} {orderDetails.orderReceivedTime}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Dispatch Date</p>
                <p className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                  {orderDetails.dispatchDate} {orderDetails.dispatchTime}
                  <ExternalLink className="w-4 h-4 text-gray-400 cursor-pointer" onClick={() => setShowChangeDateModal(true)} />
                </p>
              </div>
              {activeTab === "overview" && (
                <>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Order Placed By</p>
                    <p className="text-sm font-semibold text-gray-800">{orderDetails.placedBy}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Dispatch Place</p>
                    <p className="text-sm font-semibold text-gray-800">{orderDetails.dispatchPlace}</p>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="text-4xl font-bold text-gray-800">{orderDetails.progress}%</div>
            <Badge className="bg-[#4880ff]">In-Progress</Badge>
          </div>
        </div>
      </div>

      {activeTab === "progress" && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">{orderDetails.id}</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#ebf3ff]">
                  <th className="text-left py-3 px-4 font-bold text-sm text-gray-800 rounded-l-lg">Department</th>
                  <th className="text-center py-3 px-4 font-bold text-sm text-gray-800">Status</th>
                  <th className="text-left py-3 px-4 font-bold text-sm text-gray-800">Changed On</th>
                  <th className="text-left py-3 px-4 font-bold text-sm text-gray-800">Changed By</th>
                  <th className="text-left py-3 px-4 font-bold text-sm text-gray-800">Comments</th>
                  <th className="text-center py-3 px-4 font-bold text-sm text-gray-800 rounded-r-lg"></th>
                </tr>
              </thead>
              <tbody>
                {departments.map((dept, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 px-4 text-sm text-gray-700">{dept.name}</td>
                    <td className="py-3 px-4 text-center">
                      <Badge className={
                        dept.status === "Processed" ? "bg-green-500" :
                        dept.status === "Processing" ? "bg-[#4880ff]" :
                        "bg-gray-300 text-gray-600"
                      }>
                        {dept.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">{dept.changedOn}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{dept.changedBy}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{dept.comments}</td>
                    <td className="py-3 px-4 text-center">
                      <ExternalLink className="w-4 h-4 text-gray-400 cursor-pointer mx-auto" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "overview" && (
        <>
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Order Details</h3>
              <Button className="bg-[#4880ff] text-white" data-testid="button-add-item">
                + Add Item
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#ebf3ff]">
                    <th className="text-left py-3 px-3 font-bold text-gray-800 rounded-l-lg">Sl</th>
                    <th className="text-left py-3 px-3 font-bold text-gray-800">Item</th>
                    <th className="text-center py-3 px-3 font-bold text-gray-800">Size</th>
                    <th className="text-center py-3 px-3 font-bold text-gray-800">Qty</th>
                    <th className="text-center py-3 px-3 font-bold text-gray-800">Dist Type</th>
                    <th className="text-center py-3 px-3 font-bold text-gray-800">Material</th>
                    <th className="text-center py-3 px-3 font-bold text-gray-800">Spec-1</th>
                    <th className="text-center py-3 px-3 font-bold text-gray-800">Sleeve Type</th>
                    <th className="text-center py-3 px-3 font-bold text-gray-800">Sleeve Color</th>
                    <th className="text-center py-3 px-3 font-bold text-gray-800">Spec-2</th>
                    <th className="text-center py-3 px-3 font-bold text-gray-800">Neck Type</th>
                    <th className="text-center py-3 px-3 font-bold text-gray-800">Color</th>
                    <th className="text-left py-3 px-3 font-bold text-gray-800 rounded-r-lg">Images</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems.map((item, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 px-3 text-gray-700">{item.sl}</td>
                      <td className="py-3 px-3 text-gray-700">{item.item}</td>
                      <td className="py-3 px-3 text-center text-gray-700">{item.size}</td>
                      <td className="py-3 px-3 text-center text-gray-700">{item.qty}</td>
                      <td className="py-3 px-3 text-center text-gray-700">{item.distType}</td>
                      <td className="py-3 px-3 text-center text-gray-700">{item.material}</td>
                      <td className="py-3 px-3 text-center text-gray-700">{item.spec1}</td>
                      <td className="py-3 px-3 text-center text-gray-700">{item.sleeveType}</td>
                      <td className="py-3 px-3 text-center">
                        <div className="w-4 h-4 rounded-full bg-red-500 mx-auto" />
                      </td>
                      <td className="py-3 px-3 text-center text-gray-700">{item.spec2}</td>
                      <td className="py-3 px-3 text-center text-gray-700">{item.neckType}</td>
                      <td className="py-3 px-3 text-center">
                        <div className="w-4 h-4 rounded-full bg-red-500 mx-auto" />
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex gap-1">
                          {[1, 2, 3].map((img) => (
                            <div key={img} className="w-10 h-10 bg-gray-800 rounded overflow-hidden">
                              <div className="w-full h-full flex items-center justify-center text-white text-xs">
                                Img
                              </div>
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">QC Specification</h3>
              <div className="grid grid-cols-3 gap-4">
                {qcSpecs.map((spec) => (
                  <div key={spec.name} className="flex items-center gap-2">
                    <Checkbox checked={spec.checked} />
                    <span className="text-sm text-gray-700">{spec.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Assign Department</h3>
              <div className="grid grid-cols-2 gap-4">
                {assignDepts.map((dept) => (
                  <div key={dept.name} className="flex items-center gap-2">
                    <Checkbox checked={dept.checked} />
                    <span className="text-sm text-gray-700">{dept.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Custom Note</h3>
              <textarea 
                className="w-full h-32 border border-gray-200 rounded-lg p-3 text-sm resize-none"
                placeholder="Enter custom note..."
              />
            </div>
          </div>
        </>
      )}

      <Dialog open={showChangeDateModal} onOpenChange={setShowChangeDateModal}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-center">Are you sure you want to change the dispatch date?</DialogTitle>
          </DialogHeader>
          <div className="text-center py-4">
            <p className="text-lg font-bold text-gray-800">20-10-2025 to 30-10-2025</p>
          </div>
          <DialogFooter className="flex gap-2 justify-center">
            <Button variant="outline" onClick={() => setShowChangeDateModal(false)}>Cancel</Button>
            <Button className="bg-[#4880ff]">Change</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
