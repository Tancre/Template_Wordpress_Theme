<?php

function main_files() {
    wp_enqueue_style('main_style', get_stylesheet_uri());
    wp_enqueue_script('main_script', get_theme_file_uri('/Script.js'), NULL, '1.0', true );  
}

add_action('wp_enqueue_scripts', 'main_files');

/* Utils */
function updateBaseDomain($imageString) {
  $home_url = home_url();
  $imageString = preg_replace('/(http(s)?:)?\/\/[^\/]+/', $home_url, $imageString); // remove scheme
  
  return $imageString;
}

function removeDefaultSizeToImage($imageString) {
  $match = ['-300x300', 'width="300" height="300"', 'size-medium'];
  $imageString = str_replace($match, "", $imageString );
  
  return $imageString;
}

function addClasses($string, $classes) {
  $replace = 'class="' . $classes . " ";
  $string = str_replace('class="', $replace, $string );
  
  return $string;
}