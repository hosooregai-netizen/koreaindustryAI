"use client";

import { useState } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="contact-form"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <label>
        회사명
        <input name="company" type="text" placeholder="대한건설안전 주식회사" required />
      </label>
      <label>
        담당자
        <input name="name" type="text" placeholder="홍길동" required />
      </label>
      <label>
        연락처
        <input name="contact" type="text" placeholder="이메일 또는 전화번호" required />
      </label>
      <label>
        관심 영역
        <select name="category" required defaultValue="">
          <option value="" disabled>
            선택해주세요
          </option>
          <option>ERP / 사내 시스템 연동</option>
          <option>건설 안전지도 자동화</option>
          <option>문서 자동화</option>
          <option>제조 / 재고 관리</option>
        </select>
      </label>
      <label className="full">
        자동화하고 싶은 업무
        <textarea
          name="message"
          rows={5}
          placeholder="예: 현장 사진과 점검 내용을 기반으로 안전지도 보고서를 자동 생성하고 싶습니다."
        />
      </label>
      <button className="button button-primary full" type="submit">
        문의 접수하기
      </button>
      <p className={`form-note ${submitted ? "is-success" : ""}`}>
        {submitted
          ? "문의 내용이 준비되었습니다. 실제 접수 연동은 다음 단계에서 연결하면 됩니다."
          : "문의 정보 연동은 추후 연결 예정입니다."}
      </p>
    </form>
  );
}
