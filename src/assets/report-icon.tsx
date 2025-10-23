import React from "react";
import { IconProps } from "./type";

const ReportIcon:React.FC<IconProps>  = ({ width = "32", height = "32", fill = "#c3cad9" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 32 32"
    >
      <g id="Group_70144" data-name="Group 70144" transform="translate(-8 -8)">
        <g id="chart" transform="translate(-100 -436)">
          <path
            id="Vector"
            d="M13.219,0A13.219,13.219,0,1,0,26.438,13.219,13.224,13.224,0,0,0,13.219,0Zm0,8.923a.991.991,0,1,1,0-1.983,6.279,6.279,0,0,1,0,12.558.991.991,0,1,1,0-1.983,4.3,4.3,0,1,0,0-8.592Zm0,14.541A10.262,10.262,0,0,1,2.974,13.219a.991.991,0,1,1,1.983,0,8.262,8.262,0,1,0,8.262-8.262.991.991,0,1,1,0-1.983,10.245,10.245,0,0,1,0,20.49Z"
            transform="translate(110.781 446.781)"
            fill={fill}
          />
          <path
            id="Vector-2"
            data-name="Vector"
            d="M0,0H32V32H0Z"
            transform="translate(140 476) rotate(180)"
            fill="none"
            opacity="0"
          />
        </g>
      </g>
    </svg>
  );
};

export default ReportIcon;
