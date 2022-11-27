import { NewDonationView, UserDonationsView } from "@/views/donation";

export default {
  path: "/donation",
  children: [
    {
      path: "",
      redirect: "user-donations",
    },
    {
      path: "user-donations",
      component: UserDonationsView,
    },
    {
      path: "new",
      component: NewDonationView,
    },
  ],
};
