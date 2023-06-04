# movie-cataloger
A simple app to organize your movie files

## Feature
1. Add movie entry - upload file, upload thumbnail, add details
2. Query movies from the store
3. Stream the video

## Preview
![preview-demo](https://github.com/sreed17/movie-cataloger/assets/64097746/7b748938-4987-4cd4-bfaf-50978472a2bd)

## Main Tools
- Typescript
- Express
- Mongodb (mongoose)
- React (vite)
- Tailwindcss

## Project structure
![proj-struct](https://github.com/sreed17/movie-cataloger/assets/64097746/0353646c-b5e4-404d-9248-916ef6d17022)

## Run
1. Clone the repo
2. run `cd <cloned dir>`,`npm install`
3. Do `npm install` for the 'client-web' directory, if you want to edit the client
4. set the PORT and DATABASE environment variable with your desired port number and mongodb url (resp.) in the way feasible to you (eg. creating a .env file)
5. run `npm run dev`, go to "http://localhost:<port you assigned in step 4>" on your browser
