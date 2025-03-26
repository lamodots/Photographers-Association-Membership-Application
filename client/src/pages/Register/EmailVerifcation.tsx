import verifyGif from "../../assets/verification-done.gif";
import { Link } from "react-router-dom";

function EmailVerifcation() {
  return (
    <div className=" flex justify-center items-center w-full h-screen bg-white">
      <div className=" w-full md:w-[40%] ">
        <h2 className="text-center text-2xl">Email Verified!</h2>
        <img
          src={verifyGif}
          alt="Verification complete"
          className=" block w-full"
        />
        <div className="text-center">
          <Link
            to="/login"
            className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
          >
            Continu to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EmailVerifcation;
