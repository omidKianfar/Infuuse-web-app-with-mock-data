import React from "react";
import { IconProps } from "./type";

const SmsIcon:React.FC<IconProps>  = ({ width = "32", height = "32", fill = "#c3cad9" }) => {
  return (
    <svg
      id="message"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 32 32"
    >
      <path
        id="Vector"
        d="M18,0H6A5.989,5.989,0,0,0,0,5.976v8.376a5.989,5.989,0,0,0,6,5.976H7.8a1.379,1.379,0,0,1,.96.48l1.8,2.388a1.705,1.705,0,0,0,2.88,0l1.8-2.388a1.216,1.216,0,0,1,.96-.48H18a5.989,5.989,0,0,0,6-5.976V5.976A5.989,5.989,0,0,0,18,0Z"
        transform="translate(4 4.006)"
        fill={fill}
      />
      <path
        id="Vector-2"
        data-name="Vector"
        d="M0,0H32V32H0Z"
        transform="translate(32 32) rotate(180)"
        fill="none"
        opacity="0"
      />
      <text
        id="Sms"
        transform="translate(6.5 17)"
        fill="#fff"
        fontSize="8.8"
        fontFamily="Helvetica-Bold, Helvetica"
        fontWeight="700"
      >
        <tspan x="0" y="0">
          SMS
        </tspan>
      </text>
    </svg>
  );
};

export default SmsIcon;
