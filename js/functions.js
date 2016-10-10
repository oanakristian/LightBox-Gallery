/*
 GALLERY FUNCTIONALITY - FILTER IMAGES
 */
$('.portfolio-categories a').on('click', filterImages);

function filterImages(e){
	e.preventDefault();
	var filter = $(this).data('filter');

	// transfer clasa active la noul link
	$('.active').removeClass('active');
	$(this).addClass('active');

	if(filter.length > 0){
		// ascund imaginile in functie de filtru
		$('.portfolio-list li:not([data-type="' + filter + '"])').hide();
		$('.portfolio-list li[data-type="' + filter + '"]').show();
	} else {
		//afisez toate imaginile
		$('.portfolio-list li').show();
	}
}

/*
 GALLERY FUNCTIONALITY - OVERLAY
 */


$('.portfolio-block-hover').on('click', displayImage);

function displayImage(e) {
	e.preventDefault(); //dezactivam functionaliate default a href

	var container = $('<div>'); // cream un element de tip div
	var projectFolder = $(this).children('a').data('project');// preluam folder poze pentru live project button
	var projectSrc = $(this).children('a').data('link');// preluam link-ul pentru live project button

	container.addClass('overlay'); // ii adaugam o clasa "overlay"
	$('body').prepend(container); // adaugam elementul imediat dupa body
	container.show(); // afisam containerul

	var dir = "images/our-work/" + projectFolder + "/";
	var fileextension = ".jpg";

	$.ajax({
		//This will retrieve the contents of the folder if the folder is configured as 'browsable'
		url: dir,
		success: function (data) {
			//List all .png file names in the page
			$(data).find("a:contains(" + fileextension + ")").each(function () {
				var filename = this.href.replace(window.location.host, "").replace("http://", "");
				var img = $('<img>'); //creez elementul imagine
				//var src = $(this).children('a').attr('href'); // preluam link-ul pozei de pe atributul a href
				var projectLink = $('<a>'); //creez elementul a href

				img.addClass('ceva'); // adaug clasa css pentru imagine
				img.attr('src', filename); //calea catre imagine

				//img.attr('src', src); // adaug img src
				projectLink.addClass('project-link'); //adaug clasa css pentru buton
				projectLink.attr('href', projectSrc); // setez a href
				projectLink.attr('target', "_blank"); // setez a href
				projectLink.text('View Live Project'); // afisezul textul butonului

				// astept ca imaginea sa se incarce complet
				img.on('load', function(){
					//adaug in container a href pentru proiect
					container.prepend(projectLink);
					//extrag dimensiunile imaginii
					container.prepend(img);
					var w = img.width();
					var h = img.height();

					// redimensionam imaginea in functie de rezolutia ecranului
					var maxW = 0.6 * $(window).width();
					var maxH = 0.6 * $(window).height();

					if(w > maxW) {
						h = h * maxW / w;
						w = maxW;
					}
					if(h > maxH){
						w = w * maxH / h;
						h = maxH;
					}
					//deplasm imaginea in centrul ecranului
					var mLeft = -1 * (w / 2);
					var mTop = -1 * (h / 2);
					img.css({
						'margin-left': mLeft + 'px',
						'margin-top': mTop + 'px',
						'width': w + 'px',
						'height': (h + 50) + 'px'
					});
					var linkTop = h/2;
					var linkleft = mLeft + 13;
					projectLink.css({
						'margin-left': linkleft + 'px',
						'margin-top': linkTop + 'px'
					});
				});

			});
		}
	});

}

$(document).on('click','.overlay', removeOverlay);

function removeOverlay(e){
	$(this).remove();
}

$(document).on('click', '.overlay img', function(e){
	e.stopPropagation();
});
