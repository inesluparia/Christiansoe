# Christiansoe website

## Developer server
To run and test the website while developing, a developer server is used. It provides additional benefits such as live-reloading of code changes and quicker bundling. The developer server can be started on localhost:3000 using the npm script `serve`.

```
npm run serve
```

This opens localhost:3000 in the default webbrowser.

## Deployment build
The npm script `build` builds the website and bundles it to `./dist/main.bundle.js`

```
npm run build
```

The bundle file can then be deployed on a website including the content of the `./public` directory.

## Folder structure

### Utils
Contains common functions e.g. for rendering page elements or shorthands for creating html elements from a string.

### Services
Services obtain and handle information from their api, providing a ~~human~~ *programmer*-friendly way of interacting with api endpoints. It keeps pages and other files clear of hardcoded and/or concatenated urls, by export helpful and common functions.

### Pages
The website consist of multiple pages, each split into one or more files. Folders, within the ./src/pages directory, are named according to their respective url paths.

## Example code for constructing a page
A page is simply a rendered `HTMLElement`, constructed from a function. We can quite simply create our very own page e.g. `./src/pages/test/testPage.js`

```js
function TestPage() {
    const pageElement = createElementFromString(`
        <h1>Hello world</h1>
    `);

    return pageElement;
}

export default TestPage;
```

Then in `./src/index.js` we will need to import and render the function in its route callback function.

```js
import "./style.scss";
import Navigo from "navigo";
import { renderPageElement } from "./utils/utils";
import TestPage from "./pages/test/TestPage";

const router = new Navigo("/");
const rootElement = document.getElementById("root");

router.on({
    "/test": async () => {
        renderPageElement(
            TestPage(),
            rootElement
        );

...
```

If we wish to parse data to the page, such as information from an api, it can be done as a parameter to the function.

```js
...

import { testService } from "./services/TestService";

...

    "/test": async () => {
        const data = testService.findAll();

        renderPageElement(
            TestPage(data),
            rootElement
        );

...
```