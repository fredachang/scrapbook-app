import { ChangeEvent } from "react";

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

  const outerContainer =
    "w-full h-full flex absolute justify-center items-center";
  const innerContainer =
    "p-4 w-96 h-2/5 bg-slate-100 flex flex-col justify-center items-center border border-black rounded-3xl z-10";
  const formStyle =
    "flex flex-col justify-between items-center w-full h-3/5 mt-5";

  const formEntry = "flex justify-between pb-3";

  const inputStyle = "w-3/5 border-b border-black";
  const buttonStyle = "bg-black text-white w-4/5 mb-2 rounded-md py-1 px-2";

  return (
    <>
      <div className={outerContainer} onClick={handleHideChannelSettings}>
        <div className={innerContainer} onClick={(e) => e.stopPropagation()}>
          <h1 className="text-2xl text-center">Update Channel Settings</h1>
          <form onSubmit={handleUpdateChannelSettings} className={formStyle}>
            <div className={formEntry}>
              <label className="text-xl" htmlFor="email">
                New Title
              </label>
              <input
                className={inputStyle}
                type="text"
                id="title"
                value={newChannelName}
                onChange={handleInput}
              />
            </div>

            <div className={formEntry}>
              <label className="text-xl" htmlFor="isPrivate">
                Private
              </label>
              <input
                type="checkbox"
                id="isPrivate"
                checked={privateSetting}
                onChange={handlePrivateSetting}
              />
            </div>

            <button className={buttonStyle} type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
