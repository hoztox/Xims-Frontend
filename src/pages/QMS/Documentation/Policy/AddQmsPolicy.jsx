import React, { useRef, useState, useEffect } from 'react';
import { 
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, 
  AlignJustify, List, ListOrdered, Indent, Outdent, Link, Unlink, 
  Image, FileUp, Type, Highlighter
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { BASE_URL } from "../../../../Utils/Config";

const AddQmsPolicy = () => {
  const [formData, setFormData] = useState({
    content: '',
    energyPolicy: null
  });
  const editorRef = useRef(null);
  const imageInputRef = useRef(null);
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [showBgColorPicker, setShowBgColorPicker] = useState(false);
  const colorPickerRef = useRef(null);
  const [activeStyles, setActiveStyles] = useState({
    bold: false,
    italic: false,
    underline: false,
    align: 'left',
    unorderedList: false,
    orderedList: false,
    indent: false,
    outdent: false,
    textColor: '#FFFFFF', // Default text color
    bgColor: 'transparent' // Default background color
  });
  
  const colorPalette = [
    '#FFFFFF', '#000000', '#FF0000', '#00FF00', '#0000FF',
    '#FFFF00', '#00FFFF', '#FF00FF', '#C0C0C0', '#808080',
    '#800000', '#808000', '#008000', '#800080', '#008080',
    '#000080', '#FFA500', '#A52A2A', '#F5F5DC', '#FFD700'
  ];

  // Font options
  const fontSizes = [
    { label: 'Small', value: '1' },
    { label: 'Normal', value: '3' },
    { label: 'Large', value: '5' },
    { label: 'Extra Large', value: '7' }
  ];

  const fontStyles = [
    { label: 'Arial', value: 'Arial' },
    { label: 'Times New Roman', value: 'Times New Roman' },
    { label: 'Courier New', value: 'Courier New' },
    { label: 'Georgia', value: 'Georgia' }
  ];

  const fontFormats = [
    { label: 'Paragraph', value: 'p' },
    { label: 'Heading 1', value: 'h1' },
    { label: 'Heading 2', value: 'h2' },
    { label: 'Heading 3', value: 'h3' },
    { label: 'Preformatted', value: 'pre' }
  ];

  // Add state for selected dropdown values
  const [selectedFontSize, setSelectedFontSize] = useState(fontSizes[1].label); // 'Normal'
  const [selectedFontStyle, setSelectedFontStyle] = useState(fontStyles[0].label); // 'Arial'
  const [selectedFontFormat, setSelectedFontFormat] = useState(fontFormats[0].label); // 'Paragraph'

  // Handle file selection for policy attachment
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        energyPolicy: file
      });
    }
  };

  // Handle image upload for the editor
  const handleImageUpload = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];

      // Only process image files
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }

      // Create a FileReader to read the image
      const reader = new FileReader();

      reader.onload = (event) => {
        // Get the image data URL
        const imageUrl = event.target.result;

        // Focus the editor
        editorRef.current.focus();

        // Insert the image at the current cursor position
        document.execCommand('insertImage', false, imageUrl);

        // Apply some basic styling to the image
        setTimeout(() => {
          const images = editorRef.current.querySelectorAll('img');
          const insertedImage = images[images.length - 1];

          if (insertedImage) {
            // Set reasonable max dimensions while maintaining aspect ratio
            insertedImage.style.maxWidth = '100%';
            insertedImage.style.height = 'auto';
            insertedImage.style.display = 'block';
            insertedImage.style.margin = '10px 0';
          }
        }, 0);
      };

      // Read the image file as a data URL
      reader.readAsDataURL(file);

      // Clear the input to allow selecting the same file again
      e.target.value = null;
    }
  };

  // Initialize the editor with default formatting
  const initializeDefaultStyles = () => {
    if (!editorRef.current) return;

    // Focus the editor
    editorRef.current.focus();

    // Set default font style
    document.execCommand('fontName', false, fontStyles[0].value);

    // Set default font size
    document.execCommand('fontSize', false, fontSizes[1].value);

    // Set default format block
    document.execCommand('formatBlock', false, fontFormats[0].value);
  };

  // Apply formatting to the text
  const execCommand = (command, value = null) => {
    // Make sure editor has focus before executing command
    if (editorRef.current) {
      editorRef.current.focus();

      // Execute the command
      document.execCommand(command, false, value);

      // Special handling for list commands which can be finicky
      if (command === 'insertUnorderedList' || command === 'insertOrderedList') {
        // Force update after a short delay to ensure command is applied
        setTimeout(() => {
          updateActiveStyles();
        }, 10);
      } else {
        updateActiveStyles();
      }
    }
  };

  const handleTextColor = (color) => {
    execCommand('foreColor', color);
    setActiveStyles(prev => ({ ...prev, textColor: color }));
    setShowTextColorPicker(false);
  };

  const handleBackgroundColor = (color) => {
    execCommand('hiliteColor', color);
    setActiveStyles(prev => ({ ...prev, bgColor: color }));
    setShowBgColorPicker(false);
  };

  // Trigger color picker for text color
  const toggleTextColorPicker = () => {
    setShowTextColorPicker(!showTextColorPicker);
    setShowBgColorPicker(false);
  };

  // Trigger color picker for background color
  const toggleBgColorPicker = () => {
    setShowBgColorPicker(!showBgColorPicker);
    setShowTextColorPicker(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
        setShowTextColorPicker(false);
        setShowBgColorPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Update active styles based on current selection
  const updateActiveStyles = () => {
    if (document.activeElement !== editorRef.current) return;

    // Check format block state
    const formatBlock = document.queryCommandValue('formatBlock');
    const textColor = document.queryCommandValue('foreColor');
    const bgColor = document.queryCommandValue('hiliteColor') || 'transparent';

    setActiveStyles({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      align: document.queryCommandState('justifyCenter') ? 'center' :
        document.queryCommandState('justifyRight') ? 'right' :
          document.queryCommandState('justifyFull') ? 'justify' : 'left',
      unorderedList: document.queryCommandState('insertUnorderedList'),
      orderedList: document.queryCommandState('insertOrderedList'),
      indent: false, // No direct state for indent
      outdent: false, // No direct state for outdent
      formatBlock: formatBlock || 'p',
      textColor: textColor || '#FFFFFF',
      bgColor: bgColor || 'transparent'
    });

    // Update selected format
    if (formatBlock) {
      const fontFormatOption = fontFormats.find(option => option.value === formatBlock);
      if (fontFormatOption) {
        setSelectedFontFormat(fontFormatOption.label);
      }
    }

    // Update font style
    const fontName = document.queryCommandValue('fontName');
    if (fontName) {
      // Check if it's a system font stack or one of our defined fonts
      const matchedFont = fontStyles.find(
        font => fontName.includes(font.value) || font.value === fontName
      );

      if (matchedFont) {
        setSelectedFontStyle(matchedFont.label);
      } else if (fontName.includes(',')) {
        // Handle system font stack by displaying the first font in the stack
        const firstFont = fontName.split(',')[0].trim().replace(/"/g, '');
        setSelectedFontStyle(firstFont);
      } else {
        setSelectedFontStyle(fontName);
      }
    }

    // Update font size
    const fontSize = document.queryCommandValue('fontSize');
    if (fontSize) {
      const fontSizeOption = fontSizes.find(option => option.value === fontSize);
      if (fontSizeOption) {
        setSelectedFontSize(fontSizeOption.label);
      }
    }
  };

  // Enhanced list creation with fixed bullet/number visibility
  const createList = (type) => {
    // Ensure we have focus
    editorRef.current.focus();

    // Determine the command to execute
    const command = type === 'ul' ? 'insertUnorderedList' : 'insertOrderedList';

    // Execute the list command
    document.execCommand(command, false, null);

    // Fix list styling after creation
    setTimeout(() => {
      // Find all lists in the editor and ensure they have proper styling
      const lists = editorRef.current.querySelectorAll('ul, ol');

      lists.forEach(list => {
        // Make sure list has the correct display and list-style properties
        if (list.tagName === 'UL') {
          list.style.display = 'block';
          list.style.listStyleType = 'disc';
          list.style.paddingLeft = '40px';
          list.style.marginLeft = '0';
        } else if (list.tagName === 'OL') {
          list.style.display = 'block';
          list.style.listStyleType = 'decimal';
          list.style.paddingLeft = '40px';
          list.style.marginLeft = '0';
        }

        // Ensure list items also have proper styling
        const items = list.querySelectorAll('li');
        items.forEach(item => {
          item.style.display = 'list-item';
        });
      });

      updateActiveStyles();
    }, 10);
  };

  // Handle specialized list functionality
  const handleList = (type) => {
    createList(type);
  };

  // Improved indent/outdent handlers
  const handleIndent = () => {
    // Focus the editor
    editorRef.current.focus();

    // Get selection
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);

    // Try to find the closest list item
    let currentNode = range.commonAncestorContainer;

    // If we're in a text node, get its parent
    if (currentNode.nodeType === 3) {
      currentNode = currentNode.parentNode;
    }

    // See if we're in a list item
    let listItem = null;
    while (currentNode && currentNode !== editorRef.current) {
      if (currentNode.nodeName === 'LI') {
        listItem = currentNode;
        break;
      }
      currentNode = currentNode.parentNode;
    }

    // If we're in a list item, we can use the built-in indent
    if (listItem) {
      execCommand('indent');
    } else {
      // Otherwise, apply padding to create indentation effect
      // This works for paragraphs and other block elements
      execCommand('formatBlock', '<div>');
      const selectedElement = document.getSelection().anchorNode.parentNode;

      // Add indentation through inline style
      const currentPadding = parseInt(selectedElement.style.paddingLeft || '0');
      selectedElement.style.paddingLeft = (currentPadding + 40) + 'px';

      setActiveStyles(prev => ({ ...prev, indent: true }));
    }
  };

  const handleOutdent = () => {
    // Focus the editor
    editorRef.current.focus();

    // Get selection
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);

    // Try to find the closest list item
    let currentNode = range.commonAncestorContainer;

    // If we're in a text node, get its parent
    if (currentNode.nodeType === 3) {
      currentNode = currentNode.parentNode;
    }

    // See if we're in a list item
    let listItem = null;
    while (currentNode && currentNode !== editorRef.current) {
      if (currentNode.nodeName === 'LI') {
        listItem = currentNode;
        break;
      }
      currentNode = currentNode.parentNode;
    }

    // If we're in a list item, we can use the built-in outdent
    if (listItem) {
      execCommand('outdent');
    } else {
      // Otherwise, reduce padding to create outdentation effect
      const selectedElement = document.getSelection().anchorNode.parentNode;

      // Reduce indentation through inline style
      const currentPadding = parseInt(selectedElement.style.paddingLeft || '0');
      if (currentPadding > 0) {
        selectedElement.style.paddingLeft = Math.max(0, currentPadding - 40) + 'px';
      }

      setActiveStyles(prev => ({ ...prev, outdent: currentPadding <= 0 }));
    }
  };

  // Updated dropdown handlers to set selected state
  const handleFontSize = (size) => {
    execCommand('fontSize', size);

    // Update the selected font size title based on size value
    const fontSizeOption = fontSizes.find(option => option.value === size);
    if (fontSizeOption) {
      setSelectedFontSize(fontSizeOption.label);
    }
  };

  const handleFontStyle = (font) => {
    execCommand('fontName', font);
    setSelectedFontStyle(font);
  };

  const handleFontFormat = (format) => {
    execCommand('formatBlock', format);

    // Update the selected format title based on format value
    const fontFormatOption = fontFormats.find(option => option.value === format);
    if (fontFormatOption) {
      setSelectedFontFormat(fontFormatOption.label);
    }
  };

  const handleCreateLink = () => {
    const url = prompt('Enter URL:', 'http://');
    if (url) {
      execCommand('createLink', url);
    }
  };

  // Handle inserting image via URL
  const handleInsertImage = () => {
    const url = prompt('Enter image URL:', 'http://');
    if (url) {
      execCommand('insertImage', url);

      // Apply styling to the inserted image
      setTimeout(() => {
        const images = editorRef.current.querySelectorAll('img');
        const insertedImage = images[images.length - 1];

        if (insertedImage) {
          // Set reasonable max dimensions while maintaining aspect ratio
          insertedImage.style.maxWidth = '100%';
          insertedImage.style.height = 'auto';
          insertedImage.style.display = 'block';
          insertedImage.style.margin = '10px 0';
        }
      }, 0);
    }
  };

  // Trigger file input click for image upload
  const triggerImageUpload = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  // Initialize the editor with CSS styling for lists
  const initializeEditor = () => {
    // Add a stylesheet for the editor
    const style = document.createElement('style');
    style.textContent = `
      [contenteditable] {
        outline: none;
        word-wrap: break-word;
        white-space: pre-wrap;
        overflow-wrap: break-word;
      }
      [contenteditable] ul {
        display: block;
        list-style-type: disc;
        padding-left: 40px;
        margin-left: 0;
      }
      [contenteditable] ol {
        display: block;
        list-style-type: decimal;
        padding-left: 40px;
        margin-left: 0;
      }
      [contenteditable] li {
        display: list-item;
      }
      [contenteditable] img {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 10px 0;
      }
    `;
    document.head.appendChild(style);

    // Ensure the editor has proper styling
    if (editorRef.current) {
      // Set content to ensure proper initialization (if empty)
      if (!editorRef.current.innerHTML.trim()) {
        editorRef.current.innerHTML = '<p><br></p>';
      }
    }
  };

  // Setup editor initialization and keyboard event listeners
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    // Initialize editor with proper styling
    initializeEditor();

    // Initialize default formatting
    initializeDefaultStyles();

    // Set initial focus to help with command state detection
    editor.focus();

    const handleKeyDown = (e) => {
      // Check for Tab key for indentation within lists
      if (e.key === 'Tab') {
        // Prevent default tab behavior
        e.preventDefault();

        // If we're in a list, apply indent/outdent
        if (e.shiftKey) {
          // Shift+Tab for outdent
          handleOutdent();
        } else {
          // Tab for indent
          handleIndent();
        }
      }

      // Update styles after key operations
      setTimeout(updateActiveStyles, 10);
    };

    // Handle selection changes
    const handleSelectionChange = () => {
      if (document.activeElement === editor) {
        updateActiveStyles();
      }
    };

    // Handle paste events to preserve list formatting
    const handlePaste = (e) => {
      e.preventDefault();

      // Get text representation of clipboard
      const text = e.clipboardData.getData('text/plain');

      // Insert as plain text (preserving line breaks)
      document.execCommand('insertText', false, text);
    };

    editor.addEventListener('keydown', handleKeyDown);
    editor.addEventListener('paste', handlePaste);
    document.addEventListener('selectionchange', handleSelectionChange);

    return () => {
      editor.removeEventListener('keydown', handleKeyDown);
      editor.removeEventListener('paste', handlePaste);
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  const handleCancel = () => {
    // Reset form data
    setFormData({
      content: '',
      energyPolicy: null
    });
    
    // Clear editor content
    if (editorRef.current) {
      editorRef.current.innerHTML = '<p><br></p>';
    }
  };
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");
    const company_id = localStorage.getItem("company_id");
    const user_id = localStorage.getItem("user_id");

    console.log("Logged-in User ID:", user_id);
    console.log("Logged-in Company ID:", company_id);
    console.log("User Role:", role);

    if (!accessToken || !role || (!company_id && !user_id)) {
        console.warn("Some values are missing from localStorage!");
    }
}, []);

const handleSave = async () => {
  const editorContent = editorRef.current ? editorRef.current.innerHTML : '';

  if (!editorContent.trim() || editorContent === '<p><br></p>') {
      console.log("Empty content detected");
      toast.error('Please enter policy content');
      return;
  }

  try {
      // Get role and IDs
      const role = localStorage.getItem("role");
      const companyId = localStorage.getItem("company_id");
      const userId = localStorage.getItem("user_id");

      console.log("Logged-in Role:", role);
      console.log("Company ID:", companyId);
      console.log("User ID:", userId);

      let entityId = null;
      let entityType = null;

      if (role === "company" && companyId) {
          entityId = companyId;
          entityType = "company";
      } else if (role === "user" && userId) {
          entityId = userId;
          entityType = "user";
      }

      if (!entityId) {
          console.log("No valid ID found for the logged-in entity");
          toast.error('User or Company information not found. Please login again.');
          return;
      }

      console.log(`Creating policy for: ${entityType} ID: ${entityId}`);

      // Create FormData
      const apiFormData = new FormData();
      apiFormData.append('text', editorContent);
      apiFormData.append('created_by', entityId);

      // Ensure correct field name
      if (entityType === "company") {
          apiFormData.append('company_id', entityId);  // Fix: Use 'company_id'
      } else {
          apiFormData.append('user_id', entityId);  // Fix: Use 'user_id' for users
      }

      if (formData.energyPolicy) {
          apiFormData.append('energy_policy', formData.energyPolicy);
          console.log("Energy policy file attached:", formData.energyPolicy.name);
      } else {
          console.log("No energy policy file attached");
      }

      // Debugging: Log form data
      console.log("Form data:");
      for (let pair of apiFormData.entries()) {
          console.log(pair[0] + ': ' + pair[1]);
      }

      // API Request
      const response = await axios.post(
          `${BASE_URL}/company/documentation/create/`, // Check if this is the correct endpoint
          apiFormData
      );

      console.log("API response:", response);

      if (response.status === 201 || response.status === 200) {
          toast.success('Policy added successfully');

          // Reset form after submission
          setFormData({
              content: '',
              energyPolicy: null
          });

          // Clear editor content
          if (editorRef.current) {
              editorRef.current.innerHTML = '<p><br></p>';
          }
      }
  } catch (error) {
      console.error('Error creating policy:', error);
      toast.error(
          error.response?.data?.detail ||
          error.response?.data?.message ||
          'Failed to add policy. Please try again.'
      );
  }
};




  // Dropdown component to show selected option
  const Dropdown = ({ title, options, onSelect, selectedValue }) => {
    const [isOpen, setIsOpen] = useState(false);
    const displayTitle = selectedValue || title;

    return (
      <div className="relative">
        <button
          className="px-2 py-1 bg-gray-700 rounded flex items-center text-sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          {displayTitle} <span className="ml-1">▼</span>
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-40 bg-gray-800 border border-gray-700 rounded shadow-lg">
            {options.map((option, index) => (
              <button
                key={index}
                className="w-full text-left px-4 py-2 hover:bg-gray-700"
                onClick={() => {
                  onSelect(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Color picker component
  const ColorPickerPanel = ({ onColorSelect, activeColor }) => {
    const [customColor, setCustomColor] = useState(activeColor);

    return (
      <div className="absolute z-20 mt-2 p-3 bg-gray-800 border border-gray-700 rounded-md shadow-lg" ref={colorPickerRef}>
        <div className="grid grid-cols-5 gap-2 mb-3">
          {colorPalette.map((color, index) => (
            <button
              key={index}
              className={`w-6 h-6 rounded-sm border ${color === activeColor ? 'border-blue-500' : 'border-gray-600'}`}
              style={{ backgroundColor: color }}
              onClick={() => onColorSelect(color)}
              title={color}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={customColor}
            onChange={(e) => setCustomColor(e.target.value)}
            className="w-8 h-8 rounded cursor-pointer bg-transparent border-0"
          />
          <div className="flex-1 text-xs text-gray-400">Custom</div>
          <button
            className="px-2 py-1 bg-blue-600 text-xs rounded hover:bg-blue-700"
            onClick={() => onColorSelect(customColor)}
          >
            Apply
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-900 text-white p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Add Policies</h1>
      
      <div className="border border-gray-700 rounded-md mb-6">
        <div className="flex items-center p-2 border-b border-gray-700 bg-gray-800 flex-wrap">
          {/* Text formatting */}
          <button 
            className={`p-1 mx-1 hover:bg-gray-700 rounded ${activeStyles.bold ? 'bg-gray-700' : ''}`}
            onClick={() => execCommand('bold')}
            title="Bold"
          >
            <Bold size={18} />
          </button>
          <button 
            className={`p-1 mx-1 hover:bg-gray-700 rounded ${activeStyles.italic ? 'bg-gray-700' : ''}`}
            onClick={() => execCommand('italic')}
            title="Italic"
          >
            <Italic size={18} />
          </button>
          <button 
            className={`p-1 mx-1 hover:bg-gray-700 rounded ${activeStyles.underline ? 'bg-gray-700' : ''}`}
            onClick={() => execCommand('underline')}
            title="Underline"
          >
            <Underline size={18} />
          </button>
          
          <div className="border-r border-gray-600 h-6 mx-2"></div>
          
          {/* Alignment */}
          <button 
            className={`p-1 mx-1 hover:bg-gray-700 rounded ${activeStyles.align === 'left' ? 'bg-gray-700' : ''}`}
            onClick={() => execCommand('justifyLeft')}
            title="Align Left"
          >
            <AlignLeft size={18} />
          </button>
          <button 
            className={`p-1 mx-1 hover:bg-gray-700 rounded ${activeStyles.align === 'center' ? 'bg-gray-700' : ''}`}
            onClick={() => execCommand('justifyCenter')}
            title="Align Center"
          >
            <AlignCenter size={18} />
          </button>
          <button 
            className={`p-1 mx-1 hover:bg-gray-700 rounded ${activeStyles.align === 'right' ? 'bg-gray-700' : ''}`}
            onClick={() => execCommand('justifyRight')}
            title="Align Right"
          >
            <AlignRight size={18} />
          </button>
          <button 
            className={`p-1 mx-1 hover:bg-gray-700 rounded ${activeStyles.align === 'justify' ? 'bg-gray-700' : ''}`}
            onClick={() => execCommand('justifyFull')}
            title="Justify"
          >
            <AlignJustify size={18} />
          </button>
          
          <div className="border-r border-gray-600 h-6 mx-2"></div>
          
          {/* Font dropdowns */}
          <div className="flex items-center mx-1">
            <Dropdown
              title="Font Size"
              options={fontSizes}
              onSelect={handleFontSize}
              selectedValue={selectedFontSize}
            />
          </div>
          
          <div className="flex items-center mx-1">
            <Dropdown
              title="Font Style"
              options={fontStyles}
              onSelect={handleFontStyle}
              selectedValue={selectedFontStyle}
            />
          </div>
          
          <div className="flex items-center mx-1">
            <Dropdown
              title="Font Format"
              options={fontFormats}
              onSelect={handleFontFormat}
              selectedValue={selectedFontFormat}
            />
          </div>
          
          <div className="border-r border-gray-600 h-6 mx-2"></div>
          
          {/* Lists and indentation */}
          <button 
            className={`p-1 mx-1 hover:bg-gray-700 rounded ${activeStyles.unorderedList ? 'bg-gray-700' : ''}`}
            onClick={() => handleList('ul')}
            title="Unordered List"
          >
            <List size={18} />
          </button>
          <button 
            className={`p-1 mx-1 hover:bg-gray-700 rounded ${activeStyles.orderedList ? 'bg-gray-700' : ''}`}
            onClick={() => handleList('ol')}
            title="Ordered List"
          >
            <ListOrdered size={18} />
          </button>
          <button 
            className="p-1 mx-1 hover:bg-gray-700 rounded"
            onClick={handleIndent}
            title="Indent"
          >
            <Indent size={18} />
          </button>
          <button 
            className="p-1 mx-1 hover:bg-gray-700 rounded"
            onClick={handleOutdent}
            title="Outdent"
          >
            <Outdent size={18} />
          </button>
          
          {/* Links */}
          <button 
            className="p-1 mx-1 hover:bg-gray-700 rounded"
            onClick={handleCreateLink}
            title="Insert Link"
          >
            <Link size={18} />
          </button>
          <button 
            className="p-1 mx-1 hover:bg-gray-700 rounded"
            onClick={() => execCommand('unlink')}
            title="Remove Link"
          >
            <Unlink size={18} />
          </button>
          
          {/* Images */}
          <button 
            className="p-1 mx-1 hover:bg-gray-700 rounded"
            onClick={handleInsertImage}
            title="Insert Image from URL"
          >
            <Image size={18} />
          </button>
          <button 
            className="p-1 mx-1 hover:bg-gray-700 rounded"
            onClick={triggerImageUpload}
            title="Upload Image"
          >
            <FileUp size={18} />
          </button>
          
          {/* Color pickers */}
          <div className="relative">
            <button 
              className="p-1 mx-1 hover:bg-gray-700 rounded relative"
              onClick={toggleTextColorPicker}
              title="Text Color"
              style={{ color: activeStyles.textColor }}
            >
              <Type size={18} />
            </button>
            {showTextColorPicker && (
              <ColorPickerPanel
                onColorSelect={handleTextColor}
                activeColor={activeStyles.textColor}
              />
            )}
          </div>
          
          <div className="relative">
            <button 
              className="p-1 mx-1 hover:bg-gray-700 rounded"
              onClick={toggleBgColorPicker}
              title="Background Color"
            >
              <Highlighter size={18} style={{ color: activeStyles.bgColor !== 'transparent' ? activeStyles.bgColor : undefined }} />
            </button>
            {showBgColorPicker && (
              <ColorPickerPanel
                onColorSelect={handleBackgroundColor}
                activeColor={activeStyles.bgColor}
              />
            )}
          </div>
        </div>
        
        {/* Editor Content Area */}
        <div
          ref={editorRef}
          contentEditable
          className="bg-gray-950 p-4 min-h-[300px] focus:outline-none"
          onInput={() => setFormData(prev => ({ ...prev, content: editorRef.current.innerHTML }))}
        />
      </div>
      
      {/* File Upload Section */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Upload Energy Policy (Optional)
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          className="bg-gray-800 text-white p-2 rounded w-full"
          accept=".pdf,.doc,.docx"
        />
        {formData.energyPolicy && (
          <div className="mt-2 text-sm text-green-400">
            File selected: {formData.energyPolicy.name}
          </div>
        )}
      </div>
      
      {/* Hidden input for image upload */}
      <input
        type="file"
        ref={imageInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        style={{ display: 'none' }}
      />
      
      {/* Form Actions */}
      <div className="flex justify-end gap-4">
        <button
          className="px-5 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
          onClick={handleSave}
        >
          Save Policy
        </button>
      </div>
    </div>
  );
};

export default AddQmsPolicy;