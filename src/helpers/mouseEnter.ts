export const onMouseEnter = (
  e: React.MouseEvent<SVGElement, MouseEvent>,
  setCountrySelected: React.Dispatch<React.SetStateAction<string | null>>,
  setShowTooltip: React.Dispatch<React.SetStateAction<boolean>>,
  setX: React.Dispatch<React.SetStateAction<number>>,
  setY: React.Dispatch<React.SetStateAction<number>>,
  parentContainerRef: React.RefObject<HTMLDivElement>
) => {
  const childElement = e.target as SVGElement;
  const country = childElement.getAttribute("name");
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
  setCountrySelected(country);
  setShowTooltip(true);
};