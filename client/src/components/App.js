import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./HomePage";
import NewsPage from "./NewsPage";
import NotFoundPage from "./NotFoundPage";
import NewsItemPage from "./NewsItemPage";
import UpdateItemPage from "./UpdateItemPage";
import SignupPage from "./SignupPage";
import LoginPage from "./LoginPage";
import Logout from "./Logout";
import Header from "./Header";
import Footer from "./Footer";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/news" component={NewsPage} />
          <Route exact path="/news/:id" component={NewsItemPage} />
          <Route path="/news/:id/edit" component={UpdateItemPage} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/logout" component={Logout} />
          <Route component={NotFoundPage} />
        </Switch>

        {/* <Footer /> */}
      </BrowserRouter>

    </>
  );
};

export default App;
