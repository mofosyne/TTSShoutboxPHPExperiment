<?php
// Create a 100*30 image
$im = imagecreate(150,25);

// White background and blue text
$bg = imagecolorallocate($im, 255, 255, 255);
$textcolor = imagecolorallocate($im, 0, 0, 0);

// Get date
date_default_timezone_set("UTC");

// Write the string at the top left
imagestring($im, 2, 0, 0, "Last Updated: ", $textcolor);
imagestring($im, 2, 0, 10,"  ".date("H:i:s d/m/Y ", time()), $textcolor);

// Turn off alpha blending and set alpha flag
imagealphablending($im, false);
imagesavealpha($im, true);

// Output the image
//header('Content-type: image/png'); // Set Header
imagepng($im, "lastupdated.png"); // Outputs image

// Clear image
imagedestroy($im);

/*
	Update a text file with Unix time
*/
// save file
$fileName = fopen ("lastupdated.txt", 'w');
fputs ($fileName, date(time()) );
fclose ($fileName);

?>