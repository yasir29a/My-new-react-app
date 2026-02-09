<?php
/**
 * Plugin Name: Modern Like/Unlike System (Fixed)
 * Description: A robust Like/Unlike system.
 * Version: 1.1
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class Modern_Like_System_Fixed {

    private $table_name;

    public function __construct() {
        global $wpdb;
        $this->table_name = $wpdb->prefix . 'post_likes_fixed';

        // Hooks
        register_activation_hook( __FILE__, array( $this, 'activate' ) );
        add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_assets' ) );
        
        // IMPORTANT: Ensure the action string matches exactly
        add_action( 'wp_ajax_nopriv_mls_process_like_action', array( $this, 'process_like' ) );
        add_action( 'wp_ajax_mls_process_like_action', array( $this, 'process_like' ) );

        add_shortcode( 'like_post', array( $this, 'render_like_button' ) );
    }

    public function activate() {
        global $wpdb;
        $charset_collate = $wpdb->get_charset_collate();
        $table_name = $this->table_name;

        $sql = "CREATE TABLE $table_name (
            id bigint(20) NOT NULL AUTO_INCREMENT,
            post_id bigint(20) NOT NULL,
            user_id varchar(100) NOT NULL,
            liked_at datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
            PRIMARY KEY  (id),
            UNIQUE KEY post_user_unique (post_id, user_id)
        ) $charset_collate;";

        require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
        dbDelta( $sql );
    }

    public function enqueue_assets() {
        // Load on every page to ensure functionality
        wp_enqueue_style( 'mls-style-fixed', false );
        wp_add_inline_style( 'mls-style-fixed', $this->get_css() );

        wp_enqueue_script( 'jquery' ); // Ensure jQuery is loaded
        wp_enqueue_script( 'mls-script-fixed', false, array('jquery'), '1.1', true );
        wp_localize_script( 'mls-script-fixed', 'mls_obj', array(
            'ajax_url' => admin_url( 'admin-ajax.php' ),
            'nonce'    => wp_create_nonce( 'mls_nonce' )
        ));
        wp_add_inline_script( 'mls-script-fixed', $this->get_js() );
    }

    public function render_like_button( $atts ) {
        $atts = shortcode_atts( array( 'post_id' => get_the_ID() ), $atts );
        $post_id = $atts['post_id'];
        
        if ( ! $post_id ) return '';

        $like_count = $this->get_like_count( $post_id );
        $is_liked = $this->is_user_liked( $post_id );
        $status_class = $is_liked ? 'liked' : '';
        $btn_id = 'mls-btn-' . $post_id;

        ob_start();
        ?>
        <div class="mls-wrapper">
            <button id="<?php echo esc_attr($btn_id); ?>" 
                    class="mls-btn <?php echo esc_attr($status_class); ?>" 
                    data-post-id="<?php echo esc_attr($post_id); ?>">
                
                <svg class="mls-icon" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <span class="mls-count"><?php echo esc_html( $like_count ); ?></span>
            </button>
            <!-- Debug Output (Remove in production) -->
            <small class="mls-debug" style="display:none; color:red;">Post ID: <?php echo $post_id; ?></small>
        </div>
        <?php
        return ob_get_clean();
    }

    public function process_like() {
        // 1. Verify Nonce
        if ( ! isset( $_POST['security'] ) || ! wp_verify_nonce( $_POST['security'], 'mls_nonce' ) ) {
            wp_send_json_error( 'Security check failed' );
        }

        // 2. Get Post ID
        $post_id = isset( $_POST['post_id'] ) ? intval( $_POST['post_id'] ) : 0;
        if ( ! $post_id ) {
            wp_send_json_error( 'No Post ID provided' );
        }

        // 3. Logic
        $user_identifier = $this->get_user_identifier();
        global $wpdb;

        $existing = $wpdb->get_row( $wpdb->prepare(
            "SELECT id FROM $this->table_name WHERE post_id = %d AND user_id = %s",
            $post_id, $user_identifier
        ) );

        if ( $existing ) {
            // UNLIKE
            $wpdb->delete( $this->table_name, array( 'post_id' => $post_id, 'user_id' => $user_identifier ) );
            wp_send_json_success( array( 'status' => 'unliked', 'count' => $this->get_like_count($post_id) ) );
        } else {
            // LIKE
            $wpdb->insert( $this->table_name, array( 'post_id' => $post_id, 'user_id' => $user_identifier, 'liked_at' => current_time('mysql') ) );
            wp_send_json_success( array( 'status' => 'liked', 'count' => $this->get_like_count($post_id) ) );
        }
    }

    private function get_like_count( $post_id ) {
        global $wpdb;
        return (int) $wpdb->get_var( $wpdb->prepare( "SELECT COUNT(*) FROM $this->table_name WHERE post_id = %d", $post_id ) );
    }

    private function is_user_liked( $post_id ) {
        global $wpdb;
        $user_identifier = $this->get_user_identifier();
        return $wpdb->get_var( $wpdb->prepare( "SELECT id FROM $this->table_name WHERE post_id = %d AND user_id = %s", $post_id, $user_identifier ) );
    }

    private function get_user_identifier() {
        return is_user_logged_in() ? 'user_' . get_current_user_id() : 'ip_' . $this->get_client_ip();
    }

    private function get_client_ip() {
        $ip = '127.0.0.1'; // Default fallback
        if ( ! empty( $_SERVER['HTTP_CLIENT_IP'] ) ) $ip = sanitize_text_field( $_SERVER['HTTP_CLIENT_IP'] );
        elseif ( ! empty( $_SERVER['HTTP_X_FORWARDED_FOR'] ) ) $ip = sanitize_text_field( $_SERVER['HTTP_X_FORWARDED_FOR'] );
        elseif ( ! empty( $_SERVER['REMOTE_ADDR'] ) ) $ip = sanitize_text_field( $_SERVER['REMOTE_ADDR'] );
        return $ip;
    }

    private function get_css() {
        return "
            .mls-wrapper { display:inline-block; }
            .mls-btn {
                background: #fff; border: 2px solid #ddd; border-radius: 50px;
                padding: 8px 16px; cursor: pointer; display: flex; align-items: center; gap: 8px;
                font-size: 14px; font-weight: bold; color: #555; transition: all 0.2s;
            }
            .mls-btn:hover { background: #f9f9f9; border-color: #ccc; }
            .mls-icon { width: 20px; height: 20px; fill: transparent; stroke: #555; stroke-width: 2; transition: all 0.3s; }
            .mls-btn.liked { background: #ffebee; border-color: #ef9a9a; color: #d32f2f; }
            .mls-btn.liked .mls-icon { fill: #d32f2f; stroke: #d32f2f; animation: pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
            @keyframes pop { 0% { transform: scale(1); } 50% { transform: scale(1.4); } 100% { transform: scale(1); } }
        ";
    }

    private function get_js() {
        return "
        jQuery(document).ready(function($) {
            $('.mls-btn').on('click', function(e) {
                e.preventDefault();
                var btn = $(this);
                var postId = btn.data('post-id');

                console.log('Clicked button for Post ID:', postId); // Debug 1

                if(btn.hasClass('processing')) return;
                btn.addClass('processing');

                $.ajax({
                    url: mls_obj.ajax_url,
                    type: 'POST',
                    data: {
                        action: 'mls_process_like_action', // IMPORTANT: Must match the WP hook name exactly
                        security: mls_obj.nonce,
                        post_id: postId
                    },
                    success: function(response) {
                        console.log('Response:', response); // Debug 2
                        if(response.success) {
                            btn.find('.mls-count').text(response.data.count);
                            if(response.data.status === 'liked') {
                                btn.addClass('liked');
                            } else {
                                btn.removeClass('liked');
                            }
                        } else {
                            console.error('Server Error:', response.data);
                            alert('Error: ' + response.data);
                        }
                    },
                    error: function(xhr, status, error) {
                        console.error('AJAX Error:', error); // Debug 3
                        alert('AJAX Error: ' + error);
                    },
                    complete: function() {
                        btn.removeClass('processing');
                    }
                });
            });
        });
        ";
    }
}

new Modern_Like_System_Fixed();