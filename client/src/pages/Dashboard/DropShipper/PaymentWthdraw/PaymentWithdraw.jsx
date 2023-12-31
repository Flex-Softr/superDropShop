import useAuthProvider from "../../../../hooks/useAuthProvider";
import useGetRequest from "../../../../hooks/useGetRequest";
import ConfigureModal from "./ConfigureModal";
import WithdrawTable from "./WithdrawTable";

const PaymentWithdraw = () => {
  const { user } = useAuthProvider();
  const { data } = useGetRequest("withdraw", "reseller/withdraw");

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold">Payment withdraw</h1>
        <p className="text-sm">View and keep track of your withdraw</p>
      </div>
      <div className="my-6 flex gap-6">
        <div className="text-white flex-1 flex flex-col">
          <h1 className="text-lg font-bold bg-[#0f9af7] p-5 rounded-t">
            Available for withdraw
          </h1>
          <div className="bg-[#2DA5F3] p-5 rounded-b h-full">
            <h1 className="text-2xl font-bold mb-4">{user?.balance || 0} ৳</h1>
            <p className="text-sm">
              This is the amount you have currently in earnings available for
              your next withdraw
            </p>
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <h1 className="text-lg bg-gray-200 p-5 rounded-t">
            withdraw account
          </h1>
          <div className="bg-white p-5 rounded-b h-full">
            <h1 className="text-lg font-bold mb-4">Set withdraw account</h1>
            <div>
              <ConfigureModal />
            </div>
          </div>
        </div>
      </div>
      <WithdrawTable data={data.payload?.withdraw} />
    </div>
  );
};

export default PaymentWithdraw;
