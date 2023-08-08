import { defaultInputStyle, twStyle } from "../tailwind";

interface Props {
  title: string;
  count: number;
  buttonContainerClass: string;
  buttonClass?: string;
  onClick?: () => void;
  inputValue?: string;
  handleInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClear?: () => void;
}

export const PageHeader = (props: Props) => {
  const {
    title,
    count,
    buttonClass,
    onClick,
    inputValue,
    handleInput,
    handleClear,
    buttonContainerClass,
  } = props;

  const showButtonsAndInput = buttonContainerClass !== "hidden";

  return (
    <>
      <div
        className={`bg-${twStyle.primaryColour} w-97% h-${twStyle.sizeMd} fixed top-0 z-10 ${twStyle.primaryColour} px-${twStyle.spacingSm}`}
      >
        <div className="flex justify-between">
          <h1>{title}</h1>

          {showButtonsAndInput && (
            <div className={buttonContainerClass}>
              <input
                type="text"
                placeholder="Type to filter..."
                value={inputValue}
                onChange={handleInput}
                className={defaultInputStyle}
              />
              <button onClick={handleClear}>Clear</button>

              <button className={buttonClass} onClick={onClick}>
                +
              </button>
            </div>
          )}
          <h2 className="text-xl">{count}</h2>
        </div>
        {/* <div className="w-full h-1.5 border-y border-black"></div> */}
      </div>
    </>
  );
};
