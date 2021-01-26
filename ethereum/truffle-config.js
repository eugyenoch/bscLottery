const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  networks: {
    cldev: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },
    ganache: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    live: {
      provider: () => {
        return new HDWalletProvider(process.env.MNEMONIC, process.env.RPC_URL);
      },
      network_id: "*",
      // ~~Necessary due to https://github.com/trufflesuite/truffle/issues/1971~~
      // Necessary due to https://github.com/trufflesuite/truffle/issues/3008
      skipDryRun: true,
      // Ropsten
      linkAddress: "0x9EA8d6272B724AfB813A9E7C4eaF07C7aF4FE996",
    },
  },
  compilers: {
    solc: {
      version: "0.6.6",
    },
  },
};
