import { useWallet } from '@solana/wallet-adapter-react';
import { ExplorerLink } from '../cluster/cluster-ui';
import { WalletButton } from '../solana/solana-provider';
import { AppHero, ellipsify } from '../ui/ui-layout';
import { useMeditaProgram } from './medita-data-access';
import { PatientCreate, PatientList } from './medita-ui';

export default function CounterFeature() {
  const { publicKey } = useWallet();
  const { programId } = useMeditaProgram();

  return publicKey ? (
    <div>
      <AppHero
        title=""
        subtitle={""}
      >
        <p className="mb-6">
          <ExplorerLink
            path={`account/${programId}`}
            label={ellipsify(programId.toString())}
          />
        </p>
        <PatientCreate/>
      </AppHero>
      <PatientList />
    </div>
  ) : (
    <div className="max-w-4xl mx-auto">
      <div className="hero py-[64px]">
        <div className="hero-content text-center">
          <WalletButton />
        </div>
      </div>
    </div>
  );
}
