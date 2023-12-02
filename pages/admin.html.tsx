export let adminHtml = async () => (
    <html>
        <head>
            <meta charset="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <link rel="stylesheet" type="text/css" href="admin.css"/> 
            <script defer src="admin.js"></script>
            <title>Admin</title>
        </head>

        <body>
            <div id="side-bar">
                <img id="add-product-icon" src="/icons/green-plus.png" alt="Icon"/> 
                <img id="delete-product-icon" src="/icons/red-minus.png" alt="Icon"/> 
            </div>

            <div id="content">

                <div id="add-product-tab">
                    <form id="add-product-form">
                        <label for="name">Nom</label>
                        <input type="text" id="name" name="name" required/>

                        <label for="category">catégorie</label>
                        <select id="category" name="category" >
                            <option value="1">T-shirt</option>
                            <option value="2">Pant</option>
                        </select>
                        
                        <label for="price">prix en €</label>
                        <input type="number" id="price" name="price" required/>

                        <input type="button" onclick="addNewProduct()" value="ajouter un produit"/>
                    </form>
                </div>

                <div id="delete-product-tab">
                    <form id="delete-product-form">
                        <label for="name">id</label>
                        <input type="number" id="id" name="id" required/>

                        <input type="button" onclick="deleteProduct()" value="supprimer un produit"/>
                    </form>
                </div>

                <table id="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody id="products-table"></tbody>
                </table>

            </div>
            
        </body>
    </html>
)