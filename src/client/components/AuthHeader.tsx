import { useNavigate } from "react-router-dom";
import { twStyle } from "../tailwind";
import { DoubleUnderline } from "./DoubleUnderline";
import { Logo } from "./Logo";

const linkStyle = "text-black w-full mb-2";

interface Props {
  headingText: string;
  navigateToText: string;
  navigateToPath: string;
}

export const AuthHeader = (props: Props) => {
  const { headingText, navigateToText, navigateToPath } = props;
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full">
        <div className={`flex justify-between mb-${twStyle.spacingSm}`}>
          <div className="flex flex-col">
            <Logo />
            <h1>{headingText}</h1>
          </div>

          <div>
            <button
              className={linkStyle}
              onClick={() => navigate(navigateToPath)}
            >
              <p>{navigateToText}</p>
            </button>
          </div>
        </div>

        <DoubleUnderline height={twStyle.spacingSm} />
      </div>
    </>
  );
};
