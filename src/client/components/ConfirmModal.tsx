interface Props {
  text: string;
  handleHideConfirmDelete: () => void;
  handleDeleteChannel: () => void;
}

export const ConfirmModal = (props: Props) => {
  const { text, handleHideConfirmDelete, handleDeleteChannel } = props;
  const outerContainer =
    "w-full h-full flex absolute justify-center items-center";
  const innerContainer =
    "p-4 w-96 h-2/5 bg-slate-100 flex flex-col justify-center items-center border border-black rounded-3xl z-10";
  const buttonStyle = "bg-black text-white w-3/5 mb-2 rounded-md py-1 px-2";

  return (
    <>
      <div className={outerContainer}>
        <div className={innerContainer}>
          <h1 className="text-2xl text-center">{text}</h1>

          <div className="bg-red-100 w-4/5 flex justify-between">
            <button className={buttonStyle} onClick={handleDeleteChannel}>
              Yes
            </button>
            <button className={buttonStyle} onClick={handleHideConfirmDelete}>
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
