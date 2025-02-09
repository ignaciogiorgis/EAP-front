import { MenuProps } from "@/components/index";

const menuClients = ({ onFormToggle, onListToggle }: MenuProps) => {
  return (
    <div>
      <div className="p-5">
        <div className="flex justify-center items-baseline flex-wrap">
          <div className="flex m-2 space-x-3">
            <button
              onClick={onFormToggle}
              className="bg-indigo-800 py-2 px-4 font-extrabold rounded-md hover:bg-indigo-950"
            >
              <div className="flex leading-5">Create Clients</div>
            </button>
            <button
              onClick={onListToggle}
              className="bg-indigo-800 py-2 px-4 font-extrabold rounded-md hover:bg-indigo-950"
            >
              <div className="flex leading-5">Show Clients</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default menuClients;
