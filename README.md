# GOT2000 Password Calculator — GitHub Pages 배포 방법

## 1. GitHub 저장소 만들기
1. GitHub에 로그인합니다.
2. 오른쪽 위 `+` → `New repository`
3. Repository name 예시: `got-password`
4. `Public` 선택
5. `Create repository`

## 2. 파일 업로드
1. 새 저장소에서 `uploading an existing file` 또는 `Add file` → `Upload files`
2. 이 ZIP을 푼 뒤 폴더 안의 파일을 전부 업로드
3. `Commit changes`

## 3. GitHub Pages 켜기
1. 저장소의 `Settings`
2. 왼쪽 `Pages`
3. `Build and deployment`
4. Source: `Deploy from a branch`
5. Branch: `main`, Folder: `/ (root)`
6. `Save`

잠시 뒤 다음 형태의 주소가 생깁니다.

`https://GitHub사용자이름.github.io/got-password/`

## iPhone에서 앱처럼 설치
1. Safari로 페이지 열기
2. 아래쪽 공유 버튼
3. `홈 화면에 추가`
4. `추가`

## 계산식
- `(YYYY - DD + HH) × 4`
- `(YYYY - DD + HH) × 7`

## 주의
이 계산식이 사내 보안 규칙에 해당한다면 Public 저장소 대신 비공개 배포 방식을 검토하세요.
GitHub Pages는 일반적으로 Public 저장소의 파일을 누구나 볼 수 있습니다.
