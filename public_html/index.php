<?php
session_start(); 

function requestLogin() 
{
	echo '<script type="text/javascript">if(confirm("Admin session has timed out.  Login?") == true)
	{
		location.replace("http://test.local/admin/");
	}
	else
	{
		location.replace("http://test.local");
	}	
	 </script>';
}

function p_load($page)
{
	header('Location: /', true);
	header("Cache-Control: no-cache, must-revalidate");
	header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");
}

$timedout = false;
if (isset($_SESSION, $_SESSION['LAST_ACTIVITY'],$_SESSION['TIMEOUT_DURATION'])
      && ($_SERVER['REQUEST_TIME'] - $_SESSION['LAST_ACTIVITY']) > $_SESSION['TIMEOUT_DURATION'])
{
  session_unset();    
  session_destroy();
  $timedout = true;
}

?>
<!DOCTYPE html>
<html lang="en">
<!--
   index.html
   
   Copyright 2016 james <james@jerlesey.local>
   
   This program is free software; you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation; either version 2 of the License, or
   (at your option) any later version.
   
   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.
   
   You should have received a copy of the GNU General Public License
   along with this program; if not, write to the Free Software
   Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
   MA 02110-1301, USA.
   
   
--> 
<head>
<meta charset="utf-8" />
<title>Gites for rent in Fontevraud</title>
<meta name="generator" content="Geany 1.25" />
<link rel="stylesheet" type="text/css" href="/styles/style.css" ></link>
<script src="//use.edgefonts.net/architects-daughter;pompiere;dorsa;wire-one.js"></script>
<script src="/scripts/libs/import.min.js"></script>
<script src="/scripts/vine.js"></script>
<!--<script src="/scripts/vine/seed.js"></script>
<script src="/scripts/vine/climber.js"></script>
<script src="/scripts/vine/garden.js"></script>-->
<?php
if (isset($_SESSION['USERNAME']))
{
		echo "<script src='/scripts/tinymce/tinymce.min.js' type='text/javascript'></script>";
		echo "<script src='/scripts/admin.js' type='text/javascript'></script>";
}
?>
</head>
<body>
	<?php
    if($timedout != false) { 
		requestLogin();
	}
	?>
	<div id="container">
			<div id="title"></div>
			<div id="panorama" height="100%" width="100%">
				<img class="active" src="/images/panoramas/pan1.jpg" height="100%" width="100%" alt="Cottages" title="Cottages"/>
				<img src="/images/panoramas/pan2.jpg" height="100%" width="100%" alt="La Cachette's Garden" title="La Cachette's Garden"/>
				<img src="/images/panoramas/pan3.jpg" height="100%" width="100%" alt="La Cachette" title="La Cachette"/>
				<img src="/images/panoramas/pan4.jpg" height="100%" width="100%" alt="Comfortable interiors" title="Comfortable interiors"/>
				<img src="/images/panoramas/pan5.jpg" height="100%" width="100%" alt="Enjoy La Vie Francaise" title="Enjoy 'La Vie Francaise'"/>
				<img src="/images/panoramas/pan6.jpg" height="100%" width="100%" alt="Sleep Well and Relax!" title="Sleep Well and Relax!"/>
			</div>
			<ul id="nav" class="dropdown dropdown-horizontal">
				<li><a href="home.html" class="nostyle" >Home</a></li>
				<li><a class="nostyle" >Features</a>
					<ul class="menu features">
					<li><a href="features_lacachette.html" rel:="address:/deep-link" class="nostyle" >La Cachette</a></li>
					<li><a href="features_lagoupiliere.html" rel:="address:/deep-link" class="nostyle" >La Goupiliere</a></li>
					</ul>
				</li>
				<li><a class="nostyle" ><span id="button">Location</span></a>
					<ul class="menu location">
					<li><a href="maps_local.html" rel:="address:/deep-link" class="nostyle" >Locality</a></li>
					<li><a href="maps_france.html" rel:="address:/deep-link" class="nostyle" >France</a></li>
					</ul>
				</li>
				<li><a class="nostyle" ><span id="button">Prices &<br> Contact</span></a>
					<ul class="menu prices">
					<li><a href="prices.html" rel:="address:/deep-link" class="nostyle" >How much</a></li>
					<li><a href="getting_there.html" rel:="address:/deep-link" class="nostyle" >Getting there</a></li>
					<li><a href="contacts.html" rel:="address:/deep-link" class="nostyle" >Contact</a></li>
					</ul>
				</li>
				<li><a class="nostyle" >Links</a>
					<ul class="menu links">
					<li><a href="links_local.html" class="nostyle" >Fontevraud L'Abbaye</a></li>
					<li><a href="links_chateaux.html" class="nostyle" >Chateaux</a></li>
					<li><a href="links_towns.html" class="nostyle" >Local towns and Cities</a></li>
					<li><a href="links_golf.html" class="nostyle" >Local Golf Courses</a></li>
					<li><a href="links_wine.html" class="nostyle" >Local Wine Producers</a></li>
					</ul>
				</li>
				<li><a href="/images/index.html" target="_blank" class="nostyle" >Photos</a></li>
			</ul>
			<div class="text" id="page"></div>
	    </div>
</body>

</html>
