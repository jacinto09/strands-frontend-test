## Description

This project is an application developed in **Next.js 15** with **Redux Toolkit** and **TypeScript**. It allows to get a list of dog breeds from the [Dog CEO] API(https://dog.ceo/dog-api/documentation/), count the number of available images per breed and visualize the data in a UI with a graph.

---

## 📌 Development Decisions

### Efficient handling of API calls\*\* **Decision:** I created an API call.

- Decision:\*\* I created a single function `fetchBreedsAndImages` that fetches all breeds and their images in a single action using `Promise.all()`.
- **Reason:** Reduces the number of unnecessary renders and improves the efficiency of API calls.

### Handling of load state in Redux\*\*

- **Decision:** Added `loading`, `success` and `failed` states in Redux to control the UI during data loading.
- Reason:\*\* Improves user experience by displaying relevant information about the state of the application.

### Typed with TypeScript in the store and hooks.

- Decision:\*\* Defined types for `RootState`, `AppDispatch`, data fetched from the API and custom hooks for Redux.
- Reason:\*\* Improved security, avoided bugs during development and cleaner code.

---

## 🚀 Installation and execution

### Install dependencies\*\*

````sh
 npm install
```

### Run the project in development mode**
```sh
 npm run dev
```

````
