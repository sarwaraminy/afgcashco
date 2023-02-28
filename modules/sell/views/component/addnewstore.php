<?php
	
//include our database connection php
include '../../../../dbconn/dbconnection.php';

$out = array('error' => false);

$add_NewStore = json_decode(file_get_contents('php://input'), true);
$storeName = $add_NewStore["store_name"];
$phoneNo = $add_NewStore["phone"];
$email = $add_NewStore["email"];
$street = $add_NewStore["street"];
$city = $add_NewStore["city"];
$state = $add_NewStore["state"];
$zip_code = $add_NewStore["zip_code"];

$sql = "SELECT * FROM afgsstores WHERE email='$email'";
$query = $conn->query($sql);

if($query->num_rows>0){
	$out['error'] = true;
	$out['message'] = 'The store is already exist: ' . $email;
}
else{
	$maxQ = "SELECT MAX(STORE_ID) AS maxSID FROM afgsstores";
	$mQuery = $conn->query($maxQ);
	$row = mysqli_fetch_array($mQuery);
	$maxSID = $row['maxSID'] + 1;
	$insQ = "INSERT INTO afgsstores (store_id,store_name,phone,email,street,city,state,zip_code) VALUES($maxSID,'$storeName','$phoneNo','$email','$street','$city','$state','$zip_code');";	
	if ($conn->query($insQ) === TRUE ) {
		$out['message'] = 'Add record is Successful: $email ('.$maxSID.')';
	}else{
		$out['message'] = "Error: " . $insQ . "<br>" . $conn->error;
	}
	
}

echo json_encode($out);

?>