<?php
	
//include our database connection php
include '../../../../dbconn/dbconnection.php';

$out = array('error' => false);

$add_NewCustomer = json_decode(file_get_contents('php://input'), true);
$firstName = $add_NewCustomer["first_name"];
$lastName = $add_NewCustomer["last_name"];
$phoneNo = $add_NewCustomer["phone"];
$email = $add_NewCustomer["email"];
$street = $add_NewCustomer["street"];
$city = $add_NewCustomer["city"];
$state = $add_NewCustomer["state"];
$zip_code = $add_NewCustomer["zip_code"];

$sql = "SELECT * FROM afgscustomers WHERE email='$email'";
$query = $conn->query($sql);

if($query->num_rows>0){
	$out['error'] = true;
	$out['message'] = 'The customer is already exist: ' . $email;
}
else{
	$maxQ = "SELECT MAX(CUSTOMER_ID) AS maxCID FROM afgscustomers";
	$mQuery = $conn->query($maxQ);
	$row = mysqli_fetch_array($mQuery);
	$maxCID = $row['maxCID'] + 1;
	$insQ = "INSERT INTO afgscustomers (customer_id,first_name,last_name,phone,email,street,city,state,zip_code) VALUES($maxCID,'$firstName','$lastName','$phoneNo','$email','$street','$city','$state','$zip_code');";	
	if ($conn->query($insQ) === TRUE ) {
		$out['message'] = 'Add record is Successful: $email ('.$maxCID.')';
	}else{
		$out['message'] = "Error: " . $insQ . "<br>" . $conn->error;
	}
	
}

echo json_encode($out);

?>