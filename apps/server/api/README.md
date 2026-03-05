# API App (Dev)

- classroom REST API

## 사전 준비

- 패키지 매니저: `pnpm`
- Docker / Docker Compose

## 시작하기

### 1) 의존성 설치 (레포 루트)

```bash
pnpm install
````

## 환경 변수

* `.env.example`을 복사해서 `.env`를 생성하세요.

```env
APP_PORT=3000

# DB
MYSQL_PORT=3306
MYSQL_ROOT_PASSWORD=your_root_password
MYSQL_DATABASE="classroom"
MYSQL_USER=your_username
MYSQL_PASSWORD=your_password
TZ=your_time_zone
DATABASE_HOST="localhost"

# Prisma
DATABASE_URL="mysql://your_username:your_password@localhost:3306/classroom"
```

## DB 실행 (Docker)

```bash
docker compose up -d
```