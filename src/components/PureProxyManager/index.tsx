import React, { useState } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  styled,
} from "@mui/material";
import { createPure } from "../../utils/main";
import { useWeb3ConnectedContext } from "../../context/Web3ConnectedContext";
import { IWeb3ConnectedContextState, ProxyAccount } from "../../utils/types";
import { useApi } from "../../hooks/useApi";

export const Container = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  marginTop: "100px",
  padding: theme.spacing(2),
  "@media (max-width:600px)": {
    padding: theme.spacing(1),
    marginTop: "50px",
  },
}));

const PureProxyManager: React.FC = () => {
  const { signer, injector, network }: IWeb3ConnectedContextState =
    useWeb3ConnectedContext();
  const { api } = useApi(network);
  const [pureProxies, setPureProxies] = useState<ProxyAccount[]>([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const setLoading = (value: boolean) => {
    setOpen(value);
  };

  const handleClick = async () => {
    if (!api || !signer || !injector) return;
    setMessage("Creating Pure Proxy...");
    try {
      const result: ProxyAccount | string | undefined = await createPure(
        api,
        signer.address,
        injector,
        setLoading,
        setMessage
      );

      if (!result) return;
      setPureProxies((prev) => [...prev, result]);
    } catch (error) {
      console.error("Failed to create pure proxy:", error);
    }
  };

  const renderProxies = () => (
    <List>
      {pureProxies.map((proxy, index) => (
        <ListItem key={index}>
          <ListItemText
            primary={`Address: ${proxy.address}`}
            secondary={`Balance: ${proxy.balance}`}
          />
        </ListItem>
      ))}
    </List>
  );

  return (
    <Container>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={open}
        message={message}
      />
      <h1>Pure Proxy Manager</h1>
      {signer ? (
        <Button variant="contained" onClick={handleClick} sx={{ mt: 2 }}>
          Create Pure Proxy
        </Button>
      ) : (
        "Please connect to the wallet"
      )}
      {renderProxies()}
    </Container>
  );
};

export default PureProxyManager;
