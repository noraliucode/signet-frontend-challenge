import { useWeb3ConnectedContext } from "../../context/Web3ConnectedContext";
import { IWeb3ConnectedContextState } from "../../utils/types";
import { SignerSelector } from "../SignerSelector";
import { AppBar, Toolbar } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useApi } from "../../hooks/useApi";

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

export const NavigationBar = () => {
  const { accounts, setSigner, signer, network }: IWeb3ConnectedContextState =
    useWeb3ConnectedContext();

  const { api } = useApi(network);

  return (
    <AppBar position="fixed" color="secondary" enableColorOnDark>
      <Toolbar>
        <Wrapper>
          <ButtonsWarpper>
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
