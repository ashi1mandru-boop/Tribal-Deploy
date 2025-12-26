import { useState, useEffect } from "react"; // Added useEffect
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from 'axios';
import { SiFacebook, SiX, SiInstagram, SiYoutube, SiWhatsapp } from "react-icons/si";
import { ArrowRight } from "lucide-react";

const API_BASE_URL = 'http://localhost:5000/api';

export function Login() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  // --- New State for Searchable Dropdown ---
  const [allUsers, setAllUsers] = useState([]); // Stores the full list from server
  const [filteredUsers, setFilteredUsers] = useState([]); // Stores matching users
  const [showDropdown, setShowDropdown] = useState(false);

  // 1. Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/user-ids`);
        setAllUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch user IDs:", err);
      }
    };
    fetchUsers();
  }, []);

  // 2. Filter list whenever username changes
  useEffect(() => {
    if (username.trim() === "") {
      setFilteredUsers([]);
    } else {
      const matches = allUsers.filter((user) =>
        user.toLowerCase().includes(username.toLowerCase())
      );
      setFilteredUsers(matches.slice(0, 8)); // Limit to 8 results for cleaner UI
    }
  }, [username, allUsers]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLocation("/");
  };

  const selectUser = (selectedName) => {
    setUsername(selectedName);
    setShowDropdown(false);
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-16 py-12 bg-white">
        <div className="max-w-md mx-auto w-full">
          <div className="mb-12">
            <h1 className="text-3xl font-bold italic text-gray-800" style={{ fontFamily: 'serif' }}>
              Tribal
            </h1>
            <p className="text-xs text-gray-500 tracking-widest uppercase">Arts & Films</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Login</h2>
            </div>

            {/* --- USERNAME SEARCH INPUT --- */}
            <div className="relative"> {/* Added relative for dropdown positioning */}
              <Label htmlFor="username">Username *</Label>
              <Input
                id="username"
                type="text"
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() => setShowDropdown(true)}
                // Small delay on blur to allow the click on dropdown to register
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                className="mt-2"
                placeholder="Enter your username"
                data-testid="input-username"
              />

              {/* DROPDOWN RESULTS */}
              {showDropdown && filteredUsers.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-48 overflow-auto">
                  {filteredUsers.map((user, index) => (
                    <li
                      key={index}
                      onClick={() => selectUser(user)}
                      className="px-4 py-2 hover:bg-[#4880ff] hover:text-white cursor-pointer text-sm border-b last:border-b-0"
                    >
                      {user}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2"
                placeholder="Enter your password"
                data-testid="input-password"
              />
            </div>

            <div className="text-right">
              <a href="#" className="text-sm text-gray-600 hover:text-[#4880ff]">
                Forgot your password?
              </a>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-[#4880ff] text-white py-6"
              data-testid="button-login"
            >
              LOGIN
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          {/* ... Footer / Social Icons ... */}
          <div className="mt-16">
            <p className="text-sm text-gray-500 mb-4">Follow Us On</p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-[#4880ff] flex items-center justify-center text-white hover:bg-[#3a6fe0]"><SiFacebook className="w-4 h-4" /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-gray-700"><SiX className="w-4 h-4" /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white hover:opacity-90"><SiInstagram className="w-4 h-4" /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white hover:bg-red-700"><SiYoutube className="w-4 h-4" /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white hover:bg-green-600"><SiWhatsapp className="w-4 h-4" /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Right side image section ... unchanged ... */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200')` }}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-white italic" style={{ fontFamily: 'serif' }}>
            Customized Perfection.<br />Every Stitch, Every Print.
          </h2>
        </div>
      </div>
    </div>
  );
}