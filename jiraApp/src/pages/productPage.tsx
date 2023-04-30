import React, { useState } from 'react'
import DynamicCreateProduct from '../component/dynamicCreateProduct'
import Popup from '../component/util/popup'

type Props = {}

const ProductPage = (props: Props) => {
  const [popupCreateProject, setPopupCreateProject] = useState(false)

  return (
    <div className='pr-[60px]'>
      <div className='bg-[#c3b4b4] h-[50px]'>
      </div>  
      <div className='flex justify-between border-[1px] p-[10px] mt-[10px]'>
         <h2
          className='text-[20px] capitalize text-[#636363] font-medium'
         > 
         Product model list
         </h2>
         <input 
          type="button" 
          value="Create"
          className='bg-blue-600 py-[7px] px-[20px] text-[#fff] rounded-md hover:bg-blue-500'
          onClick={() => setPopupCreateProject(!popupCreateProject)}            
         />
      </div>
      <div>
        <div></div>
        <div className='mt-[10px] border-t border-r border-l'>
         <div className='mr-[10px] border-[1px] max-w-[230px] mt-[10px] rounded-md float-right px-[10px] flex items-center justify-between'>
          <input 
              type="text" 
              placeholder='search'
              className='pl-[10px] py-[7px] outline-none'
            />
              <i className="fa-solid fa-magnifying-glass cursor-pointer hover:text-[#333]"></i>
         </div>

          <div className="flex flex-col mt-[70px]">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full">
                    <thead className="bg-white border-b border-t">
                      <tr>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          #
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          First
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          Last
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          Handle
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                        <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                          Mark
                        </td>
                        <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                          Otto
                        </td>
                        <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                          @mdo
                        </td>
                      </tr>
                      <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">2</td>
                        <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                          Jacob
                        </td>
                        <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                          Thornton
                        </td>
                        <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                          @fat
                        </td>
                      </tr>
                      <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">3</td>
                        <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                          Larry
                        </td>
                        <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                          Wild
                        </td>
                        <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                          @twitter
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div>
        <Popup
          popup={popupCreateProject}
          setPopup={setPopupCreateProject}
          title={"Project Create"}
        >
          <DynamicCreateProduct />
        </Popup>
      </div>
    </div>
  )
}

export default ProductPage