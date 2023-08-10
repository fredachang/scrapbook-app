import { Link, useLocation } from "react-router-dom";
import {
  breadcrumbStyle,
  defaultInputStyle,
  twStyle,
  twText,
} from "../tailwind";
import { useAuthContext } from "../context/AuthContext";
import { Logo } from "./Logo";
import { motion } from "framer-motion";
import { fadeUp } from "../motion";

interface Props {
  isScrolled: boolean;
  thirdLink: boolean;
  thirdLinkText: string;
  thirdLinkPath: string;
  fourthlink: boolean;
  fourthLinkPath: string;
  fourthLinkText: string;
  handleShowCreateChannelModal?: () => void;
  inputValue?: string;
  handleInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClear?: () => void;
}

export const PageHeader = (props: Props) => {
  const {
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

  const { profile } = useAuthContext();
  const userName = `${profile?.firstName}-${profile?.lastName}`;

  const location = useLocation();
  const currentPath = location.pathname;
  const channelsPath = `/channels/${userName}`;

  const overallContainer = `bg-${twStyle.primaryColour} flex justify-between items-center w-97% h-${twStyle.sizeLg} fixed left-0 top-0 z-20 px-${twStyle.spacingLg}`;
  const logoContainer = `flex items-center ${
    currentPath === channelsPath ? `w-2/3` : `w-full`
  } `;

  const slashStyle = `${twText.breadcrumbs} mx-${twStyle.spacingSm}`;

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
              <Logo
                logoText=""
                logoTextStyle={twText.logoSmall}
                logoImgStyle="w-12 mt-1"
              />
            </Link>

            <h1 className={slashStyle}>/</h1>

            <Link to={`/`}>
              <h1 className={breadcrumbStyle}>{userName}</h1>
            </Link>

            {thirdLink && (
              <div className="flex">
                <h1 className={slashStyle}>/</h1>

                <Link to={thirdLinkPath}>
                  <h1 className={breadcrumbStyle}>{thirdLinkText}</h1>
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
              className={defaultInputStyle}
            />
            <button onClick={handleClear} className={`ml-${twStyle.spacingSm}`}>
              <p className={twText.heading}>Clear</p>
            </button>
          </div>
        )}

        <button
          className={`${twText.heading} ${breadcrumbStyle} flex justify-end w-44 px-${twStyle.spacingSm}`}
          onClick={handleShowCreateChannelModal}
        >
          <p className={`mr-${twStyle.spacingSm}`}>New Channel</p>
          <p>+</p>
        </button>
      </div>
    </>
  );
};
