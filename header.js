var domain = location.host

var home =  domain;
var about =  "/about/";
var leaders =  "/about/leaders/";
var mission =  "/about/mission/";
var church_life =  "/church-life/";
var mornings =  "/church-life/sunday-mornings/";
var children =  "/church-life/children/";
var youth = "/church-life/youth/";
var events =  "/church-life/recent-events/";
var ministries =  "/ministries/";
var beacon =  "/ministries/beacon/";
var cap =  "/ministries/cap/";
var partnerships = "/ministries/partnerships/";
var tsm =  "/ministries/tsm/";
var contact =  "/contact/";
var media =  "/media/";
var sermons =  "/media/sermons/";
var blog =  "/media/pastors-blog/";
var fountain =  "/fountain-bookshop/";
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