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
    <div className="mb-3 flex w-full flex-col gap-4">
      <p>Cover image</p>

      {/* Button to toggle File Upload */}
      <button
        className="btn btn-outline-secondary w-100"
        onClick={() => setIsPanelOpen(!isPanelOpen)}
        type="button"
      >
        Upload a file
      </button>

      {/* File Upload Panel */}
      {isPanelOpen && (
        <div className="mt-2">
          <input
            type="file"
            accept="image/*"
            className="form-control"
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

      {/* Error Message */}
      {error.coverImageUrl && (
        <p className="text-danger">{error.coverImageUrl}</p>
      )}

      {/* Image Preview */}
      {imageSrc && (
        <div className="text-center">
          <img src={imageSrc} alt="Preview" className="img-fluid max-h-200" />
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
