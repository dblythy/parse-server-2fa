<script setup>
import { inject } from "vue";
import { useRouter } from "vue-router";
import * as OTPAuth from "otpauth";
const Parse = inject("Parse");
const router = useRouter();
const user = Parse.User.current();
const enroll = async () => {
  const secret = new OTPAuth.Secret();
  const totp = new OTPAuth.TOTP({
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret,
  }); // show otp URL, ask user to confirm token
  const token = totp.generate();
  await user.save({ authData: { mfa: { secret: secret.base32, token } } });
  const recovery = user.get('authDataResponse');
  console.log("MFA ENROLLED");
  console.log("MFA RECOVERY KEYS: ", recovery);
  await user.fetch();
};
const logout = async () => {
  await Parse.User.logOut();
  router.push({
    name: "home",
  });
}
</script>

<template>
  <div>
    Username: {{ user.getUsername() }}
    <button @click="enroll">Enroll MFA</button>
    Auth: {{ user.get('authData') }}
    <button @click="logout">Logout</button>
  </div>
</template>
