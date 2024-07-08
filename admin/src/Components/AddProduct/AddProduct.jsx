import React, { useState } from "react";
import "./AddProduct.css"
import upload_area from '../../assets/upload_area.svg'
const AddProduct = () => {

  const[image,setImage] = useState(false);
  const [productDetails,setProductDetails] = useState({
    name:"",
    image:"",
    category:"women",
    new_price:"",
    old_price:""
});

const AddProduct=async ()=>{
  console.log(productDetails);
  let dataObj;
    let product = productDetails;

    let formData = new FormData();
    formData.append('product', image);
    
    await fetch('http://localhost:4000/upload', {
      method: 'POST',
      headers: {
        Accept:'application/json',
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {dataObj=data});

      if(dataObj.success){
        product.image=dataObj.image_url;
        console.log(product);
        await fetch('http://localhost:4000/addproduct', {
          method: 'POST',
          headers: {
            Accept:'application/json',
            'Content-Type':'application/json',
          },
          body: JSON.stringify(product),
        })
          .then((resp) => resp.json())
          .then((data) => {data.success?alert("Product Added"):alert("Failed")});
      }
}

  const imageHandler=(e)=>{
      setImage(e.target.files[0]);
  }
  const changeHandler = (e) => {
    console.log(e);
    setProductDetails({...productDetails,[e.target.name]:e.target.value});
    }
  return (
    <div className='add-product'>
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input value={productDetails.name} onChange={(e)=>{changeHandler(e)}} type="text" name='name' placeholder='Type here'/>
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input value={productDetails.old_price} onChange={(e)=>{changeHandler(e)}} type="text" name='old_price' placeholder='Type here'/>
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input value={productDetails.new_price} onChange={(e)=>{changeHandler(e)}} type="text" name='new_price' placeholder='Type here'/>
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select value={productDetails.category} name="category" className='add-product-selector' onChange={changeHandler}>
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumbnail-img' alt="" />
        </label>
        <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
      </div>
      <button className='addproduct-btn' onClick={()=>{AddProduct()}}>ADD</button>
    </div>
  )
}

export default AddProduct
