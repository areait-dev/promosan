<?php
/**
 * Plugin Name: Headless Redirect
 * Description: WordPress usato solo come backend headless. Reindirizza (301) il front-end
 *              pubblico su https://www.promosan.eu e impedisce l'indicizzazione di questo host.
 */

if (!defined('ABSPATH')) {
    exit;
}

const PROMOSAN_FRONTEND = 'https://www.promosan.eu';

/** Slug/percorsi WP che non coincidono con il percorso su www (path_wp => path_www). */
function promosan_redirect_map() {
    return [
        '/home/'            => '/',
        '/opzioni-globali/' => '/',
    ];
}

/** noindex su TUTTE le risposte del backend (header: non altera il body della REST API). */
add_action('send_headers', function () {
    header('X-Robots-Tag: noindex, nofollow', true);
});
// Le risposte REST API passano da rest_post_dispatch/send_headers: copriamo anche quelle.
add_filter('rest_post_dispatch', function ($response) {
    if ($response instanceof WP_HTTP_Response) {
        $response->header('X-Robots-Tag', 'noindex, nofollow');
    }
    return $response;
});

add_action('template_redirect', function () {
    // Non toccare: admin, login, ajax, cron, REST, GraphQL, anteprime, utenti loggati.
    if (is_admin() || is_user_logged_in() || is_preview()) {
        return;
    }
    if ((defined('DOING_AJAX') && DOING_AJAX) || (defined('DOING_CRON') && DOING_CRON)
        || (defined('REST_REQUEST') && REST_REQUEST) || (defined('WP_CLI') && WP_CLI)) {
        return;
    }
    if (function_exists('is_graphql_request') && is_graphql_request()) {
        return;
    }

    $uri  = isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '/';
    $path = (string) wp_parse_url($uri, PHP_URL_PATH);

    if (preg_match('#^/(wp-json|wp-admin|graphql|wp-cron\.php|wp-login\.php)(/|$)#', $path)
        || strpos($path, 'admin-ajax.php') !== false
        || isset($_GET['rest_route']) || isset($_GET['preview'])) {
        return;
    }

    $map = promosan_redirect_map();
    $key = trailingslashit($path);
    if (isset($map[$key])) {
        $uri = $map[$key];
    }

    wp_redirect(PROMOSAN_FRONTEND . $uri, 301, 'Promosan headless');
    exit;
}, 1);
