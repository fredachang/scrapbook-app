import { ChangeEvent } from "react";
import {
  buttonStyleFull,
  defaultInputStyle,
  labelStyle,
  modalBgStyle,
  modalContainerStyle,
  modalOuterContainerStyle,
  twText,
} from "../tailwind";
import { GenericButton } from "./GenericButton";
import { Checkbox } from "./Checkbox";

interface Props {
  handleTitle: (e: ChangeEvent<HTMLInputElement>) => void;
  handleIsPrivate: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  title: string;
  isPrivate: boolean;
  handleShowModal: () => void;
  buttonText: string;
}

export const NewChannelModal = (props: Props) => {
  const {
    handleTitle,
    handleIsPrivate,
    handleSubmit,
    title,
    isPrivate,
    handleShowModal,
    buttonText,
  } = props;

  const formStyle =
    "flex flex-col justify-between items-center w-full h-3/5 mt-5";

  const formEntry = "w-full flex justify-between pb-3";

  return (
    <>
      <div className={modalOuterContainerStyle} onClick={handleShowModal}>
        <div
          className={modalContainerStyle}
          onClick={(e) => e.stopPropagation()}
        >
          <form onSubmit={handleSubmit} className={formStyle}>
            <div className={formEntry}>
              <label className={`${labelStyle}`} htmlFor="email">
                <p className={twText.paragraph}>Title</p>
              </label>
              <input
                className={`${defaultInputStyle} ${twText.paragraph}`}
                type="text"
                id="title"
                value={title}
                onChange={handleTitle}
                required
              />
            </div>

            <Checkbox checked={isPrivate} handleOnChange={handleIsPrivate} />

            <GenericButton
              buttonType="submit"
              buttonText={buttonText}
              buttonStyle={buttonStyleFull}
            />
          </form>
        </div>
      </div>
      <div className={modalBgStyle}></div>
    </>
  );
};
