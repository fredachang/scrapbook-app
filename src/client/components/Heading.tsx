import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { breadcrumbStyle, twStyle, twText } from "../tailwind";
import { DoubleUnderline } from "./DoubleUnderline";

interface Props {
  username: string;
  usernamePath: string;
  thirdLink: boolean;
  thirdLinkText: string;
  thirdLinkPath: string;
  fourthlink: boolean;
  fourthLinkPath: string;
  fourthLinkText: string;
  includeCount?: boolean;
  count?: number;
}

export const Heading = (props: Props) => {
  const {
    username,
    usernamePath,
    thirdLink,
    thirdLinkText,
    thirdLinkPath,
    fourthlink,
    fourthLinkPath,
    fourthLinkText,
    includeCount,
    count,
  } = props;

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
              <Logo
                logoText="Scrapbook"
                logoTextStyle={twText.logoLarge}
                logoImgStyle={`w-14 mr-${twStyle.spacingSm} mt-1.5`}
              />
            </Link>

            <div className="flex">
              <h1 className={slashStyle}>/</h1>

              <Link to={usernamePath}>
                <h1 className={breadcrumbStyle}>{username}</h1>
              </Link>

              <h1 className={slashStyle}>/</h1>

              {thirdLink && (
                <Link to={thirdLinkPath}>
                  <h1 className={breadcrumbStyle}>{thirdLinkText}</h1>
                </Link>
              )}

              {fourthlink && (
                <div className="flex">
                  <h1 className={slashStyle}>/</h1>

                  <Link to={fourthLinkPath}>
                    <h1 className={breadcrumbStyle}>{fourthLinkText}</h1>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {includeCount && (
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
          )}
        </div>

        <DoubleUnderline height={twStyle.spacingSm} />
      </div>
    </>
  );
};
