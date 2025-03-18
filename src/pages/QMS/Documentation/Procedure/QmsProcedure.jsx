import React, { useState } from 'react';
import { Search } from 'lucide-react';
import plusicon from "../../../../assets/images/Company Documentation/plus icon.svg";
import edits from "../../../../assets/images/Company Documentation/edit.svg";
import deletes from "../../../../assets/images/Company Documentation/delete.svg";
import { useNavigate } from "react-router-dom";
import "./qmsprocedure.css";

const QmsProcedure = () => {
  const [procedure, setProcedure] = useState([
    { id: 1, procedure_title: "Anonymous", procedure_no: "Anonymous", approved_by: "Anonymous", revision: "Anonymous", date: '03-12-2024' },
    { id: 2, procedure_title: "Anonymous", procedure_no: "Anonymous", approved_by: "Anonymous", revision: "Anonymous", date: '03-12-2024' },
    { id: 3, procedure_title: "Anonymous", procedure_no: "Anonymous", approved_by: "Anonymous", revision: "Anonymous", date: '03-12-2024' },
  ]);

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const procedurePerPage = 10;

  const filteredProcedure = procedure.filter(procedures =>
    procedures.procedure_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    procedures.procedure_no.toLowerCase().includes(searchQuery.toLowerCase()) ||
    procedures.approved_by.toLowerCase().includes(searchQuery.toLowerCase()) ||
    procedures.revision.toLowerCase().includes(searchQuery.toLowerCase()) ||
    procedures.date.replace(/^0+/, '').includes(searchQuery.replace(/^0+/, '')) // Normalizing date search
  );

  const totalPages = Math.ceil(filteredProcedure.length / procedurePerPage);
  const paginatedProcedure = filteredProcedure.slice((currentPage - 1) * procedurePerPage, currentPage * procedurePerPage);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="bg-[#1C1C24] list-procedure-main">
      <div className="flex items-center justify-between px-[14px] pt-[24px]">
        <h1 className="list-procedure-head">List Procedures</h1>
        <div className="flex space-x-5">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="serach-input-procedure focus:outline-none bg-transparent"
            />
            <div className='absolute right-[1px] top-[2px] text-white bg-[#24242D] p-[10.5px] w-[55px] rounded-tr-[6px] rounded-br-[6px] flex justify-center items-center'>
              <Search size={18} />
            </div>
          </div>
          <button className="flex items-center justify-center add-procedure-btn gap-[10px] duration-200">
            <span>Add Procedure</span>
            <img src={plusicon} alt="Add Icon" className='w-[18px] h-[18px] add-plus' />
          </button>
        </div>
      </div>

      <div className="p-5 overflow-hidden">
        <table className="w-full">
          <thead className='bg-[#24242D]'>
            <tr className="h-[48px]">
              <th className="px-5 text-left add-procedure-theads">No</th>
              <th className="px-5 text-left add-procedure-theads">Procedure Title</th>
              <th className="px-5 text-left add-procedure-theads">Procedure No</th>
              <th className="px-5 text-left add-procedure-theads">Approved by</th>
              <th className="px-5 text-left add-procedure-theads">Revision</th>
              <th className="px-5 text-left add-procedure-theads">Date</th>
              <th className="px-5 text-center add-procedure-theads">Edit</th>
              <th className="px-5 text-center add-procedure-theads">Delete</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProcedure.length > 0 ? (
              paginatedProcedure.map((procedure, index) => (
                <tr key={procedure.id} className="border-b border-[#383840] hover:bg-[#1a1a20] cursor-pointer h-[46px]">
                  <td className="px-[23px] add-procedure-datas">{(currentPage - 1) * procedurePerPage + index + 1}</td>
                  <td className="px-5 add-procedure-datas">{procedure.procedure_title}</td>
                  <td className="px-5 add-procedure-datas">{procedure.procedure_no}</td>
                  <td className="px-5 add-procedure-datas">{procedure.approved_by}</td>
                  <td className="px-5 add-procedure-datas">{procedure.revision}</td>
                  <td className="px-5 add-procedure-datas">{procedure.date}</td>
                  <td className="px-4 add-procedure-datas text-center">
                    <button><img src={edits} alt="Edit" className='w-[16px] h-[16px]' /></button>
                  </td>
                  <td className="px-4 add-procedure-datas text-center">
                    <button><img src={deletes} alt="Delete" className='w-[16px] h-[16px]' /></button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4 not-found">No Procedures found.</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="pagination">
          <button onClick={handlePrevious} disabled={currentPage === 1}>Previous</button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} onClick={() => handlePageClick(i + 1)}>{i + 1}</button>
          ))}
          <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default QmsProcedure;
