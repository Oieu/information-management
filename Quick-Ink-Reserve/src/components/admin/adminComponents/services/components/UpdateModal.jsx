import React, { useEffect, useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { handleUpdateServices, initializeEditVariables, initializeSMVariables } from '../Functions';
import TableForm from '../TableForm';
import Label from '../../../UI/forms/formComponents/Label';
import Inputs from '../../../UI/forms/formComponents/Inputs';

function UpdateModal({ id, services, materials, setOverlayOpen, setUpdateModalOpen, serviceMaterials, setNewService }) {
  const [updateService, setUpdateService] = useState({
    genServicesID: 0,
    genServiceName: '',
    genServiceDesc: '',
    rateUnit: '',
    imageUrl: null,
    featured: '',
  });
  const [selectedItems, setSelectedItems] = useState([]);
  const [imageChanged, setImageChanged] = useState(false);

  function closeUpdateModal(e) {
    e.preventDefault()

    setOverlayOpen(false)
    setUpdateModalOpen(false)
  };

  const handleFileInputChange = (event) => {
    setImageChanged(true);
   setUpdateService({...updateService, imageUrl: event.target.files[0]});
  };  

  useEffect(() => {
    initializeEditVariables(id, setUpdateService, services, updateService);
    initializeSMVariables(id, setSelectedItems);
  }, []);

  console.log(imageChanged)

  //console.log(selectedItems)

  return (
    <div className='w-2/3 h-4/5 bg-gray-50 p-5 rounded-xl relative'>
      <header className='text-gray-800 text-5xl p-5'>
        <span>Update a Service</span>
        <AiFillCloseCircle 
          className='text-red-500 text-3xl absolute right-5 top-5 cursor-pointer'
          onClick={(e) => closeUpdateModal(e)} 
        />
      </header>
      <form className='w-[90%] m-auto h-[95%]'>
        <div className="flex flex-col w-full justify-between h-5/6">
            <div className="flex w-full h-3/5">
              <div className="flex w-1/2 items-center justify-between h-full flex-col gap-3">
                <section className="flex w-full items-center justify-between">
                  <Label htmlFor="serviceName" title="Service Name" />
                  <Inputs
                    type="text"
                    placeholder="Enter service name..."
                    name="serviceName"
                    label="Service Name"
                    value={updateService.genServiceName}
                    handleChange={(e) => {
                      setUpdateService({
                        ...updateService,
                        genServiceName: e.target.value,
                      });
                    }}
                  />
                </section>
                <section className="flex w-full items-center justify-between">
                  <div className="flex w-full justify-between">
                    <Label htmlFor="serviceRateUnits" title="Rate Units" />
                    <Inputs
                      type="text"
                      placeholder="Enter service rate units..."
                      name="serviceRateUnits"
                      label="Rate Units"
                      value={updateService.rateUnit}
                      handleChange={(e) => {
                        setUpdateService({
                          ...updateService,
                          rateUnit: e.target.value,
                        });
                      }}
                    />
                  </div>
                </section>
                <section className="flex w-full h-full flex-col items-center gap-3">
                  <div className="flex w-full">
                    <Label htmlFor="serviceDescription" title="Description" />
                  </div>
                  <textarea
                    type="text"
                    placeholder="Enter service description..."
                    name="serviceDescription"
                    value={updateService.genServiceDesc}
                    onChange={(e) => {
                      setNewService({
                        ...updateService,
                        genServiceDesc: e.target.value,
                      });
                    }}
                    className={`p-2 rounded-md w-full h-2/3 bg-gray-300 ${
                      updateService.genServiceDesc ? "text-black" : ""
                    }`}
                  ></textarea>
                </section>
              </div>
              <div className="flex items-center w-1/2 h-full">
                <section className="flex h-full w-full flex-col items-center justify-between">
                  <div className="w-full h-2/3 flex flex-col">
                    {updateService.imageUrl && (
                      <img
                        src={imageChanged === true ? 
                          URL.createObjectURL(updateService.imageUrl) :
                          `http://localhost:5000/${updateService.imageUrl}`}
                        alt="Profile Preview"
                        className="w-2/3 h-4/5 rounded-lg m-auto border-2 border-slate-700"
                      />
                    )}
                    <Label htmlFor="serviceImage" title="Service Image" />
                  </div>
                  <div className="h-1/3 w-full flex">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                          handleFileInputChange(e)
                        }
                      }
                      name="serviceImage"
                      className="text-black cursor-pointer m-auto w-1/2"
                    />
                  </div>
                </section>
              </div>
            </div>
            <div className="h-2/5 w-full">
              <TableForm
                data={materials}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
              />
            </div>
          </div>
        <button onClick={(e) => handleUpdateServices(e, id, updateService, selectedItems)}>Update</button>
      </form>
    </div>
  )
}

export default UpdateModal