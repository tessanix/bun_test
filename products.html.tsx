export let productsHtml = async (header: string) => (
    <html>
        <head>
            <meta charset="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <link rel="stylesheet" type="text/css" href="styles.css"/>
            <script defer src="/script.js"></script>
            <title>Produits</title>
        </head>

        <body>
            {header}

            <div id="login-tab">
                <div id="closeLoginTabButton">x</div>
                <form id="loginForm">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required/>
                
                    <label for="password">Mot de passe:</label>
                    <input type="password" id="password" name="password" required/>
                    <div id="loginFormButtonsContainer">
                        <input type="button" onclick="submitLoginForm(true)" value="se connecter"/>
                        <input type="button" onclick="submitLoginForm(false)" value="s'enregistrer"/>
                    </div>
                </form>
            </div>


            <div id="content">
                <div>
                    <p>This is the SHOP.</p>
                </div>

                <div class="square-container">
                    <div class="square"></div>
                    <div class="square"></div>
                    <div class="square"></div>
                    <div class="square"></div>
                    <div class="square"></div>
                    <div class="square"></div>
                    <div class="square"></div>
                    <div class="square"></div>
                </div>
            </div>

        </body>
    </html>
)