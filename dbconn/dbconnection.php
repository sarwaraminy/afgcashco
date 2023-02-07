<?php
 $servername   = "localhost";
 $servUserName = "root";
 $servPassword = "";
 $dbName       = "afg_cashco";
 // Create connection
 $conn = new mysqli($servername, $servUserName, $servPassword, $dbName);

 // Check connection
 if ($conn->connect_error) {
   die("Connection failed: " . $conn->connect_error);
 }

?>