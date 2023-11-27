import axios from "axios";
import Timeout from "../../../../controllers/Timeout";

export const fetchDataAsync = async (
  setServices,
  setMaterials,
  setLoading,
  setServiceMaterials
) => {
  setLoading(true);

  try {
    await getServices(setServices);
    await getMaterials(setMaterials);
    await getServiceMaterials(setServiceMaterials);
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
}

export async function getMaterials(setMaterials) {
  axios
    .get("http://localhost:5000/admin/materials")
    .then((response) => {
      setMaterials(response.data.result);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function getServiceMaterials(setServiceMaterials) {
  axios
    .get("http://localhost:5000/admin/service-materials")
    .then((response) => {
      console.log(response);
      setServiceMaterials(response.data.result);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function handleReadServices(
  e,
  setReadMaterial,
  setOverlayOpen,
  setIsReadModalOpen,
  service,
  setLoading
) {
  e.preventDefault();
  setLoading(true);
  setReadMaterial(service);

  setTimeout(() => {
    setOverlayOpen(true);
    setIsReadModalOpen(true);
    setLoading(false);
  }, 1000);
}

export const handleAddServices = (
  e,
  newService,
  setServices,
  setIsModalOpen,
  setOverlayOpen,
  selectedItems
) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("name", newService.name);
  formData.append("rateUnit", newService.rateUnit);
  newService.imageUrl === null
    ? formData.append("serviceImage", "")
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

export function handleDeleteService(
  e,
  index,
  setServices,
  setOverlayOpen,
  setIsDeleteModalOpen
) {
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

export function openDeleteModal(
  e,
  index,
  setOverlayOpen,
  setIsDeleteModalOpen,
  setId
) {
  e.preventDefault();
  setOverlayOpen(true);
  setIsDeleteModalOpen(true);
  setId(index);
}

export function handleFileInputChange(event, setNewService, newService) {
  const fileInput = event.target;

  if (fileInput.files && fileInput.files[0]) {
    const selectedFile = fileInput.files[0];
    setNewService({ ...newService, imageUrl: selectedFile });
  }
}

export function initializeEditVariables(
  id,
  setUpdateService,
  services,
  updateService
) {
  const foundService = services.find((service) => service.genServicesID === id);
  setUpdateService({
    ...updateService,
    genServicesID: foundService.genServicesID,
    genServiceName: foundService.genServiceName,
    genServiceDesc: foundService.genServiceDesc,
    rateUnit: foundService.rateUnit,
    imageUrl: foundService.genServiceImageUrl,
    featured: foundService.featured,
  });
}

export function initializeSMVariables(id, setSelectedItems) {
  try {
    axios
      .get(`http://localhost:5000/admin/service-materials/${id}`)
      .then((response) => {
        const res = response.data.result;
        const materials = res.map((material) => {
          return material.matID;
        });
        console.log(materials);
        setSelectedItems(materials);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
}

export const handleUpdateServices = async (
  e,
  id,
  updateService,
  selectedItems
) => {
  try {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", updateService.genServiceName);
    formData.append("rateUnit", updateService.rateUnit);
    if (updateService.imageUrl) {
      formData.append("serviceImage", updateService.imageUrl);
    }
    formData.append("description", updateService.genServiceDesc);
    formData.append("featured", updateService.featured);
    formData.append("materials", JSON.stringify(selectedItems));

    console.log(formData, updateService);

    const response = await axios.put(
      `http://localhost:5000/admin/services/update/${id}`,
      formData
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
