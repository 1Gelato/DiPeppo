<?php
/**
 * DiPeppo - Gestionnaire de formulaire de contact (SÉCURISÉ)
 * Envoie les données du formulaire par email à contact@dipeppo.fr
 *
 * Protections :
 * - CSRF Token (usage unique, expire après 30 min)
 * - Rate Limiting par session + par IP
 * - Honeypot anti-bot
 * - Validation whitelist des champs
 * - Limitation de longueur de tous les champs
 * - Protection injection d'en-têtes email
 * - Nettoyage XSS
 * - Vérification du Referer
 * - Encodage MIME des en-têtes
 */

// =============================================
// CONFIGURATION
// =============================================
$destinataire     = 'contact@dipeppo.fr';
$sujet_prefix     = '[DiPeppo - Site Web]';
$domaine_autorise = 'dipeppo.fr';
$delai_minimum    = 30;
$max_par_heure    = 10;

// =============================================
// HEADERS DE SÉCURITÉ
// =============================================
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('Referrer-Policy: strict-origin-when-cross-origin');

// CORS strict
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$origines_autorisees = [
    'https://www.dipeppo.fr',
    'https://dipeppo.fr',
    'http://www.dipeppo.fr',
    'http://dipeppo.fr'
];

if (in_array($origin, $origines_autorisees)) {
    header('Access-Control-Allow-Origin: ' . $origin);
} else {
    header('Access-Control-Allow-Origin: https://www.dipeppo.fr');
}
header('Access-Control-Allow-Methods: POST, GET');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// =============================================
// DÉMARRAGE DE LA SESSION
// =============================================
session_start();

// =============================================
// ENDPOINT CSRF : GET ?csrf=1 → retourne un token
// =============================================
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['csrf'])) {
    $token = bin2hex(random_bytes(32));
    $_SESSION['csrf_token'] = $token;
    $_SESSION['csrf_time'] = time();
    echo json_encode(['csrf_token' => $token]);
    exit();
}

// =============================================
// ACCEPTER UNIQUEMENT POST POUR L'ENVOI
// =============================================
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée.']);
    exit();
}

// =============================================
// VÉRIFICATION DU REFERER
// =============================================
$referer = $_SERVER['HTTP_REFERER'] ?? '';
if (!empty($referer)) {
    $referer_host = parse_url($referer, PHP_URL_HOST) ?? '';
    if (strpos($referer_host, $domaine_autorise) === false) {
        http_response_code(403);
        echo json_encode(['success' => false, 'message' => 'Requête non autorisée.']);
        exit();
    }
}

// =============================================
// RATE LIMITING PAR SESSION
// =============================================
$now = time();

if (isset($_SESSION['last_submit']) && ($now - $_SESSION['last_submit']) < $delai_minimum) {
    $restant = $delai_minimum - ($now - $_SESSION['last_submit']);
    echo json_encode([
        'success' => false,
        'message' => "Veuillez patienter {$restant} secondes avant de renvoyer un message."
    ]);
    exit();
}

// =============================================
// RATE LIMITING PAR IP
// =============================================
$ip = $_SERVER['REMOTE_ADDR'];
$rate_file = sys_get_temp_dir() . '/dipeppo_rate_' . md5($ip) . '.json';

if (file_exists($rate_file)) {
    $rate_data = json_decode(file_get_contents($rate_file), true);
    if ($rate_data && isset($rate_data['timestamps'])) {
        $rate_data['timestamps'] = array_values(array_filter($rate_data['timestamps'], function($ts) use ($now) {
            return ($now - $ts) < 3600;
        }));

        if (count($rate_data['timestamps']) >= $max_par_heure) {
            echo json_encode([
                'success' => false,
                'message' => 'Trop de demandes. Veuillez réessayer plus tard ou nous appeler directement.'
            ]);
            exit();
        }
    }
} else {
    $rate_data = ['timestamps' => []];
}

// =============================================
// RÉCUPÉRATION DES DONNÉES
// =============================================
$input = file_get_contents('php://input');

if (strlen($input) > 10240) {
    echo json_encode(['success' => false, 'message' => 'Données trop volumineuses.']);
    exit();
}

$data = json_decode($input, true);

if (!$data || !is_array($data)) {
    echo json_encode(['success' => false, 'message' => 'Données invalides.']);
    exit();
}

// =============================================
// VÉRIFICATION DU TOKEN CSRF
// =============================================
$csrf_token = isset($data['csrf_token']) ? $data['csrf_token'] : '';
$csrf_valide = false;

if (!empty($csrf_token)
    && isset($_SESSION['csrf_token'])
    && hash_equals($_SESSION['csrf_token'], $csrf_token)) {

    $csrf_age = $now - ($_SESSION['csrf_time'] ?? 0);
    if ($csrf_age < 1800) {
        $csrf_valide = true;
    }
}

if (!$csrf_valide) {
    echo json_encode([
        'success' => false,
        'message' => 'Session expirée. Veuillez rafraîchir la page et réessayer.'
    ]);
    exit();
}

unset($_SESSION['csrf_token']);
unset($_SESSION['csrf_time']);

// =============================================
// HONEYPOT
// =============================================
if (isset($data['website']) && !empty(trim($data['website']))) {
    echo json_encode(['success' => true, 'message' => 'Merci pour votre message !']);
    exit();
}

// =============================================
// NETTOYAGE & VALIDATION
// =============================================
$name     = isset($data['name'])     ? trim(strip_tags($data['name']))     : '';
$email    = isset($data['email'])    ? trim(strip_tags($data['email']))    : '';
$phone    = isset($data['phone'])    ? trim(strip_tags($data['phone']))    : '';
$interest = isset($data['interest']) ? trim(strip_tags($data['interest'])) : '';
$message  = isset($data['message'])  ? trim(strip_tags($data['message']))  : '';

// Champs supplémentaires pour devis
$company  = isset($data['company'])  ? trim(strip_tags($data['company']))  : '';
$date     = isset($data['date'])     ? trim(strip_tags($data['date']))     : '';
$guests   = isset($data['guests'])   ? trim(strip_tags($data['guests']))   : '';
$location = isset($data['location']) ? trim(strip_tags($data['location'])) : '';
$budget   = isset($data['budget'])   ? trim(strip_tags($data['budget']))   : '';
$services = isset($data['services']) ? $data['services']                    : [];

if (mb_strlen($name) > 100 || mb_strlen($email) > 150 || mb_strlen($phone) > 20 || mb_strlen($message) > 3000) {
    echo json_encode(['success' => false, 'message' => 'Un ou plusieurs champs dépassent la longueur autorisée.']);
    exit();
}

if (empty($name) || empty($email)) {
    echo json_encode([
        'success' => false,
        'message' => 'Veuillez remplir tous les champs obligatoires (nom, email).'
    ]);
    exit();
}

if (mb_strlen($name) < 2) {
    echo json_encode(['success' => false, 'message' => 'Le nom doit contenir au moins 2 caractères.']);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Adresse email invalide.']);
    exit();
}

if (!empty($phone) && !preg_match('/^[0-9\s\+\-\.]{0,20}$/', $phone)) {
    echo json_encode(['success' => false, 'message' => 'Numéro de téléphone invalide.']);
    exit();
}

// WHITELIST des types d'événements
$types_autorises = [
    'festival'    => 'Festival / Fête communale',
    'mariage'     => 'Mariage',
    'anniversaire'=> 'Anniversaire',
    'entreprise'  => 'Événement d\'entreprise / Team building',
    'prive'       => 'Événement privé',
    'salon'       => 'Salon / Inauguration',
    'jeux'        => 'Location de jeux',
    'autre'       => 'Autre',
    ''            => 'Non précisé',
];

$interest_label = isset($types_autorises[$interest]) ? $types_autorises[$interest] : 'Non précisé';

// Nettoyage des services (array de checkboxes)
$services_text = '';
if (is_array($services) && !empty($services)) {
    $services_autorises = [
        'foodtruck'   => 'Foodtruck italien',
        'jeux'        => 'Location de jeux',
        'glace'       => 'Machine à glace italienne',
        'granite'     => 'Machine à granités',
        'decoration'  => 'Décoration événementielle',
        'autre'       => 'Autre',
    ];
    $services_clean = [];
    foreach ($services as $s) {
        $s = trim(strip_tags($s));
        if (isset($services_autorises[$s])) {
            $services_clean[] = $services_autorises[$s];
        }
    }
    $services_text = implode(', ', $services_clean);
}

if (preg_match('/[\r\n]/', $name) || preg_match('/[\r\n]/', $email) || preg_match('/[\r\n]/', $phone)) {
    echo json_encode(['success' => false, 'message' => 'Caractères non autorisés détectés.']);
    exit();
}

// =============================================
// CONSTRUCTION DE L'EMAIL
// =============================================
$sujet = "$sujet_prefix Nouvelle demande de " . mb_substr($name, 0, 50) . " - $interest_label";

$referer_clean = !empty($referer)
    ? htmlspecialchars(mb_substr($referer, 0, 200), ENT_QUOTES, 'UTF-8')
    : 'Accueil';

$corps = "
===================================================
  NOUVELLE DEMANDE - SITE WEB DIPEPPO
===================================================

NOM :         $name
EMAIL :       $email
TELEPHONE :   " . ($phone ?: 'Non renseigné') . "
ENTREPRISE :  " . ($company ?: 'Non renseigné') . "
TYPE EVENT :  $interest_label
DATE :        " . ($date ?: 'Non précisée') . "
NB PERSONNES: " . ($guests ?: 'Non précisé') . "
LIEU :        " . ($location ?: 'Non précisé') . "
BUDGET :      " . ($budget ?: 'Non précisé') . "
PRESTATIONS : " . ($services_text ?: 'Non précisées') . "

---------------------------------------------------
  MESSAGE
---------------------------------------------------

" . ($message ?: 'Aucun message.') . "

---------------------------------------------------
  INFOS TECHNIQUES
---------------------------------------------------
Date :    " . date('d/m/Y à H:i:s') . "
IP :      $ip
Page :    $referer_clean
===================================================
";

// =============================================
// EN-TÊTES DE L'EMAIL
// =============================================
$headers  = "From: DiPeppo Website <noreply@dipeppo.fr>\r\n";
$headers .= "Reply-To: " . mb_encode_mimeheader($name, 'UTF-8') . " <$email>\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "X-Mailer: DiPeppo-Contact-Form\r\n";

// =============================================
// ENVOI DE L'EMAIL
// =============================================
$sujet_encode = mb_encode_mimeheader($sujet, 'UTF-8');
$envoi = mail($destinataire, $sujet_encode, $corps, $headers);

if ($envoi) {
    $_SESSION['last_submit'] = $now;
    $rate_data['timestamps'][] = $now;
    file_put_contents($rate_file, json_encode($rate_data), LOCK_EX);

    echo json_encode([
        'success' => true,
        'message' => 'Merci ' . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . ' ! Votre demande a bien été envoyée. Nous vous répondrons dans les plus brefs délais.'
    ]);
} else {
    error_log("Erreur envoi mail DiPeppo - Date: " . date('Y-m-d H:i:s') . " - IP: $ip");

    echo json_encode([
        'success' => false,
        'message' => 'Une erreur technique est survenue. Veuillez nous contacter directement par téléphone au 09 54 93 49 90.'
    ]);
}
?>
