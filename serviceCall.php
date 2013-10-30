<?php
	/*$url = ($_GET["url"]);
	$json = file_get_contents($url);

	header('Content-type: text/json');
	header('Content-type: application/json');

	echo $json;*/
	$url = ($_GET["url"]);
	$query = ($_GET["query"]);

	switch ($url) {
		case 'clima':
			$json = file_get_contents("http://www.tutiempo.net/V4/widget/tt_NXx8RkZGRkZGfHN8bnxufDQyODE1fDUwfDEyfDF8MXw1fDV8MjV8c3xzfG58QUIyMjIyfDBENDQ2RXx8fDAwMDAwMHw5MHw0fDYzfDgwfDE3NHwyNHw4NHwwfDUyNHwxNTR8NjB8NDJ8MTZ8MTZ8MzN8NTh8MzB8QkR8MXw%2C");
			//http://www.freemeteo.com/weather.fm?key=5790D5D663885409DDD0BE7331044DB1294167");
			header('Content-type: text');
			break;
		case 'mediciones':
			$json = file_get_contents("http://air-monitor.appspot.com/resources/air-sample");
			header('Content-type: application/json');
			break;
		case 'polen':
			$json = "http://www.alergia.org.ar/polenes/bahia_blanca.htm";
			header('Content-type: text');
			break;
		case 'historico':
			$json = file_get_contents("http://air-monitor.appspot.com/resources/air-samples?".$query);
			header('Content-type: application/json');
			break;
		default:
			$json = file_get_contents($url);
			header('Content-type: application/json');
			break;
	}

	echo $json;
?>