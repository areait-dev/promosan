<?php
/**
 * Plugin Name: PromoSan – GraphQL exposure
 * Description: Espone a WPGraphQL i Custom Post Type e la tassonomia del sito PromoSan,
 *              senza duplicarne la registrazione (usa i filtri register_*_args).
 * Author:      PromoSan
 *
 * COME INSTALLARLO
 * ----------------
 * Opzione A (consigliata): copia questo file in
 *   wp-content/mu-plugins/promosan-graphql-setup.php
 *   (la cartella mu-plugins potrebbe non esistere: creala). Si attiva da solo.
 *
 * Opzione B: incolla il contenuto (senza il tag <?php iniziale) in fondo al
 *   functions.php del tema attivo.
 *
 * DOPO L'INSTALLAZIONE
 * --------------------
 * 1. WP Admin → Custom Fields (ACF) → Field Groups: per ognuno dei gruppi
 *    importati da /acf-json fai clic su "Sync" (oppure aprilo e premi
 *    "Update") così le impostazioni show_in_graphql/graphql_field_name
 *    dei file JSON vengono caricate nel DB.
 * 2. Pubblica la pagina con slug "opzioni-globali" e i contenuti dei CPT.
 * 3. (Facoltativo) WPGraphQL → Settings → abilita "Public Introspection"
 *    se vuoi poter introspezionare lo schema dall'esterno.
 *
 * VERIFICA
 * --------
 *   npm run test:wp   (include ora un test GraphQL)
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Aggiunge il supporto GraphQL ai CPT già registrati altrove (tema/plugin),
 * senza ri-registrarli. graphql_single_name/plural devono essere univoci.
 */
add_filter(
	'register_post_type_args',
	function ( $args, $post_type ) {
		$map = array(
			// post_type => array( single, plural )
			'news'      => array( 'NewsItem', 'NewsItems' ),
			'sedi'      => array( 'Sede', 'Sedi' ),
			'pacchetti' => array( 'Pacchetto', 'Pacchetti' ),
			'faq'       => array( 'Faq', 'Faqs' ),
		);

		if ( isset( $map[ $post_type ] ) ) {
			$args['show_in_graphql']     = true;
			$args['graphql_single_name'] = $map[ $post_type ][0];
			$args['graphql_plural_name'] = $map[ $post_type ][1];
		}

		return $args;
	},
	10,
	2
);

/**
 * Espone a GraphQL la tassonomia delle categorie news.
 */
add_filter(
	'register_taxonomy_args',
	function ( $args, $taxonomy ) {
		if ( 'categoria_news' === $taxonomy ) {
			$args['show_in_graphql']     = true;
			$args['graphql_single_name'] = 'CategoriaNews';
			$args['graphql_plural_name'] = 'CategorieNews';
		}

		return $args;
	},
	10,
	2
);
