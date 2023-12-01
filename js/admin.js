function addNewProduct() {
  const formData = new FormData(document.getElementById('newProductForm'))
  
  const jsonData = {
    name     : formData.get('name'), 
    category : parseInt(formData.get('category')),
    price    : parseFloat(formData.get('price')) 
  }

  console.log(jsonData)

  fetch('/addNewProduct', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jsonData)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Server response:', data);
    // Handle the server response as needed
  })
  .catch(error => {
    console.error('Error:', error);
  })

  // console.log(window.location)
  window.location = "#"
  window.location.reload(true);
}

window.addEventListener("DOMContentLoaded", () => {
  fetch("/productsList", {
    method: "GET",
    headers: {"Content-Type": "application/json"}
  })
  .then((res) => res.json())
  .then((products) => {
    document.getElementById("productsList").innerHTML = products.map((product) => {
      return `
      <li id="${product.id}">
        ID: ${product.id} <br> 
        Name: ${product.name} <br> 
        Category: ${product.category} <br>
        price: ${product.price}
      </li>`
    }).join("");
  })
})