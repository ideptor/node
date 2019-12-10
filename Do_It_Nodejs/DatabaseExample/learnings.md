# install

## system configuration

system path 에 잡아주기 : 보통 `C:\Program Files\MongoDB\Server\4.2\bin` 에 위치

## 데이터베이스 만들기

`directories` for `dbpath` should be created before the command below
```
mongod --dbpath C:\workspace\mongo\shopping\database

2019-12-10T02:34:26.155-0700 I  CONTROL  [main] Automatically disabling TLS 1.0, to force-enable TLS 1.0 specify --sslDisabledProtocols 'none'
2019-12-10T02:34:26.158-0700 I  CONTROL  [initandlisten] MongoDB starting : pid=6352 port=27017 dbpath=C:\workspace\mongo\shopping\database 64-bit host=DESKTOP-NSHOE0F
2019-12-10T02:34:26.158-0700 I  CONTROL  [initandlisten] targetMinOS: Windows 7/Windows Server 2008 R2
2019-12-10T02:34:26.159-0700 I  CONTROL  [initandlisten] db version v4.2.2
2019-12-10T02:34:26.159-0700 I  CONTROL  [initandlisten] git version: a0bbbff6ada159e19298d37946ac8dc4b497eadf
2019-12-10T02:34:26.159-0700 I  CONTROL  [initandlisten] allocator: tcmalloc
...
2019-12-10T02:34:26.544-0700 I  INDEX    [LogicalSessionCacheRefresh] index build: inserted 0 keys from external sorter into index in 0 seconds
2019-12-10T02:34:26.551-0700 I  INDEX    [LogicalSessionCacheRefresh] index build: done building index lsidTTLIndex on ns config.system.sessions
2019-12-10T02:34:27.005-0700 I  SHARDING [ftdc] Marking collection local.oplog.rs as collection version: <unsharded>

```

## connect

```
PS C:\workspace\mongo\shopping> mongo
MongoDB shell version v4.2.1
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("fe32adce-d352-48de-a4b5-2b9c28c8dd3a") }
MongoDB server version: 4.2.1
Server has startup warnings:
...

MongoDB Enterprise > 
```

## 작업대상 데이터 베이스 지정

```
MongoDB Enterprise > use shopping
switched to db shopping
MongoDB Enterprise >
```

## 데이터 베이스에 데이터 추가

추가하기
```
MongoDB Enterprise > db.users.insert({"name":"girl's age", "age":20})
WriteResult({ "nInserted" : 1 })
```
내용보기
```
MongoDB Enterprise > db.users.find().pretty()
{
        "_id" : ObjectId("5debb81fd5fc28048f95cc71"),
        "name" : "girl's age",
        "age" : 20
}
```

## 데이터 지우기

```
MongoDB Enterprise > db.users.remove({"name":/girl/})
WriteResult({ "nRemoved" : 1 })
MongoDB Enterprise > db.users.find().pretty()
MongoDB Enterprise >   
```

## 실헝데이터 입력하기

