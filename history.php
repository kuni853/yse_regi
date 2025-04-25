
<?php
try {
  $pdo = new PDO('mysql:host=localhost;dbname=yse_pos;charset=utf8', 'root', '');
  $stmt = $pdo->query("SELECT amount, created_at FROM sales ORDER BY created_at DESC");
  $history = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
  die("データベース接続エラー: " . $e->getMessage());
}
?>
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>出金履歴</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>出金履歴</h1>
  <div class="history">
    <?php if (empty($history)): ?>
      <p>履歴がありません。</p>
    <?php else: ?>
      <ul>
        <?php foreach ($history as $item): ?>
          <li><?php echo htmlspecialchars($item['created_at']); ?>: <?php echo htmlspecialchars($item['amount']); ?>円</li>
        <?php endforeach; ?>
      </ul>
    <?php endif; ?>
  </div>
  <a href="index.html" class="back-button">戻る</a>
</body>
</html>