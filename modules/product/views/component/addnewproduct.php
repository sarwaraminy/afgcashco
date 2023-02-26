<?php
	
//include our database connection php
include '../../../../dbconn/dbconnection.php';

$out = array('error' => false);

$add_NewProduct = json_decode(file_get_contents('php://input'), true);
$productName = $add_NewProduct["product_name"];
$brandID = $add_NewProduct["brand_id"];
$categoryID = $add_NewProduct["category_id"];
$modelYear = $add_NewProduct["model_year"];
$listPrice = $add_NewProduct["list_price"];

$sql = "SELECT * FROM afgproducts WHERE product_name='$productName'";
$query = $conn->query($sql);

if($query->num_rows>0){
	$out['error'] = true;
	$out['message'] = 'The product is already exist: ' . $productName;
}
else{
	$maxQ = "SELECT MAX(PRODUCT_ID) AS maxPID FROM afgproducts";
	$mQuery = $conn->query($maxQ);
	$row = mysqli_fetch_array($mQuery);
	$maxPID = $row['maxPID'] + 1;
	$insQ = "INSERT INTO afgproducts (product_id,product_name,brand_id,category_id,model_year,list_price) VALUES($maxPID,'$productName',$brandID,$categoryID,$modelYear,$listPrice);";	
	if ($conn->query($insQ) === TRUE ) {
		$out['message'] = 'Add record is Successful: $productName ('.$maxPID.')';
	}else{
		$out['message'] = "Error: " . $insQ . "<br>" . $conn->error;
	}
	
}

echo json_encode($out);

?>