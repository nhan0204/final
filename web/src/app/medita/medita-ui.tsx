import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { useState } from 'react';
import { ExplorerLink } from '../cluster/cluster-ui';
import { ellipsify } from '../ui/ui-layout';
import {
  useMeditaProgram, useMeditaProgramAccount
} from './medita-data-access';


export function PatientCreate() {
  const { createPatient } = useMeditaProgram();
  const { publicKey } = useWallet();
  const [insurance_id, setInsuranceId] = useState('');
  const [last_name, setLastName] = useState('');
  const [first_name, setFirtsName] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  const isFormValid =
    last_name.trim() !== '' &&
    first_name.trim() !== '' &&
    email.trim() !== '' &&
    phone_number.trim() !== '' &&
    address.trim() !== '';

  const handleSubmit = () => {
    if (publicKey && isFormValid) {
      createPatient.mutateAsync({
        insurance_id,
        last_name,
        first_name,
        email,
        phone_number,
        address,
        owner: publicKey,
      });
    }
  };

  if (!publicKey) {
    return <p>Connect your Wallet!</p>;
  }

  return (
    <div>
      <input
        type="text"
        placeholder="InsuranceId"
        value={insurance_id}
        onChange={(e) => setInsuranceId(e.target.value)}
        className="input input-bordered w-full max-w-sx"
      ></input>

      <input
        type="text"
        placeholder="LastName"
        value={last_name}
        onChange={(e) => setLastName(e.target.value)}
        className="input input-bordered w-full max-w-sx"
      ></input>

      <input
        type="text"
        placeholder="FirstName"
        value={first_name}
        onChange={(e) => setFirtsName(e.target.value)}
        className="input input-bordered w-full max-w-sx"
      ></input>

      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input input-bordered w-full max-w-sx"
      ></input>

      <input
        type="text"
        placeholder="PhoneNumber"
        value={phone_number}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="input input-bordered w-full max-w-sx"
      ></input>

      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="input input-bordered w-full max-w-sx"
      ></input>

      <button
        className="btn btn-xs lg:btn-md btn-primary"
        onClick={handleSubmit}
        disabled={createPatient.isPending || !isFormValid}
      >
        Create {createPatient.isPending && '...'}
      </button>
    </div>
  );
}

export function PatientList() {
  const { accounts, getProgramAccount } = useMeditaProgram();

  if (getProgramAccount.isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }
  if (!getProgramAccount.data?.value) {
    return (
      <div className="alert alert-info flex justify-center">
        <span>
          Program account not found. Make sure you have deployed the program and
          are on the correct cluster.
        </span>
      </div>
    );
  }
  return (
    <div className={'space-y-6'}>
      {accounts.isLoading ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : accounts.data?.length ? (
        <div className="grid md:grid-cols-2 gap-4">
          {accounts.data?.map((account) => (
            <PatientCard
              key={account.publicKey.toString()}
              account={account.publicKey}
            />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <h2 className={'text-2xl'}>No accounts</h2>
          No accounts found. Create one above to get started.
        </div>
      )}
    </div>
  );
}

// function CounterCard({ account }: { account: PublicKey }) {
//   const {
//     accountQuery,
//     incrementMutation,
//     setMutation,
//     decrementMutation,
//     closeMutation,
//   } = useCounterProgramAccount({ account });

//   const count = useMemo(
//     () => accountQuery.data?.count ?? 0,
//     [accountQuery.data?.count]
//   );

//   return accountQuery.isLoading ? (
//     <span className="loading loading-spinner loading-lg"></span>
//   ) : (
//     <div className="card card-bordered border-base-300 border-4 text-neutral-content">
//       <div className="card-body items-center text-center">
//         <div className="space-y-6">
//           <h2
//             className="card-title justify-center text-3xl cursor-pointer"
//             onClick={() => accountQuery.refetch()}
//           >
//             {count}
//           </h2>
//           <div className="card-actions justify-around">
//             <button
//               className="btn btn-xs lg:btn-md btn-outline"
//               onClick={() => incrementMutation.mutateAsync()}
//               disabled={incrementMutation.isPending}
//             >
//               Increment
//             </button>
//             <button
//               className="btn btn-xs lg:btn-md btn-outline"
//               onClick={() => {
//                 const value = window.prompt(
//                   'Set value to:',
//                   count.toString() ?? '0'
//                 );
//                 if (
//                   !value ||
//                   parseInt(value) === count ||
//                   isNaN(parseInt(value))
//                 ) {
//                   return;
//                 }
//                 return setMutation.mutateAsync(parseInt(value));
//               }}
//               disabled={setMutation.isPending}
//             >
//               Set
//             </button>
//             <button
//               className="btn btn-xs lg:btn-md btn-outline"
//               onClick={() => decrementMutation.mutateAsync()}
//               disabled={decrementMutation.isPending}
//             >
//               Decrement
//             </button>
//           </div>
//           <div className="text-center space-y-4">
//             <p>
//               <ExplorerLink
//                 path={`account/${account}`}
//                 label={ellipsify(account.toString())}
//               />
//             </p>
//             <button
//               className="btn btn-xs btn-secondary btn-outline"
//               onClick={() => {
//                 if (
//                   !window.confirm(
//                     'Are you sure you want to close this account?'
//                   )
//                 ) {
//                   return;
//                 }
//                 return closeMutation.mutateAsync();
//               }}
//               disabled={closeMutation.isPending}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

function PatientCard({ account }: { account: PublicKey }) {
  const { accountQuery, updatePatient, deletePatient } =
    useMeditaProgramAccount({ account });

  const { publicKey } = useWallet();
  const [last_name, setLastName] = useState('');
  const [first_name, setFirtsName] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  const isFormValid =
    last_name.trim() !== '' &&
    first_name.trim() !== '' &&
    email.trim() !== '' &&
    phone_number.trim() !== '' &&
    address.trim() !== '';

  const insurance_id = accountQuery.data?.insuranceId;

  const handleSubmit = () => {
    if (publicKey && isFormValid && insurance_id) {
      updatePatient.mutateAsync({
        insurance_id,
        last_name,
        first_name,
        email,
        phone_number,
        address,
        owner: publicKey,
      });
    }
  };

  if (!publicKey) {
    return <p>Connect your Wallet!</p>;
  }

  return accountQuery.isLoading ? (
    <span className="loading loading-spinner loading-lg"></span>
  ) : (
    <div className="card card-bordered border-base-300 border-4 text-neutral-content">
      <div className="card-body items-center text-center">
        <div className="space-y-6">
          <h2
            className="card-title justify-center text-3xl cursor-pointer"
            onClick={() => accountQuery.refetch()}
          >
            {accountQuery.data?.insuranceId}
          </h2>

          <p>{accountQuery.data?.lastName}</p>
          <p>{accountQuery.data?.firstName}</p>
          <p>{accountQuery.data?.email}</p>
          <p>{accountQuery.data?.phoneNumber}</p>
          <p>{accountQuery.data?.address}</p>
          <p>{accountQuery.data?.disease}</p>
          <p>{accountQuery.data?.prescription}</p>

          <div className="card-actions justify-around">
            <input
              type="text"
              placeholder="LastName"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              className="input input-bordered w-full max-w-sx"
            ></input>

            <input
              type="text"
              placeholder="FirstName"
              value={first_name}
              onChange={(e) => setFirtsName(e.target.value)}
              className="input input-bordered w-full max-w-sx"
            ></input>

            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full max-w-sx"
            ></input>

            <input
              type="text"
              placeholder="PhoneNumber"
              value={phone_number}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="input input-bordered w-full max-w-sx"
            ></input>

            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="input input-bordered w-full max-w-sx"
            ></input>

            <button
              className="btn btn-xs lg:btn-md btn-primary"
              onClick={handleSubmit}
              disabled={updatePatient.isPending || !isFormValid}
            >
              Update {updatePatient.isPending && '...'}
            </button>
          </div>

          <div className="text-center space-y-4">
            <p>
              <ExplorerLink
                path={`account/${account}`}
                label={ellipsify(account.toString())}
              />
            </p>
            <button
              className="btn btn-xs btn-secondary btn-outline"
              onClick={() => {
                if (!window.confirm('Are you sure you want to close this account?')) 
                  return;

                const insurance_id = accountQuery.data?.insuranceId;

                if (insurance_id)
                  return deletePatient.mutateAsync(insurance_id);
              }}
              disabled={deletePatient.isPending}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
