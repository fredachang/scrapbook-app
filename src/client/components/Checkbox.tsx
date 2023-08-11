import { ChangeEvent, useState } from "react";
import { twStyle, twText } from "../tailwind";
import { motion } from "framer-motion";
import { durationSettings, easeSettings, fade } from "../motion";

interface Props {
  checked: boolean;
  handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = (props: Props) => {
  const { checked, handleOnChange } = props;
  const [checkmark, setCheckmark] = useState(false);

  const handleCheckmark = () => {
    setCheckmark(!checkmark);
  };

  const sharedStyle = `flex justify-center items-center w-${twStyle.sizeXs} h-${twStyle.sizeXs} mr-${twStyle.spacingSm}`;
  const uncheckedStyle = `${sharedStyle} bg-neutral-200 ease-in duration-200 hover:bg-neutral-300`;
  const checkedStyle = `${sharedStyle} bg-${twStyle.highlightColour}`;

  return (
    <>
      <div className="flex">
        <label className="flex items-center" htmlFor="isPrivate">
          <input
            type="checkbox"
            id="isPrivate"
            checked={checked}
            onClick={handleCheckmark}
            onChange={handleOnChange}
            className="absolute cursor-pointer h-0 w-0 opacity-0"
          />

          <div className={checkmark ? checkedStyle : uncheckedStyle}>
            {checkmark && (
              <motion.span
                initial="hidden"
                animate="visible"
                variants={fade(durationSettings.superFast, easeSettings.easeIn)}
                className={`fa-solid fa-check fa-sharp fa-xs`}
                style={{ color: "#ffffff" }}
              ></motion.span>
            )}
          </div>

          <p className={twText.paragraph}>Private</p>
        </label>
      </div>
    </>
  );
};
