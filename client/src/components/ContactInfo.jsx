import React from "react";

function ContactInfo({customClass, icon, title }) {
  return (
    <div className="info-container" >
      <div className={!customClass ? "info-icon" : null }>{icon}</div>
      <div className={ customClass ? customClass : "contact"}>{title}</div>
    </div>
  );
}

export default ContactInfo;
