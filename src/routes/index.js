import Home from "~/pages/Home";
import Following from "~/pages/Following";
import Profile from "~/pages/Profile";
import Upload from "~/pages/Upload";
import Search from "~/pages/Search";
import { HeaderOnly } from "~/components/Layout";

const publicRoute = [
  { path: "/", component: Home },
  { path: "/following", component: Following },
  { path: '/profile/:nickname', component: Profile },
  { path: "/upload", component: Upload, layout: HeaderOnly },
  { path: "/search", component: Search, layout: null },
];

const privateRoute = [];

export { publicRoute, privateRoute };
