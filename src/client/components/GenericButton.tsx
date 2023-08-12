import { motion } from "framer-motion";
import { durationSettings, easeSettings, fade } from "../motion";

type Button = "button" | "submit" | "reset" | undefined;

interface Props {
  buttonText: string;
  handleOnClick?: () => void;
  buttonStyle: string;
  buttonType: Button;
}

export const GenericButton = (props: Props) => {
  const { buttonText, handleOnClick, buttonStyle, buttonType } = props;
  return (
    <>
      <motion.button
        initial="hidden"
        animate="visible"
        variants={fade(durationSettings.fast, easeSettings.easeInOut)}
        type={buttonType}
        className={buttonStyle}
        onClick={handleOnClick}
      >
        <p>{buttonText}</p>
      </motion.button>
    </>
  );
};
