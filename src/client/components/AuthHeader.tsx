import { twStyle } from "../tailwind";
import { Logo } from "./Logo";

export const AuthHeader = () => {
  return (
    <>
      <div className="w-full h-1/4 flex flex-col justify-between items-center">
        <div className={`mb-${twStyle.spacingSm}`}>
          <Logo logoStyle="" />
        </div>

        {/* <DoubleUnderline height={twStyle.spacingSm} /> */}
      </div>
    </>
  );
};
