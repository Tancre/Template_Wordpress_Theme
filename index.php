<?php get_header(); ?>

<main>

  <ul>
    <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

      <li>
        <a href="<?php the_permalink(); ?>" rel="bookmark" title="Permanent Link to <?php the_title_attribute(); ?>"><?php the_title(); ?></p></a>
      </li>

    <?php endwhile; endif; ?>
  </ul>

</main>

<?php get_footer(); ?>

