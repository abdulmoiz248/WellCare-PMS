import React from 'react';

const Loaders = () => {
  const containerStyle = {
    '--uib-size': '45px',
    '--uib-color': 'black',
    '--uib-speed': '1.75s',
    '--uib-bg-opacity': '.1',
    height: '31.25px',
    width: '50px',
    transformOrigin: 'center',
    overflow: 'visible',
  };

  const carStyle = {
    stroke: 'var(--uib-color)',
    strokeDasharray: '100',
    strokeDashoffset: '0',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    animation: `
      travel var(--uib-speed) ease-in-out infinite,
      fade var(--uib-speed) ease-out infinite
    `,
    willChange: 'stroke-dasharray, stroke-dashoffset',
    transition: 'stroke 0.5s ease',
  };

  const trackStyle = {
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    stroke: 'var(--uib-color)',
    opacity: 'var(--uib-bg-opacity)',
  };

  const wrapperStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  return (
    <div style={wrapperStyle}>
      <svg
        style={containerStyle}
        x="0px"
        y="0px"
        viewBox="0 0 50 31.25"
        height="31.25"
        width="50"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          style={trackStyle}
          strokeWidth="4"
          fill="none"
          pathLength="100"
          d="M0.625 21.5 h10.25 l3.75 -5.875 l7.375 15 l9.75 -30 l7.375 20.875 v0 h10.25"
        />
        <path
          style={carStyle}
          strokeWidth="4"
          fill="none"
          pathLength="100"
          d="M0.625 21.5 h10.25 l3.75 -5.875 l7.375 15 l9.75 -30 l7.375 20.875 v0 h10.25"
        />
      </svg>

      {/* Injecting keyframes directly inside the component */}
      <style jsx>{`
        @keyframes travel {
          0% {
            stroke-dashoffset: 100;
          }
          75% {
            stroke-dashoffset: 0;
          }
        }

        @keyframes fade {
          0% {
            opacity: 0;
          }
          20%, 55% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Loaders;
