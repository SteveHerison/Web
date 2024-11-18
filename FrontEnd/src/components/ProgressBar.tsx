import { useState } from "react";

const ProgressBar = () => {
  const [progress, setProgress] = useState(0); // Defina o estado inicial (50% como exemplo)

  const handlePath = () => {
    if (location.pathname === "/cadastro") {
      setProgress(33);
    } else if (location.pathname === "/cadastro/usuario") {
      setProgress(66);
    }
    if (location.pathname === "/cadastro/usuario/empresa") {
      setProgress(100);
    }
  };

  return (
    <div className="flex w-full h-6 mt-10 mb-2 overflow-hidden font-sans text-xs font-medium rounded-full lg:w-96 bg-blue-gray-50 lg:mb-0 bg-zinc-200">
      <div
        className="flex items-center justify-center text-white transition-all duration-500 ease-in-out bg-red-300 rounded-full"
        style={{ width: `${progress}%` }}
      >
        {progress > 0 && `${progress}%`}
      </div>
    </div>
  );
};

export default ProgressBar;
