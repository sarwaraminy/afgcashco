<?php
	
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
	$maxQ = "SELECT MAX(BRAND_ID) AS maxBID FROM afgpbrands";
	$mQuery = $conn->query($maxQ);
	$row = mysqli_fetch_array($mQuery);
	$maxBID = $row['maxBID'] + 1;
	$insQ = "INSERT INTO afgpbrands (BRAND_ID,BRAND_NAME) VALUES($maxBID,'$brandName');";	
	if ($conn->query($insQ) === TRUE ) {
		$out['message'] = 'Add record is Successful';
	}else{
		$out['message'] = "Error: " . $insQ . "<br>" . $conn->error;
	}
	
}

echo json_encode($out);

?>