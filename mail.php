<?php 

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$name = $_POST['user_name'];
$phone = $_POST['user_phone'];
$email = $_POST['user_email'];

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.yandex.ru';  																							// Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'sstroitelstvo-domov@yandex.ru'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = 'TmNYRdePDi'; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров

$mail->setFrom('sstroitelstvo-domov@yandex.ru'); // от кого будет уходить письмо?
$mail->addAddress('unit-homes@yandex.ru');     // Кому будет уходить письмо
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
    
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Заявка с сайта';
$mail->Body    = '' .$phone. $uploadfile;
$mail->AltBody = '';
if (isset($_FILES['uploaded_file']) && $_FILES['uploaded_file']['error'] == UPLOAD_ERR_OK) {
    $mail->AddAttachment($_FILES['uploaded_file']['tmp_name'], $_FILES['uploaded_file']['name']);
}

$tmpFileUrl = null;
if (isset($_POST['image_url']) && !empty($_POST['image_url'])) {
    $imageUrl = $_POST['image_url'];
    $imageData = pathinfo($imageUrl);

    if (isset($imageData['extension']) && !empty($imageData['extension'])) {
        if (copy($_POST['image_url'], 'temp/'.$imageData['basename'])) {
            $mail->AddAttachment('temp/'.$imageData['basename'], $imageData['basename']);
            $tmpFileUrl = 'temp/'.$imageData['basename'];
        }
    }
}

$sendStatus = $mail->send();

if ($tmpFileUrl) {
    @unlink($tmpFileUrl);
}

if(!$sendStatus) {
    echo 'Error';
} else {
    header('location: thank-you.html');
}
?>