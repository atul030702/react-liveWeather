import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";

import Header from "./components/Header.js";
import Body from "./components/Body.js";
import Footer from "./components/Footer.js";

const AppLayout = () => {
    return (
        <div className="app">
            {/**Header component */}
            <Header />

            <Outlet />
        </div>
    );
};

const HomePage = () => {
    return (
        <>
            <Body />
            <Footer />
        </>
    );
};

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
        ],

    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);