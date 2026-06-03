-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for fano
CREATE DATABASE IF NOT EXISTS `fano` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `fano`;

-- Dumping structure for table fano.kategori
CREATE TABLE IF NOT EXISTS `kategori` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nama` varchar(50) NOT NULL,
  `warna` varchar(7) NOT NULL,
  `bg_color` varchar(7) NOT NULL,
  `urutan` smallint DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `nama` (`nama`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table fano.kategori: ~6 rows (approximately)
INSERT INTO `kategori` (`id`, `nama`, `warna`, `bg_color`, `urutan`) VALUES
	(1, 'Legislasi', '#185FA5', '#E6F1FB', 1),
	(2, 'Operasional', '#0F6E56', '#E1F5EE', 2),
	(3, 'Pemasaran', '#854F0B', '#FAEEDA', 3),
	(4, 'Klien & Layanan', '#533AB7', '#EEEDFE', 4),
	(5, 'Keuangan', '#A32D2D', '#FCEBEB', 5),
	(6, 'Tim & SDM', '#993556', '#FBEAF0', 6);

-- Dumping structure for table fano.kegiatan
CREATE TABLE IF NOT EXISTS `kegiatan` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `bulan` smallint NOT NULL,
  `kategori_id` int NOT NULL,
  `kegiatan` text NOT NULL,
  `penanggung_jawab` varchar(100) DEFAULT NULL,
  `keterangan` text,
  `status` varchar(20) NOT NULL DEFAULT 'Belum Mulai',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `idx_kegiatan_bulan` (`bulan`),
  KEY `idx_kegiatan_status` (`status`),
  CONSTRAINT `kegiatan_chk_1` CHECK ((`bulan` between 1 and 12)),
  CONSTRAINT `kegiatan_chk_2` CHECK ((`status` in (_utf8mb4'Belum Mulai',_utf8mb4'Sedang Berjalan',_utf8mb4'Selesai')))
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table fano.kegiatan: ~9 rows (approximately)
INSERT INTO `kegiatan` (`id`, `bulan`, `kategori_id`, `kegiatan`, `penanggung_jawab`, `keterangan`, `status`, `created_at`, `updated_at`) VALUES
	(1, 1, 1, 'Proses notaris pendirian CV (akta pendirian)', 'Notaris', 'Selesai bulan ini', 'Selesai', '2026-06-03 05:12:58', '2026-06-03 05:12:58'),
	(2, 1, 1, 'Pengurusan NPWP perusahaan & NIB via OSS', 'Direktur', 'Selesai bulan ini', 'Selesai', '2026-06-03 05:12:58', '2026-06-03 05:12:58'),
	(3, 1, 2, 'Buka rekening bank atas nama perusahaan', 'Direktur', 'Proses verifikasi', 'Sedang Berjalan', '2026-06-03 05:12:58', '2026-06-03 05:12:58'),
	(4, 2, 3, 'Finalisasi logo, identitas merek, dan materi cetak', 'Desainer', '', 'Selesai', '2026-06-03 05:12:58', '2026-06-03 05:12:58'),
	(5, 2, 2, 'Setup email perusahaan & Google Workspace', 'IT/Admin', '', 'Belum Mulai', '2026-06-03 05:12:58', '2026-06-03 05:12:58'),
	(6, 3, 5, 'Implementasi sistem akuntansi & pencatatan keuangan', 'Akuntan', '', 'Belum Mulai', '2026-06-03 05:12:58', '2026-06-03 05:12:58'),
	(7, 3, 6, 'Rekrutmen staf operasional pertama', 'Direktur', '', 'Belum Mulai', '2026-06-03 05:12:58', '2026-06-03 05:12:58'),
	(8, 4, 4, 'Launching layanan pertama ke koperasi pilot', 'Sales', '', 'Belum Mulai', '2026-06-03 05:12:58', '2026-06-03 05:12:58'),
	(9, 6, 5, 'Evaluasi laporan keuangan semester pertama', 'Akuntan', 'Review Q1-Q2', 'Belum Mulai', '2026-06-03 05:12:58', '2026-06-03 05:12:58');

-- Dumping structure for table fano.strategi
CREATE TABLE IF NOT EXISTS `strategi` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipe` enum('SO','WO','ST','WT') NOT NULL,
  `urutan` int NOT NULL,
  `strategi` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table fano.strategi: ~12 rows (approximately)
INSERT INTO `strategi` (`id`, `tipe`, `urutan`, `strategi`, `created_at`, `updated_at`) VALUES
	(1, 'SO', 1, 'Manfaatkan keahlian tim untuk menyasar koperasi yang mengajukan pembiayaan LPDB', '2026-06-03 08:44:15', '2026-06-03 08:44:15'),
	(2, 'SO', 2, 'Kembangkan layanan digital (konsultasi online) untuk jangkau koperasi luar daerah', '2026-06-03 08:44:15', '2026-06-03 08:44:15'),
	(3, 'SO', 3, 'Bangun kemitraan dengan dinas koperasi kab/kota sebagai mitra pelatihan resmi', '2026-06-03 08:44:15', '2026-06-03 08:44:15'),
	(4, 'WO', 1, 'Bangun portofolio melalui proyek perdana dengan tarif kompetitif/success fee', '2026-06-03 08:44:15', '2026-06-03 08:44:15'),
	(5, 'WO', 2, 'Ikuti program sertifikasi konsultan dari lembaga terakreditasi', '2026-06-03 08:44:15', '2026-06-03 08:44:15'),
	(6, 'WO', 3, 'Manfaatkan media sosial sebagai promosi berbiaya rendah untuk kurangi keterbatasan modal', '2026-06-03 08:44:15', '2026-06-03 08:44:15'),
	(7, 'ST', 1, 'Tonjolkan nilai layanan satu atap yang tidak bisa diberikan konsultan individual', '2026-06-03 08:44:15', '2026-06-03 08:44:15'),
	(8, 'ST', 2, 'Bangun database regulasi yang selalu diperbarui untuk jaga kualitas layanan', '2026-06-03 08:44:15', '2026-06-03 08:44:15'),
	(9, 'ST', 3, 'Tawarkan layanan retainer bulanan dengan tarif terjangkau untuk koperasi', '2026-06-03 08:44:15', '2026-06-03 08:44:15'),
	(10, 'WT', 1, 'Susun SOP internal yang kuat untuk meminimalkan risiko kesalahan layanan', '2026-06-03 08:44:15', '2026-06-03 08:44:15'),
	(11, 'WT', 2, 'Bangun dana cadangan untuk jaga kelangsungan operasional saat klien masih sedikit', '2026-06-03 08:44:15', '2026-06-03 08:44:15'),
	(12, 'WT', 3, 'Mulai dari segmen koperasi dengan anggaran memadai (KSP besar, koperasi BUMN)', '2026-06-03 08:44:15', '2026-06-03 08:44:15');

-- Dumping structure for table fano.swot_items
CREATE TABLE IF NOT EXISTS `swot_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `kategori` enum('S','W','O','T') NOT NULL,
  `urutan` int NOT NULL,
  `deskripsi` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table fano.swot_items: ~10 rows (approximately)
INSERT INTO `swot_items` (`id`, `kategori`, `urutan`, `deskripsi`, `created_at`, `updated_at`) VALUES
	(1, 'S', 1, 'Tim profesional berpengalaman di bidang koperasi', '2026-06-03 08:44:15', '2026-06-03 08:44:15'),
	(2, 'S', 2, 'Layanan satu atap (one-stop solution) untuk semua kebutuhan koperasi', '2026-06-03 08:44:15', '2026-06-03 08:44:15'),
	(3, 'S', 3, 'Jaringan kemitraan dengan notaris dan lembaga keuangan', '2026-06-03 08:44:15', '2026-06-03 08:44:15'),
	(4, 'S', 4, 'Kemampuan digital: pemasaran aplikasi operasional koperasi', '2026-06-03 08:44:15', '2026-06-03 08:44:15'),
	(5, 'S', 5, 'Layanan gratis sebagai value-added dan alat akuisisi klien', '2026-06-03 08:44:15', '2026-06-03 08:44:15'),
	(6, 'S', 6, 'Biaya operasional rendah (tim kecil, sangat efisien)', '2026-06-03 08:44:15', '2026-06-03 08:44:15'),
	(7, 'S', 7, 'Fleksibel dan responsif terhadap kebutuhan klien', '2026-06-03 08:44:15', '2026-06-03 08:44:15'),
	(8, 'S', 8, 'Pemahaman mendalam regulasi UU No. 25/1992 dan turunannya', '2026-06-03 08:44:15', '2026-06-03 08:44:15'),
	(9, 'W', 1, 'Tim hanya 3 orang — kapasitas terbatas, risiko bottleneck', '2026-06-03 08:44:15', '2026-06-03 08:44:15'),
	(10, 'W', 2, 'Merek baru, belum memiliki track record dan portofolio', '2026-06-03 08:44:15', '2026-06-03 08:44:15'),
	(11, 'W', 3, 'Modal awal terbatas untuk promosi dan operasional', '2026-06-03 08:44:15', '2026-06-03 08:44:15'),
	(12, 'W', 4, 'Keterbatasan jangkauan geografis (tanpa representasi daerah)', '2026-06-03 08:44:15', '2026-06-03 08:44:15'),
	(13, 'W', 5, 'Bergantung pada individu kunci (key person risk)', '2026-06-03 08:44:15', '2026-06-03 08:44:15'),
	(14, 'W', 6, 'Belum memiliki sertifikasi konsultan resmi terakreditasi', '2026-06-03 08:44:15', '2026-06-03 08:44:15'),
	(15, 'W', 7, 'Kapasitas penanganan klien simultan terbatas', '2026-06-03 08:44:15', '2026-06-03 08:44:15'),
	(16, 'O', 1, '127.000+ koperasi aktif di Indonesia membutuhkan pendampingan', '2026-06-03 08:44:15', '2026-06-03 08:44:15'),
	(17, 'O', 2, 'Kebijakan pemerintah mendorong pengembangan koperasi (PP No. 7/2021)', '2026-06-03 08:44:15', '2026-06-03 08:44:15'),
	(18, 'O', 3, 'Digitalisasi koperasi menjadi program prioritas Kemenkop UKM', '2026-06-03 08:44:15', '2026-06-03 08:44:15'),
	(19, 'O', 4, 'Tersedianya dana pembiayaan LPDB-KUMKM yang terus meningkat', '2026-06-03 08:44:15', '2026-06-03 08:44:15'),
	(20, 'O', 5, 'Regulasi baru mewajibkan standarisasi dokumen koperasi', '2026-06-03 08:44:15', '2026-06-03 08:44:15'),
	(21, 'O', 6, 'Tumbuhnya koperasi desa/kelurahan (Kopdes Merah Putih)', '2026-06-03 08:44:15', '2026-06-03 08:44:15'),
	(22, 'O', 7, 'Layanan digital memungkinkan jangkauan ke seluruh Indonesia', '2026-06-03 08:44:15', '2026-06-03 08:44:15'),
	(23, 'O', 8, 'Pasar konsultan koperasi yang masih sangat sedikit kompetitornya', '2026-06-03 08:44:15', '2026-06-03 08:44:15'),
	(24, 'T', 1, 'Persaingan dari konsultan individual berpengalaman berbiaya rendah', '2026-06-03 08:44:15', '2026-06-03 08:44:15'),
	(25, 'T', 2, 'Perubahan regulasi perkoperasian yang cepat dan tidak terprediksi', '2026-06-03 08:44:15', '2026-06-03 08:44:15'),
	(26, 'T', 3, 'Resistensi koperasi terhadap penggunaan jasa konsultan eksternal', '2026-06-03 08:44:15', '2026-06-03 08:44:15'),
	(27, 'T', 4, 'Keterbatasan anggaran koperasi untuk membayar jasa konsultasi', '2026-06-03 08:44:15', '2026-06-03 08:44:15'),
	(28, 'T', 5, 'Munculnya platform digital yang menyediakan template dokumen gratis', '2026-06-03 08:44:15', '2026-06-03 08:44:15'),
	(29, 'T', 6, 'Risiko reputasi akibat kesalahan dalam layanan yang diberikan', '2026-06-03 08:44:15', '2026-06-03 08:44:15'),
	(30, 'T', 7, 'Kompetisi dari lembaga pendidikan dan BDS providers', '2026-06-03 08:44:15', '2026-06-03 08:44:15');

-- Dumping structure for table fano.tracker_bulanan
CREATE TABLE IF NOT EXISTS `tracker_bulanan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bulan` int NOT NULL,
  `bulan_nama` varchar(20) NOT NULL,
  `fase` varchar(50) NOT NULL,
  `status_fase` varchar(50) NOT NULL DEFAULT 'Belum dimulai',
  `target_klien` int DEFAULT '0',
  `klien_aktual` int DEFAULT '0',
  `target_omset` decimal(15,2) DEFAULT '0.00',
  `omset_aktual` decimal(15,2) DEFAULT '0.00',
  `catatan` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table fano.tracker_bulanan: ~12 rows (approximately)
INSERT INTO `tracker_bulanan` (`id`, `bulan`, `bulan_nama`, `fase`, `status_fase`, `target_klien`, `klien_aktual`, `target_omset`, `omset_aktual`, `catatan`, `created_at`, `updated_at`) VALUES
	(1, 1, 'Jan', 'Fondasi', 'Belum dimulai', 0, 0, 0.00, 0.00, '', '2026-06-03 07:52:14', '2026-06-03 07:52:14'),
	(2, 2, 'Feb', 'Fondasi', 'Belum dimulai', 0, 0, 0.00, 0.00, '', '2026-06-03 07:52:14', '2026-06-03 07:52:14'),
	(3, 3, 'Mar', 'Fondasi', 'Belum dimulai', 2, 0, 5000000.00, 0.00, '', '2026-06-03 07:52:14', '2026-06-03 07:52:14'),
	(4, 4, 'Apr', 'Traction', 'Belum dimulai', 3, 0, 8000000.00, 0.00, '', '2026-06-03 07:52:14', '2026-06-03 07:52:14'),
	(5, 5, 'Mei', 'Traction', 'Belum dimulai', 5, 0, 12000000.00, 0.00, '', '2026-06-03 07:52:14', '2026-06-03 07:52:14'),
	(6, 6, 'Jun', 'Traction', 'Belum dimulai', 5, 0, 12000000.00, 0.00, '', '2026-06-03 07:52:14', '2026-06-03 07:52:14'),
	(7, 7, 'Jul', 'Pertumbuhan', 'Belum dimulai', 7, 0, 15000000.00, 0.00, '', '2026-06-03 07:52:14', '2026-06-03 07:52:14'),
	(8, 8, 'Agu', 'Pertumbuhan', 'Belum dimulai', 8, 0, 15000000.00, 0.00, '', '2026-06-03 07:52:14', '2026-06-03 07:52:14'),
	(9, 9, 'Sep', 'Pertumbuhan', 'Belum dimulai', 10, 0, 18000000.00, 0.00, '', '2026-06-03 07:52:14', '2026-06-03 07:52:14'),
	(10, 10, 'Okt', 'Konsolidasi', 'Belum dimulai', 11, 0, 20000000.00, 0.00, '', '2026-06-03 07:52:14', '2026-06-03 07:52:14'),
	(11, 11, 'Nov', 'Konsolidasi', 'Belum dimulai', 13, 0, 25000000.00, 0.00, '', '2026-06-03 07:52:14', '2026-06-03 07:52:14'),
	(12, 12, 'Des', 'Konsolidasi', 'Belum dimulai', 15, 0, 20000000.00, 0.00, '', '2026-06-03 07:52:14', '2026-06-03 07:52:14');

-- Dumping structure for table fano.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `role` varchar(50) DEFAULT 'admin',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table fano.users: ~0 rows (approximately)
INSERT INTO `users` (`id`, `email`, `password`, `name`, `role`, `created_at`) VALUES
	(1, 'noehen93@gmail.com', '$2y$12$Tc802ntKOxrIVYPxo3pBJesUIWLxgn4l.h.foQfFdAzEdGXx2oMkm', 'Administrator', 'admin', '2026-06-03 04:33:39');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
