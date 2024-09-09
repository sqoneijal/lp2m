<?php
$exp_keterampilan = explode(',', $keterampilan_khusus);
?>
<!DOCTYPE html>
<html>
<head>
	<title>Biodata</title>
	<style>
		.table {
			width: 100%;
			border-collapse: collapse;
		}
		.table, .table tr, .table td {
			border: 1px solid black;
			border-style: dotted;
		}
		@media print{@page {size: portrait}}
	</style>
</head>
<body onload="window.print();">
	<table style="width: 100%;">
		<tbody>
			<tr>
				<td style="text-align: center;"><span style="font-size: 20px;">BIODATA</span></td>
				<td rowspan="3" style="text-align: right; width: 10%; vertical-align: top;">
					<img src="<?php echo base_url('upload/' . $foto);?>" alt="Foto" style="height: 100px; width: 95px;" />
				</td>
			</tr>
			<tr>
				<td style="text-align: center;">
					PESERTA KULIAH PENGABDIAN MASYARAKAT <br/>
					MAHASISWA UIN AR-RANIRY GELOMBANG 1 SEMESTER GENAP<br/>
					TAHUN AKADEMIK 2022/2023
				</td>
			</tr>
			<tr>
				<th>Jenis KPM : <?php echo $nama_jenis_kpm;?></th>
			</tr>
		</tbody>
	</table>
	<table class="table">
		<tbody>
			<tr>
				<td style="text-align: center; width: 5%;">1</td>
				<td style="padding-left: 10px; width: 40%;">Nama</td>
				<td style="padding-left: 10px;"><?php echo $nama;?></td>
			</tr>
			<tr>
				<td style="text-align: center;">2</td>
				<td style="padding-left: 10px;">Tempat / Tanggal Lahir</td>
				<td style="padding-left: 10px;"><?php echo $tpt_lahir;?>, <?php echo tgl_indo($tgl_lahir);?></td>
			</tr>
			<tr>
				<td style="text-align: center;">3</td>
				<td style="padding-left: 10px;">Jenis Kelamin</td>
				<td style="padding-left: 10px;"><?php echo jekel($jk);?></td>
			</tr>
			<tr>
				<td style="text-align: center;">4</td>
				<td style="padding-left: 10px;">Alamat</td>
				<td style="padding-left: 10px;"><?php echo $alamat;?></td>
			</tr>
			<tr>
				<td style="text-align: center;">5</td>
				<td style="padding-left: 10px;">Fakultas / Jurusan</td>
				<td style="padding-left: 10px;"><?php echo $nama_fakultas;?> / <?php echo $nama_prodi;?></td>
			</tr>
			<tr>
				<td style="text-align: center;">6</td>
				<td style="padding-left: 10px;">Nomor Induk Mahasiswa</td>
				<td style="padding-left: 10px;"><?php echo $nim;?></td>
			</tr>
			<tr>
				<td style="text-align: center; vertical-align: top;" rowspan="3">7</td>
				<td style="padding-left: 10px;">a. Nama Orang Tua</td>
				<td style="padding-left: 10px;"><?php echo $ayah_nama;?></td>
			</tr>
			<tr>
				<td style="padding-left: 10px;">b. Pekerjaan Orang Tua</td>
				<td style="padding-left: 10px;"><?php echo $pekerjaan_ayah;?></td>
			</tr>
			<tr>
				<td style="padding-left: 10px;">c. Alamat Orang Tua</td>
				<td style="padding-left: 10px;"><?php echo $ayah_alamat;?></td>
			</tr>
			<tr>
				<td style="text-align: center;">8</td>
				<td style="padding-left: 10px;">IPK Transkrip</td>
				<td style="padding-left: 10px;"><?php echo $ipk;?></td>
			</tr>
			<tr>
				<td style="text-align: center;">9</td>
				<td style="padding-left: 10px;">Pendidikan Terakhir Sebelum Masuk UIN</td>
				<td style="padding-left: 10px;"><?php echo $pendidikan_sebelumnya;?></td>
			</tr>
			<tr>
				<td style="text-align: center;">10</td>
				<td style="padding-left: 10px;">Status Perkawinan</td>
				<td style="padding-left: 10px;"><?php echo statusPerkawinan($status_perkawinan);?></td>
			</tr>
			<tr>
				<td style="text-align: center; vertical-align: top;" rowspan="<?php echo count($exp_keterampilan);?>">11</td>
				<td style="vertical-align: top; padding-left: 10px;" rowspan="<?php echo count($exp_keterampilan);?>">Keterampilan Khusus</td>
				<td style="padding-left: 10px;">
					<?php
					if (count($exp_keterampilan) > 0) {
						echo '- ' . $exp_keterampilan[0];
					}
					?>
				</td>
			</tr>
			<?php
			if (count($exp_keterampilan) > 1) {
				for ($i = 0; $i < count($exp_keterampilan); $i++) {
					if ($i !== 0) {
						echo '<tr>';
						echo '<td style="padding-left: 10px;">- '.$exp_keterampilan[$i].'</td>';
						echo '</tr>';
					}
				}
			}
			?>
			<tr>
				<td style="text-align: center;">12</td>
				<td style="padding-left: 10px;">Organisasi</td>
				<td style="padding-left: 10px;"><?php echo $organisasi;?></td>
			</tr>
			<tr>
				<td style="text-align: center;">13</td>
				<td style="padding-left: 10px;">Nomor Peserta</td>
				<td style="padding-left: 10px;"><?php echo $nomor_peserta;?></td>
			</tr>
			<tr>
				<td style="text-align: center;">14</td>
				<td style="padding-left: 10px;">Alamat Lengkap di Banda Aceh</td>
				<td style="padding-left: 10px;"><?php echo $alamat_di_banda_aceh;?></td>
			</tr>
			<tr>
				<td style="text-align: center;">15</td>
				<td style="padding-left: 10px;">Telepon / HP</td>
				<td style="padding-left: 10px;"><?php echo $telp;?></td>
			</tr>
			<tr>
				<td style="text-align: center;">16</td>
				<td style="padding-left: 10px;">E-mail</td>
				<td style="padding-left: 10px;"><?php echo $email;?></td>
			</tr>
			<tr>
				<td style="text-align: center;">17</td>
				<td style="padding-left: 10px;">Ukuran Baju Jaket</td>
				<td style="padding-left: 10px;"><?php echo $ukuran_baju;?></td>
			</tr>
			<tr>
				<td style="text-align: center;">18</td>
				<td style="padding-left: 10px;">Jenis penyakit yang sering dialami</td>
				<td style="padding-left: 10px;"><?php echo $penyakit;?></td>
			</tr>
		</tbody>
	</table>
	<p>Dengan ini saya menyataka siap ditempatkan di mana saja pada lokasi yang ditentukan oleh UIN Ar-Raniry dan Pemerintah Daerah (PEMDA) serta segala pengurusan tidak saya wakilkan kepada pihak lain.</p>
	<table style="width: 100%;">
		<tbody>
			<tr>
				<td style="width: 70%;">&nbsp;</td>
				<td style="text-align: center;">
					Banda Aceh, <?php echo tgl_indo(date('Y-m-d', strtotime($uploaded)));?><br/><br/><br/><br/><br/>
					<?php echo $nama;?>
            </td>
			</tr>
		</tbody>
	</table>
</body>
</html>