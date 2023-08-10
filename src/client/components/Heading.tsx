import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { twStyle, twText } from "../tailwind";
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

  const innerContainer = `flex justify-between h-full mb-${twStyle.spacingMd}`;

  const logoContainer = "flex flex-col justify-between w-3/4 h-full";

  const slashStyle = `${twText.breadcrumbs} mx-${twStyle.spacingSm}`;

  return (
    <>
      <div className={outerContainer}>
        <div className={innerContainer}>
          <div className={logoContainer}>
            <Link to={`/`}>
              <Logo logoType={twText.logoLarge} />
            </Link>

            <div className="flex">
              <h1 className={slashStyle}>/</h1>

              <Link to={`/`}>
                <h1 className={twText.breadcrumbs}>{userName}</h1>
              </Link>

              <h1 className={slashStyle}>/</h1>

              {thirdLink && (
                <Link to={thirdLinkPath}>
                  <h1 className={twText.breadcrumbs}>{thirdLinkText}</h1>
                </Link>
              )}

              {fourthlink && (
                <div className="flex">
                  <h1 className={slashStyle}>/</h1>

                  <Link to={fourthLinkPath}>
                    <h1 className={twText.breadcrumbs}>{fourthLinkText}</h1>
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="flex">
            <h4
              className={`${twText.numberLg} text-${twStyle.highlightColour}`}
            >
              {"("}
            </h4>
            <h4 className={twText.numberLg}>{count}</h4>
            <h4
              className={`${twText.numberLg} text-${twStyle.highlightColour}`}
            >
              {")"}
            </h4>
          </div>
        </div>

        <DoubleUnderline height={twStyle.spacingSm} />
      </div>
    </>
  );
};
