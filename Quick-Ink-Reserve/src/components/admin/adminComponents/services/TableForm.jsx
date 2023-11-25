import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

function TableForm({ data, selectedItems, setSelectedItems }) {
  const [filter, setFilter] = useState([...data]);

 const handleCheckboxChange = (event, item) => {
  if (event.target.checked) {
    setSelectedItems([...selectedItems, item.matID]);
  } else {
    setSelectedItems(selectedItems.filter(i => i !== item.matID));
  }
 };

 const handleSelectAllChange = (event) => {
    if (event.target.checked) {
      const newSelectedItems = data.map((item) => item.matID);
      setSelectedItems(newSelectedItems);
    } else {
      setSelectedItems([]);
    }
  };

  const handleSearchChange = (event) => {
    const searchInput = event.target.value.toLowerCase();
    const filteredData = data.filter(item => 
      item.matName.toLowerCase().includes(searchInput) || 
      item.matSize.toLowerCase().includes(searchInput)
    );
    setFilter(filteredData);
   };   

 return (
  <div className='h-full w-full flex flex-col justify-evenly'>
    <div className='w-full h-[10%] flex justify-evenly mb-2'>
      <h2 className="text-gray-700 text-left w-1/5">Select Materials</h2>
      <div className='w-4/5 flex justify-end items-center gap-2'>
        <AiOutlineSearch className='text-gray-700 text-2xl' />
        <input
          type="text"
          placeholder="Input material name..."
          onChange={handleSearchChange}
          className="w-1/3 h-full p-3 text-base text-gray-800 bg-zinc-300 placeholder-gray-600 border rounded-lg focus:shadow-outline"
        />
      </div>
    </div>
    <div className="overflow-auto h-[80%] border-2 border-black rounded-xl">
      <table className="w-full">
        <thead className='sticky top-0'>
          <tr className='bg-gray-800'>
            <th className='w-1/5'>
              <input 
                type="checkbox" 
                checked={selectedItems.length === data.length} 
                onChange={handleSelectAllChange} 
              />
              <label htmlFor="select"> Select</label>
            </th>
            <th className='w-2/5 text-left'>Material Name</th>
            <th className='w-2/5 text-left'>Size</th>
          </tr>
        </thead>
        <tbody>
          {filter.map((item, index) => (
            <tr key={index} className={`${index % 2 == 0 ? 'bg-gray-300' : 'bg-gray-100'}`}>
              <td className='w-1/5'>
                <input 
                  type="checkbox" 
                  checked={selectedItems.includes(item.matID)} 
                  onChange={(event) => handleCheckboxChange(event, item)} 
                />
              </td>
              <td className='text-gray-700 text-left text-sm w-2/5'>{item.matName}</td>
              <td className='text-gray-700 text-left text-sm w-2/5'>{item.matSize}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
 );
}

export default TableForm;
