import React, { useEffect, useState } from "react";

type Props = {
  countryData: { name: string; data?: any };
  showTooltip: boolean;
  x: number;
  y: number;
  children?: any;
};

const Tooltip = ({ countryData, x, y, showTooltip, children }: Props) => {
  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      return React.cloneElement(child, {
        data: countryData,
      });
    });
  };

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
      {countryData.name}
      {renderChildren() && renderChildren()}
    </div>
  );
};

export default Tooltip;
