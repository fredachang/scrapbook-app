import { useState } from "react";
import { shortenUUID } from "../utils";
import { ConnectionModal } from "./ConnectionModal";
import { GenericButton } from "./GenericButton";

interface Props {
  imageSrc: string;
  handleCloseBlock: () => void;
  blockId: string;
}

export const BlockExpanded = (props: Props) => {
  const { imageSrc, handleCloseBlock, blockId } = props;

  const [showConnectModal, setShowConnectModal] = useState(false);

  const [drag, setDrag] = useState({
    active: false,
    x: 0,
    y: 0,
  });

  const [size, setSize] = useState({
    width: 500,
    height: 500,
  });

  const [zoom, setZoom] = useState(1);
  const [scroll, setScroll] = useState(false);

  const startResize = (e: React.MouseEvent<HTMLDivElement>) => {
    setDrag({
      active: true,
      x: e.clientX,
      y: e.clientY,
    });
  };

  const resizeFrame = (e: React.MouseEvent<HTMLDivElement>) => {
    const { active, x, y } = drag;

    if (active) {
      const xDiff = Math.abs(x - e.clientX);
      const yDiff = Math.abs(y - e.clientY);
      const newW = x > e.clientX ? size.width + xDiff : size.width - xDiff;
      const newH = y > e.clientY ? size.height + yDiff : size.height - yDiff;

      //make sure it doesnt get resized beyond the current window
      const maxWidth = newW > window.innerWidth ? window.innerWidth : newW;
      const maxHeight = newH > window.innerHeight ? window.innerHeight : newH;

      setDrag({ ...drag, x: e.clientX, y: e.clientY });
      setSize({ width: maxWidth, height: maxHeight });
    }
  };

  const stopResize = () => {
    setDrag({ ...drag, active: false });
  };

  const handleZoom = (e: React.WheelEvent<HTMLImageElement>) => {
    // Increase or decrease the zoom level based on the wheel scroll direction
    const zoomIncrement = 0.1; // Adjust this value to control zoom speed

    if (e.deltaY < 0) {
      // Zoom in
      setScroll(true);
      setZoom((prevZoom) => prevZoom + zoomIncrement);
    } else {
      // Zoom out
      setScroll(true);
      setZoom((prevZoom) =>
        prevZoom - zoomIncrement > 0 ? prevZoom - zoomIncrement : prevZoom
      );
    }
  };

  const handleClickConnect = () => {
    setShowConnectModal(true);
  };

  const handleCloseConnect = () => {
    setShowConnectModal(false);
  };

  const containerstyle = "absolute top-0 left-0 w-full h-full z-40";
  const blockStyle = `bg-green-400 fixed bottom-0 right-0 w-[${size.width}px] h-[${size.height}px] z-30`;
  const imgContainerStyle = "w-full h-3/5 border border-black overflow-hidden";
  const imgStyleStatic = "w-full h-full object-contain";
  const imgStyleScroll = `object-contain origin-center scale-[${zoom}]`;

  return (
    <>
      <div
        className={containerstyle}
        onMouseMove={resizeFrame}
        onMouseUp={stopResize}
      >
        <div className={blockStyle}>
          <div className="flex justify-between">
            <div className="bg-blue-100 w-1/3" onMouseDown={startResize}>
              Resize Me
            </div>
            <button onClick={handleCloseBlock}>Close</button>
          </div>

          <div className={imgContainerStyle}>
            <img
              src={imageSrc}
              alt="block-image"
              className={scroll ? imgStyleScroll : imgStyleStatic}
              onWheel={handleZoom}
            />
          </div>

          <p className="text-xs">BlockId: {shortenUUID(blockId)}</p>
          <a href={imageSrc} target="_blank">
            Source
          </a>

          <GenericButton
            buttonText="Connect"
            handleOnClick={handleClickConnect}
          />
          {showConnectModal && (
            <ConnectionModal
              blockId={blockId}
              handleCloseConnect={handleCloseConnect}
              channelTitle=""
            />
          )}
        </div>
      </div>
    </>
  );
};
