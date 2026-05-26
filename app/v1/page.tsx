import { ContactForm } from "@/components/contact-form";
import { HeroCanvas } from "@/components/hero-canvas";
import { SiteHeader } from "@/components/site-header";
import { UseCaseTabs } from "@/components/use-case-tabs";

const customers = [
  "Samsung Electronics",
  "SK hynix",
  "Hyundai E&C",
  "Confidential Manufacturing Co.",
];

const solutions = [
  {
    number: "01",
    title: "ERP / 사내 시스템 연동",
    description: "기존 프로그램, 웹하드, 메일, DB, 외부 API를 업무 흐름에 맞춰 연결합니다.",
  },
  {
    number: "02",
    title: "업무 자동화",
    description: "반복 입력, 확인, 분류, 알림, 승인 요청을 자동 처리 흐름으로 전환합니다.",
  },
  {
    number: "03",
    title: "문서 자동화",
    description: "안전보건 대장, 점검표, 견적서, 보고서를 데이터 기반으로 자동 생성합니다.",
  },
];

const process = [
  {
    number: "01",
    title: "방문 진단",
    description: "업무 담당자 인터뷰와 실제 화면 확인으로 자동화 후보를 정리합니다.",
  },
  {
    number: "02",
    title: "흐름 설계",
    description: "데이터 출처, 문서 양식, 승인 절차, 시스템 연동 범위를 확정합니다.",
  },
  {
    number: "03",
    title: "빠른 구축",
    description: "핵심 업무부터 자동화하고 ERP·메일·웹하드·DB를 연결합니다.",
  },
  {
    number: "04",
    title: "운영 개선",
    description: "사용 로그와 현장 피드백을 바탕으로 대시보드와 자동화 규칙을 고도화합니다.",
  },
];

const proofItems = [
  { title: "현장 기반", description: "방문 진단 중심" },
  { title: "시스템 연동", description: "ERP·메일·웹하드" },
  { title: "문서 자동화", description: "보고서·대장·점검표" },
  { title: "운영 대시보드", description: "관리자 화면 구축" },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <HeroCanvas />
          <div className="hero-sheen" aria-hidden="true" />
          <div className="hero-content">
            <p className="eyebrow">Enterprise AI Automation Partner</p>
            <h1 id="hero-title">AI로 기업의 생산성을 혁신하는 자동화 솔루션</h1>
            <p className="hero-copy">
              ERP, 사내 시스템, 문서, 메일, 웹하드, 대시보드까지 기업의 반복 업무를 하나의
              자동화 흐름으로 연결합니다.
            </p>
            <div className="hero-actions" aria-label="주요 행동">
              <a className="button button-primary" href="#contact">
                도입 문의
              </a>
              <a className="button button-secondary" href="#cases">
                사례 보기
              </a>
            </div>
          </div>
          <div className="hero-console" aria-label="자동화 운영 화면 예시">
            <div className="console-top">
              <span />
              <span />
              <span />
              <strong>DAEHAN AI OPS</strong>
            </div>
            <div className="console-grid">
              <div className="console-panel panel-flow">
                <p>업무 흐름</p>
                <div className="mini-flow">
                  <span>메일</span>
                  <i />
                  <span>문서</span>
                  <i />
                  <span>ERP</span>
                </div>
              </div>
              <div className="console-panel panel-status">
                <p>자동 처리</p>
                <strong>87건</strong>
                <small>오늘 생성된 보고서</small>
              </div>
              <div className="console-panel panel-lines">
                <p>시스템 연동</p>
                <span />
                <span />
                <span />
              </div>
              <div className="console-panel panel-map">
                <p>현장 대시보드</p>
                <div className="site-map">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="logo-strip" aria-label="임시 고객사 로고 영역">
          <span>Trusted by teams like</span>
          <div>
            {customers.map((customer) => (
              <strong key={customer}>{customer}</strong>
            ))}
          </div>
        </section>

        <section className="section workflow-section" aria-labelledby="workflow-title">
          <div className="section-heading">
            <p className="eyebrow">Automation Architecture</p>
            <h2 id="workflow-title">흩어진 업무를 하나의 자동화 흐름으로 연결합니다</h2>
          </div>
          <div className="workflow-board" aria-label="업무 자동화 흐름 도식">
            <div className="workflow-column is-manual">
              <span className="column-label">Before</span>
              <div className="work-node">엑셀 수작업</div>
              <div className="work-node">메일 확인</div>
              <div className="work-node">웹하드 정리</div>
              <div className="work-node">보고서 작성</div>
            </div>
            <div className="workflow-core">
              <div className="core-ring">
                <span />
                <strong>대한산업AI</strong>
                <small>업무 분석 · 자동화 설계 · 시스템 연동</small>
              </div>
            </div>
            <div className="workflow-column is-auto">
              <span className="column-label">After</span>
              <div className="work-node">데이터 자동 수집</div>
              <div className="work-node">문서 자동 생성</div>
              <div className="work-node">ERP 자동 반영</div>
              <div className="work-node">대시보드 운영</div>
            </div>
          </div>
        </section>

        <section className="section solutions-section" id="solutions" aria-labelledby="solutions-title">
          <div className="section-heading split">
            <div>
              <p className="eyebrow">Solutions</p>
              <h2 id="solutions-title">기업 내부 시스템에 바로 붙는 자동화 솔루션</h2>
            </div>
            <p>
              새 시스템을 강요하기보다, 이미 쓰고 있는 ERP·웹메일·웹하드·문서 양식 위에
              자동화 레이어를 설계합니다.
            </p>
          </div>
          <div className="solution-grid">
            {solutions.map((solution) => (
              <article className="solution-card" key={solution.title}>
                <span>{solution.number}</span>
                <h3>{solution.title}</h3>
                <p>{solution.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section cases-section" id="cases" aria-labelledby="cases-title">
          <div className="section-heading">
            <p className="eyebrow">Use Cases</p>
            <h2 id="cases-title">현장에서 바로 이해되는 적용 사례</h2>
          </div>
          <UseCaseTabs />
        </section>

        <section className="section process-section" id="process" aria-labelledby="process-title">
          <div className="section-heading split">
            <div>
              <p className="eyebrow">Implementation</p>
              <h2 id="process-title">방문 진단부터 운영 개선까지</h2>
            </div>
            <p>
              실제 업무를 보는 자리에서 수작업 병목을 찾고, 작게 시작해 운영 가능한 자동화로
              확장합니다.
            </p>
          </div>
          <ol className="process-list">
            {process.map((item) => (
              <li key={item.title}>
                <span>{item.number}</span>
                <strong>{item.title}</strong>
                <p>{item.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="section company-section" id="company" aria-labelledby="company-title">
          <div className="company-panel">
            <div>
              <p className="eyebrow">Company</p>
              <h2 id="company-title">대한산업AI 주식회사</h2>
              <p>
                건설 안전지도·감리 법인의 반복 행정부터 제조 현장의 재고·보고 업무까지, 산업
                현장에 필요한 자동화 시스템을 설계하고 구축합니다.
              </p>
            </div>
            <div className="proof-grid">
              {proofItems.map((item) => (
                <div key={item.title}>
                  <strong>{item.title}</strong>
                  <span>{item.description}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contact" aria-labelledby="contact-title">
          <div className="contact-copy">
            <p className="eyebrow">Contact</p>
            <h2 id="contact-title">자동화가 필요한 업무를 알려주세요</h2>
            <p>
              지금 쓰고 있는 프로그램, 반복 문서, 현장 보고 흐름을 남겨주시면 도입 가능 범위를
              검토해 연락드리겠습니다.
            </p>
          </div>
          <ContactForm />
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <strong>대한산업AI 주식회사</strong>
          <span>AI Automation for Industrial Operations</span>
        </div>
        <div>
          <span>주소 입력 예정</span>
          <span>사업자등록번호 입력 예정</span>
          <span>contact@koreaindustry.ai</span>
        </div>
      </footer>
    </>
  );
}
