<?php
	
//include our database connection php
include '../../../../dbconn/dbconnection.php';

$out = array();
$getProduct = json_decode(file_get_contents('php://input'), true);
$productid = $getProduct["product_id"];
$tags = $getProduct["tags"];
//check if it is based on tages
if($tags == 'get1P'){
	$sql = "select prod.list_price as list_price, stk.quantity as quantity from afgproducts prod join afgpstocks stk on prod.product_id=stk.product_id where prod.product_id=$productid";
}else{
	$sql = "SELECT * FROM afgproducts";
}


$query = $conn->query($sql);

if($query->num_rows>0){
	while($row = mysqli_fetch_assoc($query)){
		$out[] = $row ;
	}
}
else{
	$out['message'] = "Error: " . $conn->error;
	
}

echo json_encode($out);

?>