# Javacript 에서 RegEX 사용하기


## Flag

플래그가 없을 경우 매칭대상 1개 이상이라도 최초 1개만 검색하고 종료
문법
> var regexr = /[expression]/**[flag]**

| Flag | Meaning | Description|
|---|---|---|
|i|Ignore Case|대소문자 구별하지 않고 검색|
|g|Global|문자열 내의 모든 패턴을 검색한다
|m|Multiline|문자열의 행이 바뀌더라도 검색을 계속한다.|

example

```js
const targetStr = 'Is this all there is?';

// 문자열 is를 대소문자를 구별하여 한번만 검색한다.
let regexr = /is/;

console.log(targetStr.match(regexr)); // [ 'is', index: 5, input: 'Is this all there is?' ]
console.log(targetStr.match(regexr).length); // 1

// 문자열 is를 대소문자를 구별하지 않고 대상 문자열 끝까지 검색한다.
regexr = /is/ig;

console.log(targetStr.match(regexr)); // [ 'Is', 'is', 'is' ]
console.log(targetStr.match(regexr).length); // 3
```

## Pattern

패턴에는 검색하고 싶은 문자열을 지정한다. 이때 문자열의 따옴표는 생략한다. 따옴표를 포함하면 따옴표까지도 검색한다. 또한 패턴은 특별한 의미를 가지는 메타문자(Metacharacter) 또는 기호로 표현할 수 있다. 몇가지 패턴 표현 방법을 소개한다.

### 임의문자 1개 [.]

임의문자는 `.` 를 사용한다.

```js
const targetStr = 'AA BB Aa Bb';

// 임의의 문자 3개
var regexr = /.../g;
console.log(targetStr.match(regexr)); // [ 'AA ', 'BB ', 'Aa ' ]

// 임의의 문자 2개
var regexr = /../g;
console.log(targetStr.match(regexr)); // [ 'AA', ' B', 'B ', 'Aa', ' B' ]
```

### 특정 문자 [특정문자]

패턴안에 특정 문자를 입력하면 해당 문자를 찾는다.

```js
const targetStr = 'AA BB Aa Bb';

// 'A'를 대소문자 구분없이 반복 검색
const regexr = /A/ig;

console.log(targetStr.match(regexr)); // [ 'A', 'A', 'A', 'a' ]
```

앞선 패턴을 최소 한번 반복하려면 앞선 패턴 뒤에 `+`를 붙인다. 아래 예제의 경우, 앞선 패턴은 A이므로 A+는 A만으로 이루어진 문자열(‘A’, ‘AA’, ‘AAA’, …)를 의미한다.

```js
const targetStr = 'AA AAA BB Aa Bb';

// 첫번째 문자가 'A'로 시작하는 문자열('A', 'AA', 'AAA', ...)을 반복 검색
const regexr = /A+/g;

console.log(targetStr.match(regexr)); // [ 'AA', 'AAA', 'A' ]
```

`|`를 사용하면 **or**의 의미를 가지게 된다.

```js
const targetStr = 'AA BB Aa Bb';

// 'A' 또는 'B'를 반복 검색
const regexr = /A|B/g;

console.log(targetStr.match(regexr)); // [ 'A', 'A', 'B', 'B', 'A', 'B' ]
```

분해되지 않은 단어 레벨로 추출하기 위해서는 `+`를 같이 사용하면 된다.


```js
const targetStr = 'AA AB BB CC CA DDD ZZ Aa Bb';

// 첫번째 문자가 'A' 이고 계속해서 'A'가 오는 경우 또는 
// 첫번째 문자가 'B' 이고 계속해서 'B'가 되는 문자열을 반복 검색
// 'A', 'AA', 'AAA', ... 또는 'B', 'BB', 'BBB', ...
const regexr = /A+|B+/g;

console.log(targetStr.match(regexr)); // [ 'AA', 'A', 'B', 'BB', 'A', 'B' ]
```

`[]`내의 문자는 **or**로 동작한다. 그 뒤에 `+`를 사용하여 앞선 패턴을 한번 이상 반복하게 한다.

```js
const targetStr = 'AA AB BB CC DDD ZZ Aa Bb';

// 첫번째 문자가 'A' 또는 'B'가 이고 그 이후에 'A' 또는 'B'가 되는 경우를 반복검색한다.

const regexr = /[AB]+/g;

console.log(targetStr.match(regexr)); // AA', 'AB', 'BB', 'A', 'B' 
```


범위를 지정하려면 `[]`내에 `-`를 사용한다. 아래의 경우 대문자 알파벳을 추출한다.

```js
const targetStr = 'AA AB BB CC DDD ZZ Aa Bb';

// 첫번째 문자가 'A' ~ 'C'이고 그 이후에도 'A' ~ 'C'가 오는 문자열을 검색
.

const regexr = /[A-C]+/g;

console.log(targetStr.match(regexr)); // 'AA', 'AB', 'BB', 'CC', 'A', 'B'
```

대소문자 구분없이 하려면 아래와 동일하게

```js
const targetStr = 'AA AB BB CC DDD ZZ Aa Bb';

// 첫번째 문자가 'A' ~ 'C'이고 그 이후에도 'A' ~ 'C'가 오는 문자열을 검색


const regexr = /[A-Ca-c]+/g;

console.log(targetStr.match(regexr)); // 'AA', 'AB', 'BB', 'CC', 'Aa', 'Bb'
```

숫자 추출하는 방법1

```js
const targetStr = 'AA BB Aa Bb 24,000';

// '0' ~ '9' 또는 ','가 한번 이상 반복되는 문자열을 반복 검색
const regexr = /[0-9,]+/g;

console.log(targetStr.match(regexr)); // [ '24,000' ]
```

숫자 추출하는 방법2
이것을 간단히 표현하면 아래와 같다. `\d`는 숫자를 의미한다. `\D`는 `\d`와 반대로 동작한다.

```js

const targetStr = 'AA BB Aa Bb 24,000';

// '0' ~ '9' 또는 ','가 한번 이상 반복되는 문자열을 반복 검색
let regexr = /[\d,]+/g;

console.log(targetStr.match(regexr)); // [ '24,000' ]

// '0' ~ '9'가 아닌 문자(숫자가 아닌 문자) 또는 ','가 한번 이상 반복되는 문자열을 반복 검색
regexr = /[\D,]+/g;

console.log(targetStr.match(regexr)); // [ 'AA BB Aa Bb ', ',' ]
```

\w는 알파벳과 숫자를 의미한다. \W는 \w와 반대로 동작한다.

```js
const targetStr = 'AA BB Aa Bb 24,000';

// 알파벳과 숫자 또는 ','가 한번 이상 반복되는 문자열을 반복 검색
let regexr = /[\w,]+/g;

console.log(targetStr.match(regexr)); // [ 'AA', 'BB', 'Aa', 'Bb', '24,000' ]

// 알파벳과 숫자가 아닌 문자 또는 ','가 한번 이상 반복되는 문자열을 반복 검색
regexr = /[\W,]+/g;

console.log(targetStr.match(regexr)); // [ ' ', ' ', ' ', ' ', ',' ]
```


## 1.3 자주 사용하는 정규 표현식 패턴

특정 단어로 시작하는지 검사: `^`
특정 단어로 끝나는지 검사: `$`

```js
const url = 'http://example.com';

// 'http'로 시작하는지 검사
// ^ : 문자열의 처음을 의미한다.
const regexr1 = /^http:\/\//;
const regexr2 = /.com$/;

console.log(regexr1.test(url)); // true
console.log(regexr2.test(url)); // true
```

숫자인지 검사한다.

```js
const targetStr = '12345';

// 모두 숫자인지 검사
// [^]: 부정(not)을 의미한다. 얘를 들어 [^a-z]는 알파벳 소문자로 시작하지 않는 모든 문자를 의미한다.
// [] 바깥의 ^는 문자열의 처음을 의미한다.
const regexr = /^\d+$/;

console.log(regexr.test(targetStr)); // true
```

하나 이상의 공백으로 시작하는지 검사한다.

```js
const targetStr = ' Hi!';

// 1개 이상의 공백으로 시작하는지 검사
// \s : 여러 가지 공백 문자 (스페이스, 탭 등) => [\t\r\n\v\f]
const regexr = /^[\s]+/;   
// const regexr = /^[ ]+/;   // 동일한 기능

console.log(regexr.test(targetStr)); // true
```


아이디로 사용 가능한지 검사한다. (영문자, 숫자만 허용, 4~10자리)
```js
const id = 'abc123';

// 알파벳 대소문자 또는 숫자로 시작하고 끝나며 4 ~10자리인지 검사
// {4,10}: 4 ~ 10자리
const regexr = /^[A-Za-z0-9]{4,10}$/;

console.log(regexr.test(id)); // true
```

메일 주소 형식에 맞는지 검사한다.
```js
const email = 'ungmo2@gmail.com';

const regexr = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

console.log(regexr.test(email)); // true
```

핸드폰 번호 형식에 맞는지 검사한다.

```js
const cellphone = '010-1234-5678';

const regexr = /^\d{3}-\d{3,4}-\d{4}$/;

console.log(regexr.test(cellphone)); // true
```

특수 문자 포함 여부를 검사한다.

```js
const targetStr = 'abc#123';

// A-Za-z0-9 이외의 문자가 있는지 검사
let regexr = /[^A-Za-z0-9]/gi;

console.log(regexr.test(targetStr)); // true

// 아래 방식도 동작한다. 이 방식의 장점은 특수 문자를 선택적으로 검사할 수 있다.
regexr = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;

console.log(regexr.test(targetStr)); // true

// 특수 문자 제거
console.log(targetStr.replace(regexr, '')); // abc123
```

## Javascript 문법 관련

### 특정 패턴을 포함하는지 검사

`targetStr`이 `regexr`패턴을 포함하면 `true` , 포함하지 않으면 `false`
> regexr.test(targetStr);

```js
const cellphone = '010-1234-5678';
const regexr = /^\d{3}-\d{3,4}-\d{4}$/;
console.log(regexr.test(cellphone)); // true
```

### 특정 패턴과 매칭되는 string sequence를 찾기

`targetStr`에서 `regexr`패턴에 맞는 String sequence의 배열
> targetStr.match(regexr);


```js
const targetStr = 'AA BB 30,000 Aa Bb 24,000';

// '0' ~ '9'가 아닌 문자(숫자가 아닌 문자) 또는 ','가 한번 이상 반복되는 문자열을 반복 검색
regexr = /[\d,]+/g;
console.log(targetStr.match(regexr)); // ['30,000' '24,000' ]
```

## 참고

https://poiemaweb.com/js-regexp
