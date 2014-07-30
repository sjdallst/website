<?php
session_start();
require_once("twitteroauth/twitteroauth/twitteroauth.php"); //Path to twitteroauth library
 
$twitteruser = "kappathetapi";
$nunmbertweets = 2;
$consumerkey = "3xxHwU4Aj3PLFf0SG2C77pfeD";
$consumersecret = "5tp9lYTn7KdWNb9GNi1yqrzBYWnwuDeT331NZdUfGohmfHkR6P";
$accesstoken = "1213699087-BvXlfRn4ijklwKU5S7pdVKsCf58uUr29Glf0r3Q";
$accesstokensecret = "JO7OZbGA363nJ19EGoNL5jrXqrh0lLIiAsBXDVrMrKMuJ";
 
function getConnectionWithAccessToken($cons_key, $cons_secret, $oauth_token, $oauth_token_secret) {
  $connection = new TwitterOAuth($cons_key, $cons_secret, $oauth_token, $oauth_token_secret);
  return $connection;
}
 
$connection = getConnectionWithAccessToken($consumerkey, $consumersecret, $accesstoken, $accesstokensecret);
 
$tweets = $connection->get("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=".$twitteruser."&count=".$numbertweets);
 
echo json_encode($tweets);
?>