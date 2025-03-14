import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {BASE_URL} from "../../../../Utils/Config"
import axios from 'axios';
import "./adduser.css";

const AddUser = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    password: '',
    confirm_password: '',
    gender: '',
    date_of_birth: { day: '', month: '', year: '' },
    address: '',
    city: '',
    zip_po_box: '',
    province_state: '',
    country: '',
    department_division: '',
    email: '',
    confirm_email: '',
    phone: '',
    office_phone: '',
    mobile_phone: '',
    fax: '',
    secret_question: '',
    answer: '',
    notes: '',
    status: 'live',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleDobChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      date_of_birth: {
        ...formData.date_of_birth,
        [name]: value
      }
    });
  };

  const handleListUsers = () => {
    navigate('/company/qms/listuser');
  };

  const handleCancel = () => {
    navigate('/company/qms/listuser');
  };

  const validateForm = () => {
    // Check required fields
    const requiredFields = ['username', 'first_name', 'last_name', 'password', 'confirm_password', 'country', 'email', 'confirm_email', 'phone', 'secret_question', 'answer'];
    
    for (const field of requiredFields) {
      if (!formData[field]) {
        setError(`${field.replace('_', ' ')} is required`);
        return false;
      }
    }

    // Check password match
    if (formData.password !== formData.confirm_password) {
      setError('Passwords do not match');
      return false;
    }

    // Check email match
    if (formData.email !== formData.confirm_email) {
      setError('Emails do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
  
    setIsLoading(true);
    setError(null);
  
    try {
      // Format date of birth
      let formattedDob = '';
      const { day, month, year } = formData.date_of_birth;
      if (day && month && year) {
        formattedDob = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      }
  
      // Prepare data for submission
      const dataToSubmit = {
        ...formData,
        date_of_birth: formattedDob || null,
        // Include the confirmation fields that the backend requires
        confirm_password: formData.confirm_password,
        confirm_email: formData.confirm_email
      };
      
      // Remove the date_of_birth object since we've already formatted it
      delete dataToSubmit.date_of_birth;
      
      // Add back formatted date of birth if it exists
      if (formattedDob) {
        dataToSubmit.date_of_birth = formattedDob;
      }
  
      console.log('Sending data:', dataToSubmit);
  
      const response = await axios.post(`${BASE_URL}/company/users/create/`, dataToSubmit);
  
      // Handle success
      if (response.status === 201) {
        console.log('Added User', response.data);
        navigate('/company/qms/listuser');
      }
    } catch (err) {
      console.error('Error saving user:', err);
      
      if (err.response?.data) {
        // Format the error from the backend response
        const errorData = err.response.data;
        let errorMessage = 'An error occurred while saving the user:';
        
        // Convert error object to readable message
        Object.keys(errorData).forEach(key => {
          const errorMessages = errorData[key];
          if (Array.isArray(errorMessages)) {
            errorMessage += `\n- ${key}: ${errorMessages.join(', ')}`;
          } else {
            errorMessage += `\n- ${key}: ${errorMessages}`;
          }
        });
        
        setError(errorMessage);
      } else {
        setError('An error occurred while saving the user.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="bg-[#1C1C24]">
      <div className="flex justify-between items-center add-user-header">
        <h1 className="add-user-text">Add User</h1>
        <button 
          className="list-user-btn duration-200"
          onClick={handleListUsers}
        >
          List Users
        </button>
      </div>

      {error && (
        <div className="mx-[122px] mt-4 p-3 bg-red-500 text-white rounded">
          {error}
        </div>
      )}

      <form className="add-user-form" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-[122px] py-[23px]">
          <div>
            <label className="add-user-label">User Name <span className='required-field'>*</span></label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full add-user-inputs"
            />
          </div>
          <div></div> {/* Empty div for alignment */}

          <div>
            <label className="add-user-label">Password <span className='required-field'>*</span></label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full add-user-inputs"
            />
          </div>
          <div>
            <label className="add-user-label">Confirm Password <span className='required-field'>*</span></label>
            <input
              type="password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              className="w-full add-user-inputs"
            />
          </div>

          <div>
            <label className="add-user-label">First Name <span className='required-field'>*</span></label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full add-user-inputs"
            />
          </div>
          <div>
            <label className="add-user-label">Last Name <span className='required-field'>*</span></label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full add-user-inputs"
            />
          </div>

          <div>
            <label className="add-user-label">Gender</label>
            <div className="relative">
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full add-user-inputs appearance-none"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <div className="absolute inset-y-0 right-0 top-3 flex items-center px-2 pointer-events-none">
                <svg className="w-5 h-5 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div>
            <label className="add-user-label">DOB</label>
            <div className="grid grid-cols-3 gap-2">
              <div className="relative">
                <select
                  name="day"
                  value={formData.date_of_birth.day}
                  onChange={handleDobChange}
                  className="w-full add-user-inputs appearance-none"
                >
                  <option value="">dd</option>
                  {[...Array(31)].map((_, i) => (
                    <option key={i} value={(i + 1).toString()}>{i + 1}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 top-3 flex items-center px-2 pointer-events-none">
                  <svg className="w-5 h-5 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              <div className="relative">
                <select
                  name="month"
                  value={formData.date_of_birth.month}
                  onChange={handleDobChange}
                  className="w-full add-user-inputs appearance-none"
                >
                  <option value="">mm</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i} value={(i + 1).toString()}>{i + 1}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 top-3 flex items-center px-2 pointer-events-none">
                  <svg className="w-5 h-5 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              <div className="relative">
                <select
                  name="year"
                  value={formData.date_of_birth.year}
                  onChange={handleDobChange}
                  className="w-full add-user-inputs appearance-none"
                >
                  <option value="">yyyy</option>
                  {[...Array(100)].map((_, i) => {
                    const year = new Date().getFullYear() - i;
                    return <option key={i} value={year.toString()}>{year}</option>;
                  })}
                </select>
                <div className="absolute inset-y-0 right-0 top-3 flex items-center px-2 pointer-events-none">
                  <svg className="w-5 h-5 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="add-user-label">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full add-user-inputs add-user-address"
            />
          </div>

          <div>
            <label className="add-user-label">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full add-user-inputs"
            />
          </div>
          <div>
            <label className="add-user-label">Province/State</label>
            <input
              type="text"
              name="province_state"
              value={formData.province_state}
              onChange={handleChange}
              className="w-full add-user-inputs"
            />
          </div>

          <div>
            <label className="add-user-label">Zip/P.O.Box</label>
            <input
              type="text"
              name="zip_po_box"
              value={formData.zip_po_box}
              onChange={handleChange}
              className="w-full add-user-inputs"
            />
          </div>
          <div></div> {/* Empty div for alignment (removed business sector) */}

          <div>
            <label className="add-user-label">Country <span className='required-field'>*</span></label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full add-user-inputs"
            />
          </div>
          <div>
            <label className="add-user-label">Department / Division</label>
            <input
              type="text"
              name="department_division"
              value={formData.department_division}
              onChange={handleChange}
              className="w-full add-user-inputs"
            />
          </div>

          <div>
            <label className="add-user-label">Email <span className='required-field'>*</span></label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full add-user-inputs"
            />
          </div>
          <div>
            <label className="add-user-label">Confirm Email <span className='required-field'>*</span></label>
            <input
              type="email"
              name="confirm_email"
              value={formData.confirm_email}
              onChange={handleChange}
              className="w-full add-user-inputs"
            />
          </div>

          <div>
            <label className="add-user-label">Phone <span className='required-field'>*</span></label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full add-user-inputs"
            />
          </div>
          <div>
            <label className="add-user-label">Office Phone</label>
            <input
              type="tel"
              name="office_phone"
              value={formData.office_phone}
              onChange={handleChange}
              className="w-full add-user-inputs"
            />
          </div>

          <div>
            <label className="add-user-label">Mobile Phone</label>
            <input
              type="tel"
              name="mobile_phone"
              value={formData.mobile_phone}
              onChange={handleChange}
              className="w-full add-user-inputs"
            />
          </div>
          <div>
            <label className="add-user-label">Fax</label>
            <input
              type="tel"
              name="fax"
              value={formData.fax}
              onChange={handleChange}
              className="w-full add-user-inputs"
            />
          </div>

          <div>
            <label className="add-user-label">Secret Question <span className='required-field'>*</span></label>
            <input
              type="text"
              name="secret_question"
              value={formData.secret_question}
              onChange={handleChange}
              className="w-full add-user-inputs"
            />
          </div>
          <div>
            <label className="add-user-label">Answer <span className='required-field'>*</span></label>
            <input
              type="text"
              name="answer"
              value={formData.answer}
              onChange={handleChange}
              className="w-full add-user-inputs"
            />
          </div>

          <div className="md:col-span-2">
            <label className="add-user-label">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              className="w-full add-user-inputs add-user-notes"
            ></textarea>
          </div>

          <div>
            <label className="add-user-label">Status</label>
            <div className="relative">
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full add-user-inputs appearance-none"
              >
                <option value="live">Live</option>
                <option value="blocked">Blocked</option>
              </select>
              <div className="absolute inset-y-0 right-0 top-3 flex items-center px-2 pointer-events-none">
                <svg className="w-5 h-5 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-[22px] mt-5 mx-[122px] pb-[22px]">
          <button
            type="button"
            className="cancel-btns duration-200"
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="save-btns duration-200"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;