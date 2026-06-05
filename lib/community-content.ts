export type CommunitySectionKey = "newsletter" | "blog" | "technology";

export type CommunityArticleBlock =
  | {
      type: "heading";
      text: string;
    }
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "quote";
      text: string;
    }
  | {
      type: "list";
      items: string[];
    };

export type CommunityArticle = {
  section: CommunitySectionKey;
  sectionLabel: "Newsletter" | "Blog" | "Technology";
  slug: string;
  href: string;
  title: string;
  description: string;
  summary: string;
  imageSrc: string;
  imageAlt: string;
  date: string;
  author: string;
  readingTime: string;
  body: CommunityArticleBlock[];
};

export const communitySectionMeta: Record<
  CommunitySectionKey,
  {
    title: CommunityArticle["sectionLabel"];
    description: string;
  }
> = {
  newsletter: {
    title: "Newsletter",
    description: "AI-Core 업데이트와 산업 자동화 노트",
  },
  blog: {
    title: "Blog",
    description: "산업 AI와 현장 자동화 이야기",
  },
  technology: {
    title: "Technology",
    description: "AI-Core 구조와 자동화 설계",
  },
};

const createArticle = (
  article: Omit<CommunityArticle, "href">,
): CommunityArticle => ({
  ...article,
  href: `/community/${article.section}/${article.slug}`,
});

export const communityArticlesBySection: Record<CommunitySectionKey, CommunityArticle[]> = {
  newsletter: [
    createArticle({
      section: "newsletter",
      sectionLabel: "Newsletter",
      slug: "ai-core-workflow-update",
      title: "현장 데이터를 하나의 업무 흐름으로 묶기",
      description: "업무 화면, 승인 흐름, 보고 데이터를 같은 구조로 다루는 6월 업데이트입니다.",
      summary: "AI-Core 도입 전에 확인해야 할 업무 데이터, 반복 작업, 담당자 흐름을 한 번에 점검합니다.",
      imageSrc: "/assets/community/newsletter-ai-core-workflow.png",
      imageAlt: "제조 운영 데이터가 하나의 AI-Core 워크플로로 연결되는 편집 이미지",
      date: "2026.06.05.",
      author: "대한산업AI 팀",
      readingTime: "4분 읽기",
      body: [
        {
          type: "paragraph",
          text: "산업 현장의 데이터는 대부분 이미 존재합니다. 문제는 생산 기록, 승인 이력, 보고서, 알림이 서로 다른 화면과 문서에 흩어져 있다는 점입니다. 이번 업데이트는 그 기록을 업무 단위로 모아 담당자가 한 흐름 안에서 확인할 수 있게 하는 데 초점을 맞췄습니다.",
        },
        {
          type: "heading",
          text: "데이터보다 먼저 업무 흐름을 정리합니다",
        },
        {
          type: "paragraph",
          text: "자동화는 데이터베이스를 크게 만드는 일에서 시작하지 않습니다. 담당자가 매일 확인하는 기준, 예외가 생겼을 때 넘겨야 하는 사람, 마지막에 남겨야 하는 기록을 먼저 정리해야 합니다.",
        },
        {
          type: "list",
          items: [
            "반복 보고서에 들어가는 입력 항목을 업무 단위로 나눕니다.",
            "승인, 반려, 보류처럼 상태가 바뀌는 지점을 명확히 둡니다.",
            "최종 결과물이 문서인지, 알림인지, 대시보드인지 먼저 결정합니다.",
          ],
        },
        {
          type: "quote",
          text: "좋은 자동화는 더 많은 화면을 만드는 것이 아니라, 담당자가 다시 확인해야 하는 지점을 줄이는 일에 가깝습니다.",
        },
        {
          type: "paragraph",
          text: "이번 업데이트에서는 업무 화면 조립, 승인 상태 추적, 보고 데이터 변환을 같은 흐름 안에서 시험할 수 있도록 구성 방식을 정리했습니다. 다음 단계에서는 산업별 템플릿을 더 가볍게 선택할 수 있게 다듬을 예정입니다.",
        },
      ],
    }),
    createArticle({
      section: "newsletter",
      sectionLabel: "Newsletter",
      slug: "report-automation-checklist",
      title: "반복 보고 자동화를 시작하는 체크리스트",
      description: "보고 자동화의 첫 범위를 정할 때 확인해야 할 입력, 예외, 승인, 출력 기준을 정리합니다.",
      summary: "자동화 대상을 고르기 전에 업무 기준, 입력 데이터, 예외 처리 방식을 점검합니다.",
      imageSrc: "/assets/community/newsletter-report-checklist.png",
      imageAlt: "반복 보고 자동화를 위한 체크리스트와 업무 데이터가 놓인 편집 이미지",
      date: "2026.05.24.",
      author: "AI-Core 운영팀",
      readingTime: "5분 읽기",
      body: [
        {
          type: "paragraph",
          text: "보고서는 단순한 문서처럼 보이지만, 실제로는 여러 사람이 입력한 데이터와 판단 기준이 모인 결과물입니다. 그래서 보고 자동화는 문서 양식보다 입력 흐름을 먼저 봐야 합니다.",
        },
        {
          type: "heading",
          text: "처음부터 전체 보고서를 자동화하지 않아도 됩니다",
        },
        {
          type: "paragraph",
          text: "좋은 시작점은 매주 반복되고, 입력 항목이 비교적 일정하며, 검토 기준이 명확한 보고입니다. 담당자가 내용을 다시 정리하는 시간이 길수록 자동화 효과도 빠르게 보입니다.",
        },
        {
          type: "list",
          items: [
            "누가 어떤 데이터를 입력하는지 확인합니다.",
            "보고서에 항상 들어가는 항목과 가끔 들어가는 항목을 나눕니다.",
            "최종 제출 전 사람이 확인해야 하는 조건을 남깁니다.",
            "자동 생성 결과를 어떤 파일이나 화면으로 남길지 정합니다.",
          ],
        },
        {
          type: "paragraph",
          text: "AI-Core는 이 흐름을 작은 화면 단위로 나누어 조립합니다. 보고서 전체를 한 번에 완성하기보다 입력 정리, 초안 생성, 검토 상태 관리처럼 효과가 빨리 보이는 부분부터 연결합니다.",
        },
      ],
    }),
    createArticle({
      section: "newsletter",
      sectionLabel: "Newsletter",
      slug: "approval-flow-bottleneck",
      title: "승인 흐름이 늦어지는 지점을 찾는 법",
      description: "승인 지연을 줄이기 위해 상태, 기준, 알림, 이력 관리를 어떤 순서로 봐야 하는지 정리합니다.",
      summary: "문서 검토와 승인 이력을 하나의 업무 화면에서 다루는 방법을 정리합니다.",
      imageSrc: "/assets/community/newsletter-approval-flow.png",
      imageAlt: "승인 흐름과 병목 지점이 시각화된 편집 이미지",
      date: "2026.05.11.",
      author: "대한산업AI 팀",
      readingTime: "4분 읽기",
      body: [
        {
          type: "paragraph",
          text: "승인이 늦어지는 이유는 승인자가 바빠서만은 아닙니다. 요청 문서가 어디에 있는지, 어떤 기준으로 봐야 하는지, 반려되면 무엇을 고쳐야 하는지 명확하지 않을 때 지연이 반복됩니다.",
        },
        {
          type: "heading",
          text: "상태를 줄이면 흐름이 보입니다",
        },
        {
          type: "paragraph",
          text: "처음에는 승인 상태를 너무 많이 만들지 않는 것이 좋습니다. 요청, 검토 중, 반려, 승인처럼 최소 상태로 시작하면 어느 단계에서 문서가 멈추는지 빠르게 파악할 수 있습니다.",
        },
        {
          type: "list",
          items: [
            "요청자가 제출한 원본과 보완 이력을 함께 남깁니다.",
            "승인자가 확인해야 하는 기준을 화면 안에 고정합니다.",
            "반려 사유를 자유 입력으로만 두지 않고 선택 항목과 메모로 나눕니다.",
          ],
        },
        {
          type: "quote",
          text: "승인 자동화의 핵심은 결정을 대신하는 것이 아니라, 결정에 필요한 맥락을 빠르게 모아주는 것입니다.",
        },
      ],
    }),
  ],
  blog: [
    createArticle({
      section: "blog",
      sectionLabel: "Blog",
      slug: "manufacturing-dashboard",
      title: "제조 현장 데이터를 업무 화면으로 바꾸는 방법",
      description: "ERP, MES, APS에 흩어진 제조 데이터를 담당자가 바로 쓰는 운영 화면으로 바꾸는 접근법입니다.",
      summary: "제조 현장에 흩어진 공정 데이터를 입력, 확인, 보고가 가능한 업무 화면으로 전환하는 방법을 정리합니다.",
      imageSrc: "/assets/community/blog-manufacturing-dashboard.png",
      imageAlt: "제조 현장 데이터가 운영 대시보드로 연결되는 편집 이미지",
      date: "2026.05.29.",
      author: "AI-Core 제품팀",
      readingTime: "6분 읽기",
      body: [
        {
          type: "paragraph",
          text: "제조 현장에는 이미 많은 데이터가 쌓입니다. 생산 계획, 작업 지시, 설비 상태, 품질 기록이 각각의 시스템과 엑셀, 현장 메모에 남습니다. 하지만 담당자가 실제로 필요한 것은 더 많은 데이터가 아니라 오늘 무엇을 확인해야 하는지 알려주는 화면입니다.",
        },
        {
          type: "heading",
          text: "업무 화면은 데이터의 번역본입니다",
        },
        {
          type: "paragraph",
          text: "좋은 운영 화면은 데이터베이스 구조를 그대로 보여주지 않습니다. 담당자가 판단하는 순서에 맞춰 데이터를 다시 배열합니다. 생산량보다 먼저 지연 여부를 보여주고, 설비 상태보다 먼저 조치가 필요한 항목을 보여주는 식입니다.",
        },
        {
          type: "list",
          items: [
            "현장 담당자가 매일 확인하는 첫 화면을 정의합니다.",
            "설비, 품질, 작업 지시 데이터를 한 카드 안에서 비교합니다.",
            "확인 필요, 조치 중, 완료처럼 실제 행동과 연결되는 상태를 둡니다.",
          ],
        },
        {
          type: "paragraph",
          text: "AI-Core는 이 화면을 작은 모듈로 조립합니다. 입력 폼, 상태 표, 알림, 보고서 초안을 분리해두면 한 번에 큰 시스템을 만들지 않아도 업무 흐름을 빠르게 시험할 수 있습니다.",
        },
      ],
    }),
    createArticle({
      section: "blog",
      sectionLabel: "Blog",
      slug: "logistics-report-delay",
      title: "물류 운영 리포트가 매일 늦어지는 이유",
      description: "입출고, 배차, 재고 예외가 하루 리포트로 모이는 과정에서 생기는 지연을 짚어봅니다.",
      summary: "입출고와 배차 데이터가 늦게 모일 때 운영 리포트가 왜 지연되는지 업무 흐름 기준으로 봅니다.",
      imageSrc: "/assets/community/blog-logistics-report.png",
      imageAlt: "물류 창고와 운영 리포트 흐름을 표현한 편집 이미지",
      date: "2026.05.08.",
      author: "대한산업AI 팀",
      readingTime: "5분 읽기",
      body: [
        {
          type: "paragraph",
          text: "물류 리포트는 하루가 끝난 뒤 작성되는 것처럼 보이지만, 실제로는 하루 종일 누적된 예외 처리의 결과입니다. 입고가 늦어지고, 배차가 바뀌고, 재고 수량이 맞지 않으면 리포트 작성도 자연스럽게 뒤로 밀립니다.",
        },
        {
          type: "heading",
          text: "지연은 마지막 문서에서 보이고, 원인은 중간 상태에 있습니다",
        },
        {
          type: "paragraph",
          text: "리포트 자동화를 하려면 최종 양식보다 중간 상태를 먼저 잡아야 합니다. 어떤 주문이 대기 중인지, 어떤 배차가 변경됐는지, 어떤 재고가 검수 중인지 실시간으로 남아 있어야 합니다.",
        },
        {
          type: "list",
          items: [
            "입출고 상태를 보고서 작성 시점이 아니라 발생 시점에 기록합니다.",
            "배차 변경 사유를 담당자 메모에만 두지 않고 구조화합니다.",
            "지연, 누락, 초과처럼 리포트에 반복되는 예외 항목을 먼저 자동 분류합니다.",
          ],
        },
        {
          type: "paragraph",
          text: "이렇게 중간 상태를 정리하면 리포트는 하루 끝에 새로 만드는 문서가 아니라, 하루 동안 쌓인 운영 기록을 정리하는 출력물이 됩니다.",
        },
      ],
    }),
    createArticle({
      section: "blog",
      sectionLabel: "Blog",
      slug: "automation-priority",
      title: "반복 업무 자동화는 어떤 업무부터 시작해야 할까",
      description: "효과가 빨리 보이는 자동화 대상을 고르기 위해 반복성, 기준 명확성, 검토 비용을 함께 봅니다.",
      summary: "작게 시작해도 효과가 보이는 자동화 업무를 고르는 기준을 정리합니다.",
      imageSrc: "/assets/community/blog-automation-priority.png",
      imageAlt: "반복 업무 자동화 우선순위를 모듈형 블록으로 표현한 편집 이미지",
      date: "2026.04.18.",
      author: "AI-Core 제품팀",
      readingTime: "5분 읽기",
      body: [
        {
          type: "paragraph",
          text: "자동화 과제는 많을수록 시작이 어려워집니다. 그래서 처음에는 가장 큰 업무보다 가장 자주 반복되고, 기준이 어느 정도 정리되어 있으며, 사람이 다시 확인하는 시간이 긴 업무를 고르는 편이 좋습니다.",
        },
        {
          type: "heading",
          text: "좋은 첫 과제의 조건",
        },
        {
          type: "list",
          items: [
            "매일 또는 매주 반복됩니다.",
            "입력 항목이 비교적 일정합니다.",
            "예외가 있더라도 유형을 나눌 수 있습니다.",
            "자동화 결과를 사람이 빠르게 검토할 수 있습니다.",
          ],
        },
        {
          type: "paragraph",
          text: "반대로 판단 기준이 계속 바뀌거나, 담당자마다 처리 방식이 너무 다른 업무는 첫 과제로 적합하지 않을 수 있습니다. 이 경우에는 자동화보다 업무 기준 정리가 먼저입니다.",
        },
        {
          type: "quote",
          text: "처음부터 완벽한 자동화를 목표로 잡기보다, 반복되는 한 단계를 줄이는 데 집중하면 다음 개선 지점이 더 선명해집니다.",
        },
      ],
    }),
  ],
  technology: [
    createArticle({
      section: "technology",
      sectionLabel: "Technology",
      slug: "ai-core-architecture",
      title: "문서, 승인, 리포트를 연결하는 AI-Core 구조",
      description: "입력, 상태, 자동화, 출력 레이어를 나누어 업무 흐름을 연결하는 구조를 정리합니다.",
      summary: "문서 입력, 승인 기준, 리포트 생성을 하나의 흐름으로 묶는 기본 구조를 정리합니다.",
      imageSrc: "/assets/community/technology-ai-core-architecture.png",
      imageAlt: "문서와 승인, 리포트가 연결된 AI-Core 아키텍처 편집 이미지",
      date: "2026.05.16.",
      author: "AI-Core 기술팀",
      readingTime: "7분 읽기",
      body: [
        {
          type: "paragraph",
          text: "AI-Core는 하나의 거대한 기능이 아니라 업무를 구성하는 여러 레이어의 조합입니다. 문서를 입력받고, 상태를 바꾸고, 승인 기준을 확인하고, 마지막에 보고서나 알림을 만드는 흐름이 서로 연결됩니다.",
        },
        {
          type: "heading",
          text: "레이어를 나누면 변경이 쉬워집니다",
        },
        {
          type: "paragraph",
          text: "업무 자동화에서 가장 자주 바뀌는 것은 현장의 기준입니다. 양식이 바뀌고, 승인자가 바뀌고, 보고 항목이 늘어납니다. 그래서 입력, 상태, 자동화, 출력 레이어를 분리해두면 일부 기준이 바뀌어도 전체 구조를 다시 만들 필요가 줄어듭니다.",
        },
        {
          type: "list",
          items: [
            "입력 레이어는 문서, 사진, 엑셀, 시스템 데이터를 받습니다.",
            "상태 레이어는 요청, 검토, 승인, 완료 같은 업무 흐름을 관리합니다.",
            "자동화 레이어는 분류, 요약, 알림, 초안 생성을 담당합니다.",
            "출력 레이어는 보고서, 대시보드, 담당자 알림으로 연결됩니다.",
          ],
        },
        {
          type: "paragraph",
          text: "이 구조는 처음부터 거대한 ERP를 만드는 방식이 아니라, 필요한 업무 단위를 먼저 조립하고 검증하는 방식에 가깝습니다.",
        },
      ],
    }),
    createArticle({
      section: "technology",
      sectionLabel: "Technology",
      slug: "data-input-design",
      title: "반복 업무 자동화에 필요한 데이터 입력 설계",
      description: "자동화가 안정적으로 동작하도록 입력 항목, 예외, 검증 기준을 설계하는 방법입니다.",
      summary: "자동화가 안정적으로 동작하려면 어떤 입력 항목과 예외 기준을 먼저 정해야 하는지 봅니다.",
      imageSrc: "/assets/community/technology-data-inputs.png",
      imageAlt: "자동화 데이터 입력 구조와 검증 지점을 표현한 편집 이미지",
      date: "2026.04.30.",
      author: "AI-Core 기술팀",
      readingTime: "6분 읽기",
      body: [
        {
          type: "paragraph",
          text: "자동화 품질은 모델 성능만으로 결정되지 않습니다. 입력이 흔들리면 좋은 모델도 일관된 결과를 내기 어렵습니다. 그래서 반복 업무 자동화에서는 입력 설계가 가장 현실적인 기술 과제입니다.",
        },
        {
          type: "heading",
          text: "입력 항목은 적을수록 좋지만, 기준은 충분해야 합니다",
        },
        {
          type: "paragraph",
          text: "현장 담당자가 입력해야 하는 항목은 최소화해야 합니다. 대신 자동화가 판단하는 데 필요한 기준은 명확하게 남겨야 합니다. 예를 들어 사진대지 자동화라면 사진, 위치, 날짜, 설명, 검토 상태가 어떤 방식으로 연결되는지 정해야 합니다.",
        },
        {
          type: "list",
          items: [
            "필수 입력과 선택 입력을 나눕니다.",
            "사람이 수정할 수 있는 항목과 자동으로 채워지는 항목을 구분합니다.",
            "예외 입력이 들어왔을 때 보류, 재요청, 직접 처리 중 어떤 상태로 둘지 정합니다.",
          ],
        },
        {
          type: "quote",
          text: "자동화 입력 설계는 사용자를 더 많이 입력하게 만드는 일이 아니라, 모호한 입력을 줄이는 일입니다.",
        },
      ],
    }),
    createArticle({
      section: "technology",
      sectionLabel: "Technology",
      slug: "operations-layer",
      title: "업무 화면과 알림을 조립하는 운영 레이어",
      description: "AI-Core의 운영 레이어가 화면, 알림, 담당자 액션을 하나의 업무 흐름으로 묶는 방식입니다.",
      summary: "현장 데이터가 업무 화면, 알림, 보고로 이어지는 운영 레이어의 역할을 정리합니다.",
      imageSrc: "/assets/community/technology-operations-layer.png",
      imageAlt: "업무 화면과 알림이 운영 레이어로 조립되는 편집 이미지",
      date: "2026.04.12.",
      author: "AI-Core 기술팀",
      readingTime: "5분 읽기",
      body: [
        {
          type: "paragraph",
          text: "자동화 결과가 실제 업무에 쓰이려면 화면과 알림이 함께 설계되어야 합니다. 결과를 잘 만들어도 담당자가 어디에서 확인하고 무엇을 눌러야 하는지 모르면 자동화는 실제 운영에 붙지 않습니다.",
        },
        {
          type: "heading",
          text: "운영 레이어는 다음 행동을 보여줍니다",
        },
        {
          type: "paragraph",
          text: "AI-Core의 운영 레이어는 자동화 결과를 담당자 액션으로 바꾸는 구간입니다. 검토 필요 항목을 모아 보여주고, 승인 요청을 보내고, 처리 결과를 리포트로 남깁니다.",
        },
        {
          type: "list",
          items: [
            "업무 화면은 담당자가 오늘 처리할 항목을 중심으로 구성합니다.",
            "알림은 모든 변화를 보내지 않고 행동이 필요한 변화만 보냅니다.",
            "보고서는 처리 이력과 판단 근거가 남도록 설계합니다.",
          ],
        },
        {
          type: "paragraph",
          text: "결국 운영 레이어의 목적은 자동화를 눈에 보이게 만드는 것입니다. 사람이 확인할 지점과 시스템이 처리할 지점을 분리하면 도입 초기에도 업무 흐름이 흔들리지 않습니다.",
        },
      ],
    }),
  ],
};

export const communityArticles = Object.values(communityArticlesBySection).flat();

export function isCommunitySectionKey(section: string): section is CommunitySectionKey {
  return section === "newsletter" || section === "blog" || section === "technology";
}

export function getCommunityArticles(section: CommunitySectionKey) {
  return communityArticlesBySection[section];
}

export function getCommunityArticle(section: string, slug: string) {
  if (!isCommunitySectionKey(section)) return undefined;

  return communityArticlesBySection[section].find((article) => article.slug === slug);
}
