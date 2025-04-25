let value = "";
const display = document.getElementById("display");
const amount = document.getElementById("amount");
let isTaxIncluded = false; // 税込み状態を管理するフラグ
let currentLang = "ja"; // デフォルトは日本語

// 数字を追加する
function appendNum(num) {
  if (value === "0") {
    value = num;
  } else {
    value += num;
  }
  updateDisplay();
  

}

// 最後の文字を削除する
function deleteLast() {
  if (value.length > 0) {
    value = value.slice(0, -1);
    if (value === "") value = "0";
    updateDisplay();
  }
}

// 税込み・税抜きの切り替え
function addTax() {
  if (!value || isNaN(value)) return;
  if (!isTaxIncluded) {
    value = Math.round(parseFloat(value) * 1.1).toString();
  } else {
    value = Math.round(parseFloat(value) / 1.1).toString();
  }
  isTaxIncluded = !isTaxIncluded;
  updateDisplay();
  updateTaxButton();
}

// 表示を更新する
function updateDisplay() {
  const suffix =
    currentLang === "en"
      ? isTaxIncluded
        ? " YEN (Tax Inc)"
        : " YEN (Tax Ex)"
      : isTaxIncluded
      ? " 円 (税込)"
      : " 円 (税抜)";
  display.innerText = formatCurrency(value) + suffix;
  amount.value = value;
}

// 税込みボタンのテキストを更新する
function updateTaxButton() {
  const taxButton = document.getElementById("tax-button");
  taxButton.innerText = isTaxIncluded
    ? translations[currentLang].taxExcluded
    : translations[currentLang].taxIncluded;
}

// 数字を3桁ごとに区切る
function formatCurrency(num) {
  return parseInt(num, 10).toLocaleString();
}

// 全てクリアする
function clearAll() {
  value = "0";
  isTaxIncluded = false;
  updateDisplay();
  updateTaxButton();
}

// 言語ごとの翻訳
const translations = {
  ja: {
    title: "YSEレジシステム",
    clear: "C",
    taxIncluded: "税込",
    taxExcluded: "税抜",
    submit: "計上",
    history: "出金履歴"
  },
  en: {
    title: "YSE Register System",
    clear: "C",
    taxIncluded: "Tax",
    taxExcluded: "Tax",
    submit: "Submit",
    history: "Transaction History"
  }
};

// 言語を切り替える
function switchLanguage(lang) {
  currentLang = lang;
  document.getElementById("title").innerText = translations[lang].title;
  document.getElementById("clear-button").innerText = translations[lang].clear;
  document.getElementById("submit-button").innerText = translations[lang].submit;
  document.getElementById("history-button").innerText = translations[lang].history;

  const taxButton = document.getElementById("tax-button");
  taxButton.innerText = translations[lang].taxIncluded;

  if (!value || isNaN(value)) {
    value = "0";
  }

  updateDisplay();
}

