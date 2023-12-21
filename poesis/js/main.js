
$(document).ready(function () {

	//wrap $.get in function, if later there's need to change the ajax call implementation
	function getData(url) {
		let request = $.get(url);
		return request;
	}
	var data = {
		"_info": "poems to be loaded. By now is just lorem ipsum content.",
		"poems": [
			{
				"title": "Lorem",
				"paragraphs": [
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam libero ex, vestibulum id dictum ut, dictum eget purus. Pellentesque posuere pellentesque odio vitae porttitor. Pellentesque vitae sagittis orci.",
					"Aenean sit amet suscipit est, sit amet pulvinar eros. Pellentesque eget orci porta, congue nisi vel, molestie risus. Maecenas dictum dignissim magna ac commodo. Phasellus maximus libero ligula. Nullam tempus convallis neque vitae congue. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
				]
			},
			{
				"title": "Pellentesque",
				"paragraphs": [
					"Pellentesque non sollicitudin purus, nec dapibus purus. In congue est eget fringilla aliquam. Nunc pulvinar ligula ac tempus condimentum. Integer at ante feugiat, consectetur risus quis, ullamcorper ligula. Maecenas ac sapien ullamcorper, iaculis mi ac, pulvinar ante.",
					" Etiam laoreet leo ipsum, et molestie erat faucibus ac. Sed tincidunt eleifend augue, cursus laoreet est dapibus ac. Donec ac sapien quis justo facilisis viverra. Suspendisse lobortis iaculis lorem, nec auctor augue egestas eget. Sed vulputate, arcu eget auctor euismod, mauris dolor aliquet tortor, eleifend vehicula lorem ex sit amet elit. Morbi vestibulum semper ligula, rutrum malesuada massa convallis nec."
				]
			},
			{
				"title": "Maecenas",
				"paragraphs": [
					"Maecenas ipsum enim, ornare vitae suscipit a, ornare sed diam. Aenean tempus mi porttitor sagittis fringilla. Ut sed efficitur metus. Sed ut felis lorem. Nulla nec felis elementum, placerat felis nec, dignissim massa. Vestibulum imperdiet sodales massa, ut aliquam ipsum feugiat nec. Etiam lobortis mollis odio, non hendrerit turpis rhoncus in. Sed a sem tincidunt, rhoncus massa non, faucibus nisl. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin sed vulputate dui. ",
					" Cras at imperdiet urna. Quisque sagittis, odio a efficitur cursus, enim tortor condimentum leo, ut interdum dui orci eu nunc. Aenean odio nisl, euismod sed quam ac, pulvinar tincidunt metus. Nullam vel neque id est euismod interdum. Aliquam imperdiet sapien ut eros tincidunt, blandit eleifend diam egestas."
				]
			},
			{
				"title": "Aenean",
				"paragraphs": [
					"Aenean pretium ante mauris, vitae facilisis dui ornare at. Nunc commodo imperdiet interdum. Donec scelerisque rhoncus feugiat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam ante turpis, aliquet id vestibulum quis, euismod at sem. In mauris sapien, tincidunt vel eleifend ac, lobortis vel augue. In fringilla ante vel velit varius posuere."
				]
			},
			{
				"title": "Curabitur",
				"paragraphs": [
					"Curabitur sit amet mi sollicitudin, dapibus magna sit amet, consequat eros. Cras ultrices fringilla ullamcorper. Maecenas pellentesque fringilla lectus non pretium. Pellentesque sollicitudin mollis dapibus. Donec id aliquam arcu. Aenean in egestas ante, at convallis est. Mauris at sapien nisl. In leo augue, rutrum dignissim mi vitae, sagittis dignissim enim. ",
					"Nunc pharetra, leo eget dignissim dictum, velit urna rutrum mi, eget pharetra nunc velit in nibh. Vestibulum vel fringilla orci. Donec in pharetra metus, a ullamcorper enim."
				]
			}
		]

	};
	var url = 'data/poems_lorem_ipsum.json';
	//var url='data/poems_names.json';
	/*
		Note: The code below depends on structure of json file source.
	*/

	let left_sidebar = $('#left_sidebar');

	let poems = data.poems;

	//build the list of links to the poems
	poems.forEach(function (poem) {
		let option = '<a href="#" >' + poem.title + '</a>';
		left_sidebar.append(option);
	});


	/*** START - ADDING EVENT TO LOAD POEM ***/
	$('#left_sidebar a').on('click', function () {
		let selected_poem = $(this).text();//get the title of the selected poem.

		//find the poem
		let poem = data.poems.find(function (poem) {
			return poem.title === selected_poem;//actually returns the object that fits condition
		});

		$('#main_content').empty();// empty previous values
		let div_poem = $('#main_content');//select the container

		//I build DOM elements from string, for a personal preference of perfomance.			
		let poem_header = '<h4>' + poem.title + '</h4>';
		div_poem.append(poem_header);//put header into div

		//put paragraphs into div
		poem.paragraphs.forEach(function (paragraph) {
			let p = '<p>' + paragraph + '</p>';
			div_poem.append(p);
		});
	});
	/*** END - ADDING EVENT TO LOAD POEM ***/

	//make a 'click' to load the first poem
	$('#left_sidebar a:first-child').trigger('click');

});