# Mobi Kart
## _The ecommerce site to sell  mobiles and accessories_

MobiKart is mobile-ready, offline-storage compatible,
ReactJs-powered HTML5 Markdown.

## Features

- Buy Products
- Admin and User roles
- Order Mangement
- Cart Mangement
- User Mangement
- Support Tickets Mangement



## Tech

Mobi Kart uses a number of open source projects to work properly:

- [ReactJs] - HTML enhanced for web apps!
- [Material UI] - great UI boilerplate for modern web apps
- [Node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework 
- [NestJs] - the BoilerPlate build system
- [VS Code Editor] - awesome code editor

## Installation

Mobi Kart requires [Node.js](https://nodejs.org/) v14+ and MySql to run.

**Add MySql Credential in `ormconfig.ts` file || to the Environment.**

Install the dependencies and devDependencies and start the server.

First Tab:
```sh
cd kart-ui
npm install

#UI
npm start 
```

Second Tab:
```sh
cd server
npm install

#Server
npm run start:dev
```

For Automation Testing...

```sh
pip3 install pytest
pip3 install selenium

#Install Chrome Web Driver

#For windows we need add Webdriver path in the code 
#Ex: driver.Chrome('<PATH_TO_CHROME WEB DRIVER>')

#Windows
cd webtest
py -m pytest test.py

#Mac/Linux
cd webtest
python3 -m pytest test.py
```


## Development

Want to contribute? Great!

Create a PR and we are happy to merge.

## License

MIT

**Free Software, Hell Yeah! Feel Free to Play with It**

## Preview:



[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

 
   [john gruber]: <http://daringfireball.net>
   [NestJs]: <https://docs.nestjs.com/>
   [node.js]: <http://nodejs.org>
   [Material UI]: <https://material-ui.com/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [ReactJS]: <http://reactjs.org>

