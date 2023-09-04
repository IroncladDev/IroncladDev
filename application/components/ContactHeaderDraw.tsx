import { tokens } from "application/ui";

const pathStyle = {
  fill: "none",
  strokeWidth: 2,
  strokeLineCap: "round",
  strokeLineJoin: "round",
  stroke: tokens.foregroundDefault,
};

export const ContactHeaderDraw = () => {
  return (
    <svg
      style={{
        strokeDasharray: "100%",
        animation: `draw 5s ease-in forwards, float 7s ease-in-out infinite`,
        padding: 0,
        strokeWidth: 1,
        zIndex: 10,
        filter: `drop-shadow(0px 0px 3px rgba(255,255,255))`,
        height: "50vh",
        maxHeight: "400px",
      }}
      viewBox="0 0 542 306"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 521.694 2 L 490.941 8.89 L 473.894 30.76 L 374.23 72.777 L 379.286 94.085"
        style={pathStyle}
      />
      <path
        d="M 432.702 71.807 L 488.043 43.128 L 500.344 24.15 L 539.98 14.185 L 513.132 61.901 L 356.464 136.805 L 381.095 108.548"
        style={pathStyle}
      />
      <path
        d="M 367.144 83.116 L 372.398 105.977 L 331.806 152.425 L 328.579 146.261 L 350.796 129.144 L 353.93 93.342 L 367.144 83.116 Z"
        style={pathStyle}
      />
      <path
        d="M 350.285 129.919 L 331.097 153.777 L 305.236 164.916 L 281 164.737"
        style={pathStyle}
      />
      <path
        d="M 353.952 93.376 L 325.437 106.427 L 314.763 121.869"
        style={pathStyle}
      />
      <path
        d="M 329.948 144.42 L 316.443 137.914 L 320.624 125.562"
        style={pathStyle}
      />
      <path
        d="M 329.179 149.424 L 309.946 148.121 L 304.143 133.162"
        style={pathStyle}
      />
      <path
        d="M 329.598 153.014 L 304.474 156.161 L 293.253 138.626"
        style={pathStyle}
      />
      <path
        d="M 20.286 303.916 L 51.039 297.026 L 68.086 275.156 L 167.75 233.139 L 162.694 211.831"
        style={pathStyle}
      />
      <path
        d="M 109.278 234.109 L 53.937 262.788 L 41.636 281.766 L 2 291.731 L 28.848 244.015 L 185.516 169.111 L 160.885 197.368"
        style={pathStyle}
      />
      <path
        d="M 174.836 222.8 L 169.582 199.939 L 210.174 153.491 L 213.401 159.655 L 191.184 176.772 L 188.05 212.574 L 174.836 222.8 Z"
        style={pathStyle}
      />
      <path
        d="M 191.695 175.997 L 210.883 152.139 L 236.744 141 L 260.98 141.179"
        style={pathStyle}
      />
      <path
        d="M 188.028 212.54 L 216.543 199.489 L 227.217 184.047"
        style={pathStyle}
      />
      <path
        d="M 212.032 161.496 L 225.537 168.002 L 221.356 180.354"
        style={pathStyle}
      />
      <path
        d="M 212.801 156.492 L 232.034 157.795 L 237.837 172.754"
        style={pathStyle}
      />
      <path
        d="M 212.382 152.902 L 237.506 149.755 L 248.727 167.29"
        style={pathStyle}
      />
    </svg>
  );
};
