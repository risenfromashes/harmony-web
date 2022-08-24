<script lang="ts">
  import FaIcon from "../lib/faIcon.svelte";
  import { useNavigate, useParams, Link } from "svelte-navigator";
  const params = useParams();
  export let name: string;
</script>

<div class="my-5 mx-3 flex items-stretch">
  <FaIcon icon="folder" className="text-lg" />
  <Link
    to={name}
    class="h-full text-lg ml-4 font-JosefinSans hover:text-blue-500 align-middle"
    >{name}</Link
  >
</div>
