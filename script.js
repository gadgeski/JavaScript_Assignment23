const questionDisplay = document.getElementById("questionDisplay");
const optionsContainer = document.getElementById("optionsContainer");
const nextButton = document.getElementById("nextButton");
const resultDisplay = document.getElementById("resultDisplay");

const quizData = [
  {
    question: "JavaScriptの正式名称は何ですか？",
    options: ["Java", "ECMAScript", "TypeScript", "JS"],
    answer: "ECMAScript",
  },
  {
    question: "HTMLでリストを作成するタグはどれですか？",
    options: ["<list>", "<ul>", "<ol>", "<li>"],
    answer: "<ul>",
  },
  {
    question: "CSSで要素の背景色を変更するプロパティはどれですか？",
    options: ["color", "font-color", "background-color", "bg-color"],
    answer: "background-color",
  },
  {
    question: "変数宣言に使うキーワードで、再代入可能なものはどれですか？",
    options: ["const", "let", "var", "final"],
    answer: "let",
  },
  {
    question: "DOMとは何ですか？",
    options: [
      "Document Object Model",
      "Data Order Management",
      "Direct Object Manipulation",
      "Document Oriented Mapping",
    ],
    answer: "Document Object Model",
  },
];

let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null; // ユーザーが選択した選択肢のDOM要素

function loadQuestion() {
  if (currentQuestionIndex < quizData.length) {
    const currentQuiz = quizData[currentQuestionIndex];
    questionDisplay.textContent = `Q.${currentQuestionIndex + 1}: ${
      currentQuiz.question
    }`;
    optionsContainer.innerHTML = ""; // 選択肢をクリア

    currentQuiz.options.forEach((option) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.classList.add("option-button");
      button.addEventListener("click", () => selectOption(button, option));
      optionsContainer.appendChild(button);
    });

    nextButton.disabled = true; // 選択するまで次へボタンを無効
    resultDisplay.textContent = ""; // 結果表示をクリア
    selectedOption = null; // 選択状態をリセット
  } else {
    showResult();
  }
}

function selectOption(button, optionText) {
  // 既に選択肢が選ばれていたら、その選択を解除
  if (selectedOption) {
    selectedOption.classList.remove("selected");
  }
  // 新しい選択肢に'selected'クラスを追加
  button.classList.add("selected");
  selectedOption = button; // 選択されたボタンを記憶
  nextButton.disabled = false; // 選択したら次へボタンを有効
}

function checkAnswer() {
  if (!selectedOption) return; // 選択肢が選ばれていない場合は何もしない

  const userAnswer = selectedOption.textContent;
  const correctAnswer = quizData[currentQuestionIndex].answer;

  // すべての選択肢を無効化（複数回クリックを防ぐため）
  document.querySelectorAll(".option-button").forEach((btn) => {
    btn.disabled = true;
  });

  if (userAnswer === correctAnswer) {
    score++;
    selectedOption.classList.remove("selected");
    selectedOption.classList.add("correct");
    resultDisplay.textContent = "正解！";
    resultDisplay.style.color = "#28a745";
  } else {
    selectedOption.classList.remove("selected");
    selectedOption.classList.add("wrong");
    // 正しい選択肢も表示
    document.querySelectorAll(".option-button").forEach((btn) => {
      if (btn.textContent === correctAnswer) {
        btn.classList.add("correct");
      }
    });
    resultDisplay.textContent = `不正解！正解は「${correctAnswer}」でした。`;
    resultDisplay.style.color = "#dc3545";
  }
}

function showResult() {
  questionDisplay.textContent = "クイズ終了！";
  optionsContainer.innerHTML = "";
  nextButton.style.display = "none"; // 次へボタンを非表示
  resultDisplay.textContent = `あなたのスコア: ${score} / ${quizData.length}`;
  resultDisplay.style.color = "#007bff";
  // ゲームをリセットするためのボタンを追加しても良い
  const restartButton = document.createElement("button");
  restartButton.textContent = "もう一度プレイ";
  restartButton.classList.add("next-button"); // スタイルを流用
  restartButton.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.style.display = "block";
    loadQuestion();
  });
  optionsContainer.appendChild(restartButton);
}

nextButton.addEventListener("click", () => {
  checkAnswer(); // 現在の回答をチェック
  // 少し遅延させてから次の問題をロードすることで、ユーザーに結果を確認させる
  setTimeout(() => {
    currentQuestionIndex++;
    loadQuestion();
  }, 1500); // 1.5秒後に次の問題へ
});

// アプリケーション開始
loadQuestion();
