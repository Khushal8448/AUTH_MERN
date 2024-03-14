import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";

function OAuth() {
  const dispatch = useDispatch();

  async function handleGoogleClick() {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await axios({
        method: "post",
        url: "/api/v1/auth/google",
        data: {
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        },
      });
      dispatch(signInSuccess(res.data.data));
      console.log(result);
    } catch (error) {
      console.error("Could not login with google", error);
    }
  }

  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="rounded-lg bg-red-700 p-3 uppercase text-white hover:opacity-95"
    >
      Continue with Google
    </button>
  );
}

export default OAuth;
