# SiteBuilder.js

The idea behind is to build a simple JavaScript framework to create dynamic websites without technical know-how in the simplest of environments. 
Every modern web browser can handle JavaScript, and no additional package is required on the server (or the webspace) to add JavaScript to any project. 

## Functionality

1. To create pages, open ``config.json`` at ``./script/config/`` and add:

```json
  "Routes": {
      "Home": {
        "route": "/",
        "content": "./site/pages/home"
      },
      "About": {
        "route": "/about",
        "content": "./site/pages/about"
      },
      "Contact": {
        "route": "/contact",
        "content": "./site/pages/contact"
      },
      "ExampleRoute": {
        "route": "/exampleroute",
        "content": "./site/pages/exampleroute"
      }
  }
```

2. Now create ``exampleroute`` at ``./site/pages/`` and add your content!

That's it. The menu entry is created automatically and is immediately ready for use after a reload.

