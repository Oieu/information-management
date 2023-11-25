import axios from "axios";
import { useEffect } from "react";
import Timeout from "../../../../controllers/Timeout";

export function handleFileInputChange(event, newMaterial, setNewMaterial) {
  const fileInput = event.target;

  if (fileInput.files && fileInput.files[0]) {
    const selectedFile = fileInput.files[0];
    setNewMaterial({ ...newMaterial, imageUrl: selectedFile });
  }
}

export function fetchData(setMaterials, setFilter, setIsLoading) {
  axios
    .get("http://localhost:5000/admin/materials")
    .then((response) => {
      setMaterials(response.data.result);
      setFilter(response.data.result);
    })
    .catch((error) => {
      console.log(error);
    }).finally(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000)
    });
}

export function ShortenDescription(description) {
  const [shortDescription] = description.split(".");
  return shortDescription;
}

export const handlePageChange = (pageNumber, setCurrentPage) => {
  setCurrentPage(pageNumber);
}

export function setPageFiltering(search, materials, setFilter) {
  useEffect(() => {
    const results = materials.filter((material) => {
      return material.matName
        .toLowerCase()
        .includes(search.toLocaleLowerCase());
    });
    setFilter(results);
  }, [search]);
}
