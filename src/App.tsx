import React, { useRef, useState } from "react";
import Map from "./components/map/Map";
import Tooltip from "./components/tooltip/Tooltip";
import "./styles.css";
import { debounce } from "./helpers/debounce";
import { onMouseEnter } from "./helpers/mouseEnter";

type Props = {
  tooltipChildren?: React.ReactNode;
};
function MapComponent({ tooltipChildren }: Props) {
  const [countrySelected, setCountrySelected] = useState<string | null>("");
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const parentContainerRef = useRef<HTMLDivElement>(null);

  const onMouseLeave = () => {
    setShowTooltip(false);
  };
  const debouncedMouseEnter = debounce(
    (e) =>
      onMouseEnter(
        e,
        setCountrySelected,
        setShowTooltip,
        setX,
        setY,
        parentContainerRef
      ),
    200
  );

  return (
    <div ref={parentContainerRef} className="map-container">
      <Map onMouseLeave={onMouseLeave} onMouseEnter={debouncedMouseEnter} />
      <Tooltip
        x={x}
        y={y}
        showTooltip={showTooltip}
        countrySelected={countrySelected}
      >
        {tooltipChildren}
      </Tooltip>
    </div>
  );
}

export default MapComponent;
