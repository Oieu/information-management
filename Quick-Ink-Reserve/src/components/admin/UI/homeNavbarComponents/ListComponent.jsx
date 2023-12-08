import React from "react";
import { EditListItem, ListItem } from "./ListItem";
import { BiSolidUser } from "react-icons/bi";
import { AiTwotoneEdit } from "react-icons/ai";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { useAppContext } from "../../../../controllers/auth/AuthContext";

export function ListComponent({ defaultActive }) {
  return (
    <div className="h-[70%]">
      <ul className="flex flex-col w-full mt-3 h-full gap-3">
        <ListItem
          defaultActive={defaultActive}
          title="Dashboard"
          linkedTo="/admin"
        />
          <ListItem
            defaultActive={defaultActive}
            title="Users"
            linkedTo="/admin/users"
          />
        <ListItem
          defaultActive={defaultActive}
          title="Materials"
          linkedTo="/admin/materials"
        />
        <ListItem
          defaultActive={defaultActive}
          title="Services"
          linkedTo="/admin/services"
        />
        <ListItem
          defaultActive={defaultActive}
          title="Orders"
          linkedTo="/admin/orders"
        />
        <ListItem
          defaultActive={defaultActive}
          title="Analytics"
          linkedTo="/admin/analytics"
        />
      </ul>
    </div>
  );
}

export function EditListComponent({ name }) {
  const { user } = useAppContext();
  console.log(user);
  return (
    <ul className="flex flex-col bg-transparent align-top w-full">
      <EditListItem 
        name={name} 
        title="Profile Information" 
        linkedTo="/profile" 
        IconSelected={<BiSolidUser className="w-6 h-6 text-blue-300 lg:mr-2"/>} 
        IconUnselected={<BiSolidUser className="w-6 h-6 text-white lg:mr-2"/>}
      />
      <EditListItem 
        name={name} 
        title="Edit Information" 
        linkedTo="/edit" 
        IconSelected={<AiTwotoneEdit className="w-6 h-6 text-blue-300 lg:mr-2"/>} 
        IconUnselected={<AiTwotoneEdit className="w-6 h-6 text-white lg:mr-2"/>}
      />
      <EditListItem 
        name={name} 
        title="Pending Orders" 
        linkedTo={`${user.userRole === "ADMIN" ? "/admin/orders" : "/orders"}`}
        IconSelected={<FaFileInvoiceDollar className="w-6 h-6 text-blue-300 lg:mr-2"/>} 
        IconUnselected={<FaFileInvoiceDollar className="w-6 h-6 text-white lg:mr-2"/>}
      />
    </ul>
  );
}
