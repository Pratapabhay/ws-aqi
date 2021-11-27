# Proximity Web Developer
Please read the following document to get a better understanding of the codebase. 

# AQI Monitoring System
  * [Vision](#vision)
  * [Technical Description](#technical-description)
  * [Deployment](#deployment)
  * [Scope Considerations](#scope-considerations)
  * [Available Scripts](#available-scripts)
  * [Directory Structure](#directory-structure)
    + [public](#public)
    + [client](#src)
      * [pages](#pages)
      * [components](#components)

## Vision
To create a AQI monitoring system. This project is like a MVP version and can be extended and used for full fledged AQI monitoring and analytics. 
The scope of this project contains a webapp wherein you have a real time table that helps you see latest AQI values of different cities and checkout out historical values in graphical form. Time taken to build the entire project is around 6-7hrs, distributed between 2 days.

## Technical description

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)

`BlueprintJS` is being used for UI elements and `ChartJS` is used for plotting graphs.

The project is configured with `eslint-prettier` code-formatter for maintaining a consistent coding style in the project. `Husky` is being used as pre-commit formatter which makes sure only consistent code is being pushed to the remote.

## Deployment

The project is being deployed on `http://ws-aqi.s3-website.ap-south-1.amazonaws.com/` and is configured with CI/CD using github actions. Currently, whenever changes are pushed onto the `main` branch, pipeline will run and code will be deployed on successfull completion of pipeline.
For the sake of the scope, pipeline, as of now, only includes a dummy test which will pass everytime, but can easliy be extended to support complex test suites.

## Scope Considerations 

1. More focus was given on creating well structured, modular and maintainable code base, rather than making sure design is perfect is all resolutions. With more time and detailed description, UI robustness can be achieved.
2. The project is built specifically for web view. Mobile view mode could be considerably improved with proper designs.


## Available Scripts

In the project directory, install the dependencies with `npm install`  and then you can run:

### `npm run start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run prettier`

Format all the files in the project

## Directory Structure

Project is structured in a modular and scalable manner. You can find description of major directories here.

### `public`
This directory will contain all available 'public' assets. Place any images, video, sound and such here. 

### `src`
This directory contains all files used on the cient side. Main sub-directories and files:

#### `pages`
This folder containes the main views in the project. Currently it has a single page `aqi.pages.tsx`, but more views can be added in a similar manner.
#### `components`
These are resuable react components that can be used across the application.

#### `utilities`
These are resuable utility functions that can be used across the application for formatting output, defining categories etc

#### `types`
These are the global type definitions of data structures used across the application
