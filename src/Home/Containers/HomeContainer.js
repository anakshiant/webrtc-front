import { getHomeData } from "../Action/Action";
import { connect } from "react-redux";
import HomeComponent from "../HomeComponent/HomeComponent";
import { withRouter } from "react-router-dom";

const mapStateToProps = state => {
  return {
    homeData: state.homeReducer.homeData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getHomeData: restId => {
      dispatch(getHomeData(restId));
    }
  };
};

const HomeContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomeComponent)
);
export default HomeContainer;
