import axios from "axios";

export const fetchStorage = async () => {
  const res = await axios.get(
    "https://api.ghostnet.tzkt.io/v1/contracts/KT1MCtJf69KgtChNAMM6pzpFQ4TtMLMgagPT/storage"
  );
  return res.data;
};
