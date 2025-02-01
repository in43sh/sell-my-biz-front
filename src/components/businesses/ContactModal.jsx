const ContactModal = ({ ownerName, contactEmail, phoneNumber, onClose }) => {
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  return (
    <div
      className="modal fade show d-block modal-overlay"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={handleOverlayClick}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h5 className="modal-title">Contact Information</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>
              <strong>Name:</strong> {ownerName || 'N/A'}
            </p>
            <p>
              <strong>Email:</strong> {contactEmail || 'N/A'}
            </p>
            <p>
              <strong>Phone:</strong> {phoneNumber || 'N/A'}
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
