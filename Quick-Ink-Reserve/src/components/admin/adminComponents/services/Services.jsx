import React, { useEffect, useState } from "react";
import {
  AiFillCloseCircle,
} from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import Inputs from "../../UI/forms/formComponents/Inputs";
import Label from "../../UI/forms/formComponents/Label";
import FormHeaders from "../../UI/forms/formComponents/FormHeaders";
import "./Services.css";
import { TabTitle } from "../../../../utils/GeneralFunctions";
import { fetchDataAsync,
  handleAddServices, handleDeleteService,
  handleFileInputChange
} from "./Functions";
import LoadingComponent from "../../../../utils/LoadingComponent";
import ServiceCards from "./ServiceCards";
import SPagination from "./SPagination";
import TableForm from "./TableForm";

function Services({ loginStatus, nav }) {
  TabTitle("Admin | Services", false);
  
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [readMaterial, setReadMaterial] = useState({});
  const [newService, setNewService] = useState({
    name: "",
    imageUrl: null,
    description: "",
    rateUnit: "",
  });
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isReadModalOpen, setIsReadModalOpen] = useState(false);
  const [id, setId] = useState(17);

  //PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 8;
  const pageNumbers = Math.ceil(services.length / servicesPerPage);

  useEffect(() => {
    if (loginStatus === false) {
      nav("/login");
    }

    fetchDataAsync(setServices, setMaterials, setLoading);
  }, []);

  if (loading) {
    return (
      <LoadingComponent loading={loading} />
    );
  }

  console.log(selectedItems)

  return (
    <>
      <div className="h-[90%] w-full flex flex-col gap-5">
        {overlayOpen && (
          <div
            className="fixed flex justify-center items-center top-0 left-0 w-full h-full bg-gray-500 bg-opacity-80 z-20"
            id="overlay"
          >
            {isModalOpen && (
              <div className="absolute h-[90%] w-1/2 bg-gray-200 rounded-[2rem] opacity-100 duration-500 z-5">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAddServices(e, newService, setServices, setIsModalOpen, setOverlayOpen, selectedItems);
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
                              <Label
                                htmlFor="serviceRateUnits"
                                title="Rate Units"
                              />
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
                            <Label
                              htmlFor="serviceDescription"
                              title="Description"
                            />
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
                              onChange={(e) => handleFileInputChange(e, setNewService, newService)}
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
            )}
            {isDeleteModalOpen && (
              <div className="absolute z-30 h-1/4 w-1/2 flex justify-center items-center">
                <div className="h-full w-full bg-white rounded-lg absolute m-5 flex flex-col justify-evenly items-stretch">
                  <h1 className="text-4xl text-red-600">Confirm Delete</h1>
                  <div className="flex justify-evenly items-center">
                    <h2 className="text-black text-left text-xl">
                      Are you sure you want to delete this?
                    </h2>
                    <div className="flex gap-10">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setIsDeleteModalOpen(false);
                          setOverlayOpen(false);
                        }}
                        className="bg-gray-500 border-none"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={(e) => {
                          handleDeleteService(e, id, setServices, setOverlayOpen, setIsDeleteModalOpen);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {isReadModalOpen && (
              <div className="absolute z-30 h-5/6 w-1/2 flex justify-center items-center">
                <div className="p-5 h-full w-full bg-white rounded-lg absolute m-5 flex flex-col justify-evenly items-stretch">
                  <AiFillCloseCircle
                    onClick={(e) => {
                      e.preventDefault();
                      setIsReadModalOpen(false);
                      setOverlayOpen(false);
                    }}
                    className="text-4xl text-red-500 hover:text-red-700 cursor-pointer absolute top-5 right-5"
                  />
                  <h1 className="text-4xl text-red-600">Service Details</h1>
                  <ul className="text-black flex flex-col gap-5 border-2 p-2 rounded-lg border-black">
                    <li
                      className={`bg-gray-700 bg-cover rounded-t-lg`}
                    >
                      <img
                        src={`http://localhost:5000/${readMaterial.genServiceImageUrl}`}
                        alt="Material"
                        className="h-[200px] w-[200px] rounded-full border-4 border-slate-700 m-auto"
                      />
                    </li>
                    <li className="flex justify-center p-2">
                      <div className="w-1/3 flex justify-center gap-3 items-center">
                        <span className="text-2xl">Name: </span>
                        <span className="text-xl underline">
                          {readMaterial.genServiceName}
                        </span>
                      </div>
                      <div className="w-1/3 flex gap-3 justify-center items-center">
                        <span className="text-2xl">Status: </span>
                        <span className="text-xl underline">
                          {readMaterial.status}
                        </span>
                      </div>
                      <div className="w-1/3 flex gap-3 justify-center items-center">
                        <span className="text-2xl">Rate Units: </span>
                        <span className="text-xl underline">
                          {readMaterial.rateUnit}
                        </span>
                      </div>
                    </li>
                    <li className="m-auto border-t-4 border-black p-2">
                      <div className="flex gap-5">
                        <span className="text-2xl w-1/5">Description: </span>
                        <span className="w-4/5 text-xl text-left p-3 bg-gray-200 rounded-lg">
                          {readMaterial.genServiceDesc}
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
        <header className="flex flex-col gap-5 ml-5 h-1/10">
          <div className="flex items-center gap-10 w-[90%]">
            <h1 className="text-left">Services</h1>
          </div>
          <p className="text-left">
            This component will allow the admin to see the available services
            based on materials, add new services to the existing list, and edit
            the details to existing services.
          </p>
        </header>
        <div className=" h-[90%] w-[95%] flex flex-col m-auto bg-blue-900 pb-0 p-5 rounded-t-2xl overflow-auto">
          <div className="w-full h-full p-5 flex flex-wrap gap-5 justify-between">
            {services
              .slice(
                (currentPage - 1) * servicesPerPage,
                currentPage * servicesPerPage
              )
              .map((service, index) => {
                const currentIndex = index + (currentPage - 1) * servicesPerPage;
                  return (
                    <ServiceCards
                      service={service} setId={setId}
                      setIsDeleteModalOpen={setIsDeleteModalOpen}
                      setReadMaterial={setReadMaterial}
                      setOverlayOpen={setOverlayOpen}
                      setIsReadModalOpen={setIsReadModalOpen}
                      key={currentIndex} setLoading={setLoading}
                    />
                );
              })}
          </div>
          <div className="pl-5 flex items-center">
            <div className="w-1/4">
              <button
                type="button"
                className="bg-green-400 flex items-center gap-3 text-black font-extrabold border-none hover:bg-green-600 hover:text-white hover:translate-y-[-4px] transition-all"
                onClick={(e) => {
                  setIsModalOpen(true);
                  setOverlayOpen(true);
                  setSelectedItems([]);
                }}
                disabled={isModalOpen}
              >
                <FaPlus />
                Add New Service
              </button>
            </div>
            <SPagination 
              pageNumbers={pageNumbers} 
              setCurrentPage={setCurrentPage} 
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Services;
