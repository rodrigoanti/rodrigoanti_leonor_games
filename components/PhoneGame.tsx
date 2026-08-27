"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import SoundToggle from "@/components/SoundToggle";
import {
  CONTACTS,
  PHRASE_DELAY_MS,
  RINGING_MS,
  type Contact,
} from "@/lib/phone";
import { playSound, stopRing, unlockAudio } from "@/lib/audio";

type Screen = "contacts" | "ringing" | "call";

export default function PhoneGame() {
  const [screen, setScreen] = useState<Screen>("contacts");
  const [contact, setContact] = useState<Contact | null>(null);
  const [visiblePhrases, setVisiblePhrases] = useState(0);

  const startCall = useCallback((selected: Contact) => {
    unlockAudio();
    playSound("tap");
    setContact(selected);
    setVisiblePhrases(0);
    setScreen("ringing");
  }, []);

  const hangUp = useCallback(() => {
    stopRing();
    playSound("hangup");
    setScreen("contacts");
    setContact(null);
    setVisiblePhrases(0);
  }, []);

  useEffect(() => {
    if (screen !== "ringing") {
      return;
    }
    playSound("ring");
    const timer = setTimeout(() => {
      stopRing();
      playSound("connect");
      setScreen("call");
      setVisiblePhrases(1);
    }, RINGING_MS);
    return () => {
      clearTimeout(timer);
      stopRing();
    };
  }, [screen]);

  useEffect(() => {
    if (screen !== "call" || !contact) {
      return;
    }
    if (visiblePhrases >= contact.phrases.length) {
      return;
    }
    const timer = setTimeout(() => {
      setVisiblePhrases((n) => n + 1);
    }, PHRASE_DELAY_MS);
    return () => clearTimeout(timer);
  }, [screen, contact, visiblePhrases]);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="app-header-start">
          <Link href="/" className="back-link" aria-label="Volver al hub">
            ← Volver
          </Link>
          <div className="app-title">Teléfono</div>
        </div>
        <SoundToggle />
      </header>

      <div className="phone-main">
        {screen === "contacts" && (
          <>
            <p className="phone-prompt">¿A quién quieres llamar?</p>
            <div className="phone-list" role="group" aria-label="Agenda">
              {CONTACTS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="phone-contact"
                  onClick={() => startCall(item)}
                  aria-label={`Llamar a ${item.name}`}
                >
                  <span className="phone-contact-emoji" aria-hidden="true">
                    {item.emoji}
                  </span>
                  <span className="phone-contact-name">{item.name}</span>
                  <span className="phone-contact-call" aria-hidden="true">
                    📞
                  </span>
                </button>
              ))}
            </div>
          </>
        )}

        {screen === "ringing" && contact && (
          <div className="phone-ringing" role="status" aria-live="polite">
            <span className="phone-ring-avatar" aria-hidden="true">
              {contact.emoji}
            </span>
            <p className="phone-ring-name">{contact.name}</p>
            <p className="phone-ring-label">Llamando… 📳</p>
            <div className="phone-ring-waves" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <button
              type="button"
              className="phone-hangup-btn"
              onClick={hangUp}
            >
              Colgar 📵
            </button>
          </div>
        )}

        {screen === "call" && contact && (
          <div className="phone-call">
            <span className="phone-call-avatar" aria-hidden="true">
              {contact.emoji}
            </span>
            <p className="phone-call-name">{contact.name}</p>
            <div className="phone-bubbles" aria-live="polite">
              {contact.phrases.slice(0, visiblePhrases).map((phrase, index) => (
                <p key={index} className="phone-bubble">
                  {phrase}
                </p>
              ))}
            </div>
            <button
              type="button"
              className="phone-hangup-btn"
              onClick={hangUp}
            >
              Colgar 📵
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
