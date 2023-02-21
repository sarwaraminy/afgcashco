<?php

session_start();
	
//include our database connection php
include '/dbconn/dbconnection.php';

$out = array('error' => false);

$add_NewBrand = json_decode(file_get_contents('php://input'), true);
$brandName = $add_NewBrand["brandname"];

$sql = "SELECT * FROM afgpbrands WHERE BRAND_NAME='$brandName'";
$query = $conn->query($sql);

if($query->num_rows>0){
	$out['error'] = true;
	$out['message'] = 'The brand is already exist ';
}
else{
	$maxVID = mysql_query("SELECT MAX(BRAND_ID) AS maxVID FROM afgpbrands;");
	$row = mysql_fetch_array ($maxVID);
	$maxVID = $row['maxVID'] + 1;
	
	$insQ = "INSERT INTO afgpbrands (BRAND_ID,BRAND_NAME) VALUES($maxVID,'$brandName');";	
	if ($conn->query($insQ) === TRUE ) {
		$out['message'] = 'Add record is Successful';
	}else{
		$out['message'] = "Error: " . $insQ . "<br>" . $conn->error;
	}
	
}

echo json_encode($out);

?>