interface Props {
  logoText: string;
  logoTextStyle: string;
  logoImgStyle: string;
}

export const Logo = (props: Props) => {
  const { logoText, logoTextStyle, logoImgStyle } = props;
  return (
    <>
      <div className="flex items-start">
        <img className={logoImgStyle} src="/Logo.png" />
        <div className={`${logoTextStyle}`}>{logoText}</div>
      </div>
    </>
  );
};
