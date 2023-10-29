'use strict'

// Element
const titleElement = document.querySelector('#title')
const descriptionElement = document.querySelector('#description')
const priceElement = document.querySelector('#price')
const fileElement = document.querySelector('#file')

// Input value from user
async function createProduct(){

    // get value from user
    const title = titleElement.value;
    const description = descriptionElement.value;
    const price = Number(priceElement.value);
    const file = fileElement.files[0];
    const imageUrl = await uploadImage(file);   
    
    // Create product object
    const product = {
        title,
        price,
        description,
        categoryId: 1,
        "images": [
            imageUrl.location
        ],
    };
    fetch('https://api.escuelajs.co/api/v1/products',{
        method: "POST",
        body: JSON.stringify(product),
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => console.log(data)
    .catch(err=> console.log(err)))
}

// upload file data
async function uploadImage(file){

//create form data
const formdata = new FormData()
formdata.append('file',file)

// send req to server
const res = await fetch('https://api.escuelajs.co/api/v1/files/upload',{
    method : 'POST',
    body: formdata
});
return res.json(); 
}

