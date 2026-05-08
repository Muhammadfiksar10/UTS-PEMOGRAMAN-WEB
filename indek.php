<?php include 'koneksi.php'; ?>
<!DOCTYPE html>
<html>
<head>
    <title>CRUD Mahasiswa</title>
    <link rel="stylesheet" href="style.css"> <!-- Tambahkan CSS sederhana nanti -->
</head>
<body>
    <h2>Daftar Mahasiswa</h2>
    <a href="tambah.php">+ Tambah Mahasiswa</a>
    <table border="1" cellpadding="10">
        <tr>
            <th>No</th>
            <th>Foto</th>
            <th>NIM</th>
            <th>Nama</th>
            <th>Jurusan</th>
            <th>Aksi</th>
        </tr>
        <?php
        $query = mysqli_query($conn, "SELECT * FROM mahasiswa");
        $no = 1;
        while($d = mysqli_fetch_array($query)){
            ?>
            <tr>
                <td><?php echo $no++; ?></td>
                <td><img src="uploads/<?php echo $d['foto']; ?>" width="50"></td>
                <td><?php echo $d['nim']; ?></td>
                <td><?php echo $d['nama']; ?></td>
                <td><?php echo $d['jurusan']; ?></td>
                <td>
                    <a href="edit.php?id=<?php echo $d['id']; ?>">Edit</a> |
                    <a href="hapus.php?id=<?php echo $d['id']; ?>" onclick="return confirm('Yakin hapus?')">Hapus</a>
                </td>
            </tr>
            <?php 
        }
        ?>
    </table>
</body>
</html>