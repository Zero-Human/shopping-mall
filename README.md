# shopping-mall
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
자세한 내용은 아래 링크 참조<br>

| 기능구분  | 기능  | Method | URL | 
| ------------- | ------------- | ------------- | ------------- | 
| 유저 | 회원가입 | POST | /users/signup  |                 
|  | 로그인 | POST | /users/signin  | 
|  | Seller 등록 | POST  | /users/seller/register  |
| 상품 |  상품등록  | POST | /products  | 
|  | 상품수정 | PUT  | /products/:id |
|  | 상품삭제 | DELETE  | /products/:id |  |
|  | 상품리스트조회 | GET  | /products |  |
|  | 상품상세조회 | GET  | /products/:id |  |


## 구현 기능 관련
<b> 회원가입 </b></br>
 회원가입 기능입니다.
 
<b> 로그인 </b></br>
 로그인이 되면 jwt발급해줍니다.

<b> Seller 등록 </b></br>
 회원가입된 유저만 Seller 등록이 가능합니다.

<b> 상품등록 </b></br>
 Seller만 상품을 등록할 수 있습니다.

<b> 상품수정 </b></br>
 Seller만 상품을 수정할 수 있습니다.

<b> 상품삭제 </b></br>
 Seller만 상품을 삭제할 수 있습니다.

<b> 상품리스트조회 </b></br>
 로그인 없이 상품 조회가 가능하고, 상품명 검색, 카테고리/ 국가별 필터 및 검색, 상품 등록날짜 및 상품 주문 마감일 정렬 기능이 있습니다.

<b> 상품상세조회 </b></br>
 로그인 없이 상품 상세 조회가 가능합니다.

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



