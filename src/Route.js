import Loadable from "react-loadable";

const HomeContainer = Loadable({
  loader: () => import("./Home/Containers/HomeContainer"),
  loading() {
    return <div>Loading...</div>;
  }
});
export default [
  {
    component: HomeContainer,
    path: "*"
  }
];
