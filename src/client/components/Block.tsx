import { PopUpMenu } from "./PopUpMenu";

interface Props {
  id: string;
  imagePath: string | null;
  imageData: string | null;
}

export const Block = (props: Props) => {
  const { id, imagePath, imageData } = props;

  function shortenBlockId(id: string) {
    return id.split("-")[0];
  }

  function convertBase64ToUrl(base64string: string) {
    const imageFormat = "jpeg";
    const dataURL = `data:image/${imageFormat};base64,${base64string}`;
    return dataURL;
  }

  const imageSrc = imagePath ? imagePath : convertBase64ToUrl(imageData || "");

  // console.log(imageSrc);
  return (
    <>
      <div key={id} className="w-56 h-56 border m-3 border-black flex flex-col">
        <div className="bg-purple-100 flex justify-end z-10">
          <PopUpMenu blockId={id} />
        </div>
        <div className="bg-yellow-100 w-full h-full flex flex-col items-center">
          <img
            src={imageSrc}
            alt="block-image"
            className="w-full h-4/5 object-contain"
          />
          <p className="text-xs">{shortenBlockId(id)}</p>
        </div>
      </div>
    </>
  );
};
