# 로컬 실행 가이드 (Eclipse + Tomcat 11)

Eclipse 서버 설정(`Servers/` 폴더)은 PC마다 달라서 git에 올리지 않는다(`.gitignore`). 각자 아래 순서로 한 번 만들면 된다.

## 필요한 것

| 항목 | 버전 | 비고 |
|---|---|---|
| JDK | 21 이상 | 프로젝트 Java 수준은 21 |
| Apache Tomcat | 11.0.x | `jakarta.servlet` 사용. 10 이하는 안 됨 |
| Eclipse | Enterprise Java and Web Developers | Servers 뷰, Dynamic Web Project 지원 |

## 1. 저장소 가져오기

```bash
git clone https://github.com/highcross306/graduation_requirements.git
```

Eclipse에서 **File → Import → General → Existing Projects into Workspace**를 고르고 `graduation_requirements/Graduation_requitrements` 폴더를 지정한다.
(프로젝트 이름의 `requitrements` 오타는 원래 이름이다. 바꾸지 말 것.)

## 2. Tomcat 런타임 등록

1. **Window → Preferences → Server → Runtime Environments → Add**를 누른다.
2. **Apache → Apache Tomcat v11.0**을 선택한다.
3. 이름은 반드시 **`Apache Tomcat v11.0`**으로 한다. 프로젝트 설정(`.settings`)이 이 이름으로 런타임을 찾는다.
4. Tomcat installation directory에 설치한 Tomcat 폴더(예: `C:\Tomcat11`)를 지정하고 JRE는 21 이상을 고른다.

## 3. 서버 만들고 프로젝트 연결

1. **Servers** 뷰(없으면 Window → Show View → Servers)에서 새 서버를 만든다.
2. **Tomcat v11.0 Server**를 선택하고 런타임은 위에서 등록한 것을 고른다.
3. 다음 화면에서 `Graduation_requitrements`를 오른쪽(Configured)으로 옮기고 Finish를 누른다.

이때 워크스페이스에 `Servers` 프로젝트가 자동으로 생긴다. 커밋하지 않는다.

## 4. 포트 확인

기본 HTTP 포트는 8080이다. 다른 프로그램(따로 켜 둔 Tomcat 등)과 겹치면 서버가 뜨지 않는다.

- Servers 뷰에서 서버를 더블클릭하고 **Ports → HTTP/1.1** 값을 비어 있는 포트(예: 9090)로 바꾼 뒤 저장한다.
- 어떤 포트가 쓰이는지 확인: `netstat -ano | findstr :8080`

## 5. 실행

서버를 우클릭하고 **Start**를 누른 뒤 브라우저에서 연다.

```
http://localhost:<포트>/Graduation_requitrements/
```

API만 확인하려면 `http://localhost:<포트>/Graduation_requitrements/api/curricula`를 연다(JSON이 나오면 정상). 전체 API는 [API.md](API.md) 참고.

## 파일 위치 규칙

Tomcat은 `Graduation_requitrements/src/main/webapp/` 아래만 배포한다. 저장소 최상위에 둔 파일은 서버에서 보이지 않는다.

| 종류 | 위치 |
|---|---|
| 화면 (HTML/CSS/JS) | `src/main/webapp/` (`index.html`, `css/`, `js/`) |
| 서블릿·서비스 (Java) | `src/main/java/kr/inha/gradcheck/` |
| 교과과정 데이터 (JSON) | `src/main/webapp/WEB-INF/data/` |
| 라이브러리 jar | `src/main/webapp/WEB-INF/lib/` |

FE의 `js/api.js`에서 `USE_MOCK = true`이면 서버 API 대신 `mock.js`의 가짜 데이터를 쓴다. 실제 API에 붙이려면 `false`로 바꾼다.

## 자주 나는 문제

| 증상 | 해결 |
|---|---|
| `Could not load the Tomcat server configuration ... server.xml does not exist` | 파일은 있는데 Eclipse가 못 보는 경우가 대부분. Project Explorer에서 `Servers` 프로젝트 우클릭 → Refresh(F5). 닫혀 있으면 Open Project. 안 되면 Eclipse 재시작 |
| git으로 받은 파일이 Eclipse에 안 보임 | 프로젝트 우클릭 → Refresh. **Preferences → General → Workspace → Refresh using native hooks or polling**을 켜 두면 자동 반영 |
| `Port 8080 required by Tomcat ... is already in use` | 4번대로 포트를 바꾼다 |
| 화면에 CSS가 옛날 것으로 보임 | 브라우저 캐시. Ctrl + F5, 또는 개발자도구 Network 탭 → Disable cache |
| 코드를 고쳤는데 반영이 안 됨 | Java·데이터 변경은 서버 재시작 필요(데이터는 시작할 때 한 번 읽음). 안 되면 서버 우클릭 → Clean |
| `jakarta.servlet` 을 찾을 수 없음 | 프로젝트 우클릭 → Properties → Targeted Runtimes에서 `Apache Tomcat v11.0` 체크 |
