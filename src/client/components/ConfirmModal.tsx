import {
  buttonStyleHalf,
  modalBgStyle,
  modalContainerStyle,
  modalOuterContainerStyle,
} from "../tailwind";
import { GenericButton } from "./GenericButton";

interface Props {
  text: string;
  handleHideConfirmDelete: () => void;
  handleDeleteChannel: () => void;
}

export const ConfirmModal = (props: Props) => {
  const { text, handleHideConfirmDelete, handleDeleteChannel } = props;

  return (
    <>
      <div
        className={modalOuterContainerStyle}
        onClick={handleHideConfirmDelete}
      >
        <div className={modalContainerStyle}>
          <h1 className="text-2xl text-center">{text}</h1>

          <div className="w-full flex justify-between">
            <GenericButton
              buttonText="Yes"
              handleOnClick={handleDeleteChannel}
              buttonStyle={buttonStyleHalf}
              buttonType="button"
            />
            <GenericButton
              buttonText="No"
              handleOnClick={handleHideConfirmDelete}
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
