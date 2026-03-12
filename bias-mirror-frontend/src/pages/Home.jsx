import React from "react";
import TextEditor from "../components/TextEditor";

const TAGS = ["Gender", "Racial", "Political", "Toxic"];

export default function Home() {
  return (
    <div className="page-center">
      <section className="hero">
        <h1 className="hero-title">
          Uncover the bias<br />in your writing<span className="hero-dot">.</span>
        </h1>
        <p className="hero-sub">
          Paste any text and get an instant breakdown of hidden biases — powered by a fine-tuned XLM-RoBERTa model.
        </p>
        <div className="hero-tags">
          {TAGS.map((t) => (
            <span key={t} className="hero-tag">{t}</span>
          ))}
        </div>
      </section>

      <div className="card">
        <TextEditor />
      </div>
    </div>
  );
}