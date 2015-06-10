$(function(){

	var task_count = 0;

	function render(task){
		var div = $("<div data-_id=\""+task._id+"\">");
		// task_count++;
		if(task.done!=true){
			div.html('<div class="checkbox-cover"><input class="checkbox-btn" type="checkbox" checked></div> <div class="list">'+task.name+'<i class="fa fa-times delete-button right"></i></div>');
		}else{
			div.html('<div class="checkbox-cover"><input class="checkbox-btn" type="checkbox" ></div> <div class="list">'+task.name+'<i class="fa fa-times delete-button right"></i></div>');
		}
		// toggle task
		$('input.checkbox-btn', div).click(function(){
			// var task_id = $(this).data('task');

			$.post('/toggle', div.data(), function(){
				// render(data);
				// reload();
				// console.log('true');
			});
		})
		$('.delete-button', div).click(function(){
			// console.log(div.data());
			$.post('/delete', div.data(), function(){
				// render(data);
				// reload();
			});
		});

		
		div.appendTo('#todos');
		// reload();
	}

	function reload(){
		// task_count = 0;
		$.getJSON('/todo.json', function(data){
			$('#todos').html('');
	
			for(var i=0; i<data.length; i++){
				var task = data[i];
		
				render(task);
			}
		});
	}
	reload();

	$("input#input-title").keypress(function(event) {
	    if (event.which == 13) {
	        var datatodo = {
			title: $('#input-title').val()
		};
		$('#input-title').val('')
		$.post('/todo', datatodo, function(){
			// render(data);
			reload();
		});
	    }
	});

	$('#add-button').click(function(){

		var datatodo = {
			title: $('#input-title').val()
		};
		$('#input-title').val('')
		$.post('/todo', datatodo, function(){
			// render(data);
			reload();
		});
	});

})