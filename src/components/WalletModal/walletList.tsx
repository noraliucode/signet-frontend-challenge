import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { IWallet, WALLETS } from "../../utils/types";
import { Divider, styled } from "@mui/material";
import { web3Enable } from "@polkadot/extension-dapp";
import { useEffect, useState } from "react";
import { StyledText } from "../../page/Home";

export const Name = styled("div")(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.text.primary,
  fontWeight: 700,
}));
export const Wrapper = styled("div")(() => ({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
}));

export const WalletList = ({ onClick }: { onClick: (_: string) => void }) => {
  const [extensions, setExtensions] = useState<any[] | null>(null);
  const getExtensions = async () => {
    const _extensions = await web3Enable("Cryptopatronage");
    setExtensions(_extensions);
  };
  useEffect(() => {
    getExtensions();
  }, []);

  const getWallets = () => {
    const _wallets: IWallet[] = WALLETS.map((wallet) => {
      const secondArrayItem = extensions?.find((item) => {
        return item.name === wallet.name;
      });

      if (secondArrayItem) {
        return { ...wallet, isInstalled: true, text: "Connect extension" };
      } else {
        return { ...wallet, isInstalled: false, text: "Install Extension" };
      }
    });
    return _wallets;
  };

  const handleClick = (wallet: IWallet) => {
    if (wallet.isInstalled) {
      onClick(wallet.name);
    } else {
      window.open(wallet.url, "_blank");
    }
  };

  return (
    <List
      dense
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "rgba(0,0,0,0)",
      }}
    >
      {getWallets().map((value: IWallet) => {
        return (
          <div key={value.name}>
            <Divider component="li" />
            <ListItem
              sx={{ width: "100%" }}
              key={value.name}
              disablePadding
              onClick={() => handleClick(value)}
            >
              <ListItemButton sx={{ height: 100 }}>
                <ListItemAvatar>
                  <Avatar alt={value.name} src={value.icon} />
                </ListItemAvatar>
                <Wrapper>
                  <div>
                    <Name>{value.name}</Name>
                    <StyledText>{value.text}</StyledText>
                  </div>
                  <ArrowForwardIosIcon sx={{ width: 14, height: 14 }} />
                </Wrapper>
              </ListItemButton>
            </ListItem>
          </div>
        );
      })}
    </List>
  );
};
