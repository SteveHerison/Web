import { useState } from "react";

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div
      className={`relative h-full bg-slate-800 duration-500 hidden sm:flex ${
        isExpanded ? "w-64" : "w-12"
      }`}
    >
      <div className="absolute flex items-center justify-center p-2 top-2 -right-6">
        <label
          className="flex flex-col w-8 gap-2 cursor-pointer"
          onClick={handleToggle}
        >
          <div
            className={`rounded-2xl h-[3px] w-1/2 bg-white duration-500 ${
              isExpanded
                ? "rotate-[225deg] origin-right -translate-x-[12px] -translate-y-[1px]"
                : ""
            }`}
          ></div>
          <div
            className={`rounded-2xl h-[3px] w-full bg-white duration-500 ${
              isExpanded ? "-rotate-45" : ""
            }`}
          ></div>
          <div
            className={`rounded-2xl h-[3px] w-1/2 bg-white duration-500 place-self-end ${
              isExpanded
                ? "rotate-[225deg] origin-left translate-x-[12px] translate-y-[1px]"
                : ""
            }`}
          ></div>
        </label>
      </div>

      {/* Content of Navbar */}
      <div
        className={`overflow-hidden duration-500 ${
          isExpanded ? "opacity-100" : "opacity-0"
        }`}
      >
        <ul className="mt-10 text-white">
          <li className="p-2 hover:bg-slate-700">Home</li>
          <li className="p-2 hover:bg-slate-700">About</li>
          <li className="p-2 hover:bg-slate-700">Contact</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
