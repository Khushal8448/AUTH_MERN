import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";

function SignUp() {
  const {
    setError,
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios({
        method: "post",
        url: "/api/v1/auth/signup",
        data: data,
      });
      reset();
      toast.success(`You have successfully signed up`);
    } catch (error) {
      console.log(error);
      if (error.request.status === 404) {
        setError("root", {
          message: "Can't connect to server",
        });
      }
      if (error.request.status === 500) {
        setError("root", {
          message: "Internal server error",
        });
      }
      if (error.request.status === 409) {
        setError("email", {
          message: "User already exists!",
        });
      }
      toast.error("Signup failed ");
    }
  };
  console.log(errors);

  return (
    <div className="mx-auto max-w-lg p-3">
      <h1 className="my-7 text-center text-3xl font-semibold">SignUp</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("username", {
            required: "Username is required!",
          })}
          type="text"
          placeholder="Username"
          id="username"
          className="rounded-lg bg-slate-100 p-3"
        />
        {errors.username && (
          <div className="px-2 text-base leading-none text-red-700">
            {errors.username.message}
          </div>
        )}
        <input
          {...register("email", {
            required: "Email is required!",
            validate: (value) => value.includes("@") || "Invalid Email",
          })}
          type="text"
          placeholder="Email"
          id="email"
          className="rounded-lg bg-slate-100 p-3"
        />
        {errors.email && (
          <div className="px-2 text-base leading-none text-red-700">
            {errors.email.message}
          </div>
        )}
        <input
          {...register("password", {
            required: "Password is required!",
            minLength: {
              value: 8,
              message: "Password must have 8 characters",
            },
          })}
          type="password"
          placeholder="Password"
          id="password"
          className="rounded-lg bg-slate-100 p-3"
        />
        {errors.password && (
          <div className="px-2 text-base leading-none text-red-700">
            {errors.password.message}
          </div>
        )}
        <button
          disabled={isSubmitting}
          className="rounded-lg bg-slate-700 p-3 uppercase text-white hover:opacity-95 disabled:opacity-80"
        >
          {isSubmitting ? "Signing Up..." : "Sign Up"}
        </button>
        {errors.root && (
          <div className="text-base leading-none text-red-700">
            {errors.root.message}
          </div>
        )}
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
