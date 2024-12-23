import React from "react";

const Agenda = () => {
  const items = Array.from({ length: 100 }, (_, index) => `Item ${index + 1}`);

  return (
    <div className="h-2/3">
      <div className="flex justify-between ">
        <div className="flex px-2 space-x-7">
          <h2 className="p-1 text-center bg-slate-500 rounded-t-md">
            Agendamentos
          </h2>
          <ul className="flex space-x-4">
            <li className="p-1 bg-blue-400 rounded-t-md">Fernands</li>
            <li className="p-1 bg-blue-900 rounded-t-md">Paula</li>
            <li className="p-1 bg-blue-200 rounded-t-md">Amanda</li>
          </ul>
        </div>
        <div>
          <ul className="flex space-x-4">
            <li className="p-1 bg-blue-400 rounded-t-md">Dia</li>
            <li className="p-1 bg-blue-900 rounded-t-md">Semana</li>
            <li className="p-1 bg-blue-200 rounded-t-md">Mês</li>
          </ul>
        </div>
      </div>
      <div className="w-full h-full p-2 overflow-y-auto bg-yellow-50 agenda-scroll scrollbar-thin scrollbar-thumb-white scrollbar-track-white rounded-xl">
        <div>
          <ul className="grid grid-cols-4 gap-4 ">
            {items.map((item, index) => (
              <React.Fragment key={index}>
                {index % 20 === 0 && index !== 0 && (
                  <li className="col-span-4">
                    <div className="w-full h-1 bg-black"></div>
                  </li>
                )}
                <li className="h-32 p-4 text-center bg-white border border-gray-200 rounded-lg shadow-md">
                  {item}
                </li>
              </React.Fragment>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Agenda;
