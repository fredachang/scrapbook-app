export const twStyle = {
  primaryColour: "neutral-50",
  secondaryColour: "neutral-100",
  highlightColour: "blue-300",
  dimColour: "slate-600",
  hoverColour: "blue-100",
  blockDimensions: "w-80 h-80",
  spacingXs: "1",
  spacingSm: "2",
  spacingMd: "5",
  spacingLg: "8",
  spacingXl: "10",
  spacing2Xl: "14",
  spacing3Xl: "16",
  sizeSm: "6",
  sizeMd: "10",
  sizeLg: "14",
};

export const twText = {
  logoLarge: "font-bold text-6xl",
  logoSmall: "font-bold text-2xl",
  breadcrumbs: "font-light text-2xl",
  headingBold: "font-bold text-xl",
  heading: "font-light text-xl",
  paragraph: "font-light text-base",
  button: "font-mono text-base",
  small: "font-mono text-xs",
  numberLg: "font-mono text-6xl",
};

export const blockContainerStyle = `${twStyle.blockDimensions} mr-${twStyle.spacingLg} flex flex-col relative overflow-y-hidden`;

export const buttonStyleHalf = `${twText.button} bg-${twStyle.primaryColour} flex justify-center items-center w-1/2 border border-${twStyle.highlightColour}`;

export const buttonStyleFull = `${twText.button} w-full flex justify-center items-center  border border-${twStyle.highlightColour}`;

export const defaultInputStyle = `w-full h-${twStyle.sizeSm} focus:outline-none`;

export const modalOuterContainerStyle = `w-full h-full flex fixed top-0 justify-center items-center z-20`;
export const modalContainerStyle = `p-4 w-96 h-2/5 bg-${twStyle.primaryColour} flex flex-col justify-center items-center border border-${twStyle.highlightColour}`;
export const modalBgStyle = `bg-${twStyle.dimColour} w-full h-full fixed top-0 z-10 opacity-50`;

//Auth
export const formStyle =
  "flex flex-col justify-between items-center w-full h-4/5 mt-5";
export const formEntry = "flex justify-between pb-3";
export const labelStyle = "w-2/5";
export const logInModalStyle = `p-4 w-96 h-3/5 bg-${twStyle.primaryColour} flex flex-col items-center border border-${twStyle.highlightColour}`;
