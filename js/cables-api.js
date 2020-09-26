// CONCRETE PLATFORM

// fetch JSON DATA from submarinecablemap.com github API

let platformData;
let i = 0;

const fetchAllCablesData = async() => {
	try {
		let requestUrl = 'https://raw.githubusercontent.com/telegeography/www.submarinecablemap.com/master/public/api/v2/cable/all.json';
  		let response = await fetch(requestUrl);
  		return await response.json();
	} catch(err) {
		console.log(err)
	}
}

function populateIndex(){
	let ul = document.querySelector('#index-ul');
	ul.innerHTML = '';
	platformData.forEach((data, index) => {
		// console.log(index);
		// console.log(data.cable);
		let dataLink = `https://raw.githubusercontent.com/telegeography/www.submarinecablemap.com/master/public/api/v2/cable/${data.id}.json`
		let li = document.createElement('li');
		li.innerHTML = `<a class="a-cable" id="${data.cable_id}" data-src="${dataLink}">${data.name}</a>`;
		ul.appendChild(li);
	})
}


let singleCableData;
let landingPoints;

// or write in arrow function..
async function fetchSingleCableData(url){
	let requestUrl = url;
	let response = await fetch(requestUrl);
	return await response.json();
}

function populateCableInfo() {
	document.querySelector('#name').innerHTML = `<h3>${singleCableData.name}</h3>`;
	document.querySelector('#rfs').innerHTML = singleCableData.rfs;
	// to do : choose only 2 random index from landingPoints.length
	let lpContainer = document.querySelector('#landing-points');
	lpContainer.innerHTML = '';
	landingPoints = singleCableData.landing_points;
	// console.log(landingPoints);	
	landingPoints.forEach((data, index) => {
		let lp = document.createElement('div');
		lp.innerHTML = data.name;
		lpContainer.appendChild(lp);
	})
	document.querySelector('#owners').innerHTML = singleCableData.owners;
}

async function showCableData(src){
	singleCableData = await fetchSingleCableData(src);
	// console.log(singleCableData);
	populateCableInfo();
	document.querySelector('#index-container').classList.remove("visible");
}

function initIndexLinks() {
	let cableLinks = document.querySelectorAll('.a-cable');
	cableLinks.forEach(item => {
		item.addEventListener('click', function(event) {
			let cableJsonSrc = event.target.dataset.src;
			console.log(cableJsonSrc);
			showCableData(cableJsonSrc);
		})
	})
}




const initPlatform = async() => {
	try {
		// // await Promise.all() if multiple async functions at same time
	 	// let promiseData = fetchAllCablesData();
	 	// let promiseOther = fetchOther();
		// let promises = await Promise.all([promiseData, promiseOther]);
		// platformData = promises[0];
		platformData = await fetchAllCablesData()
		populateIndex()
		initIndexLinks()
		// return "Success"

	} catch(err) {
		console.log(err)
	}
}
initPlatform()
// .then(message => console.log({ message }))
.catch(err => console.log({ err }));




// Html page Event listeners

document.querySelector('#button-show-index').addEventListener('click', function(event){
	this.classList.toggle('underline');
	document.querySelector('#index-container').classList.toggle("visible");
})

document.querySelector('#button-sort-year').addEventListener('click', function(event){
	document.querySelector('#button-sort-name').classList.remove('underline');
	this.classList.add('underline');
	sortByYear();
	populateIndex();
})
document.querySelector('#button-sort-name').addEventListener('click', function(event){
	document.querySelector('#button-sort-year').classList.remove('underline');
	this.classList.add('underline');
	sortByName();
	populateIndex();
})

