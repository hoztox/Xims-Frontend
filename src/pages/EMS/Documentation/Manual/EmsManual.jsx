import React, { useState } from "react";
import { Search } from "lucide-react";
import plusicon from "../../../../assets/images/Company Documentation/plus icon.svg";
import edits from "../../../../assets/images/Company Documentation/edit.svg";
import deletes from "../../../../assets/images/Company Documentation/delete.svg";
import { useNavigate } from "react-router-dom";
import "./emsmanual.css";

const EmsManual = () => {
  const [manual, setManual] = useState([
    {
      id: 1,
      section_title: "Anonymous",
      section_no: "Anonymous",
      approved_by: "Anonymous",
      revision: "Anonymous",
      date: "03-12-2024",
    },
    {
      id: 2,
      section_title: "Anonymous",
      section_no: "Anonymous",
      approved_by: "Anonymous",
      revision: "Anonymous",
      date: "03-12-2024",
    },
    {
      id: 3,
      section_title: "Anonymous",
      section_no: "Anonymous",
      approved_by: "Anonymous",
      revision: "Anonymous",
      date: "03-12-2024",
    },
    {
      id: 4,
      section_title: "Anonymous",
      section_no: "Anonymous",
      approved_by: "Anonymous",
      revision: "Anonymous",
      date: "03-12-2024",
    },
    {
      id: 5,
      section_title: "Anonymous",
      section_no: "Anonymous",
      approved_by: "Anonymous",
      revision: "Anonymous",
      date: "03-12-2024",
    },
    {
      id: 6,
      section_title: "Anonymous",
      section_no: "Anonymous",
      approved_by: "Anonymous",
      revision: "Anonymous",
      date: "03-12-2024",
    },
    {
      id: 7,
      section_title: "Anonymous",
      section_no: "Anonymous",
      approved_by: "Anonymous",
      revision: "Anonymous",
      date: "03-12-2024",
    },
    {
      id: 8,
      section_title: "Anonymous",
      section_no: "Anonymous",
      approved_by: "Anonymous",
      revision: "Anonymous",
      date: "03-12-2024",
    },
    {
      id: 9,
      section_title: "Anonymous",
      section_no: "Anonymous",
      approved_by: "Anonymous",
      revision: "Anonymous",
      date: "03-12-2024",
    },
    {
      id: 10,
      section_title: "Anonymous",
      section_no: "Anonymous",
      approved_by: "Anonymous",
      revision: "Anonymous",
      date: "03-12-2024",
    },
    {
      id: 11,
      section_title: "Extra Page Data",
      section_no: "11",
      approved_by: "Manager",
      revision: "V2",
      date: "04-12-2024",
    },
  ]);

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const manualPerPage = 10;

  const filteredManual = manual.filter(
    (manuals) =>
      manuals.section_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      manuals.section_no.toLowerCase().includes(searchQuery.toLowerCase()) ||
      manuals.approved_by.toLowerCase().includes(searchQuery.toLowerCase()) ||
      manuals.revision.toLowerCase().includes(searchQuery.toLowerCase()) ||
      manuals.date.replace(/^0+/, "").includes(searchQuery.replace(/^0+/, "")) // Normalizing date search
  );

  const totalPages = Math.ceil(filteredManual.length / manualPerPage);
  const paginatedManual = filteredManual.slice(
    (currentPage - 1) * manualPerPage,
    currentPage * manualPerPage
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Scroll to top on page change
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleEMSAddManual = () => {
      navigate('/company/ems/addmanual');
  };

  return (
    <div className="bg-[#1C1C24] list-manual-main">
      <div className="flex items-center justify-between px-[14px] pt-[24px]">
        <h1 className="list-manual-head">List Manual Sections</h1>
        <div className="flex space-x-5">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="serach-input-manual focus:outline-none bg-transparent"
            />
            <div className="absolute right-[1px] top-[2px] text-white bg-[#24242D] p-[10.5px] w-[55px] rounded-tr-[6px] rounded-br-[6px] flex justify-center items-center">
              <Search size={18} />
            </div>
          </div>
          <button
            className="flex items-center justify-center add-manual-btn gap-[10px] duration-200 border border-[#38E76C] text-[#38E76C] hover:bg-[#38E76C] hover:text-white"
            onClick={handleEMSAddManual}
          >
            <span>Add Manual Sections</span>
            <img
              src={plusicon}
              alt="Add Icon"
              className="w-[18px] h-[18px] ems-add-plus"
            />
          </button>
        </div>
      </div>

      <div className="p-5 overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#24242D]">
            <tr className="h-[48px]">
              <th className="px-5 text-left add-manual-theads">No</th>
              <th className="px-5 text-left add-manual-theads">
                Section Title
              </th>
              <th className="px-5 text-left add-manual-theads">Section No</th>
              <th className="px-5 text-left add-manual-theads">Approved by</th>
              <th className="px-5 text-left add-manual-theads">Revision</th>
              <th className="px-5 text-left add-manual-theads">Date</th>
              <th className="px-5 text-center add-manual-theads">Edit</th>
              <th className="px-5 text-center add-manual-theads">Delete</th>
            </tr>
          </thead>
          <tbody key={currentPage}>
            {paginatedManual.length > 0 ? (
              paginatedManual.map((manual, index) => (
                <tr
                  key={manual.id}
                  className="border-b border-[#383840] hover:bg-[#1a1a20] cursor-pointer h-[46px]"
                >
                  <td className="px-[23px] add-manual-datas">
                    {(currentPage - 1) * manualPerPage + index + 1}
                  </td>
                  <td className="px-5 add-manual-datas">
                    {manual.section_title}
                  </td>
                  <td className="px-5 add-manual-datas">{manual.section_no}</td>
                  <td className="px-5 add-manual-datas">
                    {manual.approved_by}
                  </td>
                  <td className="px-5 add-manual-datas">{manual.revision}</td>
                  <td className="px-5 add-manual-datas">{manual.date}</td>
                  <td className="px-4 add-manual-datas text-center">
                    <button>
                      <img
                        src={edits}
                        alt="Edit"
                        className="w-[16px] h-[16px]"
                      />
                    </button>
                  </td>
                  <td className="px-4 add-manual-datas text-center">
                    <button>
                      <img
                        src={deletes}
                        alt="Delete"
                        className="w-[16px] h-[16px]"
                      />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4 not-found">
                  No Manuals found.
                </td>
              </tr>
            )}
            <tr>
              <td colSpan="8" className="pt-[15px] border-t border-[#383840]">
                <div className="flex items-center justify-between">
                  <div className="text-white total-text">
                    Total-{filteredManual.length}
                  </div>
                  <div className="flex items-center gap-5">
                    <button
                      onClick={handlePrevious}
                      disabled={currentPage === 1}
                      className="cursor-pointer swipe-text"
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => handlePageClick(page)}
                          className={`${
                            currentPage === page
                              ? "pagin-active"
                              : "pagin-inactive"
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}
                    <button
                      onClick={handleNext}
                      disabled={currentPage === totalPages}
                      className="cursor-pointer swipe-text"
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

export default EmsManual;
