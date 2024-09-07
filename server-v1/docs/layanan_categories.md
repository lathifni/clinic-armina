# Address API Specification

## Create Kategori Layanan API

-   Endpoint : POST /api/layanan/kategori
-   Header : Authorization : Bearer <acess_token>
-   Request Body :

```json
{
    "nama": "dokter gigi"
}
```

-   Response : "OK"

## Update Layanan Kategori

-   Endpoint : PUT /api/layanan/kategori/{id}
-   Header : Authorization : Bearer <acess_token>
-   Request Body :

```json
{
    "nama": "dokter kandungan"
}
```

## Delete Kategori

-   Endpoint : DELETE /api/layanan/kategori/{id}
-   Header : Authorization : Bearer <acess_token>

## Read Kategori

-   Endpoint : GET /api/layanan/kategori
