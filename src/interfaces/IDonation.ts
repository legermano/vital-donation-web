export default interface IDonation {
  id: string;
  schedule: string;
  donor: {
    id: string;
    name: string;
  };
  hemocenter: {
    id: string;
    name: string;
  };
  status: string;
}
