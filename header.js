var domain = window.location.host;

var home =  document.getElementById('home');
var about =  document.getElementById('about');
var leaders =  document.getElementById('our_leaders');
var mission =  document.getElementById('mission');
var church_life =  document.getElementById('church_life');
var mornings =  document.getElementById('sunday_mornings');
var children =  document.getElementById('children');
var events =  document.getElementById('recent_events');
var ministries =  document.getElementById('ministries');
var beacon =  document.getElementById('beacon');
var cap =  document.getElementById('cap');
var tsm =  document.getElementById('tsm');
var contact =  document.getElementById('contact');
var media =  document.getElementById('media');
var sermons =  document.getElementById('sermons');
var blog =  document.getElementById('blog');
var fountain =  document.getElementById('fountain');
var didcot =  document.getElementById('didcot');

var navbarCode = '<div class="nav">\
		<ul>\
			<li><a id="home" href="/home/">Home</a></li>\
			<li class="dropdown">\
				<a id="about" href="/about/">About Us</a>\
				<div class="dropdown-content">\
					<a id="our_leaders" href="/about/leaders/">Our Leaders</a>\
					<a id="mission" href="/about/mission/">Mission, Values & Vision</a>\
				</div>\
			</li>\
			<li class="dropdown">\
				<a id="church_life" href="/church-life/">Church Life</a>\
				<div class="dropdown-content">\
					<a id="sunday_mornings" href="/church-life/sunday-mornings/">Sunday Mornings</a>\
					<a id="children" href="/church-life/children/">Children</a>\
					<a id="youth" href="/church-life/youth/">Torch Youth</a>\
					<a id="recent_events" href="/church-life/recent-events/">Recent Events</a>\
				</div>\
			</li>\
			<li class="dropdown">\
				<a id="ministries" href="/ministries/">Ministries</a>\
				<div class="dropdown-content">\
					<a id="beacon" href="/ministries/beacon/">Beacon</a>\
					<a id="cap" href="/ministries/cap/">CAP - Christians Against Poverty</a>\
					<a id="partnerships" href="/ministries/partnerships/">Partnerships and Networks</a>\
					<a id="tsm" href="/ministries/tsm/">Teamwork Support Ministries</a>\
				</div>\
			</li>\
			<li><a id="contact" href="/contact/">Contact Us</a></li>\
			<li class="dropdown">\
				<a id="media" href="/media/">Media</a>\
				<div class="dropdown-content">\
					<a id="sermons" href="/media/sermons/">Sermons</a>\
					<a id="blog" href="/media/pastors-blog/">Pastor\'s Blog</a>\
				</div>\
			</li>\
			<li><a id="fountain" href="fountain-bookshop/">Fountain Christian Bookshop</a></li>\
			<li><a id="didcot" href="https://www.didcotchurch.org.uk/">Ridgeway Didcot</a></li>\
		</ul>\
		</div>\
		<br>\
		<div class="sidebar">\
		<p class="subheading">Upcoming Events</p>\
			<div class="twitter-container" align="right">\
				<a class="twitter-timeline" data-width="300" data-height="450" data-dnt="true" data-chrome="noscrollbar nofooter noheader" data-aria-polite="assertive" href="https://twitter.com/ThatMumboJumbo">Tweets</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>\
			</div>\
		<p class="subheading">Recent Sermons</p>\
		<div class="sermons"> <!-- Display 4 Sermons at one time -->\
			<a href="C:/Users/Christopher1/Desktop/Ridgeway/media/sermons/sermon-1/">\
			<p class="title">Sermon 1</p></a>\
			<p class="desc">Speaker | Date</p>\
			\
			<a href="C:/Users/Christopher1/Desktop/Ridgeway/media/sermons/sermon-2/">\
			<p class="title">Sermon 2</p></a>\
			<p class="desc">Speaker | Date</p>\
			\
			<a href="C:/Users/Christopher1/Desktop/Ridgeway/media/sermons/sermon-3/">\
			<p class="title">Sermon 3</p></a>\
			<p class="desc">Speaker | Date</p>\
			\
			<a href="C:/Users/Christopher1/Desktop/Ridgeway/media/sermons/sermon-4/">\
			<p class="title">Sermon 4</p></a>\
			<p class="desc">Speaker | Date</p>\
			</div>\
		</div>\
		<div class="content">\
			<p class="title">Welcome to Ridgway Community Church Wallingford.</p>\
			<p>Ridgeway Community Church in Wallingford and in Didcot has an international congregation of people from across the world. Wherever you are from we wish you a warm welcome in the name of our Lord Jesus Christ.</p>\
			<p>Visit RCC Didcot\'s website</p>\
		</div>'

document.getElementById('nav').innerHTML = navbarCode;
console.log(domain);