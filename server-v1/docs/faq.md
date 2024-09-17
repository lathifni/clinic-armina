# Faq API Specification

## Create Faq API

-   Endpoint : POST /api/faq
-   Header : Authorization : Bearer <access_token>
-   Request Body (json) :

```json
{
    "pertanyaan": "apa pertanyaannya?",
    "jawaban": "ini jawabannya"
}
```

-   Response (success) :

```json
{
    "errors": null,
    "message": "Faq berhasil ditambahkan",
    "data": {
        "id": 1,
        "pertanyaan": "apa pertanyaannya?",
        "jawaban": "ini jawabannya",
        "updatedAt": "2024-09-17T15:47:11.785Z",
        "createdAt": "2024-09-17T15:47:11.785Z"
    }
}
```

-   Response (Bad Request) :

```json
{
    "errors": ["pertanyaan is required", "jawaban is required"],
    "message": "Gagal menambahkan faq",
    "data": null
}
```

## Update Faq API

-   Endpoint : PUT /api/faq/{id}
-   Header : Authorization : Bearer <access_token>
-   Request Body (json) :

```json
{
    "pertanyaan": "apa ganti pertanyaannya??",
    "jawaban": "ini jawaban baru"
}
```

-   Response (success) :

```json
{
    "errors": [],
    "message": "Update Faq success",
    "data": {
        "pertanyaan": "apa ganti pertanyaannya??",
        "jawaban": "ini jawaban baru"
    }
}
```

-   Response (Not Found) :

```json
{
    "errors": ["Faq Not Found"],
    "message": "Update Faq Gagal",
    "data": null
}
```

-   Response (Bad Request) :

```json
{
    "errors": ["pertanyaan is required", "jawaban is required"],
    "message": "Gagal update faq",
    "data": {}
}
```

## Delete Faq API

-   Endpoint : DELETE /api/faq/{id}
-   Header : Authorization : Bearer <access_token>
-   Response (Success) :

```json
{
    "errors": [],
    "message": "Delete Faq success",
    "data": null
}
```

-   Response (Not Found):

```json
{
    "errors": ["Faq not found"],
    "message": "Delete Faq gagal",
    "data": null
}
```

## Get (Search) Faq API

-   Endpoint : GET /api/faq
-   Query Param :

1. search: String, pertanyaan, using like query, optional
2. page : Integer, start from 0, default 0
3. limit : Integer, default 10

-   Response (Success) :

```json
{
    "errors": [],
    "message": "Get Faq success",
    "data": [
        {
            "id": 1,
            "pertanyaan": "apa ganti pertanyaannya??",
            "jawaban": "ini jawaban baru",
            "createdAt": "2024-09-17 22:47:11",
            "updatedAt": "2024-09-17 22:51:14"
        }
    ],
    "limit": 10,
    "totalRows": 1,
    "totalPage": 1
}
```
