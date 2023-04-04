import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Footer from "./components/Footer";
import Main from "./components/Main";
import Header from "./components/Header";
import PetsMenu from "./components/PetsMenu";
import Donate from "./components/Donate";
import PetPage from "./components/petpage";
import MyProfile from "./components/UserProfile";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");

  return {
    headers: { ...headers, authorization: token ? `Bearer ${token}` : "" },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [donationAmount, setDonationAmount] = useState(0);
  const [donationGoal, setDonationGoal] = useState(1000);

  const handleDonation = (amount) => {
    setDonationAmount(donationAmount + amount);
  };

  const percentComplete = Math.floor((donationAmount / donationGoal) * 100);

  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/pets" element={<PetsMenu />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/pet/:petName" element={<PetPage />} />
            <Route path="my-profile" element={<MyProfile />} />
            <Route
              path="*"
              element={<h1 className="display-2">Wrong page!</h1>}
            />
          </Routes>
          <Footer />
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
