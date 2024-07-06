import { getMeditaProgram, getMeditaProgramId } from '@medita/anchor';
import { useConnection } from '@solana/wallet-adapter-react';
import { Cluster, PublicKey } from '@solana/web3.js';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { useCluster } from '../cluster/cluster-data-access';
import { useAnchorProvider } from '../solana/solana-provider';
import { useTransactionToast } from '../ui/ui-layout';

interface PatientArgs {
  owner: PublicKey,
  insurance_id: string,
  last_name: string,
  first_name: string,
  email: string,
  phone_number: string,
  address: string,
  disease?: string,
  prescription?: string
}

export function useMeditaProgram() {
  const { connection } = useConnection();
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const provider = useAnchorProvider();
  const programId = useMemo(
    () => getMeditaProgramId(cluster.network as Cluster),
    [cluster]
  );
  const program = getMeditaProgram(provider);

  const accounts = useQuery({
    queryKey: ['medita', 'all', { cluster }],
    queryFn: () => program.account.patientInfo.all(),
  });

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  });

  const createPatient = useMutation<string, Error, PatientArgs>({
    mutationKey: ['medita', 'create', { cluster }],
    mutationFn: async ({
      owner,
      insurance_id,
      last_name,
      first_name,
      email,
      phone_number,
      address,
    }) => {
      const [patientInfoAddress] = await PublicKey.findProgramAddress(
        [Buffer.from(insurance_id), owner.toBuffer()],
        programId
      );

      return program.methods
      .createPatient(
        insurance_id,
        last_name,
        first_name,
        email,
        phone_number,
        address,)
      .accounts([{patientInfo: patientInfoAddress}])
      .rpc();
    },
    onSuccess: (signature) => {
      transactionToast(signature);
      return accounts.refetch();
    },
    onError: () => toast.error('Failed to create account'),
  });

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    createPatient,
  };
}

export function useMeditaProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const { program, accounts, programId } = useMeditaProgram();

  const accountQuery = useQuery({
    queryKey: ['medita', 'fetch', { cluster, account }],
    queryFn: () => program.account.patientInfo.fetch(account),
  });

  const updatePatient = useMutation<string, Error, PatientArgs>({
    mutationKey: ['medita', 'update', { cluster }],
    mutationFn: async ({
      owner,
      insurance_id,
      last_name,
      first_name,
      email,
      phone_number,
      address,
      disease,
      prescription
    }) => {
      const [patientInfoAddress] = await PublicKey.findProgramAddress(
        [Buffer.from(insurance_id), owner.toBuffer()],
        programId
      );

      return program.methods
      .updatePatient(
        insurance_id,
        last_name,
        first_name,
        email,
        phone_number,
        address,
        disease || null,
        prescription || null
      )
      .accounts([{patientInfo: patientInfoAddress}])
      .rpc();
    },
    onSuccess: (signature) => {
      transactionToast(signature);
      return accounts.refetch();
    },
    onError: () => toast.error('Failed to update account'),
  });

  const deletePatient = useMutation({
    mutationKey: ['medita', 'delete', { cluster, account }],
    mutationFn: (insurance_id: string) =>
      program.methods.deletePatient(insurance_id).accounts([{ patientInfo: account }]).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accounts.refetch();
    },
  });


  return {
    accountQuery,
    deletePatient,
    updatePatient
  };
}
