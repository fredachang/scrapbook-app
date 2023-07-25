interface Props {
  buttonText: string;
  handleOnClick: (event: React.MouseEvent<HTMLElement>) => void;
}

export const GenericButton = (props: Props) => {
  const { buttonText, handleOnClick } = props;
  return (
    <>
      <button
        className="w-20 h-5 bg-slate-900 text-center text-white text-sm absolute"
        onClick={handleOnClick}
      >
        {buttonText}
      </button>
    </>
  );
};
