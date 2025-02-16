import PropTypes from 'prop-types';

const AddImage = ({
  error,
  imageSrc,
  setFile,
  setImageSrc,
  handleFileUpload,
  required = false,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-semibold">Cover Image</p>

      <input
        type="file"
        accept="image/*"
        className="w-full cursor-pointer rounded-md border border-gray-300 p-2"
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
        required={required}
      />

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
