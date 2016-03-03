<?php
	
	//INSERT IMGUR KEY
	$client_id = "INSERTKEYHERE";

	$filetype = explode('/',mime_content_type($_FILES['file']['tmp_name']));
	$image = file_get_contents($_FILES['file']['tmp_name']);
	
	
	
	if ($filetype[0] !== 'image') {
	    die('Invalid image type');
	}
	
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, 'https://api.imgur.com/3/image.json');
	curl_setopt($ch, CURLOPT_POST, TRUE);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
	curl_setopt($ch, CURLOPT_HTTPHEADER, array( 'Authorization: Client-ID ' . $client_id ));
	curl_setopt($ch, CURLOPT_POSTFIELDS, array( 'image' => base64_encode($image) ));
	
	$reply = curl_exec($ch);
	
	curl_close($ch);
	
	$reply = json_decode($reply);
	 $imageLink = $reply->data->link;	
	 echo $imageLink;
	
	
	
	
	?>