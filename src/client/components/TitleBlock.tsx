import { Link } from "react-router-dom";
import { twStyle } from "../tailwind";

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
        className={`flex flex-col justify-center items-center ${twStyle.blockDimensions} border border-${twStyle.highlightColour}`}
      >
        <Link
          to={linkToChannel}
          className={`w-full h-full flex items-center justify-center mb-${twStyle.spacingMd}`}
        >
          <h3 className="text-center">{channelTitle}</h3>
        </Link>
        {/* <p className="text-xs">{shortenUUID(id)}</p> */}
        <div className="text-center">
          <p>{isPrivate ? "Private Channel" : "Public Channel"}</p>
          <p>{connectionsCount} blocks</p>
        </div>
      </div>
    </>
  );
};
