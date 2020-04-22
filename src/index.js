import React from "react";
import ReactDOM from "react-dom";
import Loadable from "react-loadable";
import { BrowserRouter } from "react-router-dom";
import AppContainer from "./AppContainer";
import { Provider } from "react-redux";
import store from "./configureStore.js";
import registerServiceWorker from "./registerServiceWorker";
// import "intersection-observer";
import { getBaseUrl } from "./Utils/urlUtils";

const BASE_PATH = "/";

const AppBundle = (
  <Provider store={store}>
    <BrowserRouter basename={BASE_PATH}>
      <AppContainer />
    </BrowserRouter>
  </Provider>
);

// };
Loadable.preloadReady().then(() => {
  ReactDOM.hydrate(AppBundle, document.getElementById("root"));
});
const displayToastFunc = message => {
  ReactDOM.render(
    <div className="newUpdateWrapper">
      New Version is available
      <a href={window.location.href} className="refreshContent">
        REFRESH
      </a>
      <span className="closeToast">x</span>
    </div>,
    document.getElementById("service-worker-toast-root")
  );
  // setTimeout(() => {
  //   document.getElementById("service-worker-toast-root").innerHTML = "";
  // }, 4000);
};
try {
  registerServiceWorker(displayToastFunc);
} catch (e) {
  console.log(e.message);
}
