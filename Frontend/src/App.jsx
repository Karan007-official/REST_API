import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit, FaUsers } from "react-icons/fa";

export default function App() {
  const [users, setUsers] = useState([]);
  const [apiUsers, setApiUsers] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  const [editId, setEditId] = useState(null);

  const API = "http://localhost:5000/users";


  const fetchUsers = async () => {
    try {
      const res = await axios.get(API);
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };


  const fetchApiUsers = async () => {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      setApiUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchApiUsers();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(`${API}/${editId}`, form);
        setEditId(null);
      } else {
        await axios.post(API, form);
      }

      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
      });

      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };


  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };


  const editUser = (user) => {
    setForm({
      name: user.name,
      email: user.email,
      phone: user.phone,
      company: user.company,
    });

    setEditId(user.id);
  };

  // FILTERS
  const filteredDbUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  );

  const filteredApiUsers = apiUsers.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-8">
          <FaUsers size={35} />
          <h1 className="text-4xl font-bold">User Management Dashboard</h1>
        </div>

        {/* STATS */}
        <div className="bg-slate-900 rounded-3xl p-6 mb-8 border border-slate-800">
          <h2 className="text-xl font-semibold">Total Users</h2>

          <p className="text-5xl mt-3 font-bold text-blue-400">
            {users.length + apiUsers.length}
          </p>
        </div>

        {/* FORM */}
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 mb-8">
          <h2 className="text-2xl font-semibold mb-5">
            {editId ? "Update User" : "Add User"}
          </h2>

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="bg-slate-800 p-3 rounded-xl outline-none"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="bg-slate-800 p-3 rounded-xl outline-none"
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              className="bg-slate-800 p-3 rounded-xl outline-none"
              required
            />

            <input
              type="text"
              name="company"
              placeholder="Company"
              value={form.company}
              onChange={handleChange}
              className="bg-slate-800 p-3 rounded-xl outline-none"
              required
            />

            <button className="bg-blue-600 hover:bg-blue-700 rounded-xl p-3 font-semibold col-span-full">
              {editId ? "Update User" : "Add User"}
            </button>
          </form>
        </div>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search User..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-900 p-4 rounded-2xl mb-8 outline-none border border-slate-800"
        />

        {/* API USERS */}
        <h2 className="text-3xl font-bold mb-6 text-blue-400">
          API Users (JSONPlaceholder)
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredApiUsers.map((user) => (
            <div
              key={user.id}
              className="bg-slate-900 rounded-3xl p-6 border border-blue-800 hover:scale-105 transition"
            >
              <h2 className="text-2xl font-bold mb-2">{user.name}</h2>

              <p className="text-slate-300">{user.email}</p>

              <p className="text-slate-300">{user.phone}</p>

              <p className="text-slate-300 mb-4">{user.company.name}</p>

              <span className="bg-blue-600 px-3 py-1 rounded-lg text-sm">
                API User
              </span>
            </div>
          ))}
        </div>

        {/* DATABASE USERS */}
        <h2 className="text-3xl font-bold mb-6 text-green-400">
          Database Users
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDbUsers.map((user) => (
            <div
              key={user.id}
              className="bg-slate-900 rounded-3xl p-6 border border-slate-800 hover:scale-105 transition"
            >
              <h2 className="text-2xl font-bold mb-2">{user.name}</h2>

              <p className="text-slate-300">{user.email}</p>

              <p className="text-slate-300">{user.phone}</p>

              <p className="text-slate-300 mb-5">{user.company}</p>

              <div className="flex gap-3">
                <button
                  onClick={() => editUser(user)}
                  className="bg-yellow-500 p-3 rounded-xl"
                >
                  <FaEdit />
                </button>

                <button
                  onClick={() => deleteUser(user.id)}
                  className="bg-red-600 p-3 rounded-xl"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
