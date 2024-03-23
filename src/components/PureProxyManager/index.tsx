import React, { useState } from "react";
import { Button, List, ListItem, ListItemText, Snackbar } from "@mui/material";
import { createPure } from "../../utils/main";
import { useWeb3ConnectedContext } from "../../context/Web3ConnectedContext";
import { IWeb3ConnectedContextState, ProxyAccount } from "../../utils/types";
import { useApi } from "../../hooks/useApi";

const PureProxyManager: React.FC = () => {
  const { signer, injector, network }: IWeb3ConnectedContextState =
    useWeb3ConnectedContext();
  const { api } = useApi(network);
  const [pureProxies, setPureProxies] = useState<ProxyAccount[]>([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const setLoading = (value: boolean) => {
    setOpen(value);
    setMessage(value ? "Creating Pure Proxy..." : "Pure Proxy Created");
  };

  const handleClick = async () => {
    if (!api || !signer || !injector) return;
    setLoading(true);
    try {
      const result: ProxyAccount | string | undefined = await createPure(
        api,
        signer.address,
        injector,
        setLoading
      );

      if (!result) return;
      if (typeof result === "string") {
        setOpen(true);
        setMessage(result);
      } else {
        setPureProxies((prev) => [...prev, result]);
      }
    } catch (error) {
      console.error("Failed to create pure proxy:", error);
    } finally {
      setLoading(false);
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
    <div style={{ marginTop: "200px" }}>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={open}
        message={message}
      />
      <Button variant="contained" onClick={handleClick}>
        Create Pure Proxy
      </Button>
      {renderProxies()}
    </div>
  );
};

export default PureProxyManager;
