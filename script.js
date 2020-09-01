$(document).ready(function(){

	function initialState() {
		if (localStorage.getItem('task') == null) {
			$('.task__none').show();
		} else {
			$('.task__list').html(localStorage.getItem('task'));
			$('.task__none').hide();
		}
	}

	initialState();

	function addToStorage() {
		let content = $('.task__list').html();
		localStorage.setItem('task', content);
	}

	function addComment(event) {


		event.preventDefault();
		

		let name = $('input').val(),
				text = $('textarea').val(),
				date = new Date().toLocaleString();

		if (name && text) {

			$('input').removeClass('error');
			$('textarea').removeClass('error');

			$('.task__list').append(`
			
				<li class="task__item">
					<div class="task__author">${name}
					<button class="task__delete"></button>
					<button class="task__toggle"></button>
					</div>
					<div class="task__text">${text}</div>
				</li>
			
			`);


			$('.task__none').hide();

			name = $('input').val('');
			text = $('textarea').val('');

			addToStorage();
		} else {
			$('input').addClass('error');
			$('textarea').addClass('error');
		}
	}

	function deleteComment(item) {
		item.remove();

		let items = $('.task__item');

		addToStorage();

		if (items.length == 0) {
			$('.task__none').show();
			localStorage.removeItem('task');
		}
	}

	function taskToggle(parametr) {
		parametr.slideToggle(300);
	};

	function rotate(arrow) {
		arrow.toggleClass('rotate');
	}

	$('body').on('click', '.task__add', addComment);

	$('body').on('click', '.task__delete', function(){
		
		let item = $(this).parents('.task__item');

		deleteComment(item);
	});

	$('body').on('click','.task__toggle', function() {

		let parametr = $(this).parents('.task__item').find('.task__text');

		taskToggle(parametr);
	});
	$('body').on('click','.task__toggle', function() {

		let arrow = $(this).parents('.task__item').find('.task__toggle');

		rotate(arrow);

	});

	$(document).bind('touchmove', false);

	
	
});