<template>
  <div class="">
    <table class="w-full flex flex-row flex-no-wrap sm:bg-white overflow-hidden sm:shadow-lg my-5">
      <thead>
        <tr class="bg-gray-300 flex flex-col flex-no wrap sm:table-row sm:rounded-none mb-2 sm:mb-0">
          <th class="border-t border-b border-gray-500 py-2 text-center">
            No
          </th>
          <th class="border-t border-b border-gray-500 py-2 text-left">
            Kota/Kab
          </th>
          <th class="border-t border-b border-gray-500 py-2 text-left">
            CALL CENTER
          </th>
          <th class="border-t border-b border-gray-500 py-2 text-left">
            HOTLINE
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="flex flex-col flex-no wrap sm:table-row sm:rounded-none mb-2 sm:mb-0">
          <td class="border-b border-gray-500 py-2 text-center">
            1
          </td>
          <td class="border-b border-gray-500 py-2 text-left">
            Kota Depok
          </td>
          <td class="border-b border-gray-500 py-2 text-left">
            119
          </td>
          <td class="border-b border-gray-500 py-2 text-left">
            -
          </td>
        </tr>
        <tr class="bg-gray-300 flex flex-col flex-no wrap sm:table-row sm:rounded-none mb-2 sm:mb-0">
          <td class="border-b border-gray-500 py-2 text-center">
            2
          </td>
          <td class="border-b border-gray-500 py-2 text-left">
            Kota Bandung
          </td>
          <td class="border-b border-gray-500 py-2 text-left">
            119
          </td>
          <td class="border-b border-gray-500 py-2 text-left">
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

    // thead tr:not(:first-child) {
    //   display: none;
    // }
  }

  td:not(:last-child) {
    // border-bottom: 0;
  }

  th:not(:last-child) {
    // border-bottom: 2px solid rgba(0, 0, 0, .1);
  }
</style>
