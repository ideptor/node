# install

## system configuration

system path 에 잡아주기 : 보통 `C:\Program Files\MongoDB\Server\4.2\bin` 에 위치

## running mongo  
```
mongod --dbpath C:\workspace\mongo\shopping\database
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

## 데이터 베이스 지정

```
MongoDB Enterprise > use shopping
switched to db shopping
MongoDB Enterprise >
```

## 데이터 베이스에 데이터 추가

```
MongoDB Enterprise > db.users.insert({"name":"girl's age", "age":20})
WriteResult({ "nInserted" : 1 })
MongoDB Enterprise > db.users.find().pretty()
{
        "_id" : ObjectId("5debb81fd5fc28048f95cc71"),
        "name" : "girl's age",
        "age" : 20
}
MongoDB Enterprise >
```

