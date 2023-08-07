export const tailwindStyles = {
  primaryColour: "neutral-50",
  highlightColour: "blue-300",
  hoverColour: "blue-100",
  blockDimensions: "w-64 h-64 min-w-[100px]",
  standardMargin: "5",
};

export const blockContainerStyle = `bg-slate-100 ${tailwindStyles.blockDimensions} ml-${tailwindStyles.standardMargin} flex flex-col relative overflow-y-hidden`;

export const buttonStyle = `w-1/2 border border-${tailwindStyles.highlightColour}`;
