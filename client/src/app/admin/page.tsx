'use client'
import { Profile } from "@/components/admin/Profile";
import { AuthProvider } from "@/context/AuthContext";

 
 const AdminDashboard = () => {
  return (
    <AuthProvider>
    <div className=" p-6">
    <Profile />
      </div>
    <div className="flex w-full h-screen"> 
       
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold">Welcome to the Admin Panel</h1>
        <p className="mt-4">Select a table from the sidebar to manage data.</p>
      </div>
    </div>
    </AuthProvider>
  );
};

export default AdminDashboard;
