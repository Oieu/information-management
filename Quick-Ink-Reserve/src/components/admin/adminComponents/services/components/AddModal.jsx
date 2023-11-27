import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import Inputs from "../../../UI/forms/formComponents/Inputs";
import Label from "../../../UI/forms/formComponents/Label";
import FormHeaders from "../../../UI/forms/formComponents/FormHeaders";
import { handleAddServices } from "../Functions";
import { handleFileInputChange } from "../Functions";
import TableForm from "../TableForm";

function AddModal({
  newService, setNewService,
  setIsModalOpen, setOverlayOpen,
  selectedItems, setSelectedItems,
  setServices, materials
}) {
  return (
    <div className="absolute h-[90%] w-1/2 bg-gray-200 rounded-[2rem] opacity-100 duration-500 z-5">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddServices(
            e,
            newService,
            setServices,
            setIsModalOpen,
            setOverlayOpen,
            selectedItems
          );
        }}
        className="bg-white flex flex-col gap-3 h-full w-full justify-center rounded-[2rem] p-10"
      >
        <div className="h-1/6 relative">
          <div className="h-[40%] w-full text-black flex justify-end absolute">
            <button
              className="bg-transparent border-none absolute w-1/12"
              onClick={(e) => {
                setIsModalOpen(false);
                setOverlayOpen(false);
              }}
            >
              <AiFillCloseCircle className="h-full w-full flex justify-end text-gray-700 hover:text-red-500" />
            </button>
          </div>
          <div className="h-[60%]">
            <FormHeaders text="Add New Service" />
          </div>
        </div>
        <div className="flex flex-col w-full justify-between h-5/6">
          <div className="flex w-full h-3/5">
            <div className="flex w-1/2 items-center justify-between h-full flex-col gap-3">
              <section className="flex w-full items-center justify-between">
                <Label htmlFor="serviceName" title="Service Name" />
                <Inputs
                  type="text"
                  placeholder="Enter service name..."
                  name="serviceName"
                  label="Service Name"
                  value={newService.name}
                  handleChange={(e) => {
                    setNewService({
                      ...newService,
                      name: e.target.value,
                    });
                  }}
                />
              </section>
              <section className="flex w-full items-center justify-between">
                <div className="flex w-full justify-between">
                  <Label htmlFor="serviceRateUnits" title="Rate Units" />
                  <Inputs
                    type="text"
                    placeholder="Enter service rate units..."
                    name="serviceRateUnits"
                    label="Rate Units"
                    value={newService.rateUnit}
                    handleChange={(e) => {
                      setNewService({
                        ...newService,
                        rateUnit: e.target.value,
                      });
                    }}
                  />
                </div>
              </section>
              <section className="flex w-full h-full flex-col items-center gap-3">
                <div className="flex w-full">
                  <Label htmlFor="serviceDescription" title="Description" />
                </div>
                <textarea
                  type="text"
                  placeholder="Enter service description..."
                  name="serviceDescription"
                  value={newService.description}
                  onChange={(e) => {
                    setNewService({
                      ...newService,
                      description: e.target.value,
                    });
                  }}
                  className={`p-2 rounded-md w-full h-2/3 bg-gray-300 ${
                    newService.description ? "text-black" : ""
                  }`}
                ></textarea>
              </section>
            </div>
            <div className="flex items-center w-1/2 h-full">
              <section className="flex h-full w-full flex-col items-center justify-between">
                <div className="w-full h-2/3 flex flex-col">
                  {newService.imageUrl && (
                    <img
                      src={URL.createObjectURL(newService.imageUrl)}
                      alt="Profile Preview"
                      className="w-2/3 h-4/5 rounded-lg m-auto border-2 border-slate-700"
                    />
                  )}
                  <Label htmlFor="serviceImage" title="Service Image" />
                </div>
                <div className="h-1/3 w-full flex">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleFileInputChange(e, setNewService, newService)
                    }
                    name="serviceImage"
                    className="text-black cursor-pointer m-auto w-1/2"
                  />
                </div>
              </section>
            </div>
          </div>
          <div className="h-2/5 w-full">
            <TableForm
              data={materials}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
            />
          </div>
        </div>
        <button
          type="submit"
          className="m-auto bg-green-400 text-black font-extrabold w-1/4 border-none hover:bg-green-600 hover:text-white hover:translate-y-[-4px] transition-all"
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default AddModal;
