<?php
define('SCRIPT_URL', 'https://org.ntnu.no/ibm/studier');
header("Access-Control-Allow-Origin: *");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class sql{
    public $con;
    public $resultArray = [];

    function __construct($address, $username, $password, $database){
//        include('config.php');
        $this->con = new mysqli($address, $username, $password, $database);
        if (!$this->con->set_charset("utf8")) {
            printf("Error loading character set utf8: %s\n", $this->con->connect_error);
        }
    }

    public function selectQuery($sql, $prepType = null, $prepVars = null){

        if(!$stmt = $this->con->prepare($sql)){
            die($this->con->error);
        }

        if($prepVars){
            if(!$stmt->bind_param($prepType, $prepVars)){
                die($this->con->error);
            }
        }

        if(!$stmt->execute()){
            echo $this->con->error;
        }

        $result = $stmt->get_result();
        if($result->num_rows == 0){
            return false;
        }

        while($row = $result->fetch_assoc()){
            $this->resultArray[] = $row;
        }

        return $this->resultArray;
    }

    public function deleteQuery($sql, $prepType = false, ...$prepVars = false){
        if(!$stmt = $this->con->prepare($sql)){
            die(var_dump($this->con->error_list));
        }

        if(is_array($prepVars)){
            if(!$stmt->bind_param($prepType, ...$prepVars)){
                die($stmt->error);
            }
        }else{
            if(!$stmt->bind_param($prepType, $prepVars)){
                die($stmt->error);
            }
        }
        $exec = $stmt->execute();
        if ( false === $exec ) {
            error_log('mysqli execute() failed: ');
            error_log( print_r( htmlspecialchars($stmt->error), true ) );
        }else{
            return true;
        }

    }

    public function selectQuery2($sql, $prepType, ...$prepVars){
        if(!$stmt = $this->con->prepare($sql)){
            die(var_dump($this->con->error_list));
        }
        if(!$stmt->bind_param($prepType, ...$prepVars)){
            die($stmt->error);
        }
        $stmt->execute();
        $result = $stmt->get_result();
        if($result->num_rows == 0){
            return false;
        }

        while($row = $result->fetch_assoc()){
            $this->resultArray[] = $row;
        }

        return $this->resultArray;
    }

    public function insertQuery($sql, $prepType, ...$prepVars){
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param($prepType, ...$prepVars) || die($stmt->error);
        $stmt->execute();
        return $stmt->insert_id;
    }

}
class access{
    private object $sql;
    private string $token;
    private array $userinfo;

    function __construct($address, $username, $password, $database){
        $this->sql = new sql($address, $username, $password, $database);
    }

    public function checkLoggedInState($token){
        if(isset($token)){
            $sql = "SELECT * FROM users where login_token = ?";
            $result = $this->sql->selectQuery($sql, 's', $token);
            return $result;
        }else{
            return false;
        }
    }

    public function checkMagicLink($magic){
        $sql = "DELETE FROM magic_links WHERE timestamp<DATE_SUB(NOW(), INTERVAL 60 MINUTE)";
        $this->sql->deleteQuery($sql);
        $sql = "SELECT * FROM magic_links WHERE magic = ?";
        $result = $this->sql->selectQuery($sql, 's', $magic);
        if(empty($result)){
            return false;
        }else{
            $plopenr = $result[0]['plopenr'];
            $sql = "SELECT login_token FROM users WHERE plopenr = ?";
            $result = $this->sql->selectQuery($sql, 'i', $plopenr);
            return json_encode($result);
        }

    }

    private function getUserInfo($email){
        $sql = "SELECT * FROM users where email = ?";
        $this->userinfo = $this->sql->selectQuery($sql, 's', $email);
    }
    function create_token(
        int $length = 64,
        string $keyspace = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') {
        if ($length < 1) {
            throw new \RangeException("Length must be a positive integer");
        }
        $pieces = [];
        $max = mb_strlen($keyspace, '8bit') - 1;
        for ($i = 0; $i < $length; ++$i) {
            $pieces []= $keyspace[random_int(0, $max)];
        }
        $this->token = implode('', $pieces);
    }

    function email ($rcpt, $topic, $msg, $from){
        if(!mail($rcpt, $topic, $msg, 'from:' . $from)){
            echo "Mailsending fungerte ikke!";
            die();
        }
    }
    public function sendMagicLink($email){
        $this->create_token();
        $this->getUserInfo($email);
        $sql = "DELETE FROM magic_links WHERE plopenr = ?";
        $this->sql->deleteQuery($sql, 'i', $this->userinfo[0]['plopenr']);
        $sql = "INSERT INTO magic_links (plopenr, magic) VALUES (?, ?)";
        $this->sql->insertQuery($sql, 'is', $this->userinfo[0]['plopenr'], $this->token);
        $topic = "OppgaveWeb login";
        $sender = "noreply@ibm.ntnu.no\r\n";
        $sender .= "MIME-Version: 1.0\r\n";
        $sender .= "Content-Type: text/html; charset=UTF-8\r\n";
        $body = '<html><body>English below <br />' .
            '<p>For å logge inn i OppgaveWeb, lim inn token: ' . $this->token . '<br>'.
            'Token er gyldig i 60 minutter</p>' .
            '<p>To log on to the OppgaveWeb, paste token: ' . $this->token .'<br>'.
            'The token is valid for 60 minutes</p></body><html>';
        $this->email($email, $topic, $body, $sender);
        return(true);
    }
}
require_once ('config.php');
$access = new access($address, $username, $password, $database);
if(isset($_GET['login'])){
    $access->sendMagicLink($_GET['login']);
}
if(isset($_GET['magic'])){
    echo($access->checkMagicLink($_GET['magic']));
}
if(isset($_GET['email'])){
    echo(json_encode($access->sendMagicLink($_GET['email'])));
}