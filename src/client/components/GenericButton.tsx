import { buttonStyle } from "../tailwind";

interface Props {
  buttonText: string;
  handleOnClick: (event: React.MouseEvent<HTMLElement>) => void;
}

export const GenericButton = (props: Props) => {
  const { buttonText, handleOnClick } = props;
  return (
    <>
      <button className={buttonStyle} onClick={handleOnClick}>
        {buttonText}
      </button>
    </>
  );
};
