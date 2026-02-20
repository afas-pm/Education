import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Trash2, Edit, Check, X, Search } from "lucide-react";
import { toast } from "react-toastify";
import AdminLayout from "../components/AdminLayout";

const AdminUsers = () => {
    const { token, backendUrl } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchUsers = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/admin/users`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(data.users);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const updateRole = async (id, currentRole) => {
        const newRole = currentRole === "user" ? "admin" : "user";
        if (window.confirm(`Are you sure you want to change role to ${newRole}?`)) {
            try {
                await axios.put(
                    `${backendUrl}/api/admin/user/${id}`,
                    { role: newRole },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                toast.success("Role updated successfully");
                fetchUsers();
            } catch (error) {
                toast.error("Failed to update role");
            }
        }
    };

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                    User Management
                </h1>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-white focus:outline-none focus:border-purple-500 w-64"
                    />
                </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-900/80 border-b border-slate-800">
                        <tr>
                            <th className="p-4 text-slate-400 font-medium">#</th>
                            <th className="p-4 text-slate-400 font-medium">Name</th>
                            <th className="p-4 text-slate-400 font-medium">Email</th>
                            <th className="p-4 text-slate-400 font-medium">Role</th>
                            <th className="p-4 text-slate-400 font-medium">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {loading ? (
                            <tr><td colSpan="5" className="p-8 text-center text-slate-500">Loading...</td></tr>
                        ) : filteredUsers.length === 0 ? (
                            <tr><td colSpan="5" className="p-8 text-center text-slate-500">No users found.</td></tr>
                        ) : (
                            filteredUsers.map((user, index) => (
                                <tr key={user._id} className="hover:bg-slate-800/30 transition-colors">
                                    <td className="p-4 text-slate-500">{index + 1}</td>
                                    <td className="p-4 font-medium">{user.name}</td>
                                    <td className="p-4 text-slate-400">{user.email}</td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${user.role === "admin"
                                            ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                                            : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <button
                                            onClick={() => updateRole(user._id, user.role)}
                                            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-medium transition-colors border border-slate-700"
                                        >
                                            {user.role === "admin" ? "Demote to User" : "Promote to Admin"}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminUsers;
