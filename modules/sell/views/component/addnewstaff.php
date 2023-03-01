<?php
	
//include our database connection php
include '../../../../dbconn/dbconnection.php';

$out = array('error' => false);

$add_NewStaff = json_decode(file_get_contents('php://input'), true);
$firstName = $add_NewStaff["first_name"];
$lastName = $add_NewStaff["last_name"];
$email = $add_NewStaff["email"];
$phoneNo = $add_NewStaff["phone"];
$active = $add_NewStaff["active"];
$store_id = $add_NewStaff["store_id"];
if($add_NewStaff["manager_id"] == "")
  $managerid = "NULL";
else
  $managerid = $add_NewStaff["manager_id"];

$sql = "SELECT * FROM afgsstaffs WHERE email='$email'";
$query = $conn->query($sql);

if($query->num_rows>0){
	$out['error'] = true;
	$out['message'] = 'The staff is already exist: ' . $email;
}
else{
	$maxQ = "SELECT MAX(STAFF_ID) AS maxSID FROM afgsstaffs";
	$mQuery = $conn->query($maxQ);
	$row = mysqli_fetch_array($mQuery);
	$maxSID = $row['maxSID'] + 1;
	$insQ = "INSERT INTO afgsstaffs (staff_id,first_name,last_name,email,phone,active,store_id,manager_id) VALUES($maxSID,'$firstName','$lastName','$email','$phoneNo',$active,$store_id,$managerid);";	
	if ($conn->query($insQ) === TRUE ) {
		$out['message'] = 'Add record is Successful: $email ('.$maxSID.')';
	}else{
		$out['message'] = "Error: " . $insQ . "<br>" . $conn->error;
	}
	
}

echo json_encode($out);

?>