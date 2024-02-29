# 클래스팅 퀴즈 과제

- Next.js, tailwind, react-query, zustand, chart.js 로 만들었습니다.

- 개발 서버 실행: `npm install` -> `npm run dev` -> 브라우저 [http://localhost:3000](http://localhost:3000) 접속
- 빌드: `npm run build`

## 테스트 대상 선정 과정

화면/기능들을 아래 주요 컴포넌트들로 나누었습니다.

- Entry (첫 화면)
- Quiz (실제 질문에 답하는 부분)
- Result (결과)
- Review (오답 노트)
- Main (위에 4개를 합치는 컴포넌트)

각 컴포넌트에서 조건/이벤트에 따라 보여지는 것들에 대해 테스트를 작성했습니다.

또한 시간 formatting 함수 같은 util 함수도 실수를 할 수 있기 때문에 단위 테스트를 작성해서 결과값을 한 번 더 확인했습니다.

API에서 데이터를 가져와서 디코딩 하는 부분도 한 번 더 확인하며 문서화 용도로 작성했습니다.
