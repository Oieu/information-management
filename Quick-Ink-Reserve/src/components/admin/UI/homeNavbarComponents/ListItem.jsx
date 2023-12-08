
import React from 'react';
import { Link } from 'react-router-dom';

export function ListItem({ defaultActive, title, linkedTo }) {
  return (
    <li className="w-full h-[40%] flex items-center justify-center">
        <Link
          className={`text-gray-200 h-full flex justify-center items-center hover:text-white bg-contain p-2 rounded-lg flex-grow transition-all ${defaultActive === title ? 'bg-sky-700' : 'hover:bg-sky-400 hover:-translate-y-1'}`}
          to={linkedTo}
        >
          <h1 className='text-lg'>{title}</h1>
        </Link>
      </li>
  )
}

export function EditListItem({ name, title, linkedTo, IconSelected, IconUnselected }) {

  return  (
    <li
        className={`p-5 ${
          title.toLowerCase().includes(name.toString().toLowerCase()) ? "bg-gray-500" : "bg-none"
        }`}
      >
        <Link to={linkedTo} className="flex items-center justify-center">
          {title.toLowerCase().includes(name.toString().toLowerCase()) ? IconUnselected : IconSelected}
          <h1
            className={`text-base text-blue-300 hidden lg:block ${
              title.toLowerCase().includes(name.toString().toLowerCase()) ? "text-white" : ""
            }`}
          >
            {title}
          </h1>
        </Link>
      </li>
  )
}