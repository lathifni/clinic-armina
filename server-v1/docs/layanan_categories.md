# Address API Specification

## Create Kategori Layanan API

-   Endpoint : POST /api/layanan/kategori
-   Header : Authorization : Bearer <acess_token>
-   Request Body (multipart/form-data):

```
nama: (text) - Example: "Dokter Gigi"
description: (text)
image: (file) - The image file to upload.
```

-   Response(Success) :

```json
{
    "errors": null,
    "message": "Kategori baru berhasil ditambahkan",
    "data": {
        "id": 3,
        "name": "Dokter Bedah",
        "description": "Menangani Bedah",
        "image": "assets\\images\\layananKategori\\1725972201481.jpg",
        "updatedAt": "2024-09-10T12:43:21.506Z",
        "createdAt": "2024-09-10T12:43:21.506Z"
    }
}
```

-   Response (Bad Request)

```json
{
    "errors": ["name is required"],
    "message": "Gagal menambahkan kategori",
    "data": null
}
```

## Update Layanan Kategori

-   Endpoint : PUT /api/layanan/kategori/{id}
-   Header : Authorization : Bearer <acess_token>
-   Request Body :

```
nama: (text) - Example: "Dokter Gigi"
description: (text)
image: (file) - The image file to upload.
```

-   Response (Success) :

```json
{
    "errors": [],
    "message": "Update Kategori success",
    "data": {
        "name": "Dokter Bedah",
        "description": "Menangani Bedah",
        "image": "assets\\images\\layananKategori\\1725973678698.jpg"
    }
}
```

-   Response (Not Found)

```json
{
    "errors": ["Kategori not found"],
    "message": "Update Kategori gagal",
    "data": null
}
```

-   Response (Bad Request)

```json
{
    "errors": ["name is required"],
    "message": "Gagal update kategori",
    "data": {
        "name": ""
    }
}
```

## Delete Kategori

-   Endpoint : DELETE /api/layanan/kategori/{id}
-   Header : Authorization : Bearer <acess_token>

-   Response (Success) :

```json
{
    "errors": [],
    "message": "Delete Kategori success",
    "data": null
}
```

-   Response (Not Found) :

```json
{
    "errors": ["Kategori not found"],
    "message": "Delete Kategori gagal",
    "data": null
}
```

## Read Kategori

-   Endpoint : GET /api/layanan/kategori
-   Response (Success) :

```json
{
    "errors": [],
    "message": "Get Kategori success",
    "data": [
        {
            "id": 2,
            "name": "Dokter Kandungan",
            "image": "assets\\images\\layananKategori\\1725957570511.jpg",
            "description": "Menangani kandungan",
            "createdAt": "2024-09-10 15:39:30",
            "updatedAt": "2024-09-10 15:39:30"
        },
        {
            "id": 1,
            "name": "Dokter Umum",
            "image": null,
            "description": "Menangani kandungan",
            "createdAt": "2024-09-10 15:29:54",
            "updatedAt": "2024-09-10 15:29:54"
        }
    ],
    "limit": 10,
    "totalRows": 2,
    "totalPage": 1
}
```

-   Response (Not Found) :

```json
{
    "errors": ["Kategori tidak ditemukan"],
    "message": "Get Kategori gagal",
    "data": null
}
```
