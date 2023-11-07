import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  AiFillCloseCircle,
  AiFillEdit,
  AiFillDelete,
  AiOutlineStar,
  AiFillStar,
} from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import Inputs from "../../UI/forms/formComponents/Inputs";
import Label from "../../UI/forms/formComponents/Label";
import FormHeaders from "../../UI/forms/formComponents/FormHeaders";
import Timeout from "../../../../controllers/Timeout";
import "./Services.css";
import { TabTitle } from "../../../../utils/GeneralFunctions";

function Services({ loginStatus, nav }) {
  TabTitle("Admin | Services", false);
  const [services, setServices] = useState([]);
  const [readMaterial, setReadMaterial] = useState({});
  const [newService, setNewService] = useState({
    name: "",
    imageUrl: null,
    description: "",
  });
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isReadModalOpen, setIsReadModalOpen] = useState(false);
  const [id, setId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 8;

  useEffect(() => {
    if (loginStatus === false) {
      nav("/login");
    }
    axios
      .get("http://localhost:5000/admin/services")
      .then((response) => {
        setServices(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function openDeleteModal(e, index) {
    e.preventDefault();
    setOverlayOpen(true);
    setIsDeleteModalOpen(true);
    setId(index);
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  function handleDeleteService(e, index) {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/admin/services/delete/${index}`)
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setOverlayOpen(false);
    setIsDeleteModalOpen(false);
    Timeout(1000);
  }

  function handleFileInputChange(event) {
    const fileInput = event.target;

    if (fileInput.files && fileInput.files[0]) {
      const selectedFile = fileInput.files[0];
      setNewService({ ...newService, imageUrl: selectedFile });
    }
  }

  function handleReadMaterial(index) {
    setReadMaterial(services[index]);

    setTimeout(() => {
      setOverlayOpen(true);
      setIsReadModalOpen(true);
    }, 1000);
  }

  const handleAddServices = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", newService.name);
    formData.append("size", newService.size);
    formData.append("count", newService.count);
    formData.append("quantity", newService.quantity);
    formData.append("units", newService.units);
    formData.append("serviceImage", newService.imageUrl);
    formData.append("color", newService.color);
    formData.append("description", newService.description);

    axios
      .post("http://localhost:5000/admin/services", formData)
      .then((response) => {
        setServices(response.data);
        setIsModalOpen(false);
        setOverlayOpen(false);
        Timeout(1000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const pageNumbers = Math.ceil(services.length / servicesPerPage);

  return (
    <>
      <div className="h-[90%] w-full flex flex-col gap-5">
        {overlayOpen && (
          <div
            className="fixed flex justify-center items-center top-0 left-0 w-full h-full bg-gray-500 bg-opacity-80 z-20"
            id="overlay"
          >
            {isModalOpen && (
              <div className="absolute h-2/3 w-1/2 bg-gray-200 rounded-[2rem] opacity-100 duration-500 z-5">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAddServices(e);
                  }}
                  className="bg-white flex flex-col gap-5 h-full w-full justify-center rounded-[2rem] p-10"
                >
                  <div className="h-1/5">
                    <div className="h-[40%] w-full text-black flex justify-end">
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
                      <FormHeaders text="Add New General Service" />
                    </div>
                  </div>
                  <div className="flex w-full justify-between h-4/5">
                    <div className="flex w-1/2 items-center justify-between h-full flex-col">
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
                      <section className="flex w-full h-full flex-col justify-center items-center gap-3">
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
                            onChange={handleFileInputChange}
                            name="serviceImage"
                            className="text-black cursor-pointer m-auto w-1/2"
                          />
                        </div>
                      </section>
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
                          handleDeleteService(e, id);
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
                  <h1 className="text-4xl text-red-600">Material Details</h1>
                  <ul className="text-black flex flex-col gap-5 border-2 p-2 rounded-lg border-black">
                    <li
                      className={`bg-[url('https://images.unsplash.com/photo-1503694978374-8a2fa686963a?auto=format&fit=crop&q=80&w=2069&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover rounded-t-lg`}
                    >
                      <img
                        src={`http://localhost:5000/${readMaterial.matImageUrl}`}
                        alt="Material"
                        className="h-[200px] w-[200px] rounded-full border-4 border-slate-700 m-auto"
                      />
                    </li>
                    <li className="flex justify-evenly border-t-4 border-t-black p-2">
                      <div className="w-1/2 flex justify-center gap-5 items-center">
                        <span className="text-2xl">Name: </span>
                        <span className="text-xl underline">
                          {readMaterial.matName}
                        </span>
                      </div>
                    </li>
                    <li className="flex justify-center p-2">
                      <div className="w-2/3 flex justify-center gap-5 items-center">
                        <span className="text-2xl">Size: </span>
                        <span className="text-xl underline">
                          {readMaterial.matSize}
                        </span>
                      </div>
                      <div className="w-1/3 flex gap-5 items-center">
                        <span className="text-2xl">Color: </span>
                        <span className="text-xl underline">
                          {readMaterial.color}
                        </span>
                      </div>
                    </li>
                    <li className="flex justify-evenly p-2">
                      <div className="w-1/3">
                        <span className="text-2xl">Count: </span>
                        <span className="text-xl underline">
                          {readMaterial.matCount} per {readMaterial.matUnit}
                        </span>
                      </div>
                      <div className="w-1/3">
                        <span className="text-2xl">Quantity: </span>
                        <span className="text-xl underline">
                          {readMaterial.matQty} {readMaterial.matUnit}
                        </span>
                      </div>
                      <div className="w-1/3">
                        <span className="text-2xl">Units: </span>
                        <span className="text-xl underline">
                          {readMaterial.matUnit}
                        </span>
                      </div>
                    </li>
                    <li className="m-auto border-t-4 border-black p-2">
                      <div className="flex gap-5">
                        <span className="text-2xl w-1/5">Description: </span>
                        <span className="w-4/5 text-xl text-left p-3 bg-gray-200 rounded-lg">
                          {readMaterial.description}
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
        <div className=" h-[90%] w-[95%] flex flex-col m-auto bg-blue-900 p-5 rounded-t-2xl overflow-auto">
          <div className="w-full h-full p-5 flex flex-wrap gap-5 justify-between">
            {services
              .slice(
                (currentPage - 1) * servicesPerPage,
                currentPage * servicesPerPage
              )
              .map((service, index) => {
                const currentIndex =
                  index + (currentPage - 1) * servicesPerPage;
                return (
                  <div
                    key={index}
                    className="bg-gray-800 w-[300px] h-[300px] rounded-lg p-5 relative overflow-hidden cursor-pointer text-zinc-400 shadow-zinc-400 shadow-sm border-white hover:shadow-blue-400 hover:shadow-lg transition-all"
                  >
                    <div
                      className="absolute z-10 right-5"
                      onClick={(e) => {
                        e.preventDefault();
                        handleReadMaterial(index);
                      }}
                    >
                      <span>
                        {service.featured === "false" ? (
                          <AiOutlineStar className="text-3xl text-yellow-200 hover:text-yellow-300 hover:scale-125 transition-all" />
                        ) : (
                          <AiFillStar className="text-3xl text-yellow-200 hover:text-yellow-300 hover:scale-125 transition-all" />
                        )}
                      </span>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-4/5 bg-cover bg-center hover:scale-150 transition-all">
                      <img
                        className="rounded-lg w-[100%] h-[100%] absolute top-0 left-0"
                        src={`http://localhost:5000/${service.genServiceImageUrl}`}
                        alt="Image"
                      />
                      <div className="bg-gradient-to-b from-zinc-400 to-black w-full h-full absolute top-0 left-0 bg-cover bg-center rounded-lg opacity-80"></div>
                    </div>
                    <div className="text-lg absolute z-1 top-[85%] flex items-center justify-between w-[85%]">
                      <span className="flex w-3/4 hover:text-white">
                        {service.genServiceName}
                      </span>
                      <div className="w-1/4 flex justify-end gap-3 text-xl">
                        <span>
                          <AiFillEdit className="text-blue-300 hover:text-blue-600" />
                        </span>
                        <span>
                          <AiFillDelete
                            onClick={(e) => openDeleteModal(e, service.genServicesID)}
                            className="text-red-300 hover:text-red-600"
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="pl-5 flex justify-between items-center">
            <button
              type="button"
              className="bg-green-400 flex items-center gap-3 text-black font-extrabold border-none hover:bg-green-600 hover:text-white hover:translate-y-[-4px] transition-all"
              onClick={(e) => {
                setIsModalOpen(true);
                setOverlayOpen(true);
              }}
              disabled={isModalOpen}
            >
              <FaPlus />
              Add New Service
            </button>
            <div className="flex justify-end">
              <ul className="pagination">
                {pageNumbers > 1 &&
                  Array.from({ length: pageNumbers }, (_, i) => (
                    <li
                      key={i}
                      className={`page-item ${
                        i + 1 === currentPage ? "active" : ""
                      }`}
                    >
                      <button
                        onClick={() => handlePageChange(i + 1)}
                        className={`${
                          i + 1 === currentPage
                            ? "font-bold underline text-white"
                            : "text-blue-600 hover:text-blue-900"
                        } cursor-pointer`}
                      >
                        {i + 1}
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Services;
