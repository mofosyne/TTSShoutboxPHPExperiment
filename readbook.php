<!--
<div class="guestbookTop">
<a href="postform.php">Write</a> to a guestbook<br><br>
</div>
-->
<?php
 $fileName = file ("shoutbox.txt");
 $displayLimit = 10;
 
 $rows = count ($fileName);
 $row = isset($_GET['row']) ? $_GET['row'] : 0;
 
 if ($rows > $displayLimit)
 {
	// Display Shouts
    for ($i = $row; $i < ($row + $displayLimit); $i++)
	{
		if ($i<$rows)
		echo $fileName [$i];
	}
	//Nav:
 	print ("<table class=\"shoutBoxNavigation\"><tr><td width=\"50%\">");
 	if ($row > 0){
		echo "<div class=\"nextPage\"><< <a href=\"readbook.php?row=" . ($row - $displayLimit) . "\">Next $displayLimit</a></div>";
	}
	print ("</td><td width=\"50%\">");
 	if ( ($rows - $row) > $displayLimit){
		echo "<div class=\"previousPage\"><a href=\"readbook.php?row=" . ($row + $displayLimit) . "\">Previous $displayLimit</a> >></div>";
	}
	print ("</td></tr></table>");


 }
 else
 {
  	for ($i=0; $i < $rows; $i++)
  	{
  		echo $fileName [$i];
  	}
 }
// Show last updated message
// Get date (Thanks to http://stackoverflow.com/questions/8273804/convert-seconds-into-days-hours-minutes-and-seconds )
date_default_timezone_set("UTC");
$lastPostTime = file_get_contents('lastupdated.txt');
$currentPostTime = time();
$dtF = new DateTime("@$lastPostTime");
$dtT = new DateTime("@$currentPostTime");
$timeSinceString = $dtF->diff($dtT)->format('%a Days, %h hours, %i minutes, %ss seconds');
print ("<hr><div class=\"lastUpdated\">Last Updated: ".$timeSinceString." </div>");

?>
<!---
<div class="guestbookUp">
<br><br><br><br>	
<a href="postform.php">Write</a> to a guestbook
</div>
-->