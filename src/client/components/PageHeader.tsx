import { Link, useLocation } from "react-router-dom";
import { breadcrumbStyle, fullInputStyle, twStyle, twText } from "../tailwind";
import { motion } from "framer-motion";
import { fadeUp } from "../motion";
import { replaceHyphensWithSpace } from "../utils";

interface Props {
  isScrolled: boolean;
  thirdLink: boolean;
  thirdLinkText: string;
  thirdLinkPath: string;
  fourthlink: boolean;
  fourthLinkPath: string;
  fourthLinkText: string;
  username: string;
  usernamePath: string;
  handleShowCreateChannelModal?: () => void;
  inputValue?: string;
  handleInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClear?: () => void;
}

export const PageHeader = (props: Props) => {
  const {
    username,
    usernamePath,
    thirdLink,
    thirdLinkPath,
    thirdLinkText,
    fourthlink,
    fourthLinkPath,
    fourthLinkText,
    handleShowCreateChannelModal,
    inputValue,
    isScrolled,
    handleInput,
    handleClear,
  } = props;

  const location = useLocation();
  const currentPath = location.pathname;
  const channelsPath = `/channels/${username}`;

  const overallContainer = `bg-gradient-to-b from-${twStyle.primaryColour} to-transparent flex justify-between items-center w-97% h-${twStyle.sizeXl} fixed left-0 top-0 z-20 pt-${twStyle.spacingSm} px-${twStyle.spacingLg}`;
  const logoContainer = `flex items-center ${
    currentPath === channelsPath ? `w-2/3` : `w-full`
  } `;

  const slashStyle = `${twText.breadcrumbs} ${twStyle.textColour} mx-${twStyle.spacingSm}`;

  return (
    <>
      <div className={overallContainer}>
        {isScrolled ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className={isScrolled ? logoContainer : "hidden"}
          >
            <Link to={`/`}>
              <img src="/spiral-gray.png" className="w-10 -rotate-90" />
            </Link>

            <h1 className={slashStyle}>/</h1>

            <Link to={usernamePath}>
              <h1 className={`${breadcrumbStyle} ${twStyle.textColour}`}>
                {replaceHyphensWithSpace(username)}
              </h1>
            </Link>

            {thirdLink && (
              <div className="flex">
                <h1 className={slashStyle}>/</h1>

                <Link to={thirdLinkPath}>
                  <h1 className={`${breadcrumbStyle} ${twStyle.textColour}`}>
                    {thirdLinkText}
                  </h1>
                </Link>
              </div>
            )}

            {fourthlink && (
              <div className="flex">
                <h1 className={slashStyle}>/</h1>

                <Link to={fourthLinkPath}>
                  <h1 className={breadcrumbStyle}>{fourthLinkText}</h1>
                </Link>
              </div>
            )}
          </motion.div>
        ) : (
          <div className={logoContainer}></div>
        )}

        {currentPath === channelsPath && (
          <div
            className={`w-1/3 flex justify-between items-center mr-${twStyle.spacingXl}`}
          >
            <input
              type="text"
              placeholder="Type to filter..."
              value={inputValue}
              onChange={handleInput}
              className={fullInputStyle}
            />
            <button onClick={handleClear} className={`ml-${twStyle.spacingSm}`}>
              <p className={twText.buttonLg}>Clear</p>
            </button>
          </div>
        )}

        <button
          className={`flex justify-end items-center w-80 px-${twStyle.spacingSm}`}
          onClick={handleShowCreateChannelModal}
        >
          <p
            className={`${twText.buttonLg} ${twStyle.textColour} mr-${twStyle.spacingSm}`}
          >
            New Channel
          </p>

          <p className={`font-regular text-5xl ${twStyle.textColour}`}>+</p>
        </button>
      </div>
    </>
  );
};
