<script lang="ts">
  import Accordion from "../lib/accordion.svelte";
  import AccordionItem from "../lib/accordionitem.svelte";
  import Drawer from "../lib/drawer.svelte";
  let draweropen: boolean = false;
</script>

<!-- //this is without using flowbite-svelte -->

<svelte:window on:click|stopPropagation={() => (draweropen = false)} />

<div class="bg-slate-900 p-10 my-5">
  <p class="font-Raleway md:text-5xl sm:text-lg grid place-items-center py-10">
    Frequently Asked Questions
  </p>
  <div class="mx-auto w-1/2">
    <Accordion>
      <AccordionItem>
        <h2 slot="header" class="font-OpenSans">What is Harmony?</h2>
        <div slot="body">
          <p class="mb-2 text-gray-500 dark:text-gray-400 font-OpenSans" />
          <p class="mb-2 text-gray-500 dark:text-gray-400 font-OpenSans">
            Harmony is a social network for students to collaborate each other.
            It is a place where students can share their knowledge and
            experience and also can discuss the topics that they are interested
            in. We expect Harmony to be the hub of the students’ academic
            enthusiasm and excellence.
          </p>
          <p class="text-gray-500 dark:text-gray-400 font-OpenSans">
            Check out this guide to learn how to <a
              href="https://drive.google.com/drive/folders/1JjmoLaQltdQoTI3y33XEOU66H4zU1Gbm?usp=sharing"
              target="_blank"
              class="text-blue-600 dark:text-blue-500 hover:underline font-OpenSans"
              >get started</a
            > and join a collaborative environment as good as Harmony.
          </p>
        </div>
      </AccordionItem>

      <AccordionItem>
        <h2 slot="header" class="font-OpenSans">Who can join Harmony?</h2>
        <div slot="body">
          <p class="mb-2 text-gray-500 dark:text-gray-400 font-OpenSans" />
          <p class="mb-2 text-gray-500 dark:text-gray-400 font-OpenSans">
            For now, Harmony is going to be confined to BUET students. We want
            to benchmark it as much as possible before making it more open.
          </p>
          <p class="text-gray-500 dark:text-gray-400 font-OpenSans">
            Don't get disheartened. We are soon going to embrace all together.
            Meanwhile, study hard and ace your exams. Check out the <a
              href="https://github.com/risenfromashes/harmony-web"
              class="text-blue-600 dark:text-blue-500 hover:underline font-OpenSans"
              >source code</a
            > of Harmony here.
          </p>
        </div>
      </AccordionItem>

      <AccordionItem>
        <h2 slot="header" class="font-OpenSans">
          What is the difference between Harmony and Moodle?
        </h2>
        <div slot="body">
          <p class="mb-2 text-gray-500 dark:text-gray-400 font-OpenSans" />
          <p class="mb-2 text-gray-500 dark:text-gray-400 font-OpenSans">
            Harmony is mainly for collaboration among students, whereas Moodle
            is for teachers to conduct the academic activities. So, you have
            probably guessed it already, on the platform Harmony, there will not
            be any teachers present.
          </p>
          <p class="text-gray-500 dark:text-gray-400 font-OpenSans">
            To know more about Harmony and its cool features, contact Harmony
            developers <a
              href="https://www.facebook.com/ashrafur.khan.37"
              class="text-blue-600 dark:text-blue-500 hover:underline font-OpenSans"
              >Ashraf</a
            >,
            <a
              class="text-blue-600 dark:text-blue-500 hover:underline font-OpenSans"
              href="https://www.facebook.com/sadathossain01/">Sadat</a
            >
            and
            <a
              class="text-blue-600 dark:text-blue-500 hover:underline font-OpenSans"
              href="https://github.com/TheCodeHeist">Riyasat</a
            >.
          </p>
        </div>
      </AccordionItem>

      <AccordionItem>
        <h2 slot="header" class="font-OpenSans">
          Then what is the difference between Harmony and Facebook?
        </h2>
        <div slot="body">
          <p class="mb-2 text-gray-500 dark:text-gray-400 font-OpenSans" />
          <p class="mb-2 text-gray-500 dark:text-gray-400 font-OpenSans">
            Well Facebook is detrimental for study whereas Harmony is the exact
            opposite. It will create a study-friendly virtual environment for
            you.
          </p>
          <p class="text-gray-500 dark:text-gray-400 font-OpenSans">
            Ask <a
              href="https://www.facebook.com/mustafa.siam.11651"
              class="text-blue-600 dark:text-blue-500 hover:underline font-OpenSans"
              >Siam</a
            > to know about how Harmony helped him ace L2T1.
          </p>
        </div>
      </AccordionItem>
    </Accordion>
  </div>

  <!-- drawer init and show -->
  <!-- drawer button -->
  <div class="text-center p-10">
    <button
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      type="button"
      data-drawer-target="drawer-contact"
      data-drawer-show="drawer-contact"
      aria-controls="drawer-contact"
      on:click|stopPropagation={() => (draweropen = !draweropen)}
    >
      Have More Questions?
    </button>
  </div>

  <Drawer transition_axis="x" open={draweropen}>
    <!-- drawer component -->
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
      >Contact Us
    </h5>
    <div slot="body">
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
            placeholder="abc@gmail.com"
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
      <p class="mb-2 text-sm font-OpenSans grid place-items-center">
        <a
          href="https://github.com/risenfromashes/harmony-web"
          class="text-blue-500 hover:underline">Harmony - Github</a
        >
      </p>
    </div>
  </Drawer>
</div>
