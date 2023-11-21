<?php get_header(); ?>

<main>
  <?php while ( have_posts() ) : the_post(); ?>
    
    <h1><?php the_title(); ?></h1>
    <div>
      <p><?php echo wp_strip_all_tags( get_the_content() ); ?></p>
    </div>
    <div>
      <ul>
        <?php preg_match_all('/<img([^>]+)>/', $post->post_content, $images);         
        foreach ($images[1] as $image) {
          $image = updateBaseDomain($image);
          $image = removeDefaultSizeToImage($image);
          $image = addClasses($image, "");?>

            <li><img <?php echo $image; ?>></li>

        <?php } ?>
      </ul>
    </div>
    
  <?php endwhile; ?>
</main>

<?php get_footer(); ?>