<?php
	
//include our database connection php
include '/dbconn/dbconnection.php';

$out = array('error' => false);

$add_NewCategory = json_decode(file_get_contents('php://input'), true);
$categoryName = $add_NewCategory["category_name"];

$sql = "SELECT * FROM afgpcategories WHERE category_name='$categoryName'";
$query = $conn->query($sql);

if($query->num_rows>0){
	$out['error'] = true;
	$out['message'] = 'The category is already exist ';
}
else{
	$maxQ = "SELECT MAX(CATEGORY_ID) AS maxCID FROM afgpcategories";
	$mQuery = $conn->query($maxQ);
	$row = mysqli_fetch_array($mQuery);
	$maxCID = $row['maxCID'] + 1;
	$insQ = "INSERT INTO afgpcategories (CATEGORY_ID,CATEGORY_NAME) VALUES($maxCID,'$categoryName');";	
	if ($conn->query($insQ) === TRUE ) {
		$out['message'] = 'Add record is Successful';
	}else{
		$out['message'] = "Error: " . $insQ . "<br>" . $conn->error;
	}
	
}

echo json_encode($out);

?>