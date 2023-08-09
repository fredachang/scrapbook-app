import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { twStyle } from "../tailwind";
import { DoubleUnderline } from "./DoubleUnderline";
import { useAuthContext } from "../context/AuthContext";

interface Props {
  thirdLink: boolean;
  thirdLinkText: string;
  thirdLinkPath: string;
  fourthlink: boolean;
  fourthLinkPath: string;
  fourthLinkText: string;
  count: number;
}

export const Heading = (props: Props) => {
  const {
    thirdLink,
    thirdLinkText,
    thirdLinkPath,
    fourthlink,
    fourthLinkPath,
    fourthLinkText,
    count,
  } = props;

  const { profile } = useAuthContext();
  const userName = `${profile?.firstName}-${profile?.lastName}`;

  const outerContainer = `w-full h-44 flex flex-col justify-between mb-${twStyle.spacingLg}`;

  const innerContainer = "flex justify-between h-full";

  const logoContainer = "flex flex-col justify-between w-3/4 h-full";

  return (
    <>
      <div className={outerContainer}>
        <div className={innerContainer}>
          <div className={logoContainer}>
            <Link to={`/`}>
              <Logo logoType="logo-large" />
            </Link>

            <div className="flex">
              <h1 className="mx-2">/</h1>

              <Link to={`/`}>
                <h1>{userName}</h1>
              </Link>

              <h1 className="mx-2">/</h1>

              {thirdLink && (
                <Link to={thirdLinkPath}>
                  <h1>{thirdLinkText}</h1>
                </Link>
              )}

              {fourthlink && (
                <div className="flex">
                  <h1 className="mx-2">/</h1>

                  <Link to={fourthLinkPath}>
                    <h1>{fourthLinkText}</h1>
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="flex">
            <h4 className={`text-${twStyle.highlightColour}`}>{"("}</h4>
            <h4>{count}</h4>
            <h4 className={`text-${twStyle.highlightColour}`}>{")"}</h4>
          </div>
        </div>

        <DoubleUnderline height={twStyle.spacingSm} />
      </div>
    </>
  );
};
