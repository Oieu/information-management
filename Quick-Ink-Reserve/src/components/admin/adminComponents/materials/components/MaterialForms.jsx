import React, { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import FormHeaders from "../../../UI/forms/formComponents/FormHeaders";
import Label from "../../../UI/forms/formComponents/Label";
import Inputs from "../../../UI/forms/formComponents/Inputs";

export function OpenOverlay({
  isModalOpen, isDeleteModalOpen,
  isReadModalOpen, isEditModalOpen,

  setOverlayOpen, setIsModalOpen,
  setIsDeleteModalOpen, setIsReadModalOpen,
  setIsEditModalOpen,

  id, materials, readMaterial,
  newMaterial, setNewMaterial,

  handleAddMaterials, handleFileInputChange,
  handleDeleteMaterial, handleEditMaterial
}) {
  return (
    <div
      className="fixed flex justify-center items-center top-0 left-0 w-full h-full bg-gray-500 bg-opacity-80 z-10"
      id="overlay"
    >
      {isModalOpen && (
        <AddMaterialForm
          handleAddMaterials={handleAddMaterials}
          newMaterial={newMaterial}
          setNewMaterial={setNewMaterial}
          handleFileInputChange={handleFileInputChange}
          setIsModalOpen={setIsModalOpen}
          setOverlayOpen={setOverlayOpen}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          handleDeleteMaterial={handleDeleteMaterial}
          id={id}
          setOverlayOpen={setOverlayOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
        />
      )}
      {isReadModalOpen && (
        <ReadModal
          readMaterial={readMaterial}
          setOverlayOpen={setOverlayOpen}
          setIsReadModalOpen={setIsReadModalOpen}
        />
      )}
      {isEditModalOpen && (
        <EditModal
          id={id} materials={materials}
          newMaterial={newMaterial}
          setNewMaterial={setNewMaterial}
          setOverlayOpen={setOverlayOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          handleEditMaterial={handleEditMaterial}
          handleFileInputChange={handleFileInputChange}
        />
      )}
    </div>
  );
}

export function AddMaterialForm({
  handleAddMaterials,
  newMaterial,
  setNewMaterial,
  handleFileInputChange,
  setIsModalOpen,
  setOverlayOpen,
}) {
  return (
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
                <Label htmlFor="materialDescription" title="Description" />
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
                  onChange={(e) =>
                    handleFileInputChange(e, newMaterial, setNewMaterial)
                  }
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
  );
}

export function DeleteModal({
  handleDeleteMaterial,
  id,
  setOverlayOpen,
  setIsDeleteModalOpen,
}) {
  return (
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
  );
}

export function ReadModal({
  readMaterial,
  setIsReadModalOpen,
  setOverlayOpen,
}) {
  return (
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
              <span className="text-xl underline">{readMaterial.matName}</span>
            </div>
          </li>
          <li className="flex justify-center p-2">
            <div className="w-2/3 flex justify-center gap-5 items-center">
              <span className="text-2xl">Size: </span>
              <span className="text-xl underline">{readMaterial.matSize}</span>
            </div>
            <div className="w-1/3 flex gap-5 items-center">
              <span className="text-2xl">Color: </span>
              <span className="text-xl underline">{readMaterial.color}</span>
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
              <span className="text-xl underline">{readMaterial.matQty}</span>
            </div>
            <div className="w-1/3">
              <span className="text-2xl">Units: </span>
              <span className="text-xl underline">{readMaterial.matUnit}</span>
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
  );
}

export function EditModal({ id, materials, newMaterial, setNewMaterial, setOverlayOpen, setIsEditModalOpen, handleEditMaterial, handleFileInputChange }) {
  const [imageChanged, setImageChanged] = useState(false);
  const initialNewMaterial = {
    name: "",
    size: "",
    count: 0,
    quantity: 0,
    units: "",
    imageUrl: null,
    color: "",
    description: "",
  };
  const updateMaterialValues = materials.find((material) => material.matID === id);
  
  useEffect(() => {
    setNewMaterial({
      ...newMaterial,
        name: updateMaterialValues.matName,
        size: updateMaterialValues.matSize,
        count: updateMaterialValues.matCount,
        quantity: updateMaterialValues.matQty,
        units: updateMaterialValues.matUnit,
        color: updateMaterialValues.color,
        description: updateMaterialValues.description,
        imageUrl: updateMaterialValues.matImageUrl,
      });
  }, []);
  
  return (
    <div className="absolute h-2/3 w-1/2 bg-gray-200 rounded-[2rem] opacity-100 duration-500 z-20">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleEditMaterial(id);
        }}
        className="bg-white flex flex-col gap-5 h-full w-full justify-center rounded-[2rem] p-10"
      >
        <div className="h-1/5">
          <div className="h-[40%] w-full text-black flex justify-end">
            <button
              className="bg-transparent border-none absolute w-1/12"
              onClick={(e) => {
                setNewMaterial(initialNewMaterial);
                setIsEditModalOpen(false);
                setOverlayOpen(false);
              }}
            >
              <AiFillCloseCircle className="h-full w-full flex justify-end text-gray-700 hover:text-red-500" />
            </button>
          </div>
          <div className="h-[60%]">
            <FormHeaders text="Edit Material" />
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
                  console.log(materials[id].matName)
                  setNewMaterial({
                    ...newMaterial,
                    name: materials[id].matName || e.target.value,
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
                <Label htmlFor="materialDescription" title="Description" />
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
                {imageChanged === true ? (
                  <img
                    src={URL.createObjectURL(newMaterial.imageUrl)}
                    alt="Profile Preview"
                    className="w-[25%] h-[70%] rounded-full m-auto border-2 border-slate-700"
                  />
                ) : (
                  <img
                    src={`http://localhost:5000/${newMaterial.imageUrl}`}
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
                  onChange={(e) => {
                      handleFileInputChange(e, newMaterial, setNewMaterial);
                      setImageChanged(true);
                    }
                  }
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
          Update
        </button>
      </form>
    </div>
  );
}
