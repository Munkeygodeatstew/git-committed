import angular from 'angular';
import uirouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import routing from './app.config';
// import home from './components/home';
import admin from './components/admin';
// import menu from './components/menu';
import tasks from './components/admin/tasks';
import eventspage from './components/home/eventspage';
import floor from './components/home/floor';
import building from  './components/home/building';
const firebase = require('firebase/app');
// all 3 are optional and you only need to require them at the start
require('firebase/auth');
require('firebase/database');
require('firebase/storage');
import 'angularfire';
import '../style/app.css';
import 'angular-material/angular-material.css';
import fbs from './app.firebaseServices'

const config = {
	apiKey: 'AIzaSyDp_CQgna5k7vyPW89PiSY5xnOQCT5QU1U',
	authDomain: 'fall-mobilithon.firebaseapp.com',
	databaseURL: 'https://fall-mobilithon.firebaseio.com',
	storageBucket: 'fall-mobilithon.appspot.com',
	messagingSenderId: '528596178671'
};

firebase.initializeApp(config);

const ref = firebase.database().ref('/data/');

let app = () => {
	return {
		template: require('./app.html'),
		controller: 'AppCtrl',
		controllerAs: 'app'
	}
};

class AppCtrl {
	constructor($rootScope) {

		$rootScope.currentBuilding = null;

		this.data = ['item1', 'item2'];

		this.ref = ref;

		var email = 'gitcommitted@att.com';
		var password = '123456';

		firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  console.log('ERROR: ' + error.code + ': ' + error.message);
		  // ...
		});


		firebase.auth().onAuthStateChanged((user)=> {
		  if (user) {
		    // User is signed in.
		    console.log('heyyyy');
		    const isAnonymous = user.isAnonymous;
		    const uid = user.uid;
		    // ...
		  } else {
		    // User is signed out.
		    // ...
		  }
		  // ...
		});


	}
}

const MODULE_NAME = 'app';


angular.module(MODULE_NAME, [uirouter, admin, tasks, eventspage, floor, building, ngMaterial, fbs])
	.directive('app', app)
	.config(routing)
	.controller('AppCtrl', AppCtrl);

export default MODULE_NAME;
