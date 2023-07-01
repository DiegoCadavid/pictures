// interface Props {}

const NavSearchBar = ({}) => {
  return (
    <form className="relative flex-grow">
      <input type="text" placeholder="Search" className="w-full py-3 px-6 rounded-2xl bg-zinc-200 outline-none" />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-5 w-5 absolute top-1/2 right-6 -translate-y-1/2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
    </form>
  );
};

export default NavSearchBar;
