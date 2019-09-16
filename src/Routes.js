import Home from "./Pages/Home";
import Countries from "./Pages/Countries";
import Country from "./Pages/Country";
import NotFound from "./Pages/NotFound";
import { loadDataFromServer } from "./helpers";

const Routes = [
    {
        path: '/',
        exact: true,
        component: Home
    },
    {
        path: '/countries',
        exact: true,
        component: Countries,
        loadData: () => loadDataFromServer('countries')
    },
    {
        path: '/countries/:code',
        component: Country,
        loadData: () => loadDataFromServer('country')
    },
    {
        component: NotFound
    }
]

export default Routes