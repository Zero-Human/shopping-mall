# shopping-mall

## 목차

  * [프로젝트 개요](#프로젝트-개요)
      - [ 기술 스택](#기술-스택)
      - [ DB-Modeling](#db-modeling)
      - [ API 문서](#api-문서)
  * [프로젝트 기능 구현내용](#구현-기능-관련)
  * [Test 결과](#test-결과)
  * [설치 및 실행 방법](#설치-및-실행-방법)

## 프로젝트 개요

**제품 쇼핑몰 Rest API 입니다.**

> 회원가입, 로그인, 상품등록, 수정, 삭제, 상세 조회, 리스트 조회 기능이 있습니다.<br> 

## 기술 스택
- Framework: Nest.js
- ODM : Mongoose
- DB : MongoDB

## DB Modeling
<b>컬렉션 구성</b>
> User<br>
> Product<br>
> Market<br>
> Market은 Seller의 UserId와 Product의 ProductId를 가지고 있습니다.

## API 문서

| 기능구분  | 기능  | Method | URL | 쿼리스트링
| ------------- | ------------- | ------------- | ------------- | ------------- | 
| 유저 | 회원가입 | POST | /users/signup  |                 
|  | 로그인 | POST | /users/signin  | 
|  | Seller 등록 | POST  | /users/seller/register  |
| 상품 |  상품등록  | POST | /products  | 
|  | 상품수정 | PUT  | /products/:id |
|  | 상품삭제 | DELETE  | /products/:id |  |
|  | 상품리스트조회 | GET  | /products | order, search, maincategory, subcategory, country  |
|  | 상품상세조회 | GET  | /products/:id |  |


## 구현 기능 관련
### 기술관련
 - winston module을 사용하여 logging 처리
 - class-validator module 사용하여 validation 처리
 - jwt로 토큰을 발행하여 인증 처리

### 회원가입
 - 회원가입 기능입니다.
 - 회원가입시 필요 내용
   - 이메일 (이메일 형식)
   - 비밀번호 (영문,숫자,특수문자 1개이상 8~20자리)
   - 비밀번호 확인 (영문,숫자,특수문자 1개이상 8~20자리)
   - 유저이름
   - 전화번호

### 로그인
 - 로그인이 되면 jwt발급해줍니다.
 - 로그인시 필요 내용
   - 이메일 (이메일 형식)
   - 비밀번호 (영문,숫자,특수문자 1개이상 8~20자리)

### Seller 등록
 - 회원가입된 유저만 Seller 등록이 가능합니다.
 - Seller 등록시 필요내용
    - 전화번호
    - 판매자이름
    - 은행
    - 계좌
    - 예금주

### 상품등록
 - Seller만 상품을 등록할 수 있습니다.
 - 상품등록시 필요내용
   - 상품명 (최대 길이 80자)
   - 메인카테고리 (의류, 가방, 신발)
   - 서브카테고리 (남성, 여성, 에코백, 백팩, 기타, 부츠, 스니커즈)
   - 상품옵션 (옵션 형식 {optionName: string, count: number})
   - 가격
   - 상품설명 (최대 1000자)
   - 구매일 
   - 구매지역 (한국, 미국, 일본, 중국) 
   - 주문마감일 
   - 배달비

### 상품수정
 - Seller만 상품을 수정할 수 있습니다.
 - 상품수정시 필요내용
   - 상품명 (최대 길이 80자)
   - 메인카테고리 (의류, 가방, 신발)
   - 서브카테고리 (남성, 여성, 에코백, 백팩, 기타, 부츠, 스니커즈)
   - 상품옵션 (옵션 형식 {optionName: string, count: number})
   - 가격
   - 상품설명 (최대 1000자)
   - 구매일 
   - 구매지역 (한국, 미국, 일본, 중국) 
   - 주문마감일 
   - 배달비

### 상품삭제
 - Seller만 상품을 삭제할 수 있습니다.

### 상품리스트조회
 - 로그인 없이 상품 조회가 가능하고, 상품명 검색, 카테고리/ 국가별 필터 및 검색, 상품 등록날짜 및 상품 주문 마감일 정렬 기능이 있습니다.
 - 스트링 쿼리 종류
    - order(정렬방식), search(상품명 검색), maincategory(메인카테고리 필터), subcategory(서브카테고리 필터), country(구매지역 필터)
    - 기본 최신 등록순으로 정렬됩니다. order = purchaseDeadline는 주문마감일 순으로 정렬
   > 메인카테고리, 서브카테고리는 | 구분자로 여러개 필터할 수 있다.

### 상품상세조회
 - 로그인 없이 상품 상세 조회가 가능합니다.
 
### 작업예정
 - Test 코드 작성
 - 상품 사진, 동영상 업로드 기능
 
## Test 결과

### 유닛테스트 결과
<img src="https://user-images.githubusercontent.com/70467297/202688290-c88e342f-5995-4f5a-a6a2-2e0a94751906.png"   height="230"/>


 

## 설치 및 실행 방법
nodejs와 npm이 install 되어있지 않다면 먼저 install 과정 진행
<details>
    <summary> 프로젝트 설치 밀 실행 과정</summary>

<b>1. 프로젝트 clone 및 디렉토리 이동</b>
```bash
https://github.com/Zero-Human/shopping-mall.git

```
<b>2. .env.dev, .env.test 파일 생성</b>
```bash
MONGODB_URL=
JWT_TOKEN=
DB_USERNAME=
DB_PASSWORD=
SECRET_KEY = 
EXPIRES_IN = 
```
<b>3. node package 설치</b>
```javascript
npm install
```
<b>4. 서버 실행</b>
```javascript
npm start
```
</details>

<details>
    <summary>Test 실행 방법</summary>
    
<b>1. .env.test 파일 생성</b>
```bash
PORT=
DB_HOST=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=test_commerce
DB=mysql
DB_SYNC=true
```
<b>2. test 실행</b>
```javascript
npm run test
```
</details>



