import React, { useEffect, useState } from "react";

type Props = {
  countrySelected: string | null;
  showTooltip: boolean;
  x: number;
  y: number;
  children?: React.ReactNode;
};

const Tooltip = ({ countrySelected, x, y, showTooltip, children }: Props) => {
  const tooltipRef = React.useRef<HTMLDivElement>(null);
  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);
  useEffect(() => {
    const { current } = tooltipRef;
    if (current) {
      const { width, height } = current.getBoundingClientRect();
      setOffsetX(width / 2);
      setOffsetY(height + 10);
    }
  }, []);
  return (
    <div
      ref={tooltipRef}
      style={{
        left: x - offsetX,
        top: y - offsetY,
        opacity: showTooltip ? 1 : 0,
      }}
      className="tooltip-container"
    >
      {countrySelected}
      <div className="tooltip-children-container">{children}</div>
    </div>
  );
};

export default Tooltip;
