<?php
	
//include our database connection php
include '../../../../dbconn/dbconnection.php';

$out = array();
$sql = "SELECT * FROM afgsorders";
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