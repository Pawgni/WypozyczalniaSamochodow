import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext.jsx";

export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <header className="flex justify-between">
      <Link
        to={'/'}
        href=""
        className="flex items-center gap-2 shadow shadow-md shadow-blue-400 border px-8"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-8 h-8"
        >
          <path d="M6.5 3c-1.051 0-2.093.04-3.125.117A1.49 1.49 0 002 4.607V10.5h9V4.606c0-.771-.59-1.43-1.375-1.489A41.568 41.568 0 006.5 3zM2 12v2.5A1.5 1.5 0 003.5 16h.041a3 3 0 015.918 0h.791a.75.75 0 00.75-.75V12H2z" />
          <path d="M6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM13.25 5a.75.75 0 00-.75.75v8.514a3.001 3.001 0 014.893 1.44c.37-.275.61-.719.595-1.227a24.905 24.905 0 00-1.784-8.549A1.486 1.486 0 0014.823 5H13.25zM14.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
        </svg>
        <span className="font-bold text-xl">Pożycz Auto</span>
      </Link>

      <Link
        to={user ? '/account' : '/login'}
        className="flex gap-3 p-2 py-2 px-8 shadow shadow-blue-400 shadow-md border "
      >
        {user ? (
          <>
            <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 relative top-1"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="font-bold">{user.name}</div>
          </>
        ) : (
          <div className="font-bold">Zaloguj się</div>
        )}
      </Link>
    </header>
  );
}
