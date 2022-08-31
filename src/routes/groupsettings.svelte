<script lang="ts">
  import {
    addSubject,
    loadGroups,
    loadMembers,
    removeSubject,
    updateGroup,
    updateMember,
    type Group,
  } from "../lib/data/groups";
  import FaIcon from "../lib/faIcon.svelte";
  import {
    loadUserHandles,
    type User,
    type UserHandle,
  } from "../lib/data/user";
  import { fade } from "svelte/transition";
  import { current_group, current_subject } from "../lib/stores/groups";
  import { groups } from "../lib/stores/groups";
  import { uploadImage } from "../lib/data/image";
  import Loader from "../lib/loader.svelte";
  import { navigate } from "svelte-navigator";
  import { onMount } from "svelte";
  import Avatar from "../lib/avatar.svelte";
  import { current_user } from "../lib/stores/user";

  export let group_id: string;

  let users: UserHandle[] = [];
  let members: UserHandle[] = [];

  const load = async () => {
    try {
      if ($groups.length === 0) {
        await loadGroups();
      }
      $current_group = $groups.find((group) => group.id == group_id);
      if ($current_group === undefined) {
        navigate("/");
      }
      $current_subject = $current_group.subjects[0];

      members = await loadMembers($current_group.id);
      users = await loadUserHandles();
    } catch (e) {
      console.log(e);
    }
  };

  const loadPromise = load();

  onMount(async () => {
    await loadPromise;
    input_name = $current_group.name;
    input_intro = $current_group.intro;
    pictureId = $current_group.image_id;
    pictureSrc = $current_group.image_link;
  });

  let showable_members: UserHandle[];
  let showable_users: UserHandle[];

  let search_member: string = "";
  let search_user: string = "";
  let input_name: string;
  let name_input_clicked: boolean = false;
  let input_intro: string;
  let intro_input_clicked: boolean = false;
  let new_subject_name: string = "";
  let pictureSrc: string;
  let pictureId: string;

  $: {
    if (search_member) {
      showable_members = members.filter((member) => {
        return member.user_name
          .toLowerCase()
          .includes(search_member.toLowerCase());
      });
    } else {
      showable_members = members;
    }
  }
  $: {
    if (search_user) {
      showable_users = users.filter((user) => {
        return user.user_name.toLowerCase().includes(search_user.toLowerCase());
      });
    } else {
      showable_users = users;
    }
  }

  let input;
  let warning: boolean = false;
  let warningText: string;
  let newPicture: boolean = false;
  let showimage: boolean = false;
  let delete_clicked: boolean = false;

  const update = async () => {
    try {
      if ($current_group) {
        console.log("pictureId: " + pictureId);
        let ret = await updateGroup(
          $current_group.id,
          input_name,
          input_intro,
          pictureId
        );
        if (ret) {
          $current_group.name = input_name;
          $current_group.intro = input_intro;
          $current_group.image_id = pictureId;
          $current_group.image_link = pictureSrc;
          $current_group = $current_group;
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onChange = async () => {
    const file: File = input.files[0];

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        warning = true;
        warningText = "Image size too large. Image should be under 5 MB";
      } else {
        try {
          let image = await uploadImage(file);
          newPicture = true;
          showimage = true;
          pictureSrc = image.link;
          pictureId = image.id;
          await update();
        } catch (e) {
          console.log(e);
        }
      }
    } else showimage = false;
  };

  const addMember = async (mid: string) => {
    try {
      if (await updateMember(mid, $current_group.id, true)) {
        let i = users.findIndex((user) => user.id === mid);
        if (i >= 0) {
          members = [users[i], ...members];
          users.splice(i, 1);
          users = users;
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const removeMember = async (mid: string) => {
    try {
      if (await updateMember(mid, $current_group.id, false)) {
        let i = members.findIndex((user) => user.id === mid);
        if (i >= 0) {
          users = [members[i], ...users];
          members.splice(i, 1);
          members = members;
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleNewSubject = async (name: string) => {
    try {
      let sid = await addSubject($current_group.id, name);
      if (sid != "-1") {
        $current_group.subjects.push({ id: sid, name: name });
        $current_group = $current_group;
        new_subject_name = "";
      }
    } catch (e) {
      console.log(e);
    }
  };

  const deleteSubject = async (sid: string) => {
    try {
      if (await removeSubject($current_group.id, sid)) {
        $current_group.subjects = $current_group.subjects.filter(
          (sub) => sub.id != sid
        );
        $current_group = $current_group;
      }
    } catch (e) {
      console.log(e);
    }
  };
</script>

<svelte:head>
  <title>Group Settings</title>
</svelte:head>

<svelte:window
  on:click={() => {
    name_input_clicked = false;
    intro_input_clicked = false;
    if ($current_group) {
      input_name = $current_group.name;
      input_intro = $current_group.intro;
    }
    //everything will be finalized on enter
    console.log("clicked outside");
  }}
/>

{#if delete_clicked}
  <div
    id="popup-modal"
    tabindex="-1"
    class="overflow-y-auto overflow-x-hidden fixed z-50 w-full md:inset-0 h-modal md:h-full flex justify-center items-center"
    transition:fade|local
  >
    <div class="relative p-4 w-full max-w-md h-full md:h-auto">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <button
          type="button"
          class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          data-modal-toggle="popup-modal"
          on:click={() => {
            delete_clicked = false;
          }}
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
          <span class="sr-only">Close modal</span>
        </button>
        <div class="p-6 text-center">
          <svg
            aria-hidden="true"
            class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            /></svg
          >
          <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this group?
          </h3>
          <button
            data-modal-toggle="popup-modal"
            type="button"
            class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
          >
            Yes, I'm sure
          </button>
          <button
            data-modal-toggle="popup-modal"
            type="button"
            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            on:click={() => {
              delete_clicked = false;
            }}>No, cancel</button
          >
        </div>
      </div>
    </div>
  </div>
{/if}

{#await loadPromise}
  <Loader />
{:then}
  <div class="bg-slate-900 pt-20">
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <div class="w-3/4 mx-auto grid relative">
      <div>
        {#if pictureSrc != null}
          <img
            class="mb-3 w-80 h-80 rounded-full shadow-lg mx-auto mt-5 z-0 hover:cursor-pointer object-cover"
            src={pictureSrc}
            alt="Group Photo"
            on:click={() => {
              input.click();
            }}
          />
        {:else}
          <div
            class="mb-3 w-80 h-80 rounded-full shadow-lg mx-auto mt-5 z-0 hover:cursor-pointer object-cover"
            on:click={() => {
              input.click();
            }}
          />
        {/if}
        <input
          id="file-upload"
          type="file"
          accept=".jpg, .png, .jpeg, .gif"
          title=""
          class="mb-3 w-80 h-80 rounded-full mt-5 absolute left-1/2 transform -translate-x-1/2 z-10 text-transparent hover:cursor-pointer bg-transparent hidden"
          bind:this={input}
          on:change={onChange}
        />
        <div class="absolute right-10 top-10">
          <button
            type="button"
            class="text-white bg-red-700 dark:bg-red-600 hover:bg-red-800 dark:hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium transition-shadow rounded-lg text-base px-5 py-2 text-center w-1/10 mx-2"
            on:click={() => {
              delete_clicked = true;
            }}
          >
            <FaIcon icon="trash" />&nbsp;&nbsp;Delete Group
          </button>
        </div>
      </div>
      <div
        class="grid justify-self-center mb-5"
        on:click|stopPropagation={() => {
          name_input_clicked = true;
          console.log("clicked inside");
        }}
      >
        {#if !name_input_clicked}
          <button
            class="text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center h-full"
          >
            {$current_group.name}
          </button>
        {:else}
          <!-- svelte-ignore a11y-autofocus -->
          <input
            class="text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center bg-slate-900 h-full"
            bind:value={input_name}
            autofocus
            on:keydown={async (e) => {
              if (e.key === "Enter" && !e.ctrlKey && !e.shiftKey) {
                name_input_clicked = false;
                if (input_name && input_name.trim().length > 0) {
                  await update();
                }
              }
            }}
          />
        {/if}
      </div>
      <div
        class="grid justify-self-center mb-1 w-full bg-gray-50 rounded-lg dark:bg-slate-900 dark:border-gray-600"
        on:click|stopPropagation={() => {
          intro_input_clicked = true;
          console.log("clicked inside");
        }}
      >
        {#if !intro_input_clicked}
          <button
            class="text-base font-normal text-gray-500 lg:text-xl dark:text-gray-400 text-center mx-auto w-3/4"
          >
            {input_intro}
          </button>
        {:else}
          <!-- svelte-ignore a11y-autofocus -->
          <div class="py-2 px-4 bg-white rounded-t-lg dark:bg-slate-900 w-full">
            <label for="comment" class="sr-only">Your comment</label>
            <textarea
              id="comment"
              rows="4"
              class="w-3/4 text-base lg:text-xl font-normal text-gray-500 bg-white border-0 dark:bg-slate-900 focus:ring-0 dark:text-gray-400 dark:placeholder-gray-400 grid mx-auto h-[65px] text-center overflow-y-scroll"
              placeholder="Group Intro"
              required
              bind:value={input_intro}
              maxlength="140"
              autofocus
              on:keydown={async (e) => {
                if (e.key === "Enter" && !e.ctrlKey && !e.shiftKey) {
                  intro_input_clicked = false;
                  if (input_intro && input_intro.trim().length > 0) {
                    await update();
                  }
                }
              }}
            />
          </div>
        {/if}
      </div>
      <hr
        class="my-1 mx-auto w-48 h-1 bg-gray-100 rounded border-0 md:my-10 dark:bg-gray-700"
      />
      <div class="grid grid-cols-2 py-3 mb-20">
        <div
          class="sm:col-span-2 lg:col-span-1 lg:border-r-2 lg:border-slate-600 ml-20 pt-2"
        >
          <h2 class="text-2xl font-bold dark:text-white">Current Members</h2>
          <div class="grid place-content-left my-3">
            <div class="relative mt-1">
              <div
                class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
              >
                <FaIcon
                  icon="search"
                  className="flex justify-center items-center w-5 h-5 text-gray-500 dark:text-gray-400"
                />
              </div>
              <input
                type="text"
                id="table-search"
                class="block p-2 pl-10 w-1/2 text-sm font-OpenSans text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search members"
                bind:value={search_member}
              />
            </div>
          </div>
          <ul
            class="overflow-y-auto py-1 h-80 text-gray-700 dark:text-gray-200 w-10/12 ml-0"
            aria-labelledby="dropdownUsersButton"
          >
            <div class="flex flex-col">
              {#each showable_members as member (member.id)}
                <li>
                  <div
                    class="flex justify-between items-center py-2 pr-2 pl-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white rounded-lg"
                  >
                    <div class="flex">
                      <Avatar dp={member.dp_link} name={member.user_name} />
                      <div class="text-md pl-5 place-self-center">
                        {member.user_name}
                      </div>
                    </div>
                    <div>
                      {#if member.id != current_user.user_id}
                        <button
                          type="button"
                          class="text-white bg-red-700 hover:bg-red-800 w-1/10 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                          on:click={() => removeMember(member.id)}
                          ><FaIcon
                            icon="user-minus"
                          />&nbsp;&nbsp;Remove</button
                        >
                      {/if}
                    </div>
                  </div>
                </li>
              {/each}
            </div>
          </ul>
        </div>
        <div class="sm:col-span-2 lg:col-span-1 ml-20 pt-2">
          <h2 class="text-2xl font-bold dark:text-white">Add Members</h2>
          <div class="grid place-content-left my-3">
            <div class="relative mt-1">
              <div
                class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
              >
                <FaIcon
                  icon="search"
                  className="flex justify-center items-center w-5 h-5 text-gray-500 dark:text-gray-400"
                />
              </div>
              <input
                type="text"
                id="table-search"
                class="block p-2 pl-10 w-1/2 text-sm font-OpenSans text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search users"
                bind:value={search_user}
              />
            </div>
          </div>
          <ul
            class="overflow-y-auto py-1 h-80 text-gray-700 dark:text-gray-200 w-10/12 ml-0"
            aria-labelledby="dropdownUsersButton"
          >
            <div class="flex flex-col">
              {#each showable_users as user (user.id)}
                <li>
                  <div
                    class="flex justify-between items-center py-2 pr-2 pl-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white rounded-lg"
                  >
                    <div class="flex">
                      <Avatar dp={user.dp_link} name={user.user_name} />
                      <div class="text-md pl-5 place-self-center">
                        {user.user_name}
                      </div>
                    </div>
                    <div>
                      <button
                        type="button"
                        class="text-white bg-green-700 w-1/10 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
                        on:click={() => addMember(user.id)}
                        ><FaIcon icon="user-plus" />&nbsp;&nbsp;Add</button
                      >
                    </div>
                  </div>
                </li>
              {/each}
            </div>
          </ul>
        </div>
        <div class="place-self-center col-span-2 mt-20 w-2/5">
          <h1 class="text-4xl font-bold dark:text-white">Subjects</h1>
          <ul
            class="overflow-y-auto py-1 h-fit text-gray-700 dark:text-gray-200 w-10/12 ml-0"
            aria-labelledby="dropdownUsersButton"
          >
            <div class="flex flex-col">
              {#each $current_group.subjects as subject}
                <li>
                  <div
                    class="flex justify-between items-center py-2 pr-2 pl-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white rounded-lg"
                  >
                    <div class="flex">
                      <div class="text-lg pl-5 place-self-center">
                        {subject.name}
                      </div>
                    </div>
                    <div>
                      {#if subject.name != "General"}
                        <button
                          class="h-8 w-8 shadow-xl text-white font-medium rounded-full lg:ml-40 ml-10 text-sm mr-2 mb-2 focus:outline-none"
                          type="button"
                          data-drawer-target="drawer-form"
                          data-drawer-show="drawer-form"
                          aria-controls="drawer-form"
                          on:click={() => deleteSubject(subject.id)}
                        >
                          <FaIcon
                            type="regular"
                            icon="trash"
                            className="text-xl"
                          />
                        </button>
                      {/if}
                    </div>
                  </div>
                </li>
              {/each}
            </div>
          </ul>
          <div class="flex">
            <div class="relative z-0 w-3/6 ml-4">
              <input
                type="text"
                id="floating_standard"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                bind:value={new_subject_name}
              />
              <label
                for="floating_standard"
                class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >Subject Name</label
              >
            </div>
            <button
              type="button"
              class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 mx-auto py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              on:click={() => {
                handleNewSubject(new_subject_name);
              }}>Confirm</button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
{/await}
