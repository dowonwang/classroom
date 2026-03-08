# API App (Dev)

- classroom REST API

## 요구사항

- 패키지 매니저: `pnpm`
- Docker / Docker Compose

## 설치

### 레포 루트에서 의존성 패키지 설치

```bash
pnpm install
```

## 환경 변수

- `.env.example`을 복사해서 `.env`를 생성하세요.

```env
APP_PORT=3000
```

## 개발 서버 실행

```bash
pnpm run dev
```

## DB 실행 (docker)

```bash
# db 실행
pnpm run db:up

# db 종료
pnpm run db:down

# db 로그 출력
pnpm run db:logs
```
