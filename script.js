var scales = ["Ab", "A", "A#", "Bb", "B", "B#", "Cb", "C", "C#", "Db", "D", "D#", "Eb", "E", "E#", "Fb", "F", "F#", "Gb", "G"];
var chords = ["Ab", "A", "A#", "Bb", "B", "B#", "Cb", "C", "C#", "Db", "D", "D#", "Eb", "E", "E#", "Fb", "F", "F#", "Gb", "G","Abm", "Am", "A#m", "Bbm", "Bm", "B#m", "Cbm", "Cm", "C#m", "Dbm", "Dm", "D#m", "Ebm", "Em", "E#m", "Fbm", "Fm", "F#m", "Gbm", "Gm"];
var scaleDeg= [["I", "ii", "iii", "IV", "V", "vi", "vii dim"],["i", "ii dim", "III", "iv", "v", "VI", "VII"]]

var type = [[...scales], [...chords], [...scaleDeg]]
var cType = 0;
var picked = new Array(type[cType].length).fill(0);
var scalePicked = new Array(type[cType].length).fill(0);

console.log(type);
var colors = {
	purple: "#9A48D0",
	orange: "#EC9A29",
	green: "#048A81"
}

function getRandomInt(min, max) {
     min = Math.ceil(min);
     max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const setColor = (c) => {
	document.body.style.backgroundColor = c;
}

const clearFreq = (arr) => {
	picked = new Array(arr.length).fill(0);
}

const clearScale = (arr) => {
	scalePicked = new Array(arr.length).fill(0);
}


const write = (msg, id = "curr") => {
	 document.getElementById(id).innerHTML = msg;
}

const arrPicker = (major = 0, arr = [...scales]) => {
	if( picked.every(i => i === 1))
		clearFreq(arr);

	const pick = getRandomInt(0, arr.length - 1);
	let out;

	if (picked[pick] === 1)
	{
		arrPicker(major, arr);
	}
	else
	{
		picked[pick] = 1;
		out = major ? arr[pick] : arr[pick].toLowerCase();
		write(out);
		console.log(picked)
	}
}

const scalePicker = (major = 1, arr = [...scaleDeg[0]]) => {
	if( scalePicked.every(i => i === 1)){
		clearScale(arr);
		arrPicker(major, [...scales]);
	} else if (scalePicked.every(i => i === 0)) {
		arrPicker(major, [...scales]);
	}

	console.log(scalePicked);
	const pick = getRandomInt(0, arr.length - 1);

	if (scalePicked[pick] === 1)
	{
		scalePicker(major, arr);
	}
	else {
		scalePicked[pick] = 1;
		write(arr[pick], "degree");
	}
}

document.body.onkeyup = function(e){
    switch(e.keyCode) {
    	case 49:
    		cType = 0;
    		clearFreq(type[cType]);
    		setColor(colors.purple);
    		write("press space");
    		write("", "degree");
    		break;
    	case 50:
    		cType = 1;
    		clearFreq(type[cType]);
    		setColor(colors.orange);
    		write("press space");
    		write(" ", "degree");
    		break;
    	case 32:
    		arrPicker(true, type[cType]);
    		break;
    	default:
    		break;
    }
}

//WebMIDI fun stuff
WebMidi.enable(function (err) {
    var input = WebMidi.getInputByName("loopMIDI Port");
    console.log(input);

    input.addListener('noteon', "all", function(e) {
    	console.log(e);
	    switch(e.note.number) {
	    	case 37:
	    		cType = 0;
	    		clearFreq(type[cType]);
	    		setColor(colors.purple);
	    		write("press space");
	    		write("", "degree");
	    		break;
	    	case 39:
	    		cType = 1;
	    		clearFreq(type[cType]);
	    		setColor(colors.orange);
	    		write("press space");
	    	    write("", "degree");
	    		break;
	    	case 42:
	    		cType = 2;
	    		clearFreq(type[0]);
	    		clearScale(type[cType][0]); //fix this pls
	    		setColor(colors.green);
	    		write("press space");
	    		write("", "degree");
	    		break;
	    	case 36:
	    		if (cType === 2)
	    		{
	    			scalePicker(true , type[cType[0]]);
	    		} else
	    			arrPicker(true, type[cType]);
	    		break;
	    	default:
	    		break;
    }
});
});

