import React, { useEffect, useState } from "react";

/**
 * Renders a tooltip element.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string | null} props.countrySelected - The selected country name.
 * @param {number} props.x - The x-coordinate of the tooltip.
 * @param {number} props.y - The y-coordinate of the tooltip.
 * @param {boolean} props.showTooltip - Whether to show the tooltip.
 * @param {React.ReactNode} [props.children] - The child elements to render.
 * @returns {JSX.Element} - The rendered tooltip element.
 */

type Props = {
  countryData: { name: string; data?: any };
  showTooltip: boolean;
  x: number;
  y: number;
  children?: React.ReactNode;
};

const Tooltip = ({ countryData, x, y, showTooltip, children }: Props) => {
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
      <div className="tooltip-children-container">{children}</div>
    </div>
  );
};

export default Tooltip;
