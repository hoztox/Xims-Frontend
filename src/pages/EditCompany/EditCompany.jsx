import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import "./editcompany.css";
import { BASE_URL } from "../../Utils/Config";
import uploadIcon from "../../assets/images/Companies/choose file.svg";
import { useTheme } from "../../ThemeContext";
import { Cropper } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
// import Cropper from "react-easy-crop";

const EditCompany = () => {
  const cropperRef = useRef(null);
  const [fileName, setFileName] = useState("Choose File");
  const [companyLogoPreview, setCompanyLogoPreview] = useState(null);
  const { theme } = useTheme();
  const [originalFile, setOriginalFile] = useState(null);
  const [formDataState, setFormDataState] = useState({
    company_name: "",
    company_admin_name: "",
    email_address: "",
    phone_no1: "",
    phone_no2: "",
    user_id: "",
    password: "",
    permissions: [],
    company_logo: "",
  });
  const [permissionList, setPermissionList] = useState([]);
  const { companyId } = useParams();
  const navigate = useNavigate();

  // States for the image crop modal
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const cropperSettings = {
    stencilProps: {
      aspectRatio: 1,
      grid: true
    }
  };

  // Fetch permissions from backend
  const fetchPermission = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/accounts/permissions/`);
      const permissions = response.data;
      setPermissionList(Array.isArray(permissions) ? permissions : []);

    } catch (error) {
      console.error("Error fetching permissions:", error);
      toast.error("Failed to fetch permissions.");
    }
  };

  const handlePermissionChange = (permName) => {
    setFormDataState((prevState) => {
      // Create a copy of the current permissions array
      const updatedPermissions = [...prevState.permissions];

      // Check if this permission is already selected
      const permIndex = updatedPermissions.indexOf(permName);

      // If permission exists, remove it; otherwise add it
      if (permIndex !== -1) {
        updatedPermissions.splice(permIndex, 1);
      } else {
        updatedPermissions.push(permName);
      }

      return {
        ...prevState,
        permissions: updatedPermissions,
      };
    });
  };

  // Fetch existing company data when the component mounts
  const fetchCompanyData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/accounts/companies/${companyId}/`
      );
      const companyData = response.data[0]; // Assuming data is in an array
      setFormDataState({
        company_name: companyData.company_name || "",
        company_admin_name: companyData.company_admin_name || "",
        email_address: companyData.email_address || "",
        phone_no1: companyData.phone_no1 || "",
        phone_no2: companyData.phone_no2 || "",
        user_id: companyData.user_id || "",
        password: companyData.password || "",
        permissions: companyData.permissions ? companyData.permissions : [],
        company_logo: companyData.company_logo || "",
      });

      if (companyData.company_logo) {
        setFileName(truncateFileName(companyData.company_logo));
        setCompanyLogoPreview(companyData.company_logo);
      } else {
        setFileName("Choose File");
        setCompanyLogoPreview(null);
      }
      console.log("detailssssssssssssssssssssss", response.data)
    } catch (error) {
      console.error("Error fetching company data:", error);
      toast.error("Failed to fetch company data.");
    }
  };

  useEffect(() => {
    fetchPermission();
    fetchCompanyData();
  }, [companyId]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormDataState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setOriginalFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
        setIsCropModalOpen(true);
      };
      reader.readAsDataURL(file);
    } else {
      setFileName("No file chosen");
      setCompanyLogoPreview(null);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    console.log('Formdataaaa', formData);
    
    formData.append("company_name", formDataState.company_name);
    formData.append("company_admin_name", formDataState.company_admin_name);
    formData.append("email_address", formDataState.email_address);
    formData.append("password", formDataState.password);
    formData.append("phone_no1", formDataState.phone_no1);
    formData.append("phone_no2", formDataState.phone_no2);
    formData.append("user_id", formDataState.user_id);
    formData.append(
      "permissions",
      JSON.stringify(formDataState.permissions)
    );
  
    if (croppedImage && typeof croppedImage !== "string") {
      formData.append("company_logo", croppedImage);
    } else if (originalFile && originalFile !== companyLogoPreview) {
      formData.append("company_logo", originalFile);
    }
    
    // Log each entry to see what's actually in the FormData
    console.log('Form data contents:');
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    
    // Or debug the permissions specifically before submission
    console.log('Permissions being sent:', formDataState.permissions);
    console.log('Permissions JSON:', JSON.stringify(formDataState.permissions));
  
    try {
      const response = await axios.put(
        `${BASE_URL}/accounts/companies/update/${companyId}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (response.status === 200 || response.status === 201) {
        toast.success("Company updated successfully!");
        setTimeout(() => {
          // navigate("/admin/companies");  
        }, 2000);
      }
    } catch (error) {
      console.error("Error updating company:", error);
      toast.error("Failed to update company. Please try again.");
    }
  };

  const handleCropComplete = (croppedArea, croppedAreaPixels) => {
    getCroppedImg(imageSrc, croppedAreaPixels).then((croppedImageUrl) => {
      setCroppedImage(croppedImageUrl); // Set the cropped image URL to state
    });
  };

  const getCroppedImg = (imageSrc, pixelCrop) => {
    const image = new Image();
    image.src = imageSrc;
    return new Promise((resolve) => {
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        ctx.drawImage(
          image,
          pixelCrop.x,
          pixelCrop.y,
          pixelCrop.width,
          pixelCrop.height,
          0,
          0,
          pixelCrop.width,
          pixelCrop.height
        );
        canvas.toBlob((blob) => {
          const croppedImageUrl = URL.createObjectURL(blob);
          resolve(croppedImageUrl); // Resolve with the cropped image URL
        }, "image/jpeg");
      };
    });
  };

  const truncateFileName = (name, maxLength = 20) => {
    const fileName = name.includes("://") ? name.split("/").pop() : name;
    if (fileName.length <= maxLength) return fileName;
    const extension = fileName.split(".").pop();
    const baseName = fileName.substring(0, maxLength - extension.length - 5);
    return `${baseName}...${extension}`;
  };


  const handleCancelCrop = useCallback(() => {
    setIsCropModalOpen(false);
    setCroppedImage(null);
    setImageSrc(null);

  }, []);


  // Handle saving the cropped image
  const handleCropSave = useCallback(() => {
    if (cropperRef.current) {
      const canvas = cropperRef.current.getCanvas();
      if (canvas) {
        canvas.toBlob((blob) => {
          const file = new File([blob], `${Date.now()}_croppedImage.png`, {
            type: "image/png",
          });
          setCroppedImage(file);
          setCompanyLogoPreview(URL.createObjectURL(file)); // Update the preview
          setIsCropModalOpen(false); // Close the modal
          setFormDataState(prevState => ({
            ...prevState,
            company_logo: file, // Save the cropped logo
          }));
          setFileName(file.name);  // Set the new file name after crop
        }, "image/png");
      }
    }
  }, []);


  return (
    <div
      className={`flex flex-col md:flex-row w-full border rounded-lg gap-10 maineditcmpy ${theme === "dark" ? "dark" : "light"
        }`}
    >
      <Toaster position="top-center" reverseOrder={false} />

      {/* Left Form Section */}
      <div className="w-full rounded-lg p-5 ediform lg:w-2/3">
        <h2 className="editcmpnyhead">Edit Company</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <h3 className="text-[#677487] head lg:mb-5">Company Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="company_name">Company Name *</label>
                <input
                  type="text"
                  id="company_name"
                  value={formDataState.company_name}
                  onChange={handleInputChange}
                  className="w-full text-sm focus:outline-none editcmpyinput"
                  required
                />
              </div>
              <div>
                <label htmlFor="company_admin_name">Company Admin Name *</label>
                <input
                  type="text"
                  id="company_admin_name"
                  value={formDataState.company_admin_name}
                  onChange={handleInputChange}
                  className="w-full text-sm focus:outline-none editcmpyinput"
                  required
                />
              </div>
              <div>
                <label htmlFor="email_address">Email Address *</label>
                <input
                  type="email"
                  id="email_address"
                  value={formDataState.email_address}
                  onChange={handleInputChange}
                  className="w-full text-sm focus:outline-none editcmpyinput"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone_no1">Phone No 1</label>
                <input
                  type="tel"
                  id="phone_no1"
                  value={formDataState.phone_no1}
                  onChange={handleInputChange}
                  className="w-full text-sm focus:outline-none editcmpyinput"
                />
              </div>
              <div>
                <label htmlFor="phone_no2">Phone No 2</label>
                <input
                  type="tel"
                  id="phone_no2"
                  value={formDataState.phone_no2}
                  onChange={handleInputChange}
                  className="w-full text-sm focus:outline-none editcmpyinput"
                />
              </div>
              <div className="flex">
                <div>
                  <label htmlFor="company_logo">Company Logo</label>
                  <input
                    type="file"
                    id="company_logo"
                    className="hidden editcmpyinput"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="company_logo"
                    className="flex items-center justify-between text-sm cursor-pointer rounded px-3 lg:w-44 h-11 mt-2 editchoose"
                  >
                    <p
                      className={`filename ${fileName === "Choose File" ||
                        fileName === "No file chosen"
                        ? "editnoup"
                        : "editup"
                        }`}
                    >
                      {fileName}
                    </p>
                    <img src={uploadIcon} alt="Upload" />
                  </label>
                </div>
                <div className="flex flex-col justify-end w-full lg:mb-[8px] lg:ml-3 preview">
                  {(croppedImage || companyLogoPreview) && (
                    <div className="w-20">
                      <img
                        src={
                          croppedImage
                            ? URL.createObjectURL(croppedImage)
                            : companyLogoPreview
                        }
                        alt="Company Logo Preview"
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-[#677487] my-8">Permissions</h3>
              <div className="permissions-list permissionboxes flex">
                {permissionList.map((permission) => (
                  <label
                    key={permission.id}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      value={permission.name}
                      className="form-checkbox"
                      checked={formDataState.permissions.includes(permission.name)}
                      onChange={() => handlePermissionChange(permission.name)}
                    />
                    <span>{permission.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end updatebtnmob">
            <button
              type="submit"
              className="lg:w-1/7 md:w-auto text-white px-7 py-2 rounded duration-200 cursor-pointer updatebtn"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Image Crop Modal */}
      {/* Image Crop Modal */}
      {isCropModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className=" p-4 rounded-lg max-w-2xl">
            <div className="h-96">
              <Cropper
                ref={cropperRef}
                src={imageSrc}
                {...cropperSettings}
                className="h-full"
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={handleCancelCrop}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleCropSave}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Crop & Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditCompany;
