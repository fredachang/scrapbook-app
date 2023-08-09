import { twStyle } from "../tailwind";

interface Props {
  height: string;
}

export const DoubleUnderline = (props: Props) => {
  const { height } = props;
  return (
    <>
      <div
        className={`w-full h-${height} border-y border-${twStyle.highlightColour}`}
      ></div>
    </>
  );
};
