import React from "react";

const TicketIcon = ({ width = "32", height = "32", fill = "#c3cad9" }) => {
  return (
    <svg
      id="Group_74065"
      data-name="Group 74065"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 32 32"
    >
      <g id="ticket-2">
        <path
          id="Vector"
          d="M11.293,3.947v.027c-.333-.013-.667-.027-1.027-.027H0L1.427,2.533C2.733,1.213,4.173,0,5.84,0s3.12,1.213,4.427,2.533l.747.747A.9.9,0,0,1,11.293,3.947Z"
          transform="translate(11.627 2.667)"
          fill={fill}
        />
        <path
          id="Vector-2"
          data-name="Vector"
          d="M24.507,8.96A.942.942,0,0,0,25.44,8V6.827C25.44,1.587,23.84,0,18.613,0H6.827C1.6,0,0,1.6,0,6.827V7.4a.931.931,0,0,0,.933.947A2.012,2.012,0,0,1,2.947,10.36,2.023,2.023,0,0,1,.933,12.387.931.931,0,0,0,0,13.333v.573c0,5.24,1.6,6.827,6.827,6.827H18.6c5.227,0,6.827-1.6,6.827-6.827a.939.939,0,0,0-.933-.947,2,2,0,1,1,.013-4Zm-13.36,7.587a.947.947,0,0,1-1.893,0V12.973a.947.947,0,0,1,1.893,0Zm0-8.787a.947.947,0,0,1-1.893,0V4.187a.947.947,0,1,1,1.893,0Z"
          transform="translate(3.28 8.6)"
          fill={fill}
        />
        <path
          id="Vector-3"
          data-name="Vector"
          d="M0,0H32V32H0Z"
          fill="none"
          opacity="0"
        />
      </g>
    </svg>
  );
};

export default TicketIcon;
