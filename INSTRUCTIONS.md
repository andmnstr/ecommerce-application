## How to set up and run the project locally

1. Clone this repository: `https://github.com/andmnstr/ecommerce-application.git` by `git clone` command
2. Run `cd ecommerce-application` to go to the folder `ecommerce-application`
3. Run the command `npm install` to install all dependencies of the project
4. Change the file `.env.api-client` to `.env`
5. To see the project in a dev mode, run the command `npm run dev`
6. To build the project and see the result, run the command `npm run build` and then `npm run preview`

## Available scripts

1. `npm run dev` to open the project in a browser in a dev mode
2. `npm run build` to build the project in "dist" folder for future deployment 
3. `npm run preview` to open the project locally after building
4. `npm run lint` to check the files by ESLint
5. `npm run lint:fix` to fix ESlint mistakes automatically
6. `npm run format` to check the files by Prettier
7. `npm run ci:format` to fix Prettier mistakes automatically
8. `npm run prepare` to config Husky (once Husky is configured, no need to run it anymore)
9. `npm run test` to test the code by Jest
