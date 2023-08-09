import {
  buttonStyleHalf,
  modalBgStyle,
  modalContainerStyle,
  modalOuterContainerStyle,
} from "../tailwind";
import { GenericButton } from "./GenericButton";

interface Props {
  text: string;
  handleYes: () => void;
  handleNo: () => void;
}

export const ConfirmModal = (props: Props) => {
  const { text, handleYes, handleNo } = props;

  return (
    <>
      <div className={modalOuterContainerStyle} onClick={handleNo}>
        <div className={modalContainerStyle}>
          <h1 className="text-2xl text-center">{text}</h1>

          <div className="w-full flex justify-between">
            <GenericButton
              buttonText="Yes"
              handleOnClick={handleYes}
              buttonStyle={buttonStyleHalf}
              buttonType="button"
            />
            <GenericButton
              buttonText="No"
              handleOnClick={handleNo}
              buttonStyle={buttonStyleHalf}
              buttonType="button"
            />
          </div>
        </div>
      </div>
      <div className={modalBgStyle}></div>
    </>
  );
};
