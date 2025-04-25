<?php
$amount = $_POST['amount'] ?? '';

if ($amount !== '') {
  $pdo = new PDO('mysql:host=localhost;dbname=yse_pos;charset=utf8', 'root', '');
  $stmt = $pdo->prepare("INSERT INTO sales (amount, created_at) VALUES (?, NOW())");
  $stmt->execute([$amount]);
  $message = "計上しました: " . htmlspecialchars($amount) . "円";
} else {
  $message = "金額が入力されていません。";
}
?>
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>計上結果</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="result">
    <p><?php echo $message; ?></p>
    <a href="index.html" class="back-button">戻る</a>
  </div>
</body>
</html>