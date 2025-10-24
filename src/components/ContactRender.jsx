import { Plus, X } from "lucide-react";
import React, { useState } from "react";
import Contact from "./Contact";
import { SearchIcon } from "lucide-react";
// import p to p4 from public folder
import p1 from "../../public/p1.png";
import p2 from "../../public/p2.png";  
import p3 from "../../public/p3.png";
import p4 from "../../public/p4.png";

import useContacts from "@/api";


function ContactRender() {
  const [active, setActive] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const endpoint = active === 0 ? "/contacts" : "/contacts/favourites";

  
  const { data: contacts, loading, error } = useContacts(endpoint);
  console.log(contacts);

  
  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    avatar: "",
    status: "offline",
  });

  const handleAddContact = () => {
    if (!newContact.name || !newContact.email) return;
    setContacts((prev) => [
      ...prev,
      { ...newContact, id: prev.length + 1 },
    ]);
    setShowModal(false);
    setNewContact({
      name: "",
      email: "",
      phone: "",
      role: "",
      avatar: "",
      status: "offline",
    });
  };

  return (
    <div className="w-[98%] mx-auto md:w-[750px] rounded-3xl font-[myfont]">
      
      <div
        className="flex justify-between items-center flex-row p-5 rounded-2xl"
        style={{ boxShadow: "rgba(0, 0, 0, 0.1) -4px 9px 25px -6px" }}
      >
        <h1 className="text-3xl md:text-4xl font-semibold">Contact</h1>

        <div
          className="w-12 h-12 cursor-pointer rounded-full bg-linear-to-br from-[#43a1e0] via-[#3381c9] to-[#2173b2] text-white shadow-lg flex justify-center items-center"
          onClick={() => setShowModal(true)}
        >
          <Plus className="w-6 h-6" />
        </div>
      </div>

      
      <div className="relative w-full mt-4">
        <div className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400">
          <SearchIcon className="w-5 h-5" />
        </div>
        <input
          type="text"
          placeholder={active === 0 ? "Search All" : "Search Favourites"}
          className="w-full rounded-full pl-12 pr-4 py-4 outline-none"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.1) -4px 9px 25px -6px",
          }}
        />
      </div>

     
      <div className="flex gap-3 ml-3 text-black mt-2">
        <span
          onClick={() => setActive(0)}
          className={`font-medium cursor-pointer ${
            active === 0 ? "text-[#3381c9] border-b-[#3381c9]" : ""
          }`}
        >
          All
        </span>
        <span
          onClick={() => setActive(1)}
          className={`font-medium cursor-pointer ${
            active === 1 ? "text-[#3381c9] border-b-[#3381c9]" : ""
          }`}
        >
          Favourite
        </span>
      </div>

      
      <div
        className="custom-scroll w-full mt-4 rounded-3xl p-2 flex flex-col gap-2 h-[75vh] overflow-y-scroll"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.1) -4px 9px 25px -6px",
        }}
      >
        {loading && <p>Loading contacts...</p>}
        {error && <p>Error loading contacts: {error.message}</p>}
        {contacts && contacts?.data?.map((contact) => (
          <Contact key={contact?.id.$oid} contact={contact} />
        ))}
      </div>

     
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-[90%] md:w-[400px] rounded-2xl p-6 relative shadow-lg">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowModal(false)}
            >
              <X />
            </button>
            <h2 className="text-xl font-semibold mb-4 text-[#3381c9]">
              Add New Contact
            </h2>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Full Name"
                className="border rounded-lg p-2 outline-none"
                value={newContact.name}
                onChange={(e) =>
                  setNewContact({ ...newContact, name: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="Email"
                className="border rounded-lg p-2 outline-none"
                value={newContact.email}
                onChange={(e) =>
                  setNewContact({ ...newContact, email: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Phone"
                className="border rounded-lg p-2 outline-none"
                value={newContact.phone}
                onChange={(e) =>
                  setNewContact({ ...newContact, phone: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Role"
                className="border rounded-lg p-2 outline-none"
                value={newContact.role}
                onChange={(e) =>
                  setNewContact({ ...newContact, role: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Avatar URL"
                className="border rounded-lg p-2 outline-none"
                value={newContact.avatar}
                onChange={(e) =>
                  setNewContact({ ...newContact, avatar: e.target.value })
                }
              />

              <button
                onClick={handleAddContact}
                className="bg-linear-to-br from-[#43a1e0] via-[#3381c9] to-[#2173b2] text-white py-2 rounded-lg mt-2"
              >
                Add Contact
              </button>
            </div>
          </div>
        </div>
      )}

      
      <style jsx>{`
        .custom-scroll::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 9999px;
          opacity: 0;
          transition: opacity 0.3s ease, background-color 0.3s ease;
        }
        .custom-scroll:hover::-webkit-scrollbar-thumb {
          opacity: 1;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background-color: #94a3b8;
        }
        .custom-scroll {
          scrollbar-width: thin;
          scrollbar-color: transparent transparent;
          transition: scrollbar-color 0.3s ease;
        }
        .custom-scroll:hover {
          scrollbar-color: #cbd5e1 transparent;
        }
      `}</style>
    </div>
  );
}

export default ContactRender;
