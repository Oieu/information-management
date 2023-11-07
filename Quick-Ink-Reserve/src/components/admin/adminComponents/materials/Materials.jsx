import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  AiFillCloseCircle,
  AiFillEdit,
  AiFillDelete,
  AiFillRead,
} from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import Inputs from "../../UI/forms/formComponents/Inputs";
import Label from "../../UI/forms/formComponents/Label";
import FormHeaders from "../../UI/forms/formComponents/FormHeaders";
import { TableHead, TableCol } from "./tableComponents/TableHead";
import Timeout from "../../../../controllers/Timeout";
import { TabTitle } from "../../../../utils/GeneralFunctions";

function Materials({ loginStatus, nav }) {
  TabTitle("Admin | Materials", false);
  const [materials, setMaterials] = useState([]);
  const [readMaterial, setReadMaterial] = useState({});
  const [newMaterial, setNewMaterial] = useState({
    name: "",
    size: "",
    count: 0,
    quantity: 0,
    units: "",
    imageUrl: null,
    color: "",
    description: "",
  });
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isReadModalOpen, setIsReadModalOpen] = useState(false);
  const [id, setId] = useState(0);

  function handleFileInputChange(event) {
    const fileInput = event.target;

    if (fileInput.files && fileInput.files[0]) {
      const selectedFile = fileInput.files[0];
      setNewMaterial({ ...newMaterial, imageUrl: selectedFile });
    }
  }

  useEffect(() => {
    if (loginStatus === false) {
      nav("/login");
    }
    axios
      .get("http://localhost:5000/admin/materials")
      .then((response) => {
        setMaterials(response.data.result);
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

  function handleDeleteMaterial(e, index) {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/admin/materials/delete/${index}`)
      .then((response) => {
        setMaterials(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setOverlayOpen(false);
    setIsDeleteModalOpen(false);
    Timeout(1000);
  }

  function ShortenDescription(description) {
    const [shortDescription] = description.split(".");
    return shortDescription;
  }

  function handleReadMaterial(index) {
    setReadMaterial(materials[index]);

    setTimeout(() => {
      setOverlayOpen(true);
      setIsReadModalOpen(true);
    }, 1000);
  }

  const handleAddMaterials = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", newMaterial.name);
    formData.append("size", newMaterial.size);
    formData.append("count", newMaterial.count);
    formData.append("quantity", newMaterial.quantity);
    formData.append("units", newMaterial.units);
    formData.append("materialImage", newMaterial.imageUrl);
    formData.append("color", newMaterial.color);
    formData.append("description", newMaterial.description);

    axios
      .post("http://localhost:5000/admin/materials", formData)
      .then((response) => {
        setMaterials(response.data);
        setIsModalOpen(false);
        setOverlayOpen(false);
        Timeout(1000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [servicesPerPage] = useState(10);

  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentMaterials = materials.slice(
    indexOfFirstService,
    indexOfLastService
  );

  const pageNumbers = Math.ceil(materials.length / servicesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="h-[90%] w-full flex flex-col gap-5">
        {overlayOpen && (
          <div
            className="fixed flex justify-center items-center top-0 left-0 w-full h-full bg-gray-500 bg-opacity-80 z-10"
            id="overlay"
          >
            {isModalOpen && (
              <div className="absolute h-2/3 w-1/2 bg-gray-200 rounded-[2rem] opacity-100 duration-500 z-20">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAddMaterials(e);
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
                      <FormHeaders text="Add New Material" />
                    </div>
                  </div>
                  <div className="flex w-full flex-col justify-between h-4/5">
                    <div className="flex items-center justify-between">
                      <section className="flex w-[45%] items-center justify-between">
                        <Label htmlFor="materialName" title="Material Name" />
                        <Inputs
                          type="text"
                          placeholder="Enter material name..."
                          name="materialName"
                          label="Material Name"
                          value={newMaterial.name}
                          handleChange={(e) => {
                            setNewMaterial({
                              ...newMaterial,
                              name: e.target.value,
                            });
                          }}
                        />
                      </section>
                      <section className="flex w-[45%] items-center justify-between">
                        <Label htmlFor="materialSize" title="Material Size" />
                        <Inputs
                          type="text"
                          placeholder="Enter material size..."
                          name="size"
                          label="Material Size"
                          value={newMaterial.size}
                          handleChange={(e) => {
                            setNewMaterial({
                              ...newMaterial,
                              size: e.target.value,
                            });
                          }}
                        />
                      </section>
                    </div>
                    <div className="flex items-center justify-between">
                      <section className="flex w-[45%] items-center justify-between">
                        <Label htmlFor="materialCount" title={`Count/Unit`} />
                        <Inputs
                          type="number"
                          placeholder="Enter material count..."
                          value={newMaterial.count}
                          handleChange={(e) => {
                            setNewMaterial({
                              ...newMaterial,
                              count: e.target.value,
                            });
                          }}
                        />
                      </section>
                      <section className="flex w-[45%] items-center justify-between">
                        <Label htmlFor="materialQty" title="Quantity" />
                        <Inputs
                          type="number"
                          placeholder="Enter material quantity..."
                          name="quantity"
                          label="Material Size"
                          value={newMaterial.quantity}
                          handleChange={(e) => {
                            setNewMaterial({
                              ...newMaterial,
                              quantity: e.target.value,
                            });
                          }}
                        />
                      </section>
                    </div>
                    <div className="flex items-center justify-between">
                      <section className="flex w-[45%] items-center justify-between">
                        <Label htmlFor="materialUnits" title="Units" />
                        <Inputs
                          type="text"
                          placeholder="Enter material units..."
                          name="materialUnits"
                          label="Material Units"
                          value={newMaterial.units}
                          handleChange={(e) => {
                            setNewMaterial({
                              ...newMaterial,
                              units: e.target.value,
                            });
                          }}
                        />
                      </section>
                      <section className="flex w-[45%] items-center justify-between">
                        <Label htmlFor="materialColor" title="Color" />
                        <Inputs
                          type="text"
                          placeholder="Enter material color..."
                          name="materialColor"
                          label="Material Color"
                          value={newMaterial.color}
                          handleChange={(e) => {
                            setNewMaterial({
                              ...newMaterial,
                              color: e.target.value,
                            });
                          }}
                        />
                      </section>
                    </div>
                    <div className="flex items-center justify-between h-1/2">
                      <section className="flex w-[45%] h-full flex-col justify-center items-center gap-3">
                        <div className="flex w-full">
                          <Label
                            htmlFor="materialDescription"
                            title="Description"
                          />
                        </div>
                        <textarea
                          type="text"
                          placeholder="Enter material description..."
                          name="materialDescription"
                          value={newMaterial.description}
                          onChange={(e) => {
                            setNewMaterial({
                              ...newMaterial,
                              description: e.target.value,
                            });
                          }}
                          className={`p-2 rounded-md w-full h-2/3 bg-gray-300 ${
                            newMaterial.description ? "text-black" : ""
                          }`}
                        ></textarea>
                      </section>
                      <section className="flex h-full w-[45%] flex-col items-center justify-between">
                        <div className="w-full h-2/3 flex flex-col">
                          {newMaterial.imageUrl && (
                            <img
                              src={URL.createObjectURL(newMaterial.imageUrl)}
                              alt="Profile Preview"
                              className="w-[25%] h-[70%] rounded-full m-auto border-2 border-slate-700"
                            />
                          )}
                          <Label htmlFor="materialPic" title="Material Image" />
                        </div>
                        <div className="h-1/3 w-full flex">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileInputChange}
                            name="materialImage"
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
                          handleDeleteMaterial(e, id);
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
                          {readMaterial.matQty}
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
        <header className="flex flex-col gap-2 ml-5 h-[10%]">
          <div className="flex items-center gap-10 w-[90%]">
            <h1 className="text-left">Materials</h1>
            <button
              type="button"
              className="bg-green-400 flex items-center gap-3 text-black font-extrabold w-1/6 border-none hover:bg-green-600 hover:text-white hover:translate-y-[-4px] transition-all"
              onClick={(e) => {
                setIsModalOpen(true);
                setOverlayOpen(true);
              }}
              disabled={isModalOpen}
            >
              <FaPlus />
              Add New Material
            </button>
          </div>
          <p className="text-left">
            This component will allow the admin to see the available materials,
            add new ones to the existing list, and edit the details of existing
            materials.
          </p>
        </header>
        <div className="overflow-auto max-h-[700px] flex">
          <table className=" w-11/12 table-auto border-collapse m-auto my-0 h-4/5">
            <colgroup>
              {materials.length === 0 || !materials ? (
                <TableCol width="100%" content={null} />
              ) : (
                <>
                  <TableCol width="10%" content={null} />
                  <TableCol width="10%" content={null} />
                  <TableCol width="10%" content={null} />
                  <TableCol width="10%" content={null} />
                  <TableCol width="10%" content={null} />
                  <TableCol width="10%" content={null} />
                  <TableCol width="10%" content={null} />
                  <TableCol width="20%" content={null} />
                  <TableCol width="10%" content={null} />
                </>
              )}
            </colgroup>
            <thead>
              <tr>
                {materials.length === 0 || !materials ? (
                  <td className="text-center">
                    <h1 className="text-4xl text-yellow-500">
                      No Materials in the table.
                    </h1>
                  </td>
                ) : (
                  <>
                    <TableHead title="Image" />
                    <TableHead title="Name" />
                    <TableHead title="Size" />
                    <TableHead title="Count" />
                    <TableHead title="Quantity" />
                    <TableHead title="Collection" />
                    <TableHead title="Color" />
                    <TableHead title="Description" />
                    <TableHead title="Actions" />
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {currentMaterials.map((material, index) => {
                  return (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-gray-100" : "bg-white"
                      }`}
                    >
                      <td className="text-left text-black p-2 border border-gray-300">
                        <img
                          src={`http://localhost:5000/${material.matImageUrl}`}
                          alt="Material"
                          className="h-[100px] w-[100px] rounded-lg border border-slate-700 m-auto"
                        />
                      </td>
                      <td className="text-left text-black p-2 border border-gray-300">
                        {material.matName}
                      </td>
                      <td className="text-center text-black p-2 border border-gray-300">
                        {material.matSize}
                      </td>
                      <td className="text-center text-black p-2 border border-gray-300">
                        {material.matCount} per {material.matUnit}
                      </td>
                      <td className="text-center text-black p-2 border border-gray-300">
                        {material.matQty}
                      </td>
                      <td className="text-center text-black p-2 border border-gray-300">
                        {material.matUnit}
                      </td>
                      <td className="text-center text-black p-2 border border-gray-300">
                        {material.color}
                      </td>
                      <td className="text-left text-black p-2 border border-gray-300">
                        {ShortenDescription(materials[index].description)}{" "}
                        {materials[index].description.length > 50 && (
                          <button
                            onClick={() => {
                              handleReadMaterial(index);
                            }}
                            className="bg-transparent p-0 border-none text-blue-600 hover:text-blue-900"
                          >
                            ...more
                          </button>
                        )}
                      </td>
                      <td className="text-left text-sm p-2 border border-gray-300 flex flex-col gap-3 items-center justify-center h-full">
                        <button
                          className="flex items-center justify-center bg-yellow-400 text-black font-extrabold w-5/6 border-none hover:bg-yellow-600 hover:text-white hover:translate-y-[-4px] transition-all group"
                          onClick={() => {
                            handleReadMaterial(index);
                          }}
                        >
                          <span className="flex items-center space-x-2 button-content">
                            <span className="group-hover:hidden">
                              <AiFillRead />
                            </span>
                            <span className="hidden group-hover:inline-block m-auto">
                              Read
                            </span>
                          </span>
                        </button>
                        <button
                          className="flex items-center justify-center bg-blue-400 text-black font-extrabold w-5/6 border-none hover:bg-blue-600 hover:text-white hover:translate-y-[-4px] transition-all group"
                          onClick={(e) =>
                            handleDeleteMaterial(e, material.matID)
                          }
                        >
                          <span className="flex items-center space-x-2 button-content">
                            <span className="group-hover:hidden">
                              <AiFillEdit />
                            </span>
                            <span className="hidden group-hover:inline-block m-auto">
                              Update
                            </span>
                          </span>
                        </button>
                        <button
                          className="flex items-center justify-center text-center bg-red-400 text-black font-extrabold w-5/6 border-none hover:bg-red-600 hover:text-white hover:translate-y-[-4px] transition-all group"
                          onClick={(e) => openDeleteModal(e, material.matID)}
                        >
                          <span className="flex items-center space-x-2 button-content">
                            <span className="group-hover:hidden">
                              <AiFillDelete />
                            </span>
                            <span className="hidden group-hover:inline-block">
                              Delete
                            </span>
                          </span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className="w-11/12 m-auto flex items-center">
          <ul className="flex gap-4">
            {pageNumbers > 1 &&
              Array.from({ length: pageNumbers }, (_, i) => (
                <li key={i}>
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
    </>
  );
}

export default Materials;
