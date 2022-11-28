import {
  DonationsListView,
  EditDonationView,
  NewDonationView,
  UserDonationsView,
} from "@/views/donation";

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
      path: "list",
      component: DonationsListView,
    },
    {
      path: "new",
      component: NewDonationView,
    },
    {
      path: "edit/:donationId",
      component: EditDonationView,
      props: true,
    },
  ],
};
