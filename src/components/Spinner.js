import React from 'react';
import styled from 'styled-components';

const Spinner = () => (
  <StyledSpinner viewBox="0 0 50 50">
    <circle
      className="path"
      cx="25"
      cy="25"
      r="20"
      fill="none"
      strokeWidth="4"
    />
  </StyledSpinner>
);

const StyledSpinner = styled.svg`
  height: 100px;
  width: 100px;
  animation: rotate 2s linear infinite;
  stroke: red;
  stroke-linecap: round;
  
  & .path {
    animation: dash 2s ease-in-out infinite;
  }
  
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 2, 20;
      stroke-dashoffset: -125;
      r: 3;
      stroke-width: 1;
    }
    50% {
      stroke-dasharray: 5, 5;
      stroke-dashoffset: 0;
      r: 20;
      stroke-width: 4;
    }
    100% {
      stroke-dasharray: 2, 20;
      stroke-dashoffset: -125;
      r: 3;
      stroke-width: 1;
    }
  }
`;

export default Spinner;