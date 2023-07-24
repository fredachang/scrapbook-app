interface Props {
  id: string;
  imagePath: string;
}

export const Block = (props: Props) => {
  const { id, imagePath } = props;
  return (
    <>
      <div
        key={id}
        className="w-56 h-56 border m-3 border-black flex justify-center items-center"
      >
        <img src={imagePath} className="w-full h-full object-contain" />
      </div>
    </>
  );
};
