import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import Dashboard from './containers/Dashboard'

/*
export default <Route path="/" component={App}>
  <Route path="/:login/:name"
         component={RepoPage} />
  <Route path="/:login"
         component={UserPage} />
</Route>
*/
export default <Route path="/" component={App}>
  <IndexRoute component={Dashboard} />
</Route>
