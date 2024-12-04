import fs from 'fs';
import Layanan from '../src/models/layanan.js';
import SubLayanan from '../src/models/subLayanan.js';

const insertSubLayanan = async () => {
    try {
        // Membaca file JSON
        const jsonData = fs.readFileSync('./data/subLayanan.json', 'utf8');
        const dataSubLayanan = JSON.parse(jsonData);

        // Loop untuk setiap entri dalam JSON
        for (const subLayanan of dataSubLayanan) {
            // Cari layanan berdasarkan `layanan_nama`
            const layanan = await Layanan.findOne({
                where: { name: subLayanan.layanan_nama },
            });

            if (layanan) {
                // Tambahkan `layanan_id` ke data subLayanan
                const subLayananData = {
                    nama: subLayanan.nama,
                    deskripsi: subLayanan.deskripsi,
                    layanan_id: layanan.id, // Ambil ID dari hasil pencarian
                };

                // Simpan data ke tabel subLayanan
                await SubLayanan.create(subLayananData);
            } else {
                console.warn(
                    `Layanan "${subLayanan.layanan_nama}" tidak ditemukan.`,
                );
            }
        }

        console.log('Data subLayanan berhasil dimasukkan ke database.');
    } catch (error) {
        console.error('Gagal memasukkan data subLayanan:', error.message);
    }
};

insertSubLayanan();
