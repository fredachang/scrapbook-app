type Button = "button" | "submit" | "reset" | undefined;

interface Props {
  buttonText: string;
  handleOnClick?: () => void;
  buttonStyle: string;
  buttonType: Button;
}

export const GenericButton = (props: Props) => {
  const { buttonText, handleOnClick, buttonStyle, buttonType } = props;
  return (
    <>
      <button type={buttonType} className={buttonStyle} onClick={handleOnClick}>
        <p>{buttonText}</p>
      </button>
    </>
  );
};
