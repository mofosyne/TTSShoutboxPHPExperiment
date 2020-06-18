<?php
// Create a 100*30 image
$im = imagecreate(100,15);

// Get date (Thanks to http://stackoverflow.com/questions/8273804/convert-seconds-into-days-hours-minutes-and-seconds )
date_default_timezone_set("UTC");
$lastPostTime = file_get_contents('lastupdated.txt');
$currentPostTime = time();
$dtF = new DateTime("@$lastPostTime");
$dtT = new DateTime("@$currentPostTime");
$timeSinceString = $dtF->diff($dtT)->format('%a Days,%h:%i:%ss');
//$timeSinceString = $dtF->diff($dtT)->format('%a days, %h hours, %i minutes and %s seconds');

// Colour based on how new (Red is newest)
$HotTime = 5*60; // How long to remain hot in seconds
$LukewarmTime = 30*60;
$redColour = max(0, 255-255*( ($currentPostTime-$lastPostTime)/($HotTime) ) ); // 0 to 255
$greenColour = max(0, 255-255*( ($currentPostTime-$lastPostTime)/($LukewarmTime) ) ) - $redColour; // 0 to 255 ($subtracted by red to prevent red getting overwhelmed)

// White background and blue text
$bg = imagecolorallocate($im, 255, 255, 255);
$textcolor = imagecolorallocate($im, $redColour, $greenColour, 0);
// Write the string at the top left
imagestring($im, 2, 0, 0, $timeSinceString, $textcolor);

// Turn off alpha blending and set alpha flag
imagealphablending($im, false);
imagesavealpha($im, true);

// Output the image
header('Content-type: image/png'); // Set Header
imagepng($im); // Outputs image

// Clear image
imagedestroy($im);
?>