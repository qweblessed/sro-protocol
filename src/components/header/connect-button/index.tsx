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
                    <button onClick={openConnectModal} type="button" className="bg-slate-900 w-[10rem] h-[3.5rem] rounded-md hover:text-customGreen2 transition duration-400 animate-pulse text-customGreen max-sm:w-[8rem] h-[3rem]">
                      Connect Wallet
                    </button>
                  );
                }
  
                if (chain.unsupported) {
                  return (
                    <button onClick={openChainModal} type="button" className="bg-customRed w-[10rem] h-[3.5rem] rounded-lg animate-pulse max-sm:w-[10rem] h-[3.5rem]">
                      Wrong network
                    </button>
                  );
                }
  
                return (
                  <div className="flex flex-col	">                      
                    <button
                      onClick={openChainModal}
                      className="flex justify-center items-center bg-slate-800 w-[9rem] h-[3rem] rounded-lg text-customGreen "
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
                    <button onClick={openAccountModal} type="button" className="bg-slate-800 w-[9rem] h-[3rem] rounded-lg mt-2 text-customGreen max-sm:mt-1 ">
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