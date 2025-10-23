import React from "react";
import { IconProps } from './type';

const InboxIcon:React.FC<IconProps> = ({ width = "32", height = "32", fill = "#c3cad9" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 32 32"
    >
      <g id="Group_70146" data-name="Group 70146" transform="translate(-8 -8)">
        <g
          id="vuesax_bold_direct"
          data-name="vuesax/bold/direct"
          transform="translate(-420 -180)"
        >
          <g id="direct" transform="translate(428 188)">
            <g
              id="Group_664"
              data-name="Group 664"
              transform="translate(1.307 1.308)"
            >
              <path
                id="Vector"
                d="M23.16,0H18.984a3.042,3.042,0,0,0-2.748,1.724L15.228,3.74a1.393,1.393,0,0,1-1.248.789H10.044A1.277,1.277,0,0,1,8.8,3.74l-1.008-2A3.077,3.077,0,0,0,5.04.012H.84A.84.84,0,0,0,0,.862V4.82c0,4.407,2.616,7.042,6.984,7.042H17.04c4.116,0,6.648-2.283,6.96-6.338V.85A.848.848,0,0,0,23.16,0Z"
                transform="translate(2.693 14.83)"
                fill={fill}
              />
              <path
                id="Vector-2"
                data-name="Vector"
                d="M17.028,0H6.972C2.6,0,0,2.635,0,7.054v3.691A2.446,2.446,0,0,1,.84,10.6h4.2A4.826,4.826,0,0,1,9.4,13.332l.9,1.785h3.432l.9-1.8a4.836,4.836,0,0,1,4.356-2.72H23.16a2.446,2.446,0,0,1,.84.146V7.054C24,2.635,21.4,0,17.028,0ZM10.14,4.14h3.72a.844.844,0,0,1,0,1.688H10.14a.844.844,0,0,1,0-1.688ZM14.8,9.216H9.2a.844.844,0,0,1,0-1.688H14.8a.844.844,0,0,1,0,1.688Z"
                transform="translate(2.693 2.693)"
                fill={fill}
              />
            </g>
            <path
              id="Vector-3"
              data-name="Vector"
              d="M0,0H32V32H0Z"
              fill="none"
              opacity="0"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default InboxIcon;
