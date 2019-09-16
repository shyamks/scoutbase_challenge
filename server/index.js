let express = require('express');
let Loadable = require('react-loadable');

let serverRenderer = require('./middleware/renderer');

const PORT = 3000;
const path = require("path");

// initialize the application and create the routes
const app = express();
const router = express.Router();

// root (/) should always serve our server rendered page
router.use('^/$', (...args) => {
    serverRenderer(...args)
});

router.use('/static', express.static(
    path.resolve(__dirname, '..', 'build', 'static'),
    { maxAge: '30d' },
));


router.use('/countries', (...args) => {
    serverRenderer(...args)
});

// app.get('/countries', (...args) => {
//     // console.log(args,'cmon')
//     serverRenderer(...args)
// });

// other static resources should just be served as they are





app.use(router);

// start the app
// Loadable.preloadAll().then(() => {
app.listen(PORT, (error) => {
    if (error) {
        return console.log('something bad happened', error);
    }

    console.log("listening on " + PORT + "...");
});
// });