<template>
  <div class="">
    <table class="w-full flex flex-row flex-no-wrap sm:bg-white overflow-hidden my-5">
      <thead>
        <tr class="bg-gray-300 flex flex-col flex-no wrap sm:table-row sm:rounded-none mb-2 sm:mb-0">
          <th class="p-3 text-left">
            No
          </th>
          <th class="p-3 text-left">
            Kota/Kab
          </th>
          <th class="p-3 text-left">
            CALL CENTER
          </th>
          <th class="p-3 text-left">
            HOTLINE
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
          <td class="p-3 text-left">
            1
          </td>
          <td class="p-3 text-left">
            Kota Depok
          </td>
          <td class="p-3 text-left">
            119
          </td>
          <td class="p-3 text-left">
            -
          </td>
        </tr>
        <tr class="bg-gray-300 flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
          <td class="p-3 text-left">
            2
          </td>
          <td class="p-3 text-left">
            Kota Bandung
          </td>
          <td class="p-3 text-left">
            119
          </td>
          <td class="p-3 text-left">
            -
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
 <style lang="scss" scoped>
  @media (min-width: 640px) {
    table {
      display: inline-table !important;
    }

    thead tr:not(:first-child) {
      display: none;
    }
  }

  td:not(:last-child) {
    border-bottom: 0;
  }
</style>
