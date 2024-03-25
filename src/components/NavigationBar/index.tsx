import { useWeb3ConnectedContext } from "../../context/Web3ConnectedContext";
import { IWeb3ConnectedContextState } from "../../utils/types";
import { SignerSelector } from "../SignerSelector";
import { AppBar, Toolbar } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useApi } from "../../hooks/useApi";
import { NetworkSelector } from "../NetworkSelector";

export const Wrapper = styled("div")(() => ({
  display: "flex",
  width: "100%",
  alignItems: "center",
  justifyContent: "space-between",
}));
export const DesktopContentWarpper = styled("div")(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));
export const MobileContentWarpper = styled("div")(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("md")]: {
    display: "flex",
  },
}));
const ButtonsWarpper = styled("div")(() => ({
  display: "flex",
}));
const LogoWarpper = styled("div")(() => ({
  // marginLeft: "45px",
}));

export const NavigationBar = () => {
  const {
    accounts,
    setSigner,
    signer,
    network,
    setNetwork,
  }: IWeb3ConnectedContextState = useWeb3ConnectedContext();

  const { api } = useApi(network);

  return (
    <AppBar position="fixed" color="secondary" enableColorOnDark>
      <Toolbar>
        <Wrapper>
          <LogoWarpper>Pure Proxy Manager</LogoWarpper>
          <ButtonsWarpper>
            <NetworkSelector setNetwork={setNetwork} network={network} />
            <SignerSelector
              signer={signer}
              setSigner={setSigner}
              accounts={accounts}
              network={network}
              genesisHash={api?.genesisHash}
            />
          </ButtonsWarpper>
        </Wrapper>
      </Toolbar>
    </AppBar>
  );
};
