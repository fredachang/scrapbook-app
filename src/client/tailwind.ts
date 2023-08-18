export const twStyle = {
  primaryColour: "neutral-50",
  secondaryColour: "neutral-100",
  thirdColour: "neutral-200",
  highlightColour: "black",
  secondaryHighlightColour: "blue-100",
  dimColour: "zinc-400",
  textColour: "text-zinc-700",
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
  sizeXl: "16",
};

export const twText = {
  logoSmall: "font-bold text-3xl",
  breadcrumbs: "font-regular text-3xl",
  headingBold: "font-bold text-xl",
  heading: "font-regular text-4xl",
  subheading: "font-regular text-2xl",
  subheadingBold: "font-bold text-2xl",
  paragraph: "font-regular text-lg",
  small: "font-regular text-sm",
  buttonLg: "font-regular text-2xl",
  button: "font-regular text-base",
  numberLg: "font-serif text-6xl",
};

export const blockContainerStyle = `${twStyle.blockDimensions} mr-${twStyle.spacingLg} flex flex-col relative overflow-y-hidden`;

export const buttonStyleHalf = `${twText.button} bg-${twStyle.secondaryColour} rounded hover:bg-${twStyle.thirdColour} ${twStyle.transitionSm} flex justify-center items-center w-1/2`;

export const buttonStyleFull = `${twText.button} bg-${twStyle.secondaryColour} rounded hover:bg-${twStyle.thirdColour} ${twStyle.transitionSm} duration-150 w-full flex justify-center items-center`;

export const buttonStyleFullNoBorder = `w-full ${twText.button} border border-${twStyle.primaryColour} hover:border-${twStyle.highlightColour} hover:rounded-3xl hover:border-dotted ${twStyle.transitionSm}`;

export const defaultInputStyle = `w-2/3 h-${twStyle.sizeSm} bg-transparent border-b border-${twStyle.textColour} focus:outline-none ${twText.paragraph} focus:drop-shadow-center`;

export const fullInputStyle = `w-full bg-transparent h-${twStyle.sizeMd} border-b border-${twStyle.textColour} focus:outline-none ${twText.paragraph}`;
export const modalOuterContainerStyle = `w-full h-full flex fixed top-0 left-0 justify-center items-center z-30`;

export const modalContainerStyle = `p-4 w-96 h-2/5 bg-${twStyle.primaryColour} flex flex-col justify-center items-center rounded-xl`;

export const modalBgStyle = `bg-${twStyle.dimColour} w-screen h-screen fixed top-0 left-0 z-20 opacity-50`;

export const breadcrumbStyle = `${twText.breadcrumbs}`;

//uploader

export const uploaderStyle = `w-full h-full bg-neutral-100 p-4 ${twText.paragraph} hover:border hover:border-${twStyle.thirdColour} hover:box-border focus:outline-none`;
export const buttonSharedStyle = `${twText.button} bg-${twStyle.secondaryColour} rounded hover:bg-${twStyle.thirdColour} ${twStyle.transitionSm} flex justify-center items-center w-1/2`;

export const uploadSubmitButton = `${twText.button} bg-${twStyle.secondaryColour} rounded hover:bg-${twStyle.thirdColour} ${twStyle.transitionSm} duration-150 w-full flex justify-center items-center`;

//Auth
export const formStyle =
  "flex flex-col justify-between items-center w-full h-4/5 mt-5";
export const formEntry = "flex justify-between pb-3";
export const labelStyle = "w-1/3";
export const authModalStyle = `p-4 w-2/6 h-1/2 bg-${twStyle.primaryColour} flex flex-col items-center`;
