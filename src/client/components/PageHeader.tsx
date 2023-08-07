import { tailwindStyles } from "../tailwind";

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
      <div className={`${tailwindStyles.primaryColour} pb-2`}>
        <div className="flex justify-between">
          <h1>{title}</h1>

          {showButtonsAndInput && (
            <div className={buttonContainerClass}>
              <div className="w-2/3">
                <input
                  type="text"
                  placeholder="Type to filter..."
                  value={inputValue}
                  onChange={handleInput}
                  className="w-2/3 focus:outline-none"
                />
                <button onClick={handleClear}>Clear</button>
              </div>

              <button className={buttonClass} onClick={onClick}>
                +
              </button>
              <h2 className="text-xl">{count}</h2>
            </div>
          )}
        </div>
        {/* <div className="w-full h-1.5 border-y border-black"></div> */}
      </div>
    </>
  );
};
