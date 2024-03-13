import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="mx-auto max-w-lg p-3">
      <h1 className="my-7 text-center text-3xl font-semibold">SignUp</h1>

      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="rounded-lg bg-slate-100 p-3"
        />
        <input
          type="text"
          placeholder="Email"
          id="email"
          className="rounded-lg bg-slate-100 p-3"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="rounded-lg bg-slate-100 p-3"
        />
        <button className="rounded-lg bg-slate-700 p-3 uppercase text-white hover:opacity-95 disabled:opacity-80">
          Sign Up
        </button>
      </form>
      <div className="mt-5 flex gap-1">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-500">Sign In</span>
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
