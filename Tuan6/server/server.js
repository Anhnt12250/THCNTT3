import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import config from "./serviceAccountKey.json" assert { type: "json" };

import { getLiving, updateLiving } from './controllers/living.js';
import { getKitchen, updateKitchen } from './controllers/kitchen.js';
import { getBed, updateBed } from './controllers/bed.js';

//initialize
const app = express();

const routerLiving = express.Router();
const routerKitchen = express.Router();
const routerBed = express.Router();

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

const appdb = initializeApp({
    credential: cert(config)
});

export const database = getFirestore(appdb);

//controller
routerLiving.get('/', getLiving);
routerLiving.put('/', updateLiving);

routerKitchen.get('/', getKitchen);
routerKitchen.put('/', updateKitchen);

routerBed.get('/', getBed);
routerBed.put('/', updateBed);

app.use('/living', routerLiving);
app.use('/kitchen', routerKitchen);
app.use('/bed', routerBed);

//server
const server = app.listen(5555, function () {
    const host = server.address().address
    const port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})

