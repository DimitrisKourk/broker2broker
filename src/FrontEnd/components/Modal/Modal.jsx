import React from "react";
import { createPortal } from "react-dom";

const Modal = ({ isOpen,modalStyle, children }) => {
    if (!isOpen) return null;

    return createPortal(
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex:2,
            }}
        >
            <div className={modalStyle}>
                {children}
            </div>
        </div>,
        document.body
    );
};

export default Modal;