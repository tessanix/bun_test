import { PropsWithChildren } from '@kitajs/html'

export const BaseHtml = ({children}: PropsWithChildren) => (
    <html lang="en">
        <head>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" type="text/css" href="styles.css"/>
            <script defer src="/script.js"></script>
        </head>

        <body>
            {children}
        </body>
    </html>
);