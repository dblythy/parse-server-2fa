<script setup>
import { ref, inject } from "vue";
import { useRouter } from "vue-router";
const Parse = inject("Parse");
const router = useRouter();
const username = ref("");
const password = ref("");
const mfa = ref("");
const login = async () => {
  await Parse.User.logInWithAdditionalAuth(username.value, password.value, {
    mfa: mfa.value
  });
  router.push({
    name: "account",
  });
};
const signup = async () => {
  await Parse.User.signUp(username.value, password.value);
  router.push({
    name: "account",
  });
};
</script>

<template>
  <div>
    Username:
    <input v-model="username" label="Username" style="display: block" />
    Password
    <input v-model="password" label="Password" style="display: block" />
    MFA
    <input v-model="mfa" label="MFA" style="display: block" />
    <button @click="login">Login</button>
    <button @click="signup">Signup</button>
  </div>
</template>
