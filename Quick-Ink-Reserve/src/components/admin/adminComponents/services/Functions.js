import axios from "axios";
import Timeout from "../../../../controllers/Timeout";

export const fetchDataAsync = async (setServices, setMaterials, setLoading) => {
    setLoading(true);

    try {
      await getServices(setServices);
      await getMaterials(setMaterials);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
};

export async function getServices(setServices) {
    axios
      .get("http://localhost:5000/admin/services")
      .then((response) => {
        setServices(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
};

export async function getMaterials(setMaterials) {
    axios
      .get("http://localhost:5000/admin/materials")
      .then((response) => {
        setMaterials(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
};

export function handleReadServices(e, setReadMaterial, setOverlayOpen, setIsReadModalOpen, service, setLoading) {
    e.preventDefault();
    setLoading(true);
    setReadMaterial(service);

    setTimeout(() => {
        setOverlayOpen(true);
        setIsReadModalOpen(true);
        setLoading(false);
    }, 1000);
};

export const handleAddServices = (e, newService, setServices, setIsModalOpen, setOverlayOpen, selectedItems) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", newService.name);
    formData.append("rateUnit", newService.rateUnit);
    (newService.imageUrl === null) ? formData.append("serviceImage", "") 
    : formData.append("serviceImage", newService.imageUrl);
    formData.append("description", newService.description);
    formData.append("materials", JSON.stringify(selectedItems));

    axios
      .post("http://localhost:5000/admin/services", formData)
      .then((response) => {
        console.log(response);
        setServices(response.data);
        setIsModalOpen(false);
        setOverlayOpen(false);
        Timeout(1000);
      })
      .catch((error) => {
        console.log(error);
      });
};

export function handleDeleteService(e, index, setServices, setOverlayOpen, setIsDeleteModalOpen) {
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
};

export function openDeleteModal(e, index, setOverlayOpen, setIsDeleteModalOpen, setId) {
    e.preventDefault();
    setOverlayOpen(true);
    setIsDeleteModalOpen(true);
    setId(index);
};

export function handleFileInputChange(event, setNewService, newService) {
    const fileInput = event.target;

    if (fileInput.files && fileInput.files[0]) {
      const selectedFile = fileInput.files[0];
      setNewService({ ...newService, imageUrl: selectedFile });
    }
};