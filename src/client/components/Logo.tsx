interface Props {
  logoStyle: string;
}

export const Logo = (props: Props) => {
  const { logoStyle } = props;
  return (
    <>
      <img className={logoStyle} src="/Logo.png" />
    </>
  );
};
