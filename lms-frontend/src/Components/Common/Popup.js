import React from "react";
import "../Common/styles/Popup.css";

import { Button } from "antd";

function Popup(props) {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <Button
          className="close-btn"
          type="primary"
          danger
          onClick={() => props.setTrigger(false)}
        >
          close
        </Button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}

export default Popup;
