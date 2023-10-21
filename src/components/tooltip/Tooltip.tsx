import React, { useEffect, useState } from "react";
import { getCode } from "country-list";

type Props = {
  countryData: { name: string; data?: any; country?: string; amount?: number };
  showTooltip: boolean;
  x: number;
  y: number;
  children?: any;
  parentRef?: React.RefObject<HTMLDivElement>;
};

const Tooltip = ({
  countryData,
  x,
  y,
  showTooltip,
  children,
  parentRef,
}: Props) => {
  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      return React.cloneElement(child, {
        data: countryData,
      });
    });
  };

  const tooltipRef = React.useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState<number>(0);
  const [offsetX, setOffsetX] = useState<number>(0);
  useEffect(() => {
    const { current } = tooltipRef;
    const parentContainer = parentRef?.current;
    if (current && parentContainer) {
      const parentContainerDimensions = parentContainer.getBoundingClientRect();
      const parentWidth = parentContainerDimensions.width;

      const { width, height } = current.getBoundingClientRect();
      if (x + width > parentWidth) {
        setOffsetX(width);
      } else {
        setOffsetX(0);
      }
      setOffsetY(height);
    }
  }, [parentRef, x]);

  return (
    <div
      ref={tooltipRef}
      style={{
        top: y - offsetY,
        left: x - offsetX,

        opacity: showTooltip ? 1 : 0,
      }}
      className="tooltip-container"
    >
      {renderChildren() ? (
        renderChildren()
      ) : (
        <div className="tooltip-default">
          <h3>{countryData.name}</h3>
          <p>
            <b>Country code: </b>
            {countryData.country}
          </p>
          <p>
            <b>Amount: </b>
            {countryData.amount}
          </p>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
