# Chat App
배포한 사이트 -> https://pmjuu-chat.netlify.app/

## Things to add..
- 채팅 페이지에서 메시지 내용을 검색할 수 있습니다.
- 새로고침해도 현재 보고 있는 창을 유지해야 합니다.

## Explanation
### Overview
- 친구 목록 페이지(`/friends`), 채팅 목록 페이지(`/chats`), 채팅 페이지(URL없음) 가 있습니다.
- App 컴포넌트가 처음에 렌더링될 때 `useDefaultDB` 커스텀 훅을 이용해서 firebase database에 default 데이터를 입력합니다.
- default 친구 프로필 데이터는 Redux state에 미리 입력해두었습니다.

### 친구 목록 페이지
- 친구 목록 페이지에는 사용자를 포함한 친구 프로필이 처음에 입력된 순서대로 나열되어 있습니다.
- 친구 목록 페이지에는 채팅 목록으로 이동할 수 있는 "Chats" 버튼이 있습니다.
- 친구 프로필 카드에는 친구 이름, 사진과 함께 채팅을 시작할 수 있는 "Chat" 버튼이 있습니다.
- 친구 프로필 카드에 있는 “Chat” 버튼을 이용해 해당 친구와의 채팅 페이지로 바로 이동할 수 있습니다.
- 친구 목록은 "sort" 버튼을 이용해 이름을 기준으로 오름차순 또는 내림차순 정렬할 수 있습니다.
- 친구 목록에 있는 검색창을 이용해 친구 이름을 기준으로 검색할 수 있습니다.

### 채팅 목록 페이지
- 채팅 목록에는 진행 중인 채팅이 날짜 순으로 나열되어 있습니다. (최신날짜가 상위)
- 채팅 목록 페이지에는 친구 목록으로 이동할 수 있는 "Friends" 버튼이 있습니다.
- 채팅 목록에는 진행 중인 채팅의 친구 이름, 가장 최신 메시지의 첫 20글자, 가장 최신 메시지 전송 날짜가 표기되어 있습니다.
- 채팅 목록에서 채팅을 선택하면 채팅 페이지로 이동합니다.

### 채팅 페이지
- 채팅 페이지에는 상대방과 나눈 대화가 시간 순(최근 메시지가 하위)으로 나열됩니다. 상대방 이름, 메시지 내용, 전송 날짜 및 시간이 모두 표기되어 있습니다.
- 채팅 페이지에서 메시지를 전송할 경우, 현재 채팅 페이지와 채팅 목록 페이지에 새로운 메시지가 반영됩니다.
- Firebase Realtime Database 를 이용하여 실시간 채팅 기능이 구현되어 있습니다.
