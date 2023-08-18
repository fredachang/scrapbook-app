import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { breadcrumbStyle, twStyle, twText } from "../tailwind";

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

  const outerContainer = `w-full h-44 flex flex-col justify-between my-${twStyle.spacingLg} mb-16`;

  const slashStyle = `${twText.breadcrumbs} mx-${twStyle.spacingSm} ${twStyle.textColour}`;

  return (
    <>
      <div className={outerContainer}>
        <Link to={`/`}>
          <Logo logoStyle="w-1/3" />
        </Link>

        <div className="flex">
          <h1 className={slashStyle}>/</h1>

          <Link to={usernamePath}>
            <h1 className={`${breadcrumbStyle} ${twStyle.textColour}`}>
              {username}
            </h1>
          </Link>

          <h1 className={slashStyle}>/</h1>

          {thirdLink && (
            <Link to={thirdLinkPath}>
              <h1 className={`${breadcrumbStyle} ${twStyle.textColour}`}>
                {thirdLinkText}
              </h1>
            </Link>
          )}

          {fourthlink && (
            <div className="flex">
              <h1 className={slashStyle}>/</h1>

              <Link to={fourthLinkPath}>
                <h1 className={`${breadcrumbStyle} ${twStyle.textColour}`}>
                  {fourthLinkText}
                </h1>
              </Link>
            </div>
          )}
          {includeCount && (
            <h4
              className={`font-serif text-3xl ml-3 ${twStyle.textColour}`}
            >{`( ${count} )`}</h4>
          )}
        </div>
      </div>
    </>
  );
};
