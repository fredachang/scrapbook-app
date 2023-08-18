import { Link } from "react-router-dom";
import { twStyle, twText } from "../tailwind";

interface Props {
  linkToChannel: string;
  channelTitle: string;
  isPrivate: boolean;
  connectionsCount: number;
}

export const TitleBlock = (props: Props) => {
  const { linkToChannel, channelTitle, isPrivate, connectionsCount } = props;
  return (
    <>
      <div
        className={`relative ${twStyle.blockDimensions} bg-${twStyle.secondaryColour} -lg mr-${twStyle.spacingLg} hover:bg-${twStyle.thirdColour}`}
      >
        <Link
          to={linkToChannel}
          className={`px-${twStyle.spacingSm} absolute w-full h-full flex flex-col items-center justify-center`}
        >
          <h3
            className={`${twText.heading} text-center leading-5 mb-${twStyle.spacingMd}`}
          >
            {channelTitle}
          </h3>
          <p className={`${twText.small} mb-${twStyle.spacingSm}`}>
            {isPrivate ? "Private Channel" : "Public Channel"}
          </p>
          <p className={twText.small}>{connectionsCount} blocks</p>
        </Link>
        {/* <p className="text-xs">{shortenUUID(id)}</p> */}
      </div>
    </>
  );
};
