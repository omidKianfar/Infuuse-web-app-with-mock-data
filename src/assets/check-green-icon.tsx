import React from "react";
import { IconProps } from './type';

const CheckGreenIcon:React.FC<IconProps> = ({ width="24", height="24"}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <g
        id="Group_70144"
        data-name="Group 70144"
        transform="translate(-85 -385)"
      >
        <g id="Group_69703" data-name="Group 69703" transform="translate(-101)">
          <g
            id="vuesax_bold_tick-circle"
            data-name="vuesax/bold/tick-circle"
            transform="translate(-562 197)"
          >
            <g id="tick-circle">
              <path
                id="Vector"
                d="M10,0A10,10,0,1,0,20,10,10.016,10.016,0,0,0,10,0Zm4.78,7.7L9.11,13.37a.748.748,0,0,1-1.06,0L5.22,10.54A.75.75,0,1,1,6.28,9.48l2.3,2.3,5.14-5.14A.75.75,0,0,1,14.78,7.7Z"
                transform="translate(750 190)"
                fill="#63d69e"
              />
              <path
                id="Vector-2"
                data-name="Vector"
                d="M0,0H24V24H0Z"
                transform="translate(772 212) rotate(180)"
                fill="none"
                opacity="0"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default CheckGreenIcon;
