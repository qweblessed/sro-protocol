import { ConnectButton } from "@rainbow-me/rainbowkit";

export const CustomConnectButton = () => {
    return (
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          // Note: If your app doesn't use authentication, you
          // can remove all 'authenticationStatus' checks
          const ready = mounted && authenticationStatus !== 'loading';
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus ||
              authenticationStatus === 'authenticated');
  
          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                'style': {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <button onClick={openConnectModal} type="button" className="bg-customSkyBlue w-[8rem] h-[3rem] rounded-lg animate-pulse">
                      Connect Wallet
                    </button>
                  );
                }
  
                if (chain.unsupported) {
                  return (
                    <button onClick={openChainModal} type="button" className="bg-customRed w-[8rem] h-[3rem] rounded-lg animate-pulse">
                      Wrong network
                    </button>
                  );
                }
  
                return (
                  <div className="flex flex-col	 ">                      
                    <button
                      onClick={openChainModal}
                      className="flex justify-center items-center bg-customSkyBlue w-[8rem] h-[2rem] rounded-lg text-slate-900"
                      type="button"
                    >
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 22,
                            height: 22,
                            borderRadius: 999,
                            overflow: 'hidden',
                            marginRight: 4,
                          }}
                        >
                          {chain.iconUrl && (
                            <img
                              alt={chain.name ?? 'Chain icon'}
                              src={chain.iconUrl}
                              style={{ width: 22, height: 22 }}
                            />
                          )}
                        </div>
                      )}                    
                      {chain.name}
                    </button>
                    <button onClick={openAccountModal} type="button" className="bg-customSkyBlue w-[8rem] h-[2rem] rounded-lg mt-4 text-slate-900">
                      {account.displayName}                     
                    </button>

                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    );
  };