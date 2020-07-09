import React from 'react';
import {Route, Switch} from "react-router-dom";
import AdminPanel from "../containers/admin/AdminPanel";
import {Intro} from "../main/Intro";
import Catalog from "../main/catalog/Catalog";
import AdminEnter from "../containers/admin/AdminEnter";
import ModeratorEnter from "../containers/moderator/ModeratorEnter";
import ModeratorPanel from "../containers/moderator/ModeratorPanel";
import SignIn from "../containers/user/SignIn";
import SignUp from "../containers/user/SignUp";
import Cabinet from "../containers/user/Cabinet";

export const Router = () => {
  return (
      <Switch>
          {/*User Routes*/}
          <Route path={'/'} exact>
              <Intro />
          </Route>
          <Route path={'/catalog'}>
              <Catalog />
          </Route>
          <Route path={'/login'}>
              <SignIn />
          </Route>
          <Route path={'/reg'}>
              <SignUp />
          </Route>
          <Route path={'/cabinet'}>
              <Cabinet />
          </Route>
          {/*Admin Routes*/}
          <Route path={'/adminEnter'}>
              <AdminEnter />
          </Route>
          <Route path={'/adminPanel'}>
              <AdminPanel />
          </Route>
          {/*Moderator Enter*/}
          <Route path={'/moderEnter'}>
              <ModeratorEnter />
          </Route>
          <Route path={'/moderPanel'}>
              <ModeratorPanel />
          </Route>
      </Switch>
  )
};