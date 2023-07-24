import { ChangeEvent } from "react";

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
  const outerContainer =
    "w-full h-full flex absolute justify-center items-center";
  const innerContainer =
    "p-4 w-96 h-2/5 flex flex-col justify-center items-center border border-black rounded-3xl";
  const formStyle =
    "flex flex-col justify-between items-center w-full h-3/5 mt-5";

  const formEntry = "flex justify-between pb-3";

  const input = "w-3/5 border-b border-black";
  const buttonStyle = "bg-black text-white w-4/5 mb-2 rounded-md py-1 px-2";

  return (
    <>
      <div className={outerContainer} onClick={handleShowModal}>
        <div className={innerContainer} onClick={(e) => e.stopPropagation()}>
          <h1 className="text-2xl text-center">New Channel</h1>
          <form onSubmit={handleSubmit} className={formStyle}>
            <div className={formEntry}>
              <label className="text-xl" htmlFor="email">
                Title
              </label>
              <input
                className={input}
                type="text"
                id="title"
                value={title}
                onChange={handleTitle}
                required
              />
            </div>

            <div className={formEntry}>
              <label className="text-xl" htmlFor="isPrivate">
                Private
              </label>
              <input
                type="checkbox"
                id="isPrivate"
                checked={isPrivate}
                onChange={handleIsPrivate}
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
