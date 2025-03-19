import React, { useRef, useState, useEffect } from 'react'
import {
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, FileUp, Undo, Redo, Link, Unlink, Image, FileDown, Upload
} from 'lucide-react';

import bold from "../../../../assets/images/Company Documentation/bold.svg"
import itallic from '../../../../assets/images/Company Documentation/itallic.svg'
import underlines from '../../../../assets/images/Company Documentation/underline.svg'
import textleft from "../../../../assets/images/Company Documentation/text-align-left.svg"
import textcenter from "../../../../assets/images/Company Documentation/text-allign-center.svg"
import textright from "../../../../assets/images/Company Documentation/text-align-right.svg"
import textsentence from '../../../../assets/images/Company Documentation/text-sentence.svg'
import orderedlist from "../../../../assets/images/Company Documentation/ordered-list.svg"
import unorderedlist from "../../../../assets/images/Company Documentation/unorderedlist.svg"
import textoutdent from "../../../../assets/images/Company Documentation/text-outdent.svg"
import textindent from '../../../../assets/images/Company Documentation/text-indent.svg'
import imageupload from '../../../../assets/images/Company Documentation/image-upload.svg'
import imagelink from '../../../../assets/images/Company Documentation/image-link.svg'
import addlink from "../../../../assets/images/Company Documentation/add-link.svg"
import removelink from "../../../../assets/images/Company Documentation/remove-link.svg"
import textcolor from '../../../../assets/images/Company Documentation/text-color.svg'
import bgcolor from '../../../../assets/images/Company Documentation/bg-color.svg'
import "./addqmspolicy.css"

const AddQmsPolicy = () => {
  const [fileName, setFileName] = useState('');
  const [fileSelected, setFileSelected] = useState(false);
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

  // Add state for selected dropdown values - initializing with more user-friendly defaults
  const [selectedFontSize, setSelectedFontSize] = useState(fontSizes[1].label); // 'Normal'
  const [selectedFontStyle, setSelectedFontStyle] = useState(fontStyles[0].label); // 'Arial'
  const [selectedFontFormat, setSelectedFontFormat] = useState(fontFormats[0].label); // 'Paragraph'

  // Handle file selection for policy attachment
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
      setFileSelected(true);
    }
  };

  // Handle image upload for the editor
  const handleImageUpload = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];

      // Only process image files
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
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

    // Get selection
    const selection = window.getSelection();

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

  // Create a styled button component
  const ToolbarButton = ({ icon, command, active, value = null, onClick, tooltip }) => {
    // Use custom onClick if provided, otherwise use execCommand
    const handleClick = onClick || (() => execCommand(command, value));

    return (
      <button
        className={`p-1 rounded ${active ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
        onClick={handleClick}
        title={tooltip}
      >
        {icon}
      </button>
    );
  };

  // Updated Dropdown component to show selected option
  const Dropdown = ({ title, options, onSelect, selectedValue }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Use the provided selectedValue or the original title if not available
    const displayTitle = selectedValue || title;

    return (
      <div className="relative">
        <button
          className="flex items-center px-3 py-1 options-title bg-transparent border border-[#AAAAAA] rounded hover:bg-gray-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          {displayTitle}
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-40 bg-gray-800 border border-gray-700 rounded shadow-lg">
            {options.map((option, index) => (
              <button
                key={index}
                className="w-full text-left px-4 py-2 options-list hover:bg-gray-700"
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
    <div className="w-full bg-[#1C1C24] rounded-lg p-5 text-white">
      <h1 className="add-policy-head">Add Policies</h1>
      <div className="border-t border-[#383840] my-[20px]"></div>

      {/* Toolbar */}
      <div className="flex flex-wrap rounded-[4px] items-center justify-between mb-4 bg-[#24242D] px-5 py-[13px]">
        <ToolbarButton icon={<img src={bold} alt="Bold" className="w-3" />} command="bold" active={activeStyles.bold} tooltip="Bold" />
        <ToolbarButton icon={<img src={itallic} alt="Itallic" className="w-[7px] " />} command="italic" active={activeStyles.italic} tooltip="Italic" />
        <ToolbarButton icon={<img src={underlines} alt="Underline" className="w-3 mt-[1px]" />} command="underline" active={activeStyles.underline} tooltip="Underline" />

        <ToolbarButton
          icon={<img src={textleft} alt="text Left" />}
          command="justifyLeft"
          active={activeStyles.align === 'left'}
          tooltip="Align Left"
        />
        <ToolbarButton
          icon={<img src={textcenter} alt="text center" />}
          command="justifyCenter"
          active={activeStyles.align === 'center'}
          tooltip="Align Center"
        />
        <ToolbarButton
          icon={<img src={textright} alt="text right" />}
          command="justifyRight"
          active={activeStyles.align === 'right'}
          tooltip="Align Right"
        />
        <ToolbarButton
          icon={<img src={textsentence} alt="justify full" />}
          command="justifyFull"
          active={activeStyles.align === 'justify'}
          tooltip="Justify Text"
        />

        {/* Enhanced list controls with custom handlers */}
        <ToolbarButton
          icon={<img src={orderedlist} alt="ordered list" />}
          active={activeStyles.orderedList}
          onClick={() => handleList('ol')}
          tooltip="Ordered List"
        />
        <ToolbarButton
          icon={<img src={unorderedlist} alt="Unordered list" />}
          active={activeStyles.unorderedList}
          onClick={() => handleList('ul')}
          tooltip="Unordered List"
        />

        <div className='flex'>
          <div className="mr-[10px]">
            <Dropdown
              title="Font Size"
              options={fontSizes}
              onSelect={handleFontSize}
              selectedValue={selectedFontSize}
            />
          </div>

          <div className="mr-[10px]">
            <Dropdown
              title="Font Style"
              options={fontStyles}
              onSelect={handleFontStyle}
              selectedValue={selectedFontStyle}
            />
          </div>

          <div className="">
            <Dropdown
              title="Font Format"
              options={fontFormats}
              onSelect={handleFontFormat}
              selectedValue={selectedFontFormat}
            />
          </div>
        </div>

        {/* Improved Indent/Outdent buttons */}
        <ToolbarButton
          icon={<img src={textoutdent} alt="Text Outdent" />}
          onClick={handleOutdent}
          active={activeStyles.outdent}
          tooltip="Outdent"
        />
        <ToolbarButton
          icon={<img src={textindent} alt="Text Indent" />}
          onClick={handleIndent}
          active={activeStyles.indent}
          tooltip="Indent"
        />

        {/* Image insertion buttons */}
        <ToolbarButton
          icon={<img src={imagelink} alt="Image Add" />}
          onClick={handleInsertImage}
          tooltip="Insert Image by URL"
        />
        <ToolbarButton
          icon={<img src={imageupload} alt="Image Upload" />}
          onClick={triggerImageUpload}
          tooltip="Upload Image"
        />

        {/* Link buttons */}
        <ToolbarButton
          icon={<img src={addlink} alt="Add Link" />}
          onClick={handleCreateLink}
          tooltip="Insert Link"
        />
        <ToolbarButton
          icon={<img src={removelink} alt="Remove Link" />}
          command="unlink"
          tooltip="Remove Link"
        />

        <div className="relative">
          <ToolbarButton
            icon={<img src={textcolor} alt="Text Color" />}
            onClick={toggleTextColorPicker}
            tooltip="Text Color"
          />
          {showTextColorPicker && (
            <ColorPickerPanel
              onColorSelect={handleTextColor}
              activeColor={activeStyles.textColor}
            />
          )}
        </div>

        <div className="relative">
          <ToolbarButton
            icon={<img src={bgcolor} alt="Background Color" />}
            onClick={toggleBgColorPicker}
            tooltip="Background Color"
          />
          {showBgColorPicker && (
            <ColorPickerPanel
              onColorSelect={handleBackgroundColor}
              activeColor={activeStyles.bgColor === 'transparent' ? '#000000' : activeStyles.bgColor}
            />
          )}
        </div>


        {/* Hidden input for image upload */}
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>

      {/* Text area - Using contentEditable div instead of textarea for rich text */}
      <div className="w-full h-[287px] bg-[#24242D] rounded-[4px] p-5">
        <div
          ref={editorRef}
          className="w-full h-full outline-none text-[#AAAAAA] add-policy-text overflow-auto"
          contentEditable
          onMouseUp={updateActiveStyles}
          onKeyUp={updateActiveStyles}
          onInput={updateActiveStyles}
          data-placeholder="Type here..."
          onFocus={(e) => {
            if (e.currentTarget.innerHTML === "") {
              e.currentTarget.setAttribute("data-empty", "true");
            }
            updateActiveStyles();
          }}
          onBlur={(e) => {
            if (e.currentTarget.innerHTML === "") {
              e.currentTarget.removeAttribute("data-empty");
            }
          }}
          style={{
            minHeight: '100%',
            wordWrap: 'break-word',
            whiteSpace: 'pre-wrap',
            overflowWrap: 'break-word',
          }}
        />
      </div>

      {/* File upload */}
      <div className="flex items-center justify-between mb-6">
        <label className="font-medium">Attach Energy Policy:</label>
        <div className="flex items-center">
          <label className="flex items-center px-4 py-2 bg-gray-800 text-gray-300 rounded-md border border-gray-700 cursor-pointer hover:bg-gray-700 transition">
            Choose File
            <FileUp size={20} className="ml-2" />
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          <span className="ml-3 text-gray-400 text-sm">
            {fileSelected ? fileName : 'No file chosen'}
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4">
        <button className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
          Cancel
        </button>
        <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
          Save
        </button>
      </div>
    </div>
  );
};

export default AddQmsPolicy;