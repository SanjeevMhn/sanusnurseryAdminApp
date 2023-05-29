import { FC, useEffect, useState } from 'react';
import "./App.css";

interface OrderData {
  Id: string,
  Date: string,
  Name: string,
  Phone: number,
  Address: string,
  Email: string,
  Products: string,
  Total: number
};

interface ProductDetail {
  name: string,
  quantity: number,
  price: number,
  img: string,
}


const App: FC = () => {

  const [orderData, setOrderData] = useState<OrderData[]>([]);
  useEffect(
    () => {
      let ignore: boolean = false;
      fetch('https://script.google.com/macros/s/AKfycbwmiydpSn6KO_eKGxwAd8x5rGSvdPsj6zTRG5TaCQnjJO835VcWA5W5E4APMc705nio/exec')
        .then(res => res.json())
        .then(data => {
          if (!ignore) {
            setOrderData(orderData => [...orderData, ...data])
            console.log(orderData);
          }
        })
        .catch(error => console.error(error));

      return () => {
        ignore = true;
        setOrderData(orderData => []);
      }
    }, [])
  return (
    <div className="wrapper px-[20px]">
      <h1 className="text-[20px] text-indigo-400 text-center py-[10px]">Sanu's Nursery Order List</h1>
      <ul className="status-list flex items-center">
        <li className="list-item">
          <input type="radio" name="status" id="all" />
          <label htmlFor="all">All</label>
        </li>
        <li className="list-item">
          <input type="radio" name="status" id="delivered" />
          <label htmlFor="delivered">Delivered</label>
        </li>
        <li className="list-item">
          <input type="radio" name="status" id="undelivered" />
          <label htmlFor="undelivered">Undelievered</label>
        </li>
      </ul>
      <div className="table-hr-container overflow-y-auto mx-auto h-[calc(100vh-100px)] border border-black">

        <table className="text-[12px] w-full order-grid">
          <thead className='sticky top-[-2px] bg-white'>
            <tr>
              <th>S.N</th>
              <th>Status</th>
              {/* <th>ID</th> */}
              <th>Date</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Email</th>
              <th>Products</th>
              <th>Total</th>
            </tr>
            <tr>
              <th></th>
              <th>
                <input type="text" name="search" id="search" className='' />
              </th>
              <th>
                <input type="text" name="search" id="search" className='' />
              </th>
              <th>
                <input type="text" name="search" id="search" className='' />
              </th>
              <th>
                <input type="text" name="search" id="search" className='' />
              </th>
              <th>
                <input type="text" name="search" id="search" className='' />
              </th>
              <th>
                <input type="text" name="search" id="search" className='' />
              </th>
              <th>
              </th>
              <th>
              </th>
            </tr>
          </thead>
          <tbody className='border border-t-black'>
            {
              orderData.map((od, index) => {
                return (
                  <tr key={index} className='border border-black'>
                    <td data-name="sn">{index + 1}</td>
                    <td data-name="status">
                      <button type="button" className="status-btn">Undelivered</button>
                    </td>
                    {/* <td>{od.Id}</td> */}
                    <td data-name="date">{od.Date.split("").slice(0, 10)}</td>
                    <td data-name="name">{od.Name}</td>
                    <td data-name="phone">{od.Phone}</td>
                    <td data-name="address">{od.Address}</td>
                    <td data-name="email">{od.Email}</td>
                    <td data-name="products">
                      <div className="table-vr-container">
                        <table className='border border-black w-full inline-tabl product-grid'>
                          <thead>
                            <tr>
                              <th>S.N</th>
                              <th>Name</th>
                              <th>Quantity</th>
                              <th>Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              JSON.parse(od.Products).map((product: ProductDetail, index: number) => {
                                return (
                                  <tr key={index}>
                                    <td data-name="sn">{index + 1}</td>
                                    <td data-name="product">
                                      <div className="product-data flex items-center">
                                        <div className="product-img w-[70px] h-[auto]">
                                          <img src={product.img} alt="" className='w-full h-full object-contain' />
                                        </div>
                                        <div className="product-name pl-[5px]">
                                          {product.name}
                                        </div>
                                      </div>
                                    </td>
                                    <td data-name="quantity">{product.quantity}</td>
                                    <td className="md:text-right" data-name="price">{product.price}</td>
                                  </tr>
                                )
                              })
                            }
                            <tr>

                            </tr>
                          </tbody>
                        </table>
                      </div>

                    </td>
                    <td className="text-right">{od.Total}</td>
                  </tr>
                )
              })
            }
            <tr>

            </tr>
          </tbody>
        </table>
      </div>
    </div>

  )
}

export default App;
