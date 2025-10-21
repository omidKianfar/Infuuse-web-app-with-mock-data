import React from "react";

const ContactIcon = ({ width = "32", height = "32", fill = "#c3cad9" }) => {
  return (
    <svg
      id="Group_74067"
      data-name="Group 74067"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 32 32"
    >
      <g id="archive-book">
        <path
          id="Vector"
          d="M0,0H32V32H0Z"
          transform="translate(32 32) rotate(180)"
          fill="none"
          opacity="0"
        />
        <path
          id="Vector-2"
          data-name="Vector"
          d="M7.813.667V8.533a.669.669,0,0,1-1.12.493L4.36,6.88a.661.661,0,0,0-.907,0L1.12,9.013A.665.665,0,0,1,0,8.533V.667A.66.66,0,0,1,.667,0h6.48A.66.66,0,0,1,7.813.667Z"
          transform="translate(12.093 2.667)"
          fill={fill}
        />
        <path
          id="Vector-3"
          data-name="Vector"
          d="M18.64.006a.669.669,0,0,0-.733.667V8.7a2.557,2.557,0,0,1-4.293,1.88l-1.16-1.067a.661.661,0,0,0-.907,0l-1.16,1.067a2.559,2.559,0,0,1-2.76.467A2.569,2.569,0,0,1,6.093,8.7V.672A.669.669,0,0,0,5.36.006C1.627.472,0,2.992,0,6.592V19.926c0,4,2,6.667,6.667,6.667H17.333C22,26.592,24,23.926,24,19.926V6.592C24,2.992,22.373.472,18.64.006Zm.693,22.253H8a1,1,0,1,1,0-2H19.333a1,1,0,1,1,0,2Zm0-5.333H13.667a1,1,0,0,1,0-2h5.667a1,1,0,0,1,0,2Z"
          transform="translate(4 2.741)"
          fill={fill}
        />
      </g>
    </svg>
  );
};

export default ContactIcon;
