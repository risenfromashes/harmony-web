<script lang="ts">
  export let previous_path = "";
</script>

<!-- drawer component -->
<div
  id="drawer-contact"
  class="fixed z-40 h-screen p-4 overflow-y-auto bg-white w-80 dark:bg-gray-800 transition-transform left-0 top-0 transform-none"
  tabindex="-1"
  aria-labelledby="drawer-contact-label"
  aria-modal="true"
  role="dialog"
>
  <h5
    id="drawer-label"
    class="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
  >
    <svg
      class="w-5 h-5 mr-2"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      ><path
        fill-rule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        clip-rule="evenodd"
      /></svg
    >Contact us
  </h5>
  <button
    type="button"
    data-drawer-dismiss="drawer-contact"
    aria-controls="drawer-contact"
    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
  >
    <svg
      aria-hidden="true"
      class="w-5 h-5"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      ><path
        fill-rule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clip-rule="evenodd"
      /></svg
    >
    <span class="sr-only">Close menu</span>
  </button>
  <form action="#" class="mb-6">
    <div class="mb-6">
      <label
        for="email"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >Your email</label
      >
      <input
        type="email"
        id="email"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="name@company.com"
        required
      />
    </div>
    <div class="mb-6">
      <label
        for="subject"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >Subject</label
      >
      <input
        type="text"
        id="subject"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Let us know how we can help you"
        required
      />
    </div>
    <div class="mb-6">
      <label
        for="message"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >Your message</label
      >
      <textarea
        id="message"
        rows="4"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Your message..."
      />
    </div>
    <button
      type="submit"
      class="text-white bg-blue-700 hover:bg-blue-800 w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 block"
      >Send message</button
    >
  </form>
  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
    <a href="#" class="hover:underline">sadatho2014@gmail.com</a>
  </p>
  <p class="text-sm text-gray-500 dark:text-gray-400">
    <a href="#" class="hover:underline">+8801765423441</a>
  </p>
</div>
