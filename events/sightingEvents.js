import {EventEmitter} from 'node:events'
import { createAlert } from '../utils/createAlert.js'


export const sightingEvents = new EventEmitter();
sightingEvents.on('sighting-added',createAlert);     //the instance of eventemitter called sightingEvents listen on the event sighting-added with the function createAlert  

