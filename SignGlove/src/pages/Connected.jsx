import React, { useState } from 'react';
import '../styles/Connected.css';

function Connected() {
  const [copiedText, setCopiedText] = useState("");
  const [translatedList, setTranslatedList] = useState([
    {
      id: 1,
      translations: {
        ko: "안녕하세요. 저는 하은현입니다.",
        en: "Hello. My name is Ha eunhyeon.",
        ja: "こんにちは。私はハ・ウンヒョンです。"
      },
      currentLang: "ko",
      showLangMenu: false,
    },
    {
      id: 2,
      translations: {
        ko: "안창 비프 15cm, 빵은 허니 오트로 주세요. 치즈는 슈레드 치즈로 주세요. 야채는 다 넣어요.",
        en: "Anchang beef 15cm, please choose honey oat bread. Shredded cheese please, and all vegetables.",
        ja: "アンチャンビーフ15cm、パンはハニーオーツでお願いします。チーズはシュレッドチーズで、野菜は全部入れてください。"
      },
      currentLang: "ko",
      showLangMenu: false,
    }
  ]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopiedText(text);
        setTimeout(() => setCopiedText(""), 1500);
      })
      .catch((err) => console.error("복사 실패:", err));
  };

  const handleSpeak = (text, lang) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === "en" ? "en-US" : lang === "ja" ? "ja-JP" : "ko-KR";
    window.speechSynthesis.speak(utterance);
  };

  const toggleLangMenu = (id) => {
    setTranslatedList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, showLangMenu: !item.showLangMenu } : item
      )
    );
  };

  const handleLanguageSelect = (id, lang) => {
    setTranslatedList((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, currentLang: lang, showLangMenu: false }
          : item
      )
    );
  };

  const CopyIcon = ({ copied }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke={copied ? "green" : "gray"}>
      {copied ? (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16h8M8 12h8m-6 8h6a2 2 0 002-2V6a2 2 0 00-2-2H8a2 2 0 00-2 2v2" />
      )}
    </svg>
  );

  return (
    <div className="connected-container">
      <div className="top-bar">
        <div className="menu-icon">☰</div>
      </div>

      <div className="status-section">
        <div className="emoji-circle">👍</div>
        <div className="connection-info">
          <div className="battery-icon">🔋</div>
          <span className="connected-text">Connected</span>
        </div>
      </div>

      <div className="translation-box">
        {translatedList.map((item) => (
          <div className="translation-item" key={item.id}>
            <p>{item.translations[item.currentLang]}</p>
            <div className="translation-icons">
              <span
                title="음성 출력"
                onClick={() => handleSpeak(item.translations[item.currentLang], item.currentLang)}
              >▶️</span>

              <div className="lang-selector">
                <span title="언어 선택" onClick={() => toggleLangMenu(item.id)}>🌐</span>
                {item.showLangMenu && (
                  <div className="lang-dropdown">
                    <button onClick={() => handleLanguageSelect(item.id, "ko")}>🇰🇷 한국어</button>
                    <button onClick={() => handleLanguageSelect(item.id, "en")}>🇺🇸 영어</button>
                    <button onClick={() => handleLanguageSelect(item.id, "ja")}>🇯🇵 일본어</button>
                  </div>
                )}
              </div>

              <button
                className="copy-button"
                onClick={() => handleCopy(item.translations[item.currentLang])}
                title="복사"
              >
                <CopyIcon copied={copiedText === item.translations[item.currentLang]} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Connected;