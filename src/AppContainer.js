import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import App from "./App";

const mapStateToProps = (state, ownProps) => {
  return {};
};

const AppContainer = withRouter(connect(mapStateToProps)(App));
export default AppContainer;
