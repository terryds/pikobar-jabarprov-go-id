<template>
  <div class="container mx-auto">
    <div class="container mx-4 p-5 max-w-3xl mx-auto">
      <h3 class="text-3xl text-gray-900 font-bold text-left leading-none" style="margin-bottom: 10px; ">
        Dashboard Kasus COVID-19 Provinsi Jawa Barat
      </h3>
      <span style="font-size: smaller;">*Terakhir diupdate 16 Maret 2020 12:00</span>
      <br>
      <br>

      <section class="row">
        <div
          class="p-1 col-md m-2 "
          style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05), 0 4px 24px 0 rgba(0,0,0,0.1); background-color: #FCDFE0 !important; border: solid 1px #FFB4B5; ">
          <h4 class="m-3" style="color: #4F4F4F;"><b>POSITIF COVID-19</b></h4>
          <h3 class="m-3" style="font-size: 30px;"><b>2</b></h3>
        </div>
        <div
          class="p-1 col-md m-2 "
          style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05), 0 4px 24px 0 rgba(0,0,0,0.1); background-color: #D6E6F7 !important; border: solid 1px #9BC8F4; ">
          <h4 class="m-3" style="color: #4F4F4F;"><b>PERAWATAN</b></h4>
          <h3 class="m-3" style="font-size: 30px;"><b>3</b></h3>
        </div>
        <div
          class="p-1 col-md m-2 "
          style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05), 0 4px 24px 0 rgba(0,0,0,0.1); background-color: #D3EEE3 !important; border: solid 1px #91DCBD; ">
          <h4 class="m-3" style="color: #4F4F4F;"><b>SEMBUH</b></h4>
          <h3 class="m-3" style="font-size: 30px;"><b>4</b></h3>
        </div>
        <div
          class="p-1 col-md m-2 "
          style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05), 0 4px 24px 0 rgba(0,0,0,0.1); background-color: #FBEADF !important; border: solid 1px #FED1B1; ">
          <h4 class="m-3" style="color: #4F4F4F;"><b>MENINGGAL</b></h4>
          <h3 class="m-3" style="font-size: 30px;"><b>5</b></h3>
        </div>
      </section>

      <section class="row">
        <div
          class="bg-white p-1 col-md m-2"
          style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05), 0 4px 24px 0 rgba(0,0,0,0.1);">
          <h4 class="m-3"><b>ODP (Orang Dalam Pemantauan)</b></h4>
          <hr>
          <div class="row p-2">
            <div class="col-md m-2 mr-5">
              <span style="color: #0082ED; font-size: 30px; font-weight: bold;">804</span><br>
              <span style="color: #8A8A8A; font-weight: bold;">Total ODP</span>
            </div>
            <div class="col-md m-2">
              <span style="color: #0082ED; font-size: 30px; font-weight: bold;">270</span>
              <span style="color: #000000; font-size: 12px; font-weight: bold;">(33%)</span><br>
              <span style="color: #8A8A8A; font-weight: bold;">Proses Pemantauan</span>
            </div>
            <div class="col-md m-2">
              <span style="color: #0082ED; font-size: 30px; font-weight: bold;">534</span>
              <span style="color: #000000; font-size: 12px; font-weight: bold;">(67%)</span><br>
              <span style="color: #8A8A8A; font-weight: bold;">Selesai Pemantauan</span>
            </div>
          </div>
        </div>
        <div
          class="bg-white p-1 col-md m-2"
          style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05), 0 4px 24px 0 rgba(0,0,0,0.1);">
          <h4 class="m-3"><b>PDP (Pasien Dalam Pengawasan)</b></h4>
          <hr>
          <div class="row p-2">
            <div class="col-md m-2 mr-5">
              <span style="color: #FF4A4B; font-size: 30px; font-weight: bold;">250</span><br>
              <span style="color: #8A8A8A; font-weight: bold;">Total PDP</span>
            </div>
            <div class="col-md m-2">
              <span style="color: #FF4A4B; font-size: 30px; font-weight: bold;">136</span>
              <span style="color: #000000; font-size: 12px; font-weight: bold;">(51%)</span><br>
              <span style="color: #8A8A8A; font-weight: bold;">Masih Dirawat</span>
            </div>
            <div class="col-md m-2">
              <span style="color: #FF4A4B; font-size: 30px; font-weight: bold;">114</span>
              <span style="color: #000000; font-size: 12px; font-weight: bold;">(49%)</span><br>
              <span style="color: #8A8A8A; font-weight: bold;">Pulang dan Sehat</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script>
export default {
  components: {
  }
}
</script>
