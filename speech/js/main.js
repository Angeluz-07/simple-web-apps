/*
	Voices are loaded async
	Since gender is not quite easy to set. Voice will be just personalized by 
	languages tags.
	
	es-MX
	es-ES
	en-US
	en-GB
	ru-RU
*/

/*
	source:https://developers.google.com/web/updates/2014/01/Web-apps-that-talk-Introduction-to-the-Speech-Synthesis-API
*/

function speakLine(textToSpeak, lang, rate) {
	//create an utterance object
	var msg = new SpeechSynthesisUtterance();

	//set text to be uttered
	msg.text = textToSpeak;

	//set language		
	msg.lang = lang;

	//set rate, i.e. speed
	msg.rate = rate; // 0.1 to 10			

	//speak
	speechSynthesis.speak(msg);
}

var russian_dialogues = {
	"_info": "lang and rate are to be used with synthesis web speech api.",
	"lang": "ru-RU",
	"rate": 0.8,
	"dialogues": [
		{
			"title": "Здравствуйте",
			"lines": [
				"Здравствуйте! Как вас зовут?",
				"Меня зовут Саша. А вас?",
				"Меня зовут Иван Петрович.",
				"Здравствуйте, Иван Петрович."
			]
		},
		{
			"title": "Что это",
			"lines": [
				"Миша, что это?",
				"Это ручка.",
				"А это тоже ручка?",
				"Нет, это не ручка, а карандаш."
			]
		},
		{
			"title": "Готов",
			"lines": [
				"Вы готовы?",
				"Да, Мы готовы."
			]
		},
		{
			"title": "Там",
			"lines": [
				"Извини. ¿метро там?",
				"Да, метро там."
			]
		},
		{
			"title": "выход",
			"lines": [
				"Извините, выход здесь?",
				"Нет, здесь вход. А выход там."
			]
		},
		{
			"title": "можно",
			"lines": [
				"можно?",
				"нельзя."
			]
		}
	]
};
var jarvis_lines = {
	"_info": "lang and rate are to be used with synthesis web speech api.",
	"lang": "en-GB",
	"rate": 0.9,
	"dialogues": [
		{
			"title": "Greetings",
			"lines": [
				"Welcome Mr. Stark.",
				"Working on a secret project, are we, sir?",
				"I am always here for you, sir.",
				"As always sir, a great pleasure watching you work.",
				"The House Party Protocol, sir?"
			]
		},
		{
			"title": "Messages",
			"lines": [
				"Dr. Banner called.",
				"Mark 43 is ready, sir.",
				"I am afraid my protocols are failing, sir."
			]
		}
	]
}

var data = jarvis_lines;
//var data = russian_dialogues;//todo:fix
//custom functions defined inside $(document).ready lose their scope on deeper levels
$(document).ready(function () {

	//wrap $.get in function, if later there's need to change the ajax call implementation	
	function getData(url) {
		let request = $.get(url);
		return request;
	}


	/*
		Note: The code below depends on structure of json file source.
	*/

	//filling tag_select_dialog with json file.
	//let language=data.language; //if later want to use lang.
	//console.log(language);	

	let tag_select_dialog = $('#tag_select_dialog');

	let dialogues = data.dialogues;
	dialogues.forEach(function (dialog) {
		let option = '<option>' + dialog.title + '</option>';
		tag_select_dialog.append(option);
	});

	/*** START - ADDING EVENT, LOAD DIALOG ON SELECT CHANGE***/
	$('#tag_select_dialog').on('change', function () {
		let selected_dialog = $('#tag_select_dialog').val();//get selected dialog.
		let dialog = data.dialogues.find(function (dialog) {
			return dialog.title === selected_dialog;//actually, returns the object that fits condition
		});

		$('#dialogues').empty();// empty previous values
		let table = $('#dialogues');//select the table

		let row_title = '<tr> <th></th> <th>' + dialog.title + '</th> <th></th> </tr>';
		table.append(row_title);


		let lang = data.lang;
		let rate = data.rate;
		dialog.lines.forEach(function (line) {
			//I build DOM elements from string, for a personal preference of perfomance.
			let btn = "<button onclick=\"speakLine( '" + line + "','" + lang + "'," + rate + " )\"> > </button>";


			let cell_blank = '<td></td>';
			let cell_line = '<td>' + line + '</td>';
			let cell_button = '<td>' + btn + '</td>';

			let row_dialog = ''.concat('<tr>', cell_blank, cell_line, cell_button, '</tr>');//use concat instead of adding string for readability
			table.append(row_dialog);
		});
	});
	/*** END - ADDING EVENT, LOAD DIALOG ON SELECT CHANGE***/


	//trigger 'change' event to load the first dialog
	$('#tag_select_dialog').trigger('change');



});		