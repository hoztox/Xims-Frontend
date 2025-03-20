import React, { useState } from 'react'
import { Search, ChevronUp, Plus } from 'lucide-react';
import arrow from '../../../../assets/images/Company Documentation/arrow.svg';
import view from "../../../../assets/images/Company Documentation/view.svg";
import edit from "../../../../assets/images/Company Documentation/edit.svg";
import deleteIcon from "../../../../assets/images/Company Documentation/delete.svg";
import { useNavigate } from 'react-router-dom';


const BMSPolicy = () => {
    const navigate = useNavigate()
    const [isExpanded, setIsExpanded] = useState(true);
    const [OhsPolicies, setOhsPolicies] = useState([
        { id: 1, name: 'Energy Policy' },
    ]);

    const handleAddBMSpolicy = () => {
        navigate('/company/bms/addpolicy')
    }

    return (
        <div className="bg-[#1C1C24] rounded-lg text-white p-5">
            <h1 className="list-policy-head">List Policy</h1>
            <div className="flex items-center gap-3 pb-6 mb-6 border-b border-[#383840]">
                <span className="doc-path-text">Documentation</span>
                <span className="text-gray-400"><img src={arrow} alt="Arrow" /></span>
                <span className='policy-path-text'>Policy</span>
            </div>

            <div className="flex justify-between items-center mb-6">
                <div className="relative flex">
                    <input
                        type="text"
                        placeholder="Search..."
                        className=" bg-transparent border border-[#383840] rounded-md outline-none p-0 pl-[10px] h-[42px] w-[417px] policy-search duration-200 focus:border-[#43434d]"
                    />
                    <div className='absolute right-[1px] top-[1px] h-[40px] w-[55px] bg-[#24242D] flex justify-center items-center rounded-tr-md rounded-br-md'>
                        <Search className=" text-white w-[18px]" />
                    </div>
                </div>
                <button className="bg-transparent border border-[#F310FF] text-[#F310FF] rounded-[4px] p-[10px] flex items-center justify-center gap-[10px] transition-all duration-200 w-[140px] h-[42px] add-policy-btn hover:bg-[#F310FF] hover:text-white group"
                    onClick={handleAddBMSpolicy}
                >
                    <span>Add Policy</span>
                    <Plus size={22} className='text-[#F310FF] group-hover:text-white transition-colors duration-200' />
                </button>
            </div>

            <div className="bg-[#24242D] rounded-md overflow-hidden">
                <div
                    className="flex justify-between items-center px-5 pt-5 pb-6 cursor-pointer transition-colors duration-200 border-b border-[#383840]"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <h2 className="policy-list-head">Policy</h2>
                    <ChevronUp className={`h-5 w-5 transition-transform duration-300 ease-in-out text-[#AAAAAA] ${isExpanded ? '' : 'rotate-180'}`} />
                </div>

                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    {OhsPolicies.map((ohsPolicy) => (
                        <div key={ohsPolicy.id} className="px-5 pt-6 pb-5 border-b border-gray-700 flex justify-start items-center last:border-b-0">
                            <div className="flex items-center gap-[50px]">
                                <div className='gap-[15px] flex flex-col'>
                                    <span className="policy-name text-[#F310FF]">{ohsPolicy.name}</span>
                                    <button className='flex justify-center items-center gap-2'>
                                        <p className='view-policy-btn-text'>View Policy</p>
                                        <img src={view} alt="View Icon" className='w-[16px] h-[16px]' />
                                    </button>
                                </div>
                                <div className="flex flex-col items-center gap-[15px]">
                                    <span className="actions-text">Edit</span>
                                    <button>
                                        <img src={edit} alt="Edit Icon" className='w-[16px] h-[16px]' />
                                    </button>
                                </div>
                                <div className="flex flex-col items-center gap-[15px]">
                                    <span className="actions-text">Delete</span>
                                    <button>
                                        <img src={deleteIcon} alt="Delete Icon" className='w-[16px] h-[16px]' />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
};

export default BMSPolicy
