
$(document).ready(function(){
	
	//wrap $.get in function, if later there's need to change the ajax call implementation
	function getData (url){
		let request=$.get(url);
		return request;
	}
	
	var url='data/poems_lorem_ipsum.json';	
	//var url='data/poems_names.json';
	/*
		Note: The code below depends on structure of json file source.
	*/
	
	//load list of links to the poems through ajax
	getData(url).done(function(data){	
		let left_sidebar=$('#left_sidebar');
		
		let poems=data.poems;
		
		//build the list of links to the poems
		poems.forEach(function(poem){	
			let option='<a href="#" >' + poem.title + '</a>';
			left_sidebar.append(option);	
		});
		
		
		/*** START - ADDING EVENT TO LOAD POEM ***/
		$('#left_sidebar a').on('click',function(){
			let selected_poem=$(this).text();//get the title of the selected poem.
		
			//load the poem through ajax
			getData(url).done(function(data){				
				//find the poem
				let poem=data.poems.find(function(poem){
					return poem.title===selected_poem;//actually returns the object that fits condition
				});
			
				$('#main_content').empty();// empty previous values
				let div_poem=$('#main_content');//select the container
			
				//I build DOM elements from string, for a personal preference of perfomance.			
				let poem_header='<h4>'+poem.title+'</h4>';				
				div_poem.append(poem_header);//put header into div
			
				//put paragraphs into div
				poem.paragraphs.forEach(function(paragraph){					
					let p='<p>'+ paragraph + '</p>';
					div_poem.append(p);
				});	
			}).fail(function(error){
				console.log(error);
			});
		});				
		/*** END - ADDING EVENT TO LOAD POEM ***/
		
		//make a 'click' to load the first poem
		$('#left_sidebar a:first-child').trigger('click');
		
	}).fail(function(error){			
		console.log(error);
	});	
});