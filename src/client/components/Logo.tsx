interface Props {
  logoType: string;
}

export const Logo = (props: Props) => {
  const { logoType } = props;
  return (
    <>
      <div className={logoType}>Scrapbook</div>
    </>
  );
};
