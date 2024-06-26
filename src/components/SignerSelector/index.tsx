import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { renderAddress } from "../../utils/helpers";
import { IAccounts } from "../../utils/types";
import Identicon from "@polkadot/react-identicon";
import { styled } from "@mui/material/styles";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Hash } from "@polkadot/types/interfaces/runtime/types";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { APP_SESSION } from "../../utils/constants";
import LogoutIcon from "@mui/icons-material/Logout";
import { Divider, IconButton } from "@mui/material";
import { DesktopContentWarpper } from "../NavigationBar";
import ConnectButton from "../ConnectButton";

export const Wrapper = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  marginLeft: 15,
  textAlign: "left",
}));
export const Name = styled("div")(
  ({ lineHeight = 18 }: { lineHeight?: number }) => ({
    fontWeight: 700,
    fontSize: 14,
    lineHeight: `${lineHeight}px`,
  })
);
export const Address = styled("div")(
  ({ lineHeight = 18 }: { lineHeight?: number }) => ({
    fontSize: 14,
    lineHeight: `${lineHeight}px`,
  })
);
export const SelectedAddressWrapper = styled("div")(() => ({
  display: "flex",
  padding: "5px 5px 10px 10px",
  alignItems: "center",
}));
export const SelectedAddressText = styled("div")(() => ({
  fontWeight: 700,
  fontSize: 18,
}));

type IState = {
  open: boolean;
  anchorEl: any;
  walletModalOpen: boolean;
};

type IProps = {
  setSigner: (_: InjectedAccountWithMeta | null) => void;
  signer: InjectedAccountWithMeta | null;
  accounts: IAccounts;
  network: string;
  genesisHash?: Hash | undefined;
};

export const SignerSelector = ({
  setSigner,
  signer,
  accounts,
  network,
  genesisHash,
}: IProps) => {
  const [state, setState] = useState<IState>({
    open: false,
    anchorEl: null,
    walletModalOpen: false,
  });

  const { open, anchorEl } = state;
  const connector = localStorage.getItem(APP_SESSION);

  const handleClose = () => {
    setState((prev) => ({
      ...prev,
      open: !prev.open,
    }));
  };
  const handleClick = (event: any) => {
    setState((prev) => ({
      ...prev,
      open: !prev.open,
      anchorEl: event.currentTarget,
    }));
  };

  const onItemClick = (account: InjectedAccountWithMeta, index: number) => {
    if (typeof account.address === "string") {
      setSigner(account);
      localStorage.setItem(
        APP_SESSION,
        JSON.stringify({
          accountIndex: index,
          connected: JSON.parse(connector || "").connected,
        })
      );
    }

    handleClose();
  };

  const disconnect = () => {
    setSigner(null);
    localStorage.removeItem(APP_SESSION);
    handleClose();
  };

  const size = 24;
  // theme (optional), depicts the type of icon, one of
  // 'polkadot', 'substrate' (default), 'beachball' or 'jdenticon'
  const theme = "polkadot";

  const renderWallet = () => {
    if (!signer) return;
    return (
      <>
        <Button variant="contained" onClick={handleClick}>
          <Identicon value={signer.address} size={size} theme={theme} />
          <>
            <Wrapper>
              <Name lineHeight={14}>{signer.meta.name}</Name>{" "}
              <Address lineHeight={14}>
                {renderAddress(signer.address, network, 6)}
              </Address>
            </Wrapper>
            <DesktopContentWarpper>
              <PlayArrowIcon
                className="selector-image"
                sx={{ fontSize: 14, marginLeft: "20px" }}
              />
            </DesktopContentWarpper>
          </>
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <SelectedAddressWrapper>
            <>
              <Identicon value={signer.address} size={size} theme={theme} />
              <Wrapper>
                <SelectedAddressText>{signer.meta.name}</SelectedAddressText>{" "}
                <Address>{renderAddress(signer.address, network, 10)}</Address>
              </Wrapper>
            </>
            <IconButton
              color="primary"
              aria-label="email icon"
              onClick={disconnect}
            >
              <LogoutIcon titleAccess="Disconnect" />
            </IconButton>
          </SelectedAddressWrapper>

          <Divider />
          {accounts?.map((account: InjectedAccountWithMeta, index: number) => {
            if (
              account.meta.genesisHash === genesisHash?.toHex() ||
              !account.meta.genesisHash
            ) {
              return (
                <MenuItem
                  key={`${account.address}_${index}`}
                  onClick={() => onItemClick(account, index)}
                >
                  <Identicon
                    value={account.address}
                    size={size}
                    theme={theme}
                  />
                  <Wrapper>
                    <Name>{account.meta.name}</Name>{" "}
                    <Address>
                      {renderAddress(account.address, network, 10)}
                    </Address>
                  </Wrapper>
                </MenuItem>
              );
            }
          })}
        </Menu>
      </>
    );
  };

  return (
    <>
      {connector && accounts && accounts.length > 0 ? (
        renderWallet()
      ) : (
        <ConnectButton />
      )}
    </>
  );
};
