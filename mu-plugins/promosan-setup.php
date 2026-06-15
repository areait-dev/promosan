<?php
/**
 * Plugin Name: PromoSan Setup (Headless)
 * Description: Registra CPT, tassonomie, CORS sicuro e hardening coerenti con i field group ACF in /acf-json. Backend headless per il front-end Next.js.
 * Author: PromoSan
 * Version: 1.0.0
 */

// Impedisce l'accesso diretto al file.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/* =========================================================================
 * 1. CUSTOM POST TYPES
 * I valori "value" delle location rules ACF determinano lo slug del CPT:
 *   - group_news.json       -> post_type "news"
 *   - group_sedi.json       -> post_type "sedi"
 *   - group_pacchetti.json  -> post_type "pacchetti"
 *   - group_faq.json        -> post_type "faq"
 * I nomi GraphQL sono allineati alla semantica dei field group ACF
 * (newsFields, sedeFields, pacchettoFields, faqFields).
 * ========================================================================= */
add_action( 'init', 'promosan_register_cpt' );
function promosan_register_cpt() {

	// --- CPT: News (group_news.json) ---
	register_post_type( 'news', array(
		'labels'              => array(
			'name'          => 'News',
			'singular_name' => 'News',
		),
		'public'              => true,
		'has_archive'         => true,
		'menu_icon'           => 'dashicons-megaphone',
		'supports'            => array( 'title', 'editor', 'excerpt', 'thumbnail' ),
		'show_in_rest'        => true,          // necessario per editor a blocchi / REST
		'show_in_graphql'     => true,          // espone il CPT a WPGraphQL
		'graphql_single_name' => 'news',
		'graphql_plural_name' => 'allNews',     // "news" è invariabile: pluralizzazione esplicita
	) );

	// --- CPT: Sedi (group_sedi.json) ---
	register_post_type( 'sedi', array(
		'labels'              => array(
			'name'          => 'Sedi',
			'singular_name' => 'Sede',
		),
		'public'              => true,
		'has_archive'         => true,
		'menu_icon'           => 'dashicons-location',
		'supports'            => array( 'title', 'editor', 'thumbnail' ),
		'show_in_rest'        => true,
		'show_in_graphql'     => true,
		'graphql_single_name' => 'sede',
		'graphql_plural_name' => 'sedi',
	) );

	// --- CPT: Pacchetti (group_pacchetti.json) ---
	register_post_type( 'pacchetti', array(
		'labels'              => array(
			'name'          => 'Pacchetti',
			'singular_name' => 'Pacchetto',
		),
		'public'              => true,
		'has_archive'         => true,
		'menu_icon'           => 'dashicons-products',
		'supports'            => array( 'title', 'page-attributes' ), // page-attributes: ordine via menu_order
		'show_in_rest'        => true,
		'show_in_graphql'     => true,
		'graphql_single_name' => 'pacchetto',
		'graphql_plural_name' => 'pacchetti',
	) );

	// --- CPT: FAQ (group_faq.json) ---
	register_post_type( 'faq', array(
		'labels'              => array(
			'name'          => 'FAQ',
			'singular_name' => 'FAQ',
		),
		'public'              => true,
		'has_archive'         => true,
		'menu_icon'           => 'dashicons-editor-help',
		'supports'            => array( 'title', 'editor' ), // titolo = domanda, editor = risposta
		'show_in_rest'        => true,
		'show_in_graphql'     => true,
		'graphql_single_name' => 'faq',
		'graphql_plural_name' => 'faqs',
	) );
}

/* =========================================================================
 * 2. TASSONOMIE
 * Nei field group ACF NON esistono campi di tipo "taxonomy": l'unico campo
 * di classificazione è il SELECT "categoria" in group_faq.json, con choices
 * "servizi" e "normative". ACF lo gestisce come meta field (faqFields.categoria),
 * quindi NON è strettamente necessaria una tassonomia WP.
 * Registriamo comunque una tassonomia "categoria_faq" allineata alle stesse
 * choices, utile per filtri/archivi lato GraphQL. È opzionale e non interferisce
 * con il campo select ACF.
 * ========================================================================= */
add_action( 'init', 'promosan_register_taxonomies' );
function promosan_register_taxonomies() {

	register_taxonomy( 'categoria_faq', array( 'faq' ), array(
		'labels'              => array(
			'name'          => 'Categorie FAQ',
			'singular_name' => 'Categoria FAQ',
		),
		'public'              => true,
		'hierarchical'        => true,
		'show_in_rest'        => true,
		'show_in_graphql'     => true,
		'graphql_single_name' => 'categoriaFaq',
		'graphql_plural_name' => 'categorieFaq',
	) );

	// Termini predefiniti coerenti con le choices del campo select ACF (group_faq.json).
	foreach ( array(
		'servizi'   => 'Servizi & Costi',
		'normative' => 'Normative & Procedure',
	) as $slug => $nome ) {
		if ( ! term_exists( $slug, 'categoria_faq' ) ) {
			wp_insert_term( $nome, 'categoria_faq', array( 'slug' => $slug ) );
		}
	}
}

/* =========================================================================
 * 3. CORS SICURO
 * Consentiamo l'accesso alle API (REST/GraphQL) SOLO dalle origini note del
 * front-end Next.js. Nessun wildcard "*".
 * ========================================================================= */
add_action( 'init', 'promosan_cors_headers' );
function promosan_cors_headers() {

	$allowed_origins = array(
		'http://localhost:3000',
		'https://promosan.vercel.app',
		'https://promosan.eu',
	);

	$origin = isset( $_SERVER['HTTP_ORIGIN'] ) ? $_SERVER['HTTP_ORIGIN'] : '';

	if ( in_array( $origin, $allowed_origins, true ) ) {
		header( 'Access-Control-Allow-Origin: ' . $origin );
		header( 'Access-Control-Allow-Methods: GET, POST, OPTIONS' );
		header( 'Access-Control-Allow-Headers: Authorization, Content-Type' );
		header( 'Access-Control-Allow-Credentials: true' );
		header( 'Vary: Origin' ); // evita cache cross-origin errata

		// Risponde subito alle richieste preflight OPTIONS.
		if ( isset( $_SERVER['REQUEST_METHOD'] ) && 'OPTIONS' === $_SERVER['REQUEST_METHOD'] ) {
			status_header( 204 );
			exit;
		}
	}
}

/* =========================================================================
 * 4. SICUREZZA / HARDENING
 *   - Disabilita XML-RPC
 *   - Nasconde la versione di WordPress
 *   - Aggiunge header X-Content-Type-Options e X-Frame-Options
 * ========================================================================= */

// Disabilita completamente XML-RPC.
add_filter( 'xmlrpc_enabled', '__return_false' );

// Rimuove l'header HTTP X-Pingback (collegato a XML-RPC).
add_filter( 'wp_headers', 'promosan_remove_pingback_header' );
function promosan_remove_pingback_header( $headers ) {
	unset( $headers['X-Pingback'] );
	return $headers;
}

// Nasconde la versione di WordPress (tag meta generator e query string asset).
remove_action( 'wp_head', 'wp_generator' );
add_filter( 'the_generator', '__return_empty_string' );

// Header di sicurezza inviati su ogni risposta.
add_action( 'send_headers', 'promosan_security_headers' );
function promosan_security_headers() {
	header( 'X-Content-Type-Options: nosniff' );
	header( 'X-Frame-Options: SAMEORIGIN' );
}

/* =========================================================================
 * 5. ISR / REVALIDATE ON-DEMAND
 * Al salvataggio di un post (CPT o pagina) notifichiamo il front-end Next.js
 * chiamando l'endpoint /api/revalidate con il token segreto condiviso.
 * Configura le costanti NEXT_URL e WP_REVALIDATE_TOKEN in wp-config.php.
 * ========================================================================= */
add_action( 'save_post', 'promosan_trigger_revalidate', 10, 3 );
function promosan_trigger_revalidate( $post_id, $post, $update ) {

	// Salta autosave, revisioni e bozze automatiche.
	if ( wp_is_post_autosave( $post_id ) || wp_is_post_revision( $post_id ) ) {
		return;
	}
	if ( 'auto-draft' === $post->post_status ) {
		return;
	}

	// Configurazione (definisci queste costanti in wp-config.php).
	$next_url = defined( 'NEXT_URL' ) ? NEXT_URL : '';
	$token    = defined( 'WP_REVALIDATE_TOKEN' ) ? WP_REVALIDATE_TOKEN : '';
	if ( empty( $next_url ) || empty( $token ) ) {
		return;
	}

	// Notifica asincrona (non blocca il salvataggio in admin).
	wp_remote_post( trailingslashit( $next_url ) . 'api/revalidate', array(
		'method'   => 'POST',
		'timeout'  => 5,
		'blocking' => false,
		'headers'  => array(
			'Content-Type'        => 'application/json',
			'X-WP-Revalidate-Token' => $token,
		),
		'body'     => wp_json_encode( array(
			'post_type' => $post->post_type,
			'slug'      => $post->post_name,
		) ),
	) );
}

/* =========================================================================
 * 6. ADMIN BAR: "Vedi nel frontend (Preview)"
 * Aggiunge un pulsante nella barra admin che apre il Draft Mode di Next.js
 * in un nuovo tab, passando secret + slug del post corrente.
 * Configura NEXT_URL e WP_PREVIEW_SECRET in wp-config.php.
 * ========================================================================= */
add_action( 'admin_bar_menu', 'promosan_preview_admin_bar', 100 );
function promosan_preview_admin_bar( $wp_admin_bar ) {

	// Mostra il bottone solo quando si sta modificando un singolo post/pagina.
	if ( ! is_admin() ) {
		return;
	}
	$screen = function_exists( 'get_current_screen' ) ? get_current_screen() : null;
	if ( ! $screen || 'post' !== $screen->base ) {
		return;
	}

	global $post;
	if ( ! $post || ! current_user_can( 'edit_post', $post->ID ) ) {
		return;
	}

	$next_url = defined( 'NEXT_URL' ) ? NEXT_URL : '';
	$secret   = defined( 'WP_PREVIEW_SECRET' ) ? WP_PREVIEW_SECRET : '';
	if ( empty( $next_url ) || empty( $secret ) ) {
		return;
	}

	// Costruisce l'URL di preview con secret, slug e post_type.
	$preview_url = add_query_arg(
		array(
			'secret'    => rawurlencode( $secret ),
			'slug'      => rawurlencode( $post->post_name ),
			'post_type' => rawurlencode( $post->post_type ),
		),
		trailingslashit( $next_url ) . 'api/preview'
	);

	$wp_admin_bar->add_node( array(
		'id'    => 'promosan-preview',
		'title' => '👁️ Vedi nel frontend',
		'href'  => $preview_url,
		'meta'  => array(
			'target' => '_blank',
			'rel'    => 'noopener',
		),
	) );
}
