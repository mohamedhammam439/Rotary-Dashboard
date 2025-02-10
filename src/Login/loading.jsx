import Logo from "../assets/rotary.png";
import ClipLoader from "react-spinners/ClipLoader";

const Loading = ({ loading }) => {
 
  return (
    <div className="w-2/4 h-3/4 m-auto  rounded-md p-10 flex flex-col gap-y-1 items-center">
      <img src={Logo} className="w-4/6 self-center mb-10" alt="Rotary" />
      <ClipLoader
        color="#0033a0"
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loading;
