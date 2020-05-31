import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import PoemaPage from './pages/PoemaPage'
import UserPage from './pages/UserPage'
import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import CategoryPage from './pages/CategoryPage'
import CreatePoemaPage from './pages/CreatePoemaPage'

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/" exact>
          <MainPage />
        </Route>
        <Route path="/me" exact>
          <UserPage />
        </Route>
        <Route path="/createpoema" exact>
          <CreatePoemaPage />
        </Route>
        <Route path="/poema/:id">
          <PoemaPage />
        </Route>
        <Route path="/category/:name">
          <CategoryPage />
        </Route>
        <Redirect to="/" />
      </Switch>
    )
  }
  return (
    <Switch>
      <Route path="/" exact>
        <MainPage />
      </Route>
      <Route path="/login" exact>
        <LoginPage />
      </Route>
      <Route path="/register" exact>
        <RegisterPage />
      </Route>
      <Route path="/poema/:id">
        <PoemaPage />
      </Route>
      <Route path="/category/:name">
        <CategoryPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}