import { useState } from "react";
import { User, Lock, Bell, Palette, Database, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const settingsSections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Security", icon: Lock },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "data", label: "Data & Privacy", icon: Database },
  { id: "permissions", label: "Permissions", icon: Shield },
];

export function Settings() {
  const [activeSection, setActiveSection] = useState("profile");

  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-64 bg-white rounded-xl shadow-sm p-4">
          <nav className="space-y-1">
            {settingsSections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeSection === section.id
                      ? "bg-[#4880ff] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  data-testid={`settings-${section.id}`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{section.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="flex-1 bg-white rounded-xl shadow-sm p-6">
          {activeSection === "profile" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-gray-800 mb-4">Profile Information</h2>
                <p className="text-sm text-gray-500 mb-6">Update your personal details here.</p>
              </div>

              <div className="flex items-center gap-6 mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                  P
                </div>
                <div>
                  <Button variant="outline" className="mb-2">Change Photo</Button>
                  <p className="text-xs text-gray-500">JPG, GIF or PNG. Max size 1MB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="Pradeep" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Kumar" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="pradeep@tribal.com" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" defaultValue="+91 1234567890" className="mt-2" />
                </div>
              </div>

              <Separator className="my-6" />

              <div className="flex justify-end gap-4">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-[#4880ff]">Save Changes</Button>
              </div>
            </div>
          )}

          {activeSection === "security" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-gray-800 mb-4">Security Settings</h2>
                <p className="text-sm text-gray-500 mb-6">Manage your password and security preferences.</p>
              </div>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" className="mt-2" />
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-700">Enable 2FA</p>
                    <p className="text-xs text-gray-500">Add an extra layer of security to your account</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-[#4880ff]">Update Password</Button>
              </div>
            </div>
          )}

          {activeSection === "notifications" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-gray-800 mb-4">Notification Preferences</h2>
                <p className="text-sm text-gray-500 mb-6">Choose what notifications you want to receive.</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <p className="font-medium text-gray-800">Email Notifications</p>
                    <p className="text-sm text-gray-500">Receive email updates about your orders</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <p className="font-medium text-gray-800">Push Notifications</p>
                    <p className="text-sm text-gray-500">Receive push notifications on your device</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <p className="font-medium text-gray-800">SMS Notifications</p>
                    <p className="text-sm text-gray-500">Receive SMS updates for critical alerts</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-gray-800">Marketing Communications</p>
                    <p className="text-sm text-gray-500">Receive updates about new features and offers</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button className="bg-[#4880ff]">Save Preferences</Button>
              </div>
            </div>
          )}

          {activeSection === "appearance" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-gray-800 mb-4">Appearance</h2>
                <p className="text-sm text-gray-500 mb-6">Customize the look and feel of your dashboard.</p>
              </div>

              <div className="space-y-6">
                <div>
                  <Label className="mb-3 block">Theme</Label>
                  <div className="flex gap-4">
                    <div className="p-4 border-2 border-[#4880ff] rounded-lg cursor-pointer bg-white">
                      <div className="w-24 h-16 bg-gray-100 rounded mb-2" />
                      <p className="text-sm font-medium text-center">Light</p>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg cursor-pointer bg-white hover:border-[#4880ff]">
                      <div className="w-24 h-16 bg-gray-800 rounded mb-2" />
                      <p className="text-sm font-medium text-center">Dark</p>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg cursor-pointer bg-white hover:border-[#4880ff]">
                      <div className="w-24 h-16 bg-gradient-to-r from-gray-100 to-gray-800 rounded mb-2" />
                      <p className="text-sm font-medium text-center">System</p>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="mb-3 block">Accent Color</Label>
                  <div className="flex gap-3">
                    {["#4880ff", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"].map((color) => (
                      <div
                        key={color}
                        className={`w-10 h-10 rounded-full cursor-pointer border-2 ${color === "#4880ff" ? "border-gray-800" : "border-transparent"}`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {(activeSection === "data" || activeSection === "permissions") && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-gray-800 mb-4">
                  {activeSection === "data" ? "Data & Privacy" : "Permissions"}
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                  {activeSection === "data" 
                    ? "Manage your data and privacy settings."
                    : "Manage user permissions and roles."
                  }
                </p>
              </div>

              <div className="text-center py-12 text-gray-500">
                <p>This section is under development.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
