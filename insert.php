<?php
	/*
	$jsonFile = file_get_contents('dataset/dataset.json');
	$data = json_decode($jsonFile, true);
	$blockData = $data['data'][0]['blocks'];
	*/
	/* DISPLAY DATA */
	/*
	echo $data["data"][0]["letter"] . "<br>";
	for($a=1; $a<=80; $a++) {
		if($a == 8 || $a == 16 || $a == 24 || $a == 32 || $a == 40 || $a == 48 || $a == 56 || $a == 64 || $a == 72) {
		echo $blockData["$a"] . "<br>";
		}
		else {
			echo $blockData["$a"] . " ";
		}
		$b++;
	}
	*/
	//echo $newData[0]->color;
	//var_dump($newData);

	/*
	$newData = $_POST;
	$newData = json_decode($_POST['block']);
	echo "Hello there, data processing... \n";
	for ( $a = 0 ; $a <= 79; $a++ ) {
		if($a == 7 || $a == 15 || $a == 23 || $a == 31 || $a == 39 || $a == 47 || $a == 55 || $a == 63 || $a == 71) {
			echo $newData[$a]->color . "\n";
		}
		else {
			echo $newData[$a]->color . " ";
		}
	}

	$oldData = file_get_contents('dataset/dataset.json');
	$oldData = json_decode($oldData, true);
	//$oldData['data'][0]['blocks'];
	$letterNum = 25;
	// DONE SO FAR: A;B;C;D;E;F;H;I;J;K;L;M;N;O;P;Q;R;S;U;V;W;X;Y;Z;

	echo "\n";
	echo "The old code for the letter: \n";
	for ( $b = 1 ; $b <= 80 ; $b++ ) {
		if($b == 8 || $b == 16 || $b == 24 || $b == 32 || $b == 40 || $b == 48 || $b == 56 || $b == 64 || $b == 72 || $b == 80) {
			echo $oldData['data'][$letterNum]['blocks']["$b"] . "\n";
		}
		else {
			echo $oldData['data'][$letterNum]['blocks']["$b"] . " ";
		}
	}

	for ( $c = 0 ; $c <= 79; $c++ ) {
		if( $newData[$c]->color == "1" ) {
			$oldData['data'][$letterNum]['blocks'][$c+1] += 1;
		}
	}

	echo "New block to be put into dataset: \n";
	for ( $d = 1 ; $d <= 80 ; $d++ ) {
		if($d == 8 || $d == 16 || $d == 24 || $d == 32 || $d == 40 || $d == 48 || $d == 56 || $d == 64 || $d == 72) {
			echo $oldData['data'][$letterNum]['blocks']["$d"] . "\n";
		}
		else {
			echo $oldData['data'][$letterNum]['blocks']["$d"] . " ";
		}
	}

	$newPostData = json_encode($oldData);
	file_put_contents('dataset/dataset.json', $newPostData);
	echo "\n";
	echo "Entered data, updated dataset. Learning...";
	*/

?>
