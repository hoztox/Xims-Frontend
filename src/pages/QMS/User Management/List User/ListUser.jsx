import React, { useState } from 'react'
import { Search, PlusCircle, Lock, Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import "./listuser.css"

const ListUser = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const generateUsers = (count) => {
    return Array(count).fill(null).map((_, index) => ({
      id: index + 1,
      userName: 'Anonymous',
      name: 'Anonymous',
      email: 'Anonymous',
      status: 'Live',
    }));
  };

  const allUsers = generateUsers(31);
  const usersPerPage = 10;
  const totalPages = Math.ceil(allUsers.length / usersPerPage);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = allUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevious = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };


  return (
    <div className="bg-[#1C1C24] list-users-main">
        <div className="flex items-center justify-between px-[14px] pt-[24px]">
          <h1 className="list-users-head">List Users</h1>
          <div className="flex space-x-5">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className=" serach-input focus:outline-none bg-transparent"
              />
              <div className='absolute right-3 top-2.5 text-gray-400 bg-gray-800'>
           
                <Search size={18} />
             
              </div>
            </div>
            <button className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-md transition">
              <span>Add Users</span>
              <PlusCircle size={18} />
            </button>
          </div>
        </div>

        <div className=" rounded-md overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-3 px-4 text-left font-medium text-gray-400">No</th>
                <th className="py-3 px-4 text-left font-medium text-gray-400">User Name</th>
                <th className="py-3 px-4 text-left font-medium text-gray-400">Name</th>
                <th className="py-3 px-4 text-left font-medium text-gray-400">Email</th>
                <th className="py-3 px-4 text-left font-medium text-gray-400">Status</th>
                <th className="py-3 px-4 text-left font-medium text-gray-400">Permissions</th>
                <th className="py-3 px-4 text-left font-medium text-gray-400">Edit</th>
                <th className="py-3 px-4 text-left font-medium text-gray-400">Delete</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-750">
                  <td className="py-3 px-4">{indexOfFirstUser + index + 1}</td>
                  <td className="py-3 px-4">{user.userName}</td>
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">{user.status}</td>
                  <td className="py-3 px-4 text-center">
                    <Lock size={18} className="mx-auto text-gray-400" />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button className="text-blue-400 hover:text-blue-300">
                      <Edit2 size={18} className="mx-auto" />
                    </button>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button className="text-red-400 hover:text-red-300">
                      <Trash2 size={18} className="mx-auto" />
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="8" className="py-4 px-6 border-t border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="text-gray-400">
                      Total-{allUsers.length}
                    </div>
                    <div className="flex items-center space-x-1">
                      <button 
                        onClick={handlePrevious}
                        disabled={currentPage === 1}
                        className="px-3 py-1 rounded hover:bg-gray-700 disabled:opacity-50"
                      >
                        Previous
                      </button>
                      
                      {Array.from({ length: Math.min(4, totalPages) }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageClick(page)}
                          className={`px-3 py-1 rounded ${
                            currentPage === page ? 'bg-blue-600' : 'hover:bg-gray-700'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      
                      <button 
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 rounded hover:bg-gray-700 disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
     
  );
};

export default ListUser
