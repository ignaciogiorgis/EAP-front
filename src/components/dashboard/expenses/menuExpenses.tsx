import React, { MouseEventHandler } from "react";

interface MenuExpensesProps {
  onFormToggle: MouseEventHandler<HTMLButtonElement>;
  onListToggle: MouseEventHandler<HTMLButtonElement>;
}

const menuExpenses = ({ onFormToggle, onListToggle }: MenuExpensesProps) => {
  return (
    <div>
      <div className="p-5">
        <div className="flex justify-center items-baseline flex-wrap">
          <div className="flex m-2"></div>
          <div className="flex m-2">
            <button
              onClick={onFormToggle}
              className="text-base  rounded-r-none  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
        hover:bg-indigo-700 hover:text-indigo-100 
        bg-indigo-100 
        text-indigo-700 
        border duration-200 ease-in-out 
        border-indigo-600 transition"
            >
              <div className="flex leading-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-save w-5 h-5 mr-1"
                >
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                  <polyline points="17 21 17 13 7 13 7 21"></polyline>
                  <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
                Crear
              </div>
            </button>
            <button
              onClick={onListToggle}
              className="text-base  rounded-l-none  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
        hover:bg-indigo-700 hover:text-indigo-100 
        bg-indigo-100 
        text-indigo-700 
        border duration-200 ease-in-out 
        border-indigo-600 transition"
            >
              <div className="flex leading-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-eye w-5 h-5 mr-1"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                Ver Lista
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default menuExpenses;
