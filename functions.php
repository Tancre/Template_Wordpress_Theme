<?php

function exdisco_files() {
    wp_enqueue_style('exdisco_main_style', get_stylesheet_uri());
    wp_enqueue_script('exdisco_main_script', get_theme_file_uri('/Script.js'), NULL, '1.0', true );  
}

add_action('wp_enqueue_scripts', 'exdisco_files');
