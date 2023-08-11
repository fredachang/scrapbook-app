import { ChangeEvent } from "react";
import {
  buttonStyleFull,
  defaultInputStyle,
  modalBgStyle,
  modalContainerStyle,
  modalOuterContainerStyle,
} from "../tailwind";
import { GenericButton } from "./GenericButton";

interface Props {
  handleTitle: (e: ChangeEvent<HTMLInputElement>) => void;
  handleIsPrivate: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  title: string;
  isPrivate: boolean;
  handleShowModal: () => void;
}

export const NewChannelModal = (props: Props) => {
  const {
    handleTitle,
    handleIsPrivate,
    handleSubmit,
    title,
    isPrivate,
    handleShowModal,
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
              <label className="text-xl" htmlFor="email">
                <p>Title</p>
              </label>
              <input
                className={defaultInputStyle}
                type="text"
                id="title"
                value={title}
                onChange={handleTitle}
                required
              />
            </div>

            <div className={formEntry}>
              <label className="text-xl" htmlFor="isPrivate">
                <p>Private</p>
              </label>
              <input
                type="checkbox"
                id="isPrivate"
                checked={isPrivate}
                onChange={handleIsPrivate}
              />
            </div>

            <GenericButton
              buttonType="submit"
              buttonText="Create New Channel"
              buttonStyle={buttonStyleFull}
            />
          </form>
        </div>
      </div>
      <div className={modalBgStyle}></div>
    </>
  );
};
