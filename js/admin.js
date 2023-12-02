const addProductIcon = document.querySelector('#add-product-icon')
const deleteProductIcon = document.querySelector('#delete-product-icon')
const addTab = document.querySelector('#add-product-tab')
const deleteTab = document.querySelector('#delete-product-tab')
const addFormElement = document.querySelector('#add-product-form')
const deleteFormElement = document.querySelector('#delete-product-form')

function deleteProductInTable(productId) {

  fetch('/deleteProduct', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({id : productId})
  })
  .then(response => {
    const jsonResponse = response.json()
    console.log('Server response:', jsonResponse.status)
    return jsonResponse
  })
  .then(data => {
    console.log('Server status:', data.status);
    // Handle the server response as needed
  })
  .catch(error => {
    console.error('Error:', error);
  })
  removeElementFromDOM(document.getElementById(`row-${productId}`))
}

function removeElementFromDOM(element) {
  if(element) element.parentNode.removeChild(element);
}

addProductIcon.addEventListener('click', () => {
  if(addTab.style.display == 'none')
    addTab.style.display = 'flex'
  else
    addTab.style.display = 'none'
});

deleteProductIcon.addEventListener('click', () => {
  if(deleteTab.style.display == 'none')
    deleteTab.style.display = 'flex'
  else
    deleteTab.style.display = 'none'
});

function addRow(product) {
  const table = document.getElementById("data-table").getElementsByTagName('tbody')[0];
  const newRowHtml = `
  <tr id="row-${product.id}">
    <td>${product.id}</td>
    <td>${product.name}</td>
    <td>${product.category}</td>
    <td>${product.price}</td>
    <td>
      <img
        class="delete-product-icon-table"
        src="/icons/red-minus.png"
        onclick="deleteProductInTable(${product.id})"
        alt="Icon"
      />
    </td>
  </tr>
`;
  table.insertAdjacentHTML('beforeend', newRowHtml);
}

function addNewProduct() {
  const formData = new FormData(addFormElement)
  
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
  .then( response => response.json())
  .then(data => {
    console.log('Server response:', data);
    addRow(data)
  })
  .catch(error => {
    console.error('Error:', error);
  })

}

function deleteProduct() {
  const formData = new FormData(deleteFormElement)
  const idValue = parseInt(formData.get('id'))

  fetch('/deleteProduct', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({id : idValue})
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
    document.querySelector("#products-table").innerHTML = products.map((product) => {
      return `
      <tr id="row-${product.id}"> 
        <td> ${product.id}</td>
        <td> ${product.name}</td>
        <td> ${product.category}</td>
        <td> ${product.price}</td>  
        <td>
          <img 
            class="delete-product-icon-table"  
            src="/icons/red-minus.png" 
            onclick="deleteProductInTable(${product.id})" 
            alt="Icon"
          /> 
        </td>               
      </tr>     
      `
    }).join("");
  })
})