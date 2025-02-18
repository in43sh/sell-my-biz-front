import PropTypes from 'prop-types';
import { useState } from 'react';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';

const AddImage = ({
  error,
  imageSrc,
  setFile,
  setImageSrc,
  handleFileUpload,
  required = false,
}) => {
  const [dragging, setDragging] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) processImage(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) processImage(file);
  };

  const processImage = (file) => {
    setFile(file);
    handleFileUpload({ target: { files: [file] } });

    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="font-semibold text-gray-700">Upload a Cover Image</p>

      {/* Drag-and-Drop Area */}
      <div
        className={`relative flex h-44 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 transition ${
          dragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        <PhotoIcon className="mb-2 h-10 w-10 text-gray-500" />
        <p className="text-sm text-gray-600">Drag & drop an image here</p>
        <p className="text-xs text-gray-400">or click to select a file</p>
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 cursor-pointer opacity-0"
          onChange={handleFileChange}
          required={required}
        />
      </div>

      {/* Error Message */}
      {error?.coverImageUrl && (
        <p className="text-red-600">{error.coverImageUrl}</p>
      )}

      {/* Image Preview */}
      {imageSrc && (
        <div className="relative mt-3 flex justify-center">
          <img
            src={imageSrc}
            alt="Uploaded Preview"
            className="max-h-52 rounded-md shadow-md"
          />
          <button
            type="button"
            className="absolute top-2 right-2 rounded-full bg-white p-1 shadow-md hover:bg-gray-200"
            onClick={() => setImageSrc('')}
          >
            <XMarkIcon className="h-5 w-5 cursor-pointer text-gray-700" />
          </button>
        </div>
      )}
    </div>
  );
};

AddImage.propTypes = {
  error: PropTypes.shape({
    coverImageUrl: PropTypes.string,
  }),
  imageSrc: PropTypes.oneOfType([PropTypes.string, PropTypes.null]),
  // imageSrc: PropTypes.string,
  setFile: PropTypes.func.isRequired,
  setImageSrc: PropTypes.func.isRequired,
  handleFileUpload: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

export default AddImage;
