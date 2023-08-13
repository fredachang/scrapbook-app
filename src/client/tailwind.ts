export const twStyle = {
  primaryColour: "neutral-50",
  secondaryColour: "neutral-100",
  highlightColour: "blue-300",
  secondaryHighlightColour: "blue-100",
  dimColour: "slate-400",
  textColour: "text-gray-900",
  textColourLight: "text-gray-500",
  blockDimensions: "w-80 h-80",
  transitionSm: "ease-in duration-150",
  spacingXs: "1",
  spacingSm: "2",
  spacingMd: "5",
  spacingLg: "8",
  spacingXl: "10",
  spacing2Xl: "14",
  spacing3Xl: "16",
  sizeXs: "4",
  sizeSm: "6",
  sizeMd: "10",
  sizeLg: "14",
};

export const twText = {
  logoLarge: "font-bold text-5xl",
  logoSmall: "font-bold text-3xl",
  breadcrumbs: "font-light text-2xl",
  headingBold: "font-bold text-xl",
  heading: "font-light text-xl",
  paragraph: "font-light text-base",
  buttonLg: "font-mono text-2xl",
  button: "font-mono text-base",
  small: "font-mono text-xs",
  numberLg: "font-mono text-6xl",
};

export const blockContainerStyle = `${twStyle.blockDimensions} mr-${twStyle.spacingLg} flex flex-col relative overflow-y-hidden`;

export const buttonStyleHalf = `${twText.button} bg-${twStyle.primaryColour} hover:bg-${twStyle.secondaryHighlightColour} ${twStyle.transitionSm} flex justify-center items-center w-1/2 border border-${twStyle.highlightColour}`;

export const buttonStyleFull = `${twText.button} bg-${twStyle.primaryColour} hover:bg-${twStyle.secondaryHighlightColour} ${twStyle.transitionSm} duration-150 w-full flex justify-center items-center  border border-${twStyle.highlightColour}`;

export const buttonStyleFullNoBorder = `w-full ${twText.button} border border-${twStyle.primaryColour} hover:border-${twStyle.highlightColour} hover:rounded-3xl hover:border-dotted ${twStyle.transitionSm}`;

export const defaultInputStyle = `w-2/3 h-${twStyle.sizeSm} focus:outline-none ${twText.paragraph} focus:drop-shadow-center`;

export const fullInputStyle = `w-full h-${twStyle.sizeSm} focus:outline-none ${twText.paragraph} focus:drop-shadow-center`;
export const modalOuterContainerStyle = `w-full h-full flex fixed top-0 left-0 justify-center items-center z-30`;

export const modalContainerStyle = `p-4 w-96 h-2/5 bg-${twStyle.primaryColour} flex flex-col justify-center items-center border border-${twStyle.highlightColour}`;

export const modalBgStyle = `bg-${twStyle.dimColour} w-screen h-screen fixed top-0 left-0 z-20 opacity-50`;

export const breadcrumbStyle = `${twText.breadcrumbs} border border-${twStyle.primaryColour} hover:border-${twStyle.highlightColour} hover:rounded-3xl hover:border-dotted ${twStyle.transitionSm}`;

//uploader

export const uploaderStyle = `w-full h-full p-4 ${twText.paragraph} focus:outline-none`;
export const buttonSharedStyle = `${twText.button} bg-${twStyle.primaryColour} hover:bg-${twStyle.secondaryHighlightColour} ${twStyle.transitionSm} flex justify-center items-center w-1/2`;
export const imageButtonStyle = `${buttonSharedStyle} border-r border-${twStyle.highlightColour}`;
export const imageButtonStyleDisabled = `${buttonSharedStyle} border-r border-b border-${twStyle.highlightColour}`;
export const textButtonStyle = `${buttonSharedStyle}`;
export const textButtonStyleDisabled = `${buttonSharedStyle} border-b border-${twStyle.highlightColour}`;

export const uploadSubmitButton = `${twText.button} bg-${twStyle.primaryColour} hover:bg-${twStyle.secondaryHighlightColour} ${twStyle.transitionSm} duration-150 w-full flex justify-center items-center  border-t border-${twStyle.highlightColour}`;

//Auth
export const formStyle =
  "flex flex-col justify-between items-center w-full h-4/5 mt-5";
export const formEntry = "flex justify-between pb-3";
export const labelStyle = "w-1/3";
export const logInModalStyle = `p-4 w-96 h-2/5 bg-${twStyle.primaryColour} flex flex-col items-center`;
