import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import PoemaPage from './pages/PoemaPage'
import AuthPage from './pages/AuthPage'
import UserPage from './pages/UserPage'
import MainPage from './pages/MainPage'

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/" exact>
          <MainPage />
        </Route>
        <Route path="/me" exact>
          <UserPage />
        </Route>
        <Route path="/poema/:id">
          <PoemaPage />
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
      <Route path="/auth" exact>
        <AuthPage />
      </Route>
      <Route path="/poema/:id">
        <PoemaPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}