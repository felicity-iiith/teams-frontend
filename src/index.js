import { render } from "inferno";
import App from "./App";
import "./index.css";

import { Router, Route, IndexRoute } from "inferno-router";
import createBrowserHistory from "history/createBrowserHistory";

import { init as authinit, reloadUserinfo } from "./auth";
import "./fetchWithAuth";

import Hello from "./Hello";
import Team from "./Team";

const browserHistory = createBrowserHistory();
window.browserHistory = browserHistory;

async function routeChange() {
  document.getElementById("navbarToggle").checked = false;
  await reloadUserinfo();
}

const routes = (
  <Router asyncBefore={routeChange} history={browserHistory}>
    <Route path={process.env.PUBLIC_URL} component={App}>
      <IndexRoute component={Hello} />
      <Route path="/:contestSlug" component={Team} />
    </Route>
  </Router>
);

async function init() {
  await authinit();
  render(routes, document.getElementById("app"));
}

init();
