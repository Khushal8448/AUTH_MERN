import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="bg-slate-400">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-3">
        <NavLink to="/">
          <h1 className="text-3xl font-extrabold text-slate-800">Auth App</h1>
        </NavLink>
        <ul className="flex items-center gap-4 font-semibold text-slate-900">
          <NavLink to="/">
            <li>Home</li>
          </NavLink>
          <NavLink to="/about">
            <li>About</li>
          </NavLink>
          <NavLink to={currentUser ? "/profile" : "sign-in"}>
            <li>
              {currentUser ? (
                <img
                  src={currentUser.profilePicture}
                  width={28}
                  height={28}
                  className="rounded-full object-cover"
                  alt="Profile Picture"
                />
              ) : (
                "Sign In"
              )}{" "}
            </li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
}

export default Header;
