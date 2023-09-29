import React, { forwardRef } from "react";
import QRCode from "qrcode.react";

// eslint-disable-next-line react/display-name
const QrCode = forwardRef(({ qrData }, ref) => (
  <div>
    <img
      src="https://yt3.googleusercontent.com/ytc/AOPolaShGFZea8CtXWf-mma44Rk7fi1jDbcs_86dByNo=s900-c-k-c0x00ffffff-no-rj"
      alt="qr"
    />
    <QRCode
      value={qrData}
      size={128} // Adjust the size as needed
      ref={ref}
    />
  </div>
));

export default QrCode;
