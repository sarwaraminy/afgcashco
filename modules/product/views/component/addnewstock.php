<?php
	
//include our database connection php
include '../../../../dbconn/dbconnection.php';

$out = array('error' => false);

$add_NewStock = json_decode(file_get_contents('php://input'), true);
$storeid = $add_NewStock["store_id"];
$productid = $add_NewStock["product_id"];
$qty = $add_NewStock["quantity"];

$sql = "SELECT * FROM afgpstocks WHERE STORE_ID=$storeid AND PRODUCT_ID=$productid";
$query = $conn->query($sql);

if($query->num_rows>0){
	$out['error'] = true;
	$out['message'] = 'The stock is already exist: ' . $storeid;
}
else{
	$insQ = "INSERT INTO afgpstocks (store_id,product_id,quantity) VALUES($storeid, $productid, $qty);";	
	if ($conn->query($insQ) === TRUE ) {
		$out['message'] = 'Add record is Successful';
	}else{
		$out['message'] = "Error: " . $insQ . "<br>" . $conn->error;
	}
	
}

echo json_encode($out);

?>