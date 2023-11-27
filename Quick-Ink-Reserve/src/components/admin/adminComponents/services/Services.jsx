import React, { useEffect, useState } from "react";
import "./Services.css";
import { TabTitle } from "../../../../utils/GeneralFunctions";
import { fetchDataAsync } from "./Functions";
import LoadingComponent from "../../../../utils/LoadingComponent";
import ServiceCards from "./ServiceCards";
import SPagination from "./SPagination";
import AddModal from "./components/AddModal";
import DeleteModal from "./components/DeleteModal";
import ReadModal from "./components/ReadModal";
import SHeader from "./components/SHeader";
import AddButton from "./components/AddButton";
import UpdateModal from "./components/UpdateModal";

function Services({ loginStatus, nav }) {
  TabTitle("Admin | Services", false);
  
  //DATA STUFF
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
  const [serviceMaterials, setServiceMaterials] = useState([]);

  //OVERLAY STUFF
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isReadModalOpen, setIsReadModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [id, setId] = useState(0);

  //PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 8;
  const pageNumbers = Math.ceil(services.length / servicesPerPage);

  useEffect(() => {
    if (loginStatus === false) {
      nav("/login");
    }

    fetchDataAsync(setServices, setMaterials, setLoading, setServiceMaterials);
  }, []);

  if (loading) {
    return (
      <LoadingComponent loading={loading} />
    );
  };

  //console.log(serviceMaterials)
  
  return (
    <>
      <div className="h-[90%] w-full flex flex-col gap-5">
        {overlayOpen && (
          <div
            className="fixed flex justify-center items-center top-0 left-0 w-full h-full bg-gray-500 bg-opacity-80 z-20"
            id="overlay"
          >
            {isModalOpen && (
              <AddModal
                newService={newService} materials={materials}
                selectedItems={selectedItems}
                setNewService={setNewService}
                setIsModalOpen={setIsModalOpen}
                setOverlayOpen={setOverlayOpen}
                setSelectedItems={setSelectedItems}
                setServices={setServices} 
              />
            )}
            {isDeleteModalOpen && (
              <DeleteModal
                id={id} setServices={setServices}
                setOverlayOpen={setOverlayOpen}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
              />
            )}
            {isReadModalOpen && (
              <ReadModal
                readMaterial={readMaterial} materials={materials}
                setIsReadModalOpen={setIsReadModalOpen}
                setOverlayOpen={setOverlayOpen}
                serviceMaterials={serviceMaterials}
              />
            )}
            {updateModalOpen && (
                <UpdateModal 
                  id={id} services={services} materials={materials}
                  setOverlayOpen={setOverlayOpen}
                  setUpdateModalOpen={setUpdateModalOpen}
                  serviceMaterials={serviceMaterials}
                />
              )
            }
          </div>
        )}
        <SHeader />
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
                      setUpdateModalOpen={setUpdateModalOpen}
                      key={currentIndex} setLoading={setLoading}
                    />
                );
              })}
          </div>
          <div className="pl-5 flex items-center">
            <AddButton
              isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
              setOverlayOpen={setOverlayOpen} setSelectedItems={setSelectedItems}
            />
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
