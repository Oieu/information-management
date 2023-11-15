import React from "react";

export function TableHead({ title }) {
  return (
    <th className="text-center font-extrabold text-2xl border border-r-1 border-white">
      {title}
    </th>
  );
};

export function TableCol({ width, title }) {
  return <col style={{ width }}>{title}</col>;
};

export const formData = (newMaterial) => {
  const formData = new FormData();
    formData.append("name", newMaterial.name);
    formData.append("size", newMaterial.size);
    formData.append("count", newMaterial.count);
    formData.append("quantity", newMaterial.quantity);
    formData.append("units", newMaterial.units);
    formData.append("materialImage", newMaterial.imageUrl);
    formData.append("color", newMaterial.color);
    formData.append("description", newMaterial.description);

  return formData;
}