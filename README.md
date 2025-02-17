This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
# install dependencies
> npm install
# or
> yarn install

# serve with hot reload at localhost:3000
> npm run dev
# or
> yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## To know

Current arbitrary choices are:

- React Context to manage state
- For simple database i have created some service to manipulate data in json file with [node-json-db](https://www.npmjs.com/package/node-json-db)
- [react-bootstrap](https://react-bootstrap.netlify.app/) for ui component
- [GraphQL](https://graphql.org/) architecture with apollo
- [TypeGraphQL](https://typegraphql.com/), I used this package to optimizing speed of code for generate grapql schema automatically if any changes and manage dependency injection
- [TypeDI](https://docs.typestack.community/typedi/v/develop/) for dependency injection

## Demo

[https://drive.google.com/file/d/1Yowa9CmgvKN-uj9DKrcqUMAfNojoH0HT/view?usp=sharing](https://drive.google.com/file/d/1Yowa9CmgvKN-uj9DKrcqUMAfNojoH0HT/view?usp=sharing)
