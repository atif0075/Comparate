<script setup>
import { RouterLink } from "vue-router";
</script>
<template>
  <div class="flex flex-col min-h-screen">
    <div class="flex flex-col lg:flex-row flex-auto">
      <a class="lg:hidden mx-auto pt-10">
        <img alt="Logo" src="../assets/logo-dark.svg" class="h-20" />
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
              <span class="text-gray-500"> Not a Member yet? </span>
              <RouterLink to="/register" class="text-blue-600 font-semibold">
                Sign Up
              </RouterLink>
            </div>
          </div>

          <div class="py-20">
            <div class="w-full">
              <div class="card-body">
                <div class="text-start mb-10">
                  <h1 class="text-gray-900 mb-3 text-4xl font-semibold">
                    Sign In
                  </h1>
                  <div class="text-gray-400 font-medium text-sm">
                    Get unlimited access &amp; earn money
                  </div>
                </div>

                <div class="mb-8">
                  <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    autocomplete="off"
                    class="w-full p-2.5 bg-gray-50 focus:bg-gray-100 rounded-md outline-none"
                  />
                </div>

                <!-- Input group -->
                <div class="mb-7 relative">
                  <!-- Password -->
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    autocomplete="off"
                    class="w-full p-2.5 bg-gray-50 focus:bg-gray-100 rounded-md outline-none"
                  />
                  <Icon icon="bi:eye-fill" class="absolute top-3 right-3" />
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
                    class="me-2 flex-shrink-0 px-5 py-3 text-sm rounded-md bg-blue-500 text-white"
                  >
                    <span class="indicator-label"> Sign In </span>
                  </button>

                  <div class="flex items-center space-x-3">
                    <div class="text-gray-500 text-sm">Or</div>

                    <a href="#" class="bg-gray-50 rounded-full p-3">
                      <Icon icon="devicon:google" />
                    </a>
                    <a href="#" class="bg-gray-50 rounded-full p-3">
                      <Icon icon="logos:facebook" />
                    </a>
                    <a href="#" class="bg-gray-50 rounded-full p-3">
                      <Icon icon="logos:apple" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <select>
            <option value="">English</option>
            <option value="">Spanish</option>
          </select>
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
