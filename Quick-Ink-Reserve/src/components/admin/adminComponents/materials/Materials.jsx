import axios from "axios";
import React, { useEffect, useState } from "react";
import { ColGroup, THead, TBody } from "./tableComponents/TableHead";
import Timeout from "../../../../controllers/Timeout";
import { TabTitle } from "../../../../utils/GeneralFunctions";
import Header from "./components/Header";
import { AddMaterialForm, DeleteModal, OpenOverlay, ReadModal } from "./components/MaterialForms";
import MaterialPagination from "./components/MaterialPagination";
import {
  handleFileInputChange,
  fetchData,
  ShortenDescription,
  handlePageChange,
  setPageFiltering
} from './materialFunctions.js';
import LoadingComponent from "../../../../utils/LoadingComponent.jsx";

function Materials({ loginStatus, nav }) {
  TabTitle("Admin | Materials", false);
  
  //DATA STUFF
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
  const [isLoading, setIsLoading] = useState(true);

  //OVERLAY STUFF
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isReadModalOpen, setIsReadModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  //READING AND DELETING STUFF
  const [id, setId] = useState(0);

  useEffect(() => {
    if (loginStatus === false) {
      nav("/login");
    }
    fetchData(setMaterials, setFilter, setIsLoading);
  }, []);

  function openDeleteModal(e, index) {
    e.preventDefault();
    setOverlayOpen(true);
    setIsDeleteModalOpen(true);
    setId(index);
  };

  function openEditModal(e, index) {
    e.preventDefault();
    setOverlayOpen(true);
    setIsEditModalOpen(true);
    setId(index);
  };

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
  };

  function handleReadMaterial(index) {
    setReadMaterial(filter.find((material) => material.matID === index));
    setOverlayOpen(true);
    setIsReadModalOpen(true);
  };

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

  function handleEditMaterial(index) {
    const formData = new FormData();
    formData.append("name", newMaterial.name);
    formData.append("size", newMaterial.size);
    formData.append("count", newMaterial.count);
    formData.append("quantity", newMaterial.quantity);
    formData.append("units", newMaterial.units);
  
    if(newMaterial.imageUrl) {
      formData.append("materialImage", newMaterial.imageUrl);
    }
  
    formData.append("color", newMaterial.color);
    formData.append("description", newMaterial.description);
  
    axios
      .put(`http://localhost:5000/admin/materials/edit/${index}`, formData)
      .then((response) => {
        setMaterials(response.data);
        setIsEditModalOpen(false);
        setOverlayOpen(false);
        Timeout(1000);
      })
      .catch((error) => {
        console.log(error);
      });
  };  

  //PAGINATION STUFF AND SEARCH FILTERING
  const [currentPage, setCurrentPage] = useState(1);
  const [servicesPerPage, setServicesPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(materials);

  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentMaterials = filter.slice(
    indexOfFirstService,
    indexOfLastService
  );
  const pageNumbers = Math.ceil(filter.length / servicesPerPage);

  setPageFiltering(search, materials, setFilter);
  if(isLoading) return <LoadingComponent loading={isLoading} />;

  return (
    <>
      <div className="h-[90%] w-full flex flex-col gap-5">
        {overlayOpen && (
          <OpenOverlay
            isModalOpen={isModalOpen} 
            isDeleteModalOpen={isDeleteModalOpen}
            isReadModalOpen={isReadModalOpen}
            isEditModalOpen={isEditModalOpen}

            setOverlayOpen={setOverlayOpen}
            setIsModalOpen={setIsModalOpen}
            setIsReadModalOpen={setIsReadModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            setIsEditModalOpen={setIsEditModalOpen}

            id={id} materials={materials} readMaterial={readMaterial}
            newMaterial={newMaterial} setNewMaterial={setNewMaterial}
            
            handleAddMaterials={handleAddMaterials}
            handleFileInputChange={handleFileInputChange}
            handleDeleteMaterial={handleDeleteMaterial}
            handleEditMaterial={handleEditMaterial}
          />
        )}
        <Header 
          setIsModalOpen={setIsModalOpen}
          setOverlayOpen={setOverlayOpen}
          isModalOpen={isModalOpen}
          setSearch={setSearch}
        />
        <div className="overflow-auto max-h-[700px] flex">
          <table className=" w-11/12 table-auto border-collapse m-auto my-0 h-4/5">
            <ColGroup filter={filter} />
            <THead filter={filter} />
            <TBody 
              currentMaterials={currentMaterials} 
              ShortenDescription={ShortenDescription} 
              handleReadMaterial={handleReadMaterial} 
              handleDeleteMaterial={handleDeleteMaterial} 
              openDeleteModal={openDeleteModal}
              openEditModal={openEditModal}
            />
          </table>
        </div>
        <MaterialPagination 
          servicesPerPage={servicesPerPage}
          setServicesPerPage={setServicesPerPage}
          pageNumbers={pageNumbers}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
}

export default Materials;
