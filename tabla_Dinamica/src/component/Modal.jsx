import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
 if (!isOpen) {
    return null;
 }

 return (
    <div className="modal" tabIndex="-1" role="dialog" style={{display: isOpen ? 'block' : 'none'}}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">registrar nuevo usuario</h5>
          </div>
          <div className="modal-body">
            {children} 
          </div>
          <div className="modal-footer">
          <button type="button" className="close btn btn-secondary" data-dismiss="modal" aria-label="Cerrar" onClick={onClose}>
              regresar
            </button>
          </div>
        </div>
      </div>
    </div>
 );
};

export default Modal;
