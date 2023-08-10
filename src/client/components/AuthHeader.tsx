import { twStyle, twText } from "../tailwind";
import { DoubleUnderline } from "./DoubleUnderline";
import { Logo } from "./Logo";

export const AuthHeader = () => {
  return (
    <>
      <div className="w-full h-1/4 flex flex-col justify-between items-center">
        <div className={`flex mb-${twStyle.spacingSm}`}>
          <Logo
            logoText="Scrapbook"
            logoTextStyle={twText.logoSmall}
            logoImgStyle={`w-16 mt-1`}
          />
        </div>

        <DoubleUnderline height={twStyle.spacingSm} />
      </div>
    </>
  );
};
