<script setup>
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import getAuthToken from "../api/getAuthToken";
import { useStore } from "../stores";
const store = useStore();
const showPass = ref(false);
const username = ref("");
const password = ref("");
const loading = ref(false);
const router = useRouter();
const login = async () => {
  try {
    loading.value = true;
    await getAuthToken(username.value, password.value).then((res) => {
      loading.value = false;
      store.isUser = true;
      store.userDetails = res;
      store.userDetails.name = username.value;
      router.push("/");
    });
  } catch (error) {
    console.error("Failed to get Auth Token:", error);
  }
};
</script>
<template>
  <div class="flex flex-col min-h-screen bg-zinc-50 dark:bg-zinc-800">
    <div class="flex flex-col lg:flex-row flex-auto">
      <a class="lg:hidden mx-auto pt-10">
        <img alt="Logo" src="../assets/logo.svg" class="h-20 invert" />
      </a>

      <div
        class="flex flex-col flex-auto justify-center items-center lg:w-1/2 p-10"
      >
        <div class="flex flex-col w-full max-w-[450px] h-full justify-between">
          <div class="flex items-center py-2">
            <div class="me-2"></div>

            <div
              class="flex items-center space-x-1 font-medium text-sm ml-auto"
            >
              <span class="text-zinc-500 dark:text-zinc-300">
                Not a Member yet?
              </span>
              <RouterLink to="/register" class="text-blue-600 font-semibold">
                Sign Up
              </RouterLink>
            </div>
          </div>

          <div class="py-20">
            <div class="w-full">
              <div class="card-body">
                <div class="text-start mb-10">
                  <h1
                    class="text-zinc-900 dark:text-zinc-50 mb-3 text-4xl font-semibold"
                  >
                    Sign In
                  </h1>
                  <div class="text-zinc-400 font-medium text-sm">
                    Get unlimited access &amp; earn money
                  </div>
                </div>

                <div class="mb-8">
                  <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    v-model="username"
                    autocomplete="off"
                    class="w-full p-2.5 bg-zinc-100 focus:bg-zinc-200 rounded-md outline-none dark:bg-zinc-700 dark:focus:bg-zinc-600"
                  />
                </div>

                <!-- Input group -->
                <div class="mb-7 relative">
                  <!-- Password -->
                  <input
                    :type="showPass ? 'text' : 'password'"
                    placeholder="Password"
                    name="password"
                    v-model="password"
                    autocomplete="off"
                    class="w-full pr-11 p-2.5 bg-zinc-100 focus:bg-zinc-200 rounded-md outline-none dark:bg-zinc-700 dark:focus:bg-zinc-600"
                  />
                  <Icon
                    @click="showPass = !showPass"
                    :icon="
                      showPass
                        ? 'heroicons:eye-slash-solid'
                        : 'heroicons:eye-20-solid'
                    "
                    class="w-5 h-5 absolute right-3 top-3 text-zinc-400 cursor-pointer"
                  />
                </div>

                <div
                  class="flex justify-between items-center flex-wrap gap-3 text-sm font-medium mb-10"
                >
                  <div></div>

                  <a
                    href="/metronic8/demo1/../demo1/authentication/layouts/fancy/reset-password.html"
                    class="text-blue-600 hover:text-blue-500"
                  >
                    Forgot Password?
                  </a>
                </div>

                <div class="flex justify-between items-center">
                  <button
                    @click="login"
                    class="me-2 flex items-center space-x-1 flex-shrink-0 px-5 py-3 text-sm rounded-md bg-blue-500 text-white"
                  >
                    <span v-show="!loading"> Sign In </span>
                    <span v-show="loading"> Please wait... </span>
                    <Icon
                      v-show="loading"
                      class="w-5 h-5"
                      icon="svg-spinners:ring-resize"
                    />
                  </button>

                  <div class="flex items-center space-x-3">
                    <div class="text-zinc-500 dark:text-zinc-300 text-sm">
                      Or
                    </div>

                    <a
                      href="#"
                      class="bg-zinc-50 dark:bg-zinc-500 rounded-full p-3"
                    >
                      <Icon icon="devicon:google" />
                    </a>
                    <a
                      href="#"
                      class="bg-zinc-50 dark:bg-zinc-500 rounded-full p-3"
                    >
                      <Icon icon="logos:facebook" />
                    </a>
                    <a
                      href="#"
                      class="bg-zinc-50 dark:bg-zinc-500 rounded-full p-3"
                    >
                      <Icon icon="logos:apple" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <language-drop />
        </div>
      </div>

      <div
        id="bg11"
        class="hidden lg:flex lg:flex-row-fluid w-1/2 bg-cover bg-center bg-no-repeat"
      ></div>
    </div>
  </div>
</template>
<style>
#bg11 {
  background-image: url("../assets/bg11.png");
}
</style>
