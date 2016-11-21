var domain = location.host
var protocol = location.protocol;
var root = protocol + "//" + domain

var home =  root;
var about =  root+"/about/";
var leaders =  root+"/about/leaders/";
var mission =  root+"/about/mission/";
var church_life =  root+"/church-life/";
var mornings =  root+"/church-life/sunday-mornings/";
var children =  root+"/church-life/children/";
var youth = root+"/church-life/youth/";
var events =  root+"/church-life/recent-events/";
var ministries =  root+"/ministries/";
var beacon =  root+"/ministries/beacon/";
var cap =  root+"/ministries/cap/";
var partnerships = root+"/ministries/partnerships/";
var tsm =  root+"/ministries/tsm/";
var contact =  root+"/contact/";
var media =  root+"/media/";
var sermons =  root+"/media/sermons/";
var blog =  root+"/media/pastors-blog/";
var fountain =  root+"/fountain-bookshop/";
var didcot =  "http://www.didcotchurch.org.uk/";

var navbarCode = '<ul>\
			<li><a id="home" href='+home+'>Home</a></li>\
			<li class="dropdown">\
				<a id="about" href='+about+'>About Us</a>\
				<div class="dropdown-content">\
					<a id="our_leaders" href='+leaders+'>Our Leaders</a>\
					<a id="mission" href='+mission+'>Mission, Values & Vision</a>\
				</div>\
			</li>\
			<li class="dropdown">\
				<a id="church_life" href='+church_life+'>Church Life</a>\
				<div class="dropdown-content">\
					<a id="sunday_mornings" href='+mornings+'>Sunday Mornings</a>\
					<a id="children" href='+children+'>Children</a>\
					<a id="youth" href='+youth+'>Torch Youth</a>\
					<a id="recent_events" href='+events+'>Recent Events</a>\
				</div>\
			</li>\
			<li class="dropdown">\
				<a id="ministries" href='+ministries+'>Ministries</a>\
				<div class="dropdown-content">\
					<a id="beacon" href='+beacon+'>Beacon</a>\
					<a id="cap" href='+cap+'>CAP - Christians Against Poverty</a>\
					<a id="partnerships" href='+partnerships+'>Partnerships and Networks</a>\
					<a id="tsm" href='+tsm+'>Teamwork Support Ministries</a>\
				</div>\
			</li>\
			<li><a id="contact" href='+contact+'>Contact Us</a></li>\
			<li class="dropdown">\
				<a id="media" href='+media+'>Media</a>\
				<div class="dropdown-content">\
					<a id="sermons" href='+sermons+'>Sermons</a>\
					<a id="blog" href='+blog+'>Pastor\'s Blog</a>\
				</div>\
			</li>\
			<li><a id="fountain" href='+fountain+'>Fountain Christian Bookshop</a></li>\
			<li><a id="didcot" href='+didcot+'>Ridgeway Didcot</a></li>\
		</ul>';

document.getElementById("nav").innerHTML = navbarCode;