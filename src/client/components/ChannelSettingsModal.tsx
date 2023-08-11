import { ChangeEvent } from "react";
import {
  buttonStyleFull,
  defaultInputStyle,
  modalBgStyle,
  modalContainerStyle,
  modalOuterContainerStyle,
  twText,
} from "../tailwind";
import { GenericButton } from "./GenericButton";
import { Checkbox } from "./Checkbox";

interface Props {
  handleHideChannelSettings: () => void;
  newChannelName: string;
  privateSetting: boolean;
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePrivateSetting: (e: ChangeEvent<HTMLInputElement>) => void;
  handleUpdateChannelSettings: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const ChannelSettingModal = (props: Props) => {
  const {
    handleHideChannelSettings,
    newChannelName,
    privateSetting,
    handleInput,
    handlePrivateSetting,
    handleUpdateChannelSettings,
  } = props;

  const formStyle =
    "flex flex-col justify-between items-center w-full h-3/5 mt-5";

  const formEntry = "flex w-full justify-between items-center pb-3";

  return (
    <>
      <div
        className={modalOuterContainerStyle}
        onClick={handleHideChannelSettings}
      >
        <div
          className={modalContainerStyle}
          onClick={(e) => e.stopPropagation()}
        >
          <form onSubmit={handleUpdateChannelSettings} className={formStyle}>
            <div className={formEntry}>
              <label className="">
                <p className={twText.paragraph}>New Title</p>
              </label>
              <input
                className={`${defaultInputStyle} ${twText.paragraph}`}
                type="text"
                id="title"
                value={newChannelName}
                onChange={handleInput}
              />
            </div>

            <Checkbox
              checked={privateSetting}
              handleOnChange={handlePrivateSetting}
            />

            <GenericButton
              buttonType="submit"
              buttonText="update"
              buttonStyle={buttonStyleFull}
            />
          </form>
        </div>
      </div>
      <div className={modalBgStyle}></div>
    </>
  );
};
