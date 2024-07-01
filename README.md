<img src="./public/images/Title.png" align="center"/>

<details>
  <summary>
    <h2>Table of content</h2>
  </summary>

- [About project](#about-project)
- [Features](#features)
- [Layout](#layout)
- [Stack](#stack)
- [.ENV File](#env-file)
  - [Atention!!! ⚠️](#atention-️)
  - [Mongo Atlas](#mongo-atlas)
  - [Nodemailer](#nodemailer)
  - [Google passport](#google-passport)
  - [Facebook passport](#facebook-passport)
  - [Cloudinary](#cloudinary)
- [How running this project](#how-running-this-project)
- [License](#license)
</details>

## About project

You can see a version of this readme in Portuguese [here](https://github.com/jefersonsilva01/Quadra/blob/main/README-pt_BR.md).

This project is a web page inspired by the design of the Tesla website, but dedicated to the iconic Quadra Turbo-R V-Tech car from the game Cyberpunk 2077. The objective is to provide a visual and informative experience for fans of the game, highlighting the features and futuristic aesthetics of the vehicle.

You can see a demo [here](https://quadra-68d1b71920b6.herokuapp.com/).

## Features

- Responsive Design: The website is fully responsive, ensuring a good browsing experience on mobile devices, tablets and desktops.

- Dynamic Animations: Use of animations to highlight the car's features and create an immersive navigation experience.

- Image Gallery: A dedicated section with high-quality images of the Quadra Turbo-R V-Tech.

- Technical Specifications: Detailed information about the car's specifications, including performance, design and technology.

- Vehicle History: A brief history of the Quadra Turbo-R V-Tech in the Cyberpunk 2077 universe.

- Contact Form: A form for users to get in touch or sign up for updates.

- Social Login from Google or Facebook accounts.

- CRUD of order orders, new order, update order, list orders and delete order.

- CRUD for user profile, create new user profile, view user profile and delete user profile.

## Layout

Project was developed based on the layout created in Figma and can be accessed through [here](https://www.figma.com/design/qQQ72CCzmAzdAfCMIjM8gZ/QUADRA?node-id=2009-2&t=CpjsCNhvsjwsOSCI-1)

## Stack

- [x] Figma
- [x] HTML 5
- [x] CSS 3
- [x] Javascript
- [x] Bootstrap
- [x] NodeJS
- [x] Express
- [x] Handlebars
- [x] MongoDB
- [x] Git
- [x] Github
- [x] Heroku

## .ENV File

### Atention!!! ⚠️

Depending on when you are viewing this project, the access mode to obtain the environment variables may have changed in each service.

### Mongo Atlas

The project uses [MongoDB](https://www.mongodb.com/), and [Mongo Atlas](https://www.mongodb.com/en-us/cloud/atlas/register) as databases as a database server, it will be necessary to use the URL of this environment to be configured so that our data is properly stored and accessed.

### Nodemailer

For the email service, a service and host are required (Ex: 'Gmail', 'smtp.gmail.com'), in this case the username and password can be obtained through your [Google](https://www.google.com/intl/pt-BR/account/about/) account, if you use other services such as Outlook, consult the official documentation to find out how to obtain your data.

### Google passport

To use the Google passport authentication method, you must obtain your Client ID and Client Secret through a project created in the [Google Cloud Console](https://console.cloud.google.com/).

### Facebook passport

To use the Facebook passport authentication method, you must obtain your APP ID and APP Secret through an application created on [Developers Facebook](https://developers.facebook.com/).

### Cloudinary

Image files are uploaded through the [Cloudinary](https://cloudinary.com/) service, where our files are stored and can be accessed. To use the service, we need to configure the NAME, KEY and SECRET credentials.

## How running this project

To run this project you can download or fork it to your github account and run the git clone command.

```shell
git clone https://github.com/<user>/Quadra.git
```

After accessing the Quadra directory and installing the project dependencies, the dependencies can be found through the `package.json` file, once installed the project can be run in development mode.

```shell
cd Quadra

npm install

npm run dev
```

Access URL: `http://localhost:3000`

## License

This project is under the MIT license. See the file [LICENSE](https://github.com/jefersonsilva01/Quadra/blob/main/LICENCE) for more details.
