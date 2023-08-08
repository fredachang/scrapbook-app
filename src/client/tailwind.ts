export const twStyle = {
  primaryColour: "neutral-50",
  highlightColour: "blue-300",
  dimColour: "slate-600",
  hoverColour: "blue-100",
  blockDimensions: "w-64 h-64",
  spacingXs: "1",
  spacingSm: "2",
  spacingMd: "5",
  spacingLg: "8",
  spacingXl: "10",
  spacing2Xl: "14",
  sizeSm: "6",
  sizeMd: "10",
};

export const blockContainerStyle = `${twStyle.blockDimensions} ml-${twStyle.spacingMd} flex flex-col relative overflow-y-hidden`;

export const buttonStyleHalf = `w-1/2 border border-${twStyle.highlightColour}`;

export const buttonStyleFull = `w-full border border-${twStyle.highlightColour}`;

export const defaultInputStyle = `w-full h-${twStyle.sizeSm} focus:outline-none`;

export const modalOuterContainerStyle = `w-full h-full flex fixed top-0 justify-center items-center z-20`;
export const modalContainerStyle = `p-4 w-96 h-2/5 bg-${twStyle.primaryColour} flex flex-col justify-center items-center border border-${twStyle.highlightColour}`;
export const modalBgStyle = `bg-${twStyle.dimColour} w-full h-full fixed top-0 z-10 opacity-50`;
