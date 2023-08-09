import { Link } from "react-router-dom";
import { defaultInputStyle, twStyle } from "../tailwind";
import { useAuthContext } from "../context/AuthContext";
import { Logo } from "./Logo";

interface Props {
  title?: string;
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

  const { profile } = useAuthContext();
  const userName = `${profile?.firstName}-${profile?.lastName}`;

  const showButtonsAndInput = buttonContainerClass !== "hidden";

  return (
    <>
      <div
        className={`bg-${twStyle.primaryColour} w-97% h-${twStyle.sizeMd} fixed top-0 z-20 ${twStyle.primaryColour} px-${twStyle.spacingSm}`}
      >
        <div className="flex justify-between">
          <div className="flex items-center w-1/2">
            <Link to={`/`}>
              <Logo />
            </Link>

            <h1 className="mx-2">/</h1>

            <Link to={`/`}>
              <h1>{userName}</h1>
            </Link>

            <h1 className="mx-2">/</h1>

            <h1>{title}</h1>
          </div>

          {showButtonsAndInput && (
            <div className={buttonContainerClass}>
              <input
                type="text"
                placeholder="Type to filter..."
                value={inputValue}
                onChange={handleInput}
                className={defaultInputStyle}
              />
              <button onClick={handleClear}>
                <p>Clear</p>
              </button>

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
