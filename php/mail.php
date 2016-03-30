<?php
$email = $_POST['theEmail'];
$to ="webmaster@sunshadeblinds.je";
$subject = "enquiry from website";
$message ="Name: " . $_POST['theName'];
$message .= "\n\nMessage: " . $_POST['theMessage'];
$headers = "From: $email";
$headers .= "\nReply-To: $email";

$sentOk = mail($to,$subject,$message,$headers);

echo "sentOk=" . $sentOk;

?>