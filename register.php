<?php

session_start();
	
//include our database connection php
include '/dbconn/dbconnection.php';

$out = array('error' => false);

$user_register = json_decode(file_get_contents('php://input'), true);
$user_id = $user_register["user_id"];
$user_pass = $user_register["user_pass"];
$first_name = $user_register["first_name"];
$last_name = $user_register["last_name"];
$btype = $user_register["btype"];
$num_location = $user_register["num_location"];
$estimated_a_turnover = $user_register["estimated_a_turnover"];
$country = $user_register["country"];
$trading_currency = $user_register["trading_currency"];

$sql = "SELECT * FROM AFGUSER WHERE USER_ID='$user_id'";
$query = $conn->query($sql);

if($query->num_rows>0){
	$out['error'] = true;
	$out['message'] = 'Email Address already exist ';
}
else{
	$insQ = "INSERT INTO AFGUSER (USER_ID, USER_PASS, FIRST_NAME, LAST_NAME, BTYPE, NUM_LOCATION, ESTIMATED_A_TURNOVER, COUNTRY, TRADING_CURRENCY)  ".
	        " VALUES('$user_id','$user_pass','$first_name','$last_name','$btype','$num_location','$estimated_a_turnover','$country','$trading_currency')";
	
	if ($conn->query($insQ) === TRUE ) {
		$out['message'] = 'Registeration Successful';
	}else{
		$out['message'] = "Error: " . $insQ . "<br>" . $conn->error;
	}
	
}

echo json_encode($out);

?>