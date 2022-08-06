<script>
  import Accordian from "../lib/accordian.svelte";
  import AccordionItem from "../lib/accordianitem.svelte";
</script>

//this is without using flowbite-svelte

<div class="bg-slate-900 p-10">
  <div class="mx-auto w-1/2">
    <Accordian>
      <AccordionItem>
        <h2 slot="header" class="font-Roboto">What is Harmony?</h2>
        <div slot="body">
          <p class="mb-2 text-gray-500 dark:text-gray-400 font-Roboto" />
          <p class="mb-2 text-gray-500 dark:text-gray-400 font-Roboto">
            Harmony is a social network for students to collaborate each other.
            It is a place where students can share their knowledge and
            experience and also can discuss the topics that they are interested
            in. We expect Harmony to be the hub of the students’ academic
            enthusiasm and excellence.
          </p>
          <p class="text-gray-500 dark:text-gray-400 font-Roboto">
            Check out this guide to learn how to <a
              href="https://drive.google.com/drive/folders/1JjmoLaQltdQoTI3y33XEOU66H4zU1Gbm?usp=sharing"
              target="_blank"
              class="text-blue-600 dark:text-blue-500 hover:underline font-Roboto"
              >get started</a
            > and join a collaborative environment as good as Harmony.
          </p>
        </div>
      </AccordionItem>

      <AccordionItem>
        <h2 slot="header" class="font-Roboto">Who can join Harmony?</h2>
        <div slot="body">
          <p class="mb-2 text-gray-500 dark:text-gray-400 font-Roboto" />
          <p class="mb-2 text-gray-500 dark:text-gray-400 font-Roboto">
            For now, Harmony is going to be confined to BUET students. We want
            to benchmark it as much as possible before making it more open.
          </p>
          <p class="text-gray-500 dark:text-gray-400 font-Roboto">
            Don't get disheartened. We are soon going to embrace all together.
            Meanwhile, study hard and ace your exams. Check out the <a
              href="https://github.com/risenfromashes/harmony-web"
              class="text-blue-600 dark:text-blue-500 hover:underline font-Roboto"
              >source code</a
            > of Harmony here.
          </p>
        </div>
      </AccordionItem>

      <AccordionItem>
        <h2 slot="header" class="font-Roboto">
          What is the difference between Harmony and Moodle?
        </h2>
        <div slot="body">
          <p class="mb-2 text-gray-500 dark:text-gray-400 font-Roboto" />
          <p class="mb-2 text-gray-500 dark:text-gray-400 font-Roboto">
            Harmony is mainly for collaboration among students, whereas Moodle
            is for teachers to conduct the academic activities. So, you have
            probably guessed it already, on the platform Harmony, there will not
            be any teachers present.
          </p>
          <p class="text-gray-500 dark:text-gray-400 font-Roboto">
            To know more about Harmony and its cool features, contact Harmony
            developers <a
              href="https://www.facebook.com/ashrafur.khan.37"
              class="text-blue-600 dark:text-blue-500 hover:underline font-Roboto"
              >Ashraf</a
            >,
            <a
              class="text-blue-600 dark:text-blue-500 hover:underline font-Roboto"
              href="https://www.facebook.com/sadathossain01/">Sadat</a
            >
            and
            <a
              class="text-blue-600 dark:text-blue-500 hover:underline font-Roboto"
              href="https://github.com/TheCodeHeist">Riasat</a
            >.
          </p>
        </div>
      </AccordionItem>

      <AccordionItem>
        <h2 slot="header" class="font-Roboto">
          Then what is the difference between Harmony and Facebook?
        </h2>
        <div slot="body">
          <p class="mb-2 text-gray-500 dark:text-gray-400 font-Roboto" />
          <p class="mb-2 text-gray-500 dark:text-gray-400 font-Roboto">
            Well Facebook is detrimental for study whereas Harmony is the exact
            opposite. It will create a study-friendly virtual environment for
            you.
          </p>
          <p class="text-gray-500 dark:text-gray-400 font-Roboto">
            Ask <a
              href="https://www.facebook.com/mustafa.siam.11651"
              class="text-blue-600 dark:text-blue-500 hover:underline font-Roboto"
              >Siam</a
            > to know about how Harmony helped him ace L2T1.
          </p>
        </div>
      </AccordionItem>
    </Accordian>
  </div>
</div>
