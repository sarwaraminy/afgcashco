<?php

session_start();
	
//include our database connection php
include '/dbconn/dbconnection.php';

$out = array('error' => false);

$user = json_decode(file_get_contents('php://input'), true);
$username = $user["username"];
$password = $user["password"];

$sql = "SELECT * FROM AFGUSER WHERE USER_ID='$username' AND USER_PASS='$password'";
$query = $conn->query($sql);

if($query->num_rows>0){
	$row = $query->fetch_array();
	$out['message'] = 'Login Successful';
	$out['user'] = uniqid('ang_');
	$_SESSION['user'] = $row['memid'];
}
else{
	$out['error'] = true;
	$out['message'] = 'Invalid Login ';
}

echo json_encode($out);

?>