<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title><?php echo get_bloginfo( 'name' ); ?></title>
  <meta name="description" content="A beautiful description"> <!-- Remember to edit this -->
  <meta name="keywords" content="tag, tag, tag,"> <!-- Remember to edit this -->
  <meta name="author" content="Me"><!-- Remember to edit this -->
  
  <!-- Mobile -->
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  
  <!-- Wordpress -->
  <?php wp_head(); ?>
</head>
<body>

  <header class="site-header">
    <a href="<?php echo site_url();?>"><?php echo get_bloginfo( 'name' ); ?></a>
  </header>