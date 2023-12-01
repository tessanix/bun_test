export let adminHtml = async () => (
    <html>
        <head>
            <meta charset="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            {/* <link rel="stylesheet" type="text/css" href="styles.css"/>  */}
            <script src="admin.js"></script>
            <title>Admin</title>
        </head>

        <body>
            <form id="newProductForm">
                <label for="name">Nom</label>
                <input type="text" id="name" name="name" required/>

                <label for="category">catégorie</label>
                <input type="number" id="category" name="category" required/>
                
                <label for="price">prix en €</label>
                <input type="number" id="price" name="price" required/>

                <input type="button" onclick="addNewProduct()" value="ajouter un produit"/>
            </form>

            <button>supprimer un produit</button>

            <ul id="productsList">
                
            </ul>
            
        </body>
    </html>
)