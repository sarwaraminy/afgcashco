<?php
	
//include our database connection php
include '../../../../dbconn/dbconnection.php';

$out = array('error' => false);

$add_NewOrder = json_decode(file_get_contents('php://input'), true);
$customerid = $add_NewOrder["customer_id"];
$ostatus = $add_NewOrder["order_status"];
$odate = $add_NewOrder["order_date"];
$rdate = $add_NewOrder["required_date"];
$sdate = $add_NewOrder["shipped_date"];
$storeid = $add_NewOrder["store_id"];
$staffid = $add_NewOrder["staff_id"];

$sql = "SELECT * FROM afgsorders WHERE customer_id='$customerid'";
$query = $conn->query($sql);

if($query->num_rows>0){
	$out['error'] = true;
	$out['message'] = 'The order is already exist for selected customer!';
}
else{
	$maxQ = "SELECT MAX(ORDER_ID) AS maxOID FROM afgsorders";
	$mQuery = $conn->query($maxQ);
	$row = mysqli_fetch_array($mQuery);
	$maxOID = $row['maxOID'] + 1;
	$insQ = "INSERT INTO afgsorders (order_id,customer_id,order_status,order_date,required_date,shipped_date,store_id,staff_id) VALUES($maxOID,$customerid,$ostatus,'$odate','$rdate','$sdate',$storeid,$staffid);";	
	if ($conn->query($insQ) === TRUE ) {
		$out['message'] = 'Add record is Successful: $customerid';
	}else{
		$out['message'] = "Error: " . $insQ . "<br>" . $conn->error;
	}
	
}

echo json_encode($out);

?>