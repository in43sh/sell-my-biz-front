import PropTypes from 'prop-types';
import { useState } from 'react';

const AddImage = ({
  error,
  imageSrc,
  setFile,
  setImageSrc,
  handleFileUpload,
}) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <div className="mb-4 flex flex-col gap-4">
      <p className="font-semibold">Cover Image</p>

      <button
        className="rounded-md border border-gray-400 px-4 py-2 text-gray-700 transition duration-300 hover:bg-gray-100"
        onClick={() => setIsPanelOpen(!isPanelOpen)}
        type="button"
      >
        Upload a file
      </button>

      {isPanelOpen && (
        <div className="mt-2">
          <input
            type="file"
            accept="image/*"
            className="w-full rounded-md border border-gray-300 p-2"
            onChange={(event) => {
              handleFileUpload(event);
              const file = event.target.files[0];
              if (file) {
                setFile(file);
                const reader = new FileReader();
                reader.onload = () => {
                  setImageSrc(reader.result);
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </div>
      )}

      {error.coverImageUrl && (
        <p className="text-red-600">{error.coverImageUrl}</p>
      )}

      {imageSrc && (
        <div className="mt-3 text-center">
          <img
            src={imageSrc}
            alt="Preview"
            className="mx-auto max-h-52 rounded-md shadow-md"
          />
        </div>
      )}
    </div>
  );
};

AddImage.propTypes = {
  error: PropTypes.object,
  imageSrc: PropTypes.string,
  setFile: PropTypes.func.isRequired,
  setImageSrc: PropTypes.func.isRequired,
  handleFileUpload: PropTypes.func.isRequired,
};

export default AddImage;
