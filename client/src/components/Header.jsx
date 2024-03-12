import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div className="bg-slate-400">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <NavLink to="/">
          <h1 className="font-extrabold text-3xl text-slate-800">Auth App</h1>
        </NavLink>
        <ul className="flex items-center font-semibold gap-4 text-slate-900">
          <NavLink to="/">
            <li>Home</li>
          </NavLink>
          <NavLink to="/about">
            <li>About</li>
          </NavLink>
          <NavLink to="sign-in">
            <li>Sign In</li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
}

export default Header;
