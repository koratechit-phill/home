# KORATECH IT SOLUTIONS — koratechit.com

홈페이지 제작·관리 / 쇼핑몰 제작·관리 / PG 결제 관리 전문 IT 솔루션 기업 웹사이트 (한국어 · 영어)

## 폴더 구조

```
koratechit/
├─ index.html            루트: 브라우저 언어(또는 마지막 선택 언어)에 따라 /ko/ · /en/ 으로 이동
├─ change.vbs            ★ 풋터 회사정보 · 전화 · 이메일 일괄 변경 스크립트 (Windows)
├─ robots.txt / sitemap.xml
├─ assets/
│  ├─ css/
│  │  ├─ common.css      공통 (변수 · 헤더 · 풋터 · 버튼 · 애니메이션)
│  │  ├─ main.css        회사 메인 페이지
│  │  ├─ shop.css        쇼핑몰 데모
│  │  └─ pg.css          PG 개발자센터
│  ├─ js/
│  │  ├─ common.js       공통 (헤더 · 모바일 메뉴 · 스크롤 등장 · 토스트 · 다국어 헬퍼)
│  │  ├─ main.js         메인 (히어로 회전 문구 · 카운터 · 서비스 탭 · 문의 폼)
│  │  ├─ shop.js         쇼핑몰 (상품 데이터 · 배너 · 좋아요 · 장바구니 · 검색)
│  │  ├─ pg.js           PG (코드 하이라이트 · 언어 탭 · 복사 · 문서 내비 · 수수료 계산기)
│  │  └─ redirect.js     루트 언어 자동 이동
│  └─ img/
│     ├─ logo/           CI 원본 (가로형 · 세로형 · 심볼 · 워드마크, 컬러/화이트 각 8종)
│     ├─ logo-*.png, symbol*.png, wordmark*.png   웹용 리사이즈 로고
│     ├─ favicon.ico / favicon-32.png / apple-touch-icon.png / icon-512.png
│     └─ og-image.png    SNS 공유 이미지 (1200×630)
├─ ko/                   한국어
│  ├─ index.html         회사 메인
│  ├─ shop/index.html    쇼핑몰 데모
│  └─ pg/index.html      PG 개발자센터
└─ en/                   영어 (ko 와 동일 구조)
```

## CI 적용 기준

| 구분 | 값 |
|---|---|
| CI Navy | `#042D7B` (`--brand-deep`) — 버튼 · 마키 · 포인트 배경 |
| CI Blue | `#1783FF` (`--brand`) — 주요 버튼 · 강조 |
| CI Sky | `#9CCAFF` (`--brand-2`) — 화이트 버전 포인트, 어두운 배경 위 강조 |
| 작은 글씨용 블루 | `#0A63D9` (`--brand-text`) — 흰 배경 위 가독성 확보 |

- 헤더: 밝은 배경 → 컬러 가로형 로고 / 메인 히어로(어두운 배경) → 화이트 가로형 로고 (스크롤 시 자동 전환)
- 풋터 · 루트 페이지: 화이트 로고 / 메인 히어로 배경: 화이트 심볼 엠블럼 / PG 하단 CTA: 컬러 심볼
- 로고 교체 시 `assets/img/` 의 같은 파일명으로 덮어쓰면 전체 페이지에 반영됩니다.

| 마커 | 내용 | 언어별 |
|---|---|---|
| `CO_NAME` | 회사명 | O |
| `CO_NAME_EN` | 저작권(©) 표기 | 공통 |
| `CEO` | 대표자 | O |
| `BIZNO` | 사업자등록번호 | 공통 |
| `ECOMNO` | 통신판매업 신고번호 | O |
| `ADDR` | 주소 | O |
| `TEL` | 대표전화 (tel: 링크 자동 생성) | 공통 |
| `FAX` | 팩스 | 공통 |
| `EMAIL` | 이메일 (mailto: 링크 자동 생성) | 공통 |
| `PRIVACY` | 개인정보보호책임자 | O |
| `HOURS` | 운영시간 | O |

## 쇼핑몰 페이지 추가 방법 (추후)

- 새 페이지는 `ko/shop/`, `en/shop/` 안에 추가 (예: `product.html`, `cart.html`, `category.html`)
- `ko/shop/index.html` 을 복사해 헤더 · 풋터 · CSS/JS 경로(`../../assets/...`)를 그대로 사용
- 상품 데이터는 `assets/js/shop.js` 의 `PRODUCTS` 배열 → 실제 운영 시 API 응답으로 교체
- 장바구니 [주문하기]의 `checkoutBtn` 이벤트에서 PG 결제창(SDK `requestPayment`)을 호출

## 오픈 전 체크리스트

- [ ] `change.vbs` 실행 → 입력 창에서 실제 회사 정보 입력
- [ ] 메인 숫자(10+년, 300+ 프로젝트 등)와 연혁 · 소식 내용을 실제 정보로 교체 (`ko/index.html`, `en/index.html`)
- [ ] PG 페이지의 API 주소(`api.koratechit.com`)·키·요율은 **예시 값** → 실제 연동 PG 정보로 교체
- [ ] 문의 폼: 현재는 메일 앱 연결(mailto) 방식 → 서버 API 연동 시 `assets/js/main.js` 의 주석 위치에서 교체
- [ ] 개인정보처리방침 · 이용약관 페이지 작성 후 풋터 링크(`data-soon`) 연결
- [ ] 웹폰트: Pretendard(jsDelivr), Inter · JetBrains Mono(Google Fonts) CDN 사용

## 참고

- 순수 HTML / CSS / JavaScript (빌드 도구 불필요). 웹 호스팅 루트에 그대로 업로드하면 됩니다.
- 반응형(모바일 · 태블릿 · PC), 키보드 접근성, `prefers-reduced-motion` 대응
- 디자인 레이아웃 흐름만 참고했으며, 텍스트 · 그래픽 · 브랜드는 모두 KORATECH 용으로 새로 제작했습니다. 쇼핑몰 데모의 브랜드 · 상품은 가상입니다.
