import React, { ReactNode, useRef, useState } from "react";
import Map from "./components/map/Map";
import Tooltip from "./components/tooltip/Tooltip";
import "./styles.css";
import { debounce } from "./helpers/debounce";
import { onMouseEnter } from "./helpers/mouseEnter";

type Props = {
  customTooltip?: ReactNode;
  layers: string[];
  colors: string[];
  countriesData: { country: string; amount: number; data?: any[] }[];
};

function MapComponent({ customTooltip, layers, colors, countriesData }: Props) {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [countryData, setCountryData] = useState<{ name: string; data?: any }>({
    name: "",
  });
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
        setShowTooltip,
        setX,
        setY,
        parentContainerRef,
        countriesData,
        setCountryData
      ),
    200
  );

  return (
    <div ref={parentContainerRef} className="map-container">
      <Map
        layers={layers}
        colors={colors}
        onMouseLeave={onMouseLeave}
        onMouseEnter={debouncedMouseEnter}
        dataPerCountry={countriesData}
      />
      <Tooltip
        x={x}
        y={y}
        showTooltip={showTooltip}
        countryData={countryData}
        children={customTooltip}
      />
    </div>
  );
}

export default MapComponent;
