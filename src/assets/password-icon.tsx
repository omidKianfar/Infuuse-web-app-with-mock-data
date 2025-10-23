import React from "react";
import { IconProps } from "./type";

const PasswordIcon:React.FC<IconProps>  = ({ width = "24", height = "24", fill = "#99a6bf" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
    >
      <g
        id="Group_70144"
        data-name="Group 70144"
        transform="translate(-16.104 -12)"
      >
        <g
          id="vuesax_bold_lock"
          data-name="vuesax/bold/lock"
          transform="translate(16.104 12)"
        >
          <path
            id="Vector"
            d="M3.26,1.63A1.63,1.63,0,1,1,1.63,0,1.63,1.63,0,0,1,3.26,1.63Z"
            transform="translate(10.37 14.09)"
            fill={fill}
          />
          <path
            id="Vector-2"
            data-name="Vector"
            d="M16.28,7.53V6.28C16.28,3.58,15.63,0,10,0S3.72,3.58,3.72,6.28V7.53C.92,7.88,0,9.3,0,12.79v1.86C0,18.75,1.25,20,5.35,20h9.3c4.1,0,5.35-1.25,5.35-5.35V12.79C20,9.3,19.08,7.88,16.28,7.53ZM10,16.74a3.02,3.02,0,1,1,3.02-3.02A3.024,3.024,0,0,1,10,16.74ZM5.35,7.44H5.12V6.28c0-2.93.83-4.88,4.88-4.88s4.88,1.95,4.88,4.88V7.45H5.35Z"
            transform="translate(2 2)"
            fill={fill}
          />
          <path
            id="Vector-3"
            data-name="Vector"
            d="M0,0H24V24H0Z"
            transform="translate(24 24) rotate(180)"
            fill="none"
            opacity="0"
          />
        </g>
      </g>
    </svg>
  );
};

export default PasswordIcon;
