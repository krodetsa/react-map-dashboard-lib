import { getName } from "country-list";
export const onMouseEnter = (
  e: React.MouseEvent<SVGElement, MouseEvent>,
  setShowTooltip: React.Dispatch<React.SetStateAction<boolean>>,
  setX: React.Dispatch<React.SetStateAction<number>>,
  setY: React.Dispatch<React.SetStateAction<number>>,
  parentContainerRef: React.RefObject<HTMLDivElement>,
  countriesData: { country: string; amount: number, data?:any[]}[],
  setCountryData: React.Dispatch<React.SetStateAction<{
    name: string;
    data?: any;
}>>

) => {
  const childElement = e.target as SVGElement;
  const country = childElement.getAttribute("data-name");
  const countryHasData = countriesData.find(
    (el) => el.country.toLowerCase() === country?.toLowerCase()
  );
  if (!countryHasData) return;
  setCountryData({name: getName(countryHasData.country) || '', ...countryHasData})
  const parentContainer = parentContainerRef.current;
  if (parentContainer && childElement) {
    const childRect = childElement.getBoundingClientRect();
    const parentRect = parentContainer.getBoundingClientRect();
    const offsetX = childRect.left - parentRect.left;
    const offsetY = childRect.top - parentRect.top;
    const childHalfWidth = childRect.width / 2;
    const childHalfHeight = childRect.height / 2;
    setX(offsetX + childHalfWidth);
    setY(offsetY + childHalfHeight);
  }
  setShowTooltip(true);
};